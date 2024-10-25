// components/MessageInput.tsx
import React, { useState } from 'react';

interface MessageInputProps {
  onSend: (message: { id: number; name: string; type: 'outgoing' }) => void; // Define the prop type
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(), // Using timestamp as a unique ID
        name: message,
        type: 'outgoing' as 'outgoing', // Explicitly setting type as 'outgoing'
      };
      onSend(newMessage); // Call the callback to update messages
      setMessage('');
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        className="input-field"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-full">
        Send
      </button>
    </div>
  );
};

export default MessageInput;
