import React, { useState }from "react";
import './NewChat.css'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NewChat = ({user, chatlist, show, setShow}) =>{
    const [list, setList] = useState([
        {id: 123, avatar: 'https://preview.redd.it/v7ce9f0xa5e81.png?width=256&format=png&auto=webp&s=3813219733b0ea278c0ef85f3588face949ef70b', name: 'Murilo Taborda'},
        {id: 123, avatar: 'https://preview.redd.it/v7ce9f0xa5e81.png?width=256&format=png&auto=webp&s=3813219733b0ea278c0ef85f3588face949ef70b', name: 'Murilo Taborda'},
        {id: 123, avatar: 'https://preview.redd.it/v7ce9f0xa5e81.png?width=256&format=png&auto=webp&s=3813219733b0ea278c0ef85f3588face949ef70b', name: 'Murilo Taborda'},
        {id: 123, avatar: 'https://preview.redd.it/v7ce9f0xa5e81.png?width=256&format=png&auto=webp&s=3813219733b0ea278c0ef85f3588face949ef70b', name: 'Murilo Taborda'},

    ]);

    const handleClose = () => {
        setShow(false);
    }

    return(
        <div className="newChat" style={{left: show?0:-415}}>
            <div className="newChat--head">
                <div onClick={handleClose} className="newChat--backbutton">
                    <ArrowBackIcon style={{color: '#FFF'}}/>
                </div>    
                <div className="newChat--headtitle"> 
                    Nova Conversa
                </div>
            </div>
            <div className="newChat--list">
                {list.map((item, key)=>(
                    <div className="newChat--item" key={key}>
                        <img className="newChat--itemavatar" src={item.avatar} alt=""/>
                        <div className="newChat--itemname">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewChat;