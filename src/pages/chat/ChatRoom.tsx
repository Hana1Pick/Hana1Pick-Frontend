import axios from 'axios';
import { useEffect, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { Link, useParams } from 'react-router-dom';
import './ChatRoomStyle.scss';

interface ChatMessageReqeust {
  from: string;
  text: string;
  roomId: number;
}

interface ChatMessageResponse {
  id: number;
  content: string;
  writer: string;
}

function ChatPage() {
  const { roomId } = useParams();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
  const [writer, setWriter] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BESERVERURI}/api/chat/${roomId}`
        );
        const messages = response.data.data
          .messageList as ChatMessageResponse[];
        setMessages(messages);
      } catch (error) {
        console.error('채팅 내역 로드 실패', error);
      }
    };
    loadChatHistory();

    const client = new Client({
      brokerURL: 'ws://localhost:8080/chat', // 서버 WebSocket URL
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(
          `/topic/public/rooms/${roomId}`,
          (message: IMessage) => {
            const msg: ChatMessageResponse = JSON.parse(message.body).data;
            console.log(messages);
            console.log(msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
          }
        );
      },
    });
    client.activate();
    setStompClient(client);
    return () => {
      client.deactivate();
    };
  }, [roomId]);

  const sendMessage = () => {
    console.log(messages);
    if (stompClient && newMessage) {
      const chatMessage: ChatMessageReqeust = {
        from: writer,
        text: newMessage,
        roomId: parseInt(roomId || ''),
      };

      stompClient.publish({
        destination: `/app/chat/${roomId}/send`,
        body: JSON.stringify(chatMessage),
      });
      setNewMessage('');
    }
  };

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        {messages.map((msg, idx) => (
          <div key={idx}>
            {msg.writer}: {msg.content}
          </div>
        ))}
      </div>
      <div className='input-group'>
        <label>작성자</label>
        <input
          type='text'
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
        />
      </div>
      <div className='input-group'>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className='send-button' onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
