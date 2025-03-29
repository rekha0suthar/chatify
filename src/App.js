import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;
`;

function App() {
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <AppContainer>
      <Sidebar onSelectContact={setSelectedContact} />
      <ChatWindow selectedContact={selectedContact} />
    </AppContainer>
  );
}

export default App;
