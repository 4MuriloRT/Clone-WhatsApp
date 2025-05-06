import React, { useState, useEffect } from 'react';
import "./App.css";

import ChatListItem from "./components/ChatListItem";
import ChatIntro from "./components/ChatIntro";
import ChatWindow from "./components/ChatWindow";
import NewChat from './components/NewChat';

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

const App = () => {

  const [chatlist, setChatlist] = useState([
    {chatId: 1, title: 'Fulano de Tal', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
    {chatId: 2, title: 'Ciclano de Tal', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
    {chatId: 3, title: 'Beltrano de Tal', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
    {chatId: 4, title: 'Maria de Tal', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
  ]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState({
    id: 1234,
    avatar: 'https://preview.redd.it/v7ce9f0xa5e81.png?width=256&format=png&auto=webp&s=3813219733b0ea278c0ef85f3588face949ef70b',
    name: 'Murilo Taborda'
  });

  return(
    <div className='app-window'>
      <div className='sidebar'>
        <NewChat/>
        <header>
          <img className='header--avatar' src={user.avatar} alt=''/>
          <div className='header--buttons'>
            <div className='header--btn'>
              <DonutLargeIcon style={{color: '#919191'}}/>
            </div>
            <div className='header--btn'>
              <ChatIcon style={{color: '#919191'}}/>
            </div>
            <div className='header--btn'>
              <MoreVertIcon style={{color: '#919191'}}/>
            </div>
          </div>
        </header>
        
        <div className='search'>
          <div className='search--input'>
            <SearchIcon fontSize='small' style={{color: '#919191'}}/>
            <input type='search' placeholder='Procurar ou começar uma nova conversa'/>
          </div>
        </div>

        <div className='chatlist'>
          {chatlist.map((item, key)=>(
            <ChatListItem 
              key={key}
              data={item}
              active={activeChat.chatId === chatlist[key].chatId}
              onClick={()=>setActiveChat(chatlist[key])}
            />
          ))}
        </div>
      </div>

      <div className='contentarea'>
        {activeChat.chatId !== undefined && 
          <ChatWindow 
            user={user}
          />
        }
        {activeChat.chatId === undefined && 
          <ChatIntro/>
        }
      </div>
    </div>
  )
}

export default App;