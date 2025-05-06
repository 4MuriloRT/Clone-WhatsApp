import React from "react";
import "./MessageItem.css"

const MessageItem = ({data, user}) =>{
    return(
        <div 
            className="menssageLine"
            style={{
                justifyContent: user.id === data.author ? 'flex-end' : 'flex-start'
            }}
        >
            <div 
                className="menssageItem"
                style={{
                    backgroundColor: user.id === data.author ? '#DCF8C6' : '#FFF'
                }}
            >
                <div className="menssageText">{data.body}</div>
                <div className="menssageDate">15:00</div>
            </div>
        </div>
    );
}

export default MessageItem;