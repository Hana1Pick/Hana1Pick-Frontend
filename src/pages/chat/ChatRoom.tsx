import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import sendIcon from '../../assets/images/chat/paper-plane-icon.png';
import './ChatRoomStyle.scss';

interface ChatMessageRequest {
  roomId: number;
  nation: string;
  from: string;
  text: string;
}

interface ChatMessageResponse {
  chatMessageId: number;
  content: string;
  from: string;
  chatDate: string;
}

interface Member {
  userIdx: string;
  userName: string;
  profile: string;
}

interface MoaClubState {
  moaclub: {
    memberList: Member[];
  };
}

function ChatPage() {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const { roomId } = useParams<{ roomId: string }>();
  const [writer] = useState(localStorage.getItem('userIdx') || '(알수없음)');
  const [nation] = useState(localStorage.getItem('nation') || 'Korea');
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const location = useLocation();
  const moaclub = location.state as MoaClubState | undefined;

  useEffect(() => {
    console.log(writer);
    console.log(nation);
    // 초기 채팅 내역 로드
    const loadChatHistory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BESERVERURI}/api/chat/${roomId}?nation=${nation}`
        );
        const messages = response.data.data
          .messageList as ChatMessageResponse[];
        setMessages(messages);
      } catch (error) {
        console.error('채팅 내역 로드 실패', error);
      }
    };
    loadChatHistory();

    // WebSocket 연결
    const client = new Client({
      brokerURL: 'ws://localhost:8080/chat', // WebSocket 서버 URL
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(
          `/topic/public/rooms/${roomId}`,
          (message: IMessage) => {
            const msg: ChatMessageResponse = JSON.parse(message.body).data;
            setMessages((prevMessages) => [...prevMessages, msg]);
          }
        );
      },
    });
    console.log('websocket 확인');
    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [roomId, nation]);

  const sendMessage = () => {
    if (stompClient && newMessage && roomId) {
      const chatMessage: ChatMessageRequest = {
        roomId: parseInt(roomId),
        nation: nation,
        from: writer,
        text: newMessage,
      };

      stompClient.publish({
        destination: `/app/chat/${roomId}/send`,
        body: JSON.stringify(chatMessage),
      });
      setNewMessage('');
    }
  };

  return (
    <div id='chat'>
      <Header value='모임 통장 채팅' />

      <div className='messageWrapper'>
        {messages.map((msg, index) => {
          const user = moaclub?.moaclub.memberList.find(
            (member) => member.userIdx === msg.from
          );

          if (msg.from === writer) {
            // 작성자 본인 메시지
            return (
              <div className='message' key={index}>
                <div className='message1'>{msg.content}</div>
              </div>
            );
          } else {
            // 상대방 메시지
            return (
              <div className='message' key={index}>
                {user && (
                  <div className='userInfo'>
                    <img
                      src={user.profile}
                      alt='프로필 사진'
                      className='profileImg'
                    />
                    <div>
                      <div className='userName'>{user.userName}</div>
                      <div className='message2'>{msg.content}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>

      <div className='inputWrapper'>
        <input
          className='inputBox'
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <img
          className='inputBtn'
          src={sendIcon}
          alt='sendIcon'
          onClick={sendMessage}
        />
      </div>
    </div>
  );
}

export default ChatPage;
