import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { messages, currentUser } from '../data/mockData';

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #f0f2f5;
`;

const Header = styled.div`
  padding: 15px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ContactInfo = styled.div`
  margin-left: 15px;
  flex: 1;
`;

const ContactName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #1a1a1a;
`;

const ContactStatus = styled.span`
  font-size: 0.8rem;
  color: #4caf50;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #e5ddd5;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d5d5d5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

const MessageGroup = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 10px 0;
  flex-direction: ${(props) => (props.isSent ? 'row-reverse' : 'row')};
`;

const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: 0 8px;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const MessageBubble = styled.div`
  max-width: 60%;
  padding: 12px 16px;
  border-radius: 16px;
  background-color: ${(props) => (props.isSent ? '#dcf8c6' : 'white')};
  position: relative;
  word-wrap: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  border-top-left-radius: ${(props) => (!props.isSent ? '4px' : '16px')};
  border-top-right-radius: ${(props) => (props.isSent ? '4px' : '16px')};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    ${(props) => (props.isSent ? 'right: -8px' : 'left: -8px')};
    width: 0;
    height: 0;
    border-top: 8px solid ${(props) => (props.isSent ? '#dcf8c6' : 'white')};
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    transform: ${(props) =>
      props.isSent ? 'rotate(45deg)' : 'rotate(-45deg)'};
  }
`;

const MessageContent = styled.div`
  margin-bottom: 4px;
  color: #303030;
  line-height: 1.4;
`;

const MessageTime = styled.div`
  font-size: 0.7em;
  color: #666;
  text-align: right;
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
`;

const InputContainer = styled.div`
  padding: 15px 20px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  font-size: 0.95rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #128c7e;
    box-shadow: 0 0 0 2px rgba(18, 140, 126, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const SendButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 24px;
  background-color: #128c7e;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #075e54;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Add this check mark component for message status
const CheckMark = styled.span`
  color: ${(props) => (props.delivered ? '#4fc3f7' : '#8e8e8e')};
  font-size: 0.8em;
`;

function ChatWindow({ selectedContact }) {
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Update messages when contact changes
    if (selectedContact) {
      setChatMessages(messages[selectedContact.id] || []);
    }
  }, [selectedContact]);

  useEffect(() => {
    // Scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: chatMessages.length + 1,
        text: newMessage,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isSent: true,
      };

      setChatMessages([...chatMessages, newMsg]);
      setNewMessage('');
    }
  };

  const renderMessage = (message) => {
    const avatar = message.isSent ? currentUser.avatar : selectedContact.avatar;

    return (
      <MessageGroup key={message.id} isSent={message.isSent}>
        <Avatar src={avatar} alt={message.sender} />
        <MessageBubble isSent={message.isSent}>
          <MessageContent>{message.text}</MessageContent>
          <MessageTime>
            {message.timestamp}
            {message.isSent && <CheckMark delivered={true}>✓✓</CheckMark>}
          </MessageTime>
        </MessageBubble>
      </MessageGroup>
    );
  };

  if (!selectedContact) {
    return (
      <ChatContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: '#666',
          }}
        >
          <img
            src={currentUser.avatar}
            alt="Welcome"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              marginBottom: '20px',
              opacity: '0.5',
            }}
          />
          <h2>Welcome to Chatify</h2>
          <p>Select a contact to start chatting</p>
        </div>
      </ChatContainer>
    );
  }

  return (
    <ChatContainer>
      <Header>
        <Avatar src={selectedContact.avatar} alt={selectedContact.name} />
        <ContactInfo>
          <ContactName>{selectedContact.name}</ContactName>
          <ContactStatus>online</ContactStatus>
        </ContactInfo>
      </Header>
      <MessagesContainer>
        {chatMessages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer>
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <SendButton onClick={handleSend}>
          Send
          <span role="img" aria-label="send">
            ➤
          </span>
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
}

export default ChatWindow;
