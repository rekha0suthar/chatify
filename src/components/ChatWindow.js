import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { messages } from '../data/mockData';

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 15px;
  background-color: #f0f2f5;
  border-bottom: 1px solid #dadada;
  display: flex;
  align-items: center;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #e5ddd5;
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
`;

const MessageBubble = styled.div`
  max-width: 60%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.isSent ? '#dcf8c6' : 'white')};
  position: relative;
  word-wrap: break-word;
  // Adjust border radius based on message position
  border-top-left-radius: ${(props) => (!props.isSent ? '0' : '10px')};
  border-top-right-radius: ${(props) => (props.isSent ? '0' : '10px')};
`;

const MessageContent = styled.div`
  margin-bottom: 4px;
`;

const MessageTime = styled.div`
  font-size: 0.7em;
  color: #666;
  text-align: right;
`;

const InputContainer = styled.div`
  padding: 15px;
  background-color: #f0f2f5;
  display: flex;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 20px;
  margin-right: 10px;

  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #128c7e;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #075e54;
  }
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
    const avatar =
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'; // Replace with actual user avatar

    return (
      <MessageGroup key={message.id} isSent={message.isSent}>
        <Avatar src={avatar} alt={message.sender} />
        <MessageBubble isSent={message.isSent}>
          <MessageContent>{message.text}</MessageContent>
          <MessageTime>{message.timestamp}</MessageTime>
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
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          Select a contact to start chatting
        </div>
      </ChatContainer>
    );
  }

  return (
    <ChatContainer>
      <Header>
        <Avatar
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt={selectedContact.name}
        />
        <h3 style={{ marginLeft: '10px' }}>{selectedContact.name}</h3>
      </Header>
      <MessagesContainer>
        {chatMessages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer>
        <Input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <SendButton onClick={handleSend}>Send</SendButton>
      </InputContainer>
    </ChatContainer>
  );
}

export default ChatWindow;
