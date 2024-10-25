// components/MessageList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageInput from './MessaageInput'; // Assuming MessageInput is in the same directory

interface Message {
  id: number;
  name: string;
  type: 'incoming' | 'outgoing';
}

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://gorest.co.in/public/v1/users?page=${page}`);
      const users = response.data.data.map((user: any, index: number) => ({
        id: user.id,
        name: user.name,
        type: index % 2 === 0 ? 'incoming' : 'outgoing', // Alternate type
      }));
      setMessages((prevMessages) => [...prevMessages, ...users]);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(page);
  }, [page]);

  const loadMoreMessages = () => {
    setPage((prevPage) => prevPage + 1); // Increment page for pagination
  };

  return (
    <div className="message-list" onScroll={loadMoreMessages}>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <span>{message.name}</span>
          </div>
        ))}
      </div>
      {loading && <p>Loading more messages...</p>}
      <MessageInput onSend={(newMessage) => setMessages((prev) => [...prev, newMessage])} />
    </div>
  );
};

export default MessageList;
