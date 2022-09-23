import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { STREAM_KEY } from './keys';
import { ChannelContainer, ChannelListContainer } from './components';
import './App.css';

const apiKey = STREAM_KEY;
console.log(apiKey);

const client = StreamChat.getInstance(apiKey);

const App: React.FC = () => {
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
}

export default App;
