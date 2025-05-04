import React from 'react';
import "./ChatListItem.css";


const ChatListItem = ({onClick}) =>{
    return(
        <div 
            className='chatListItem'
            onClick={onClick}
        >
            <img className='chatListItem--avatar' src='https://www.w3schools.com/howto/img_avatar2.png' alt=''/>
            <div className='chatListItem--lines'>
                <div className='chatListItem--line'>
                    <div className='chatListItem--name'> Murilo Taborda </div>
                    <div className='chatListItem--date'> 12:00 </div>
                </div>
                <div className='chatListItem--line'>
                    <div className='chatListItem--lastMsg'>
                        <p>Opa, tudo bem?</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatListItem;