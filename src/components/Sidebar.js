import React from 'react';
import styled from 'styled-components';
import { contacts } from '../data/mockData';

const SidebarContainer = styled.div`
  width: 30%;
  background-color: white;
  border-right: 1px solid #dadada;
`;

const ContactList = styled.div`
  overflow-y: auto;
`;

const ContactItem = styled.div`
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactName = styled.div`
  font-weight: bold;
`;

const LastMessage = styled.div`
  color: #666;
  font-size: 0.9em;
`;

const Timestamp = styled.div`
  color: #999;
  font-size: 0.8em;
`;

function Sidebar({ onSelectContact }) {
  return (
    <SidebarContainer>
      <ContactList>
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            onClick={() => onSelectContact(contact)}
          >
            <Avatar src={contact.avatar} alt={contact.name} />
            <ContactInfo>
              <ContactName>{contact.name}</ContactName>
              <LastMessage>{contact.lastMessage}</LastMessage>
            </ContactInfo>
            <Timestamp>{contact.timestamp}</Timestamp>
          </ContactItem>
        ))}
      </ContactList>
    </SidebarContainer>
  );
}

export default Sidebar;
