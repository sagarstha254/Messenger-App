// App.tsx
import React from 'react';
import './styles.css'; 
import MessageList from './components/MessageList';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">Messenger</h1>
      <MessageList />
    </div>
  );
};

export default App;
