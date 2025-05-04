import React from 'react';
import './ChatIntro.css';
import whatsappiIntro from "../img/intro-whatsapp.jpg";

const ChatIntro = () =>{
    return(
        <div className='chatIntro'>
            <img className='icon' src={whatsappiIntro} alt=''/>
            <h1>Mantenha seu celular conectado</h1>
            <h2>O WhatsApp conecta ao seu telefone para sincronizar suas mensagens. <br/>Para reduzir o uso de dados, conecte seu telefone a uma rede Wi-fi.</h2>
        </div>
    );

}

export default ChatIntro;