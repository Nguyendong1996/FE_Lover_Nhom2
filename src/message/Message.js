import React, {useContext, useEffect, useState} from "react";
import "./Message.css"
import {AppContext} from "../context/AppContext";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';


export function Message(props) {
    const {showChat, setShowChat} = useContext(AppContext);

    const [idLover, setIdLover] = useState(props.idLover) //id tài khoản của lover

    const idAccount = localStorage.getItem("idAccount") //id tài khoản của người đăng nhập

    const [nickname, setNickname] = useState(props.nickname)

    const [stompClient, setStompClient] = useState(null);

    const [messages, setMessages] = useState([]);

    const [inputMessage, setInputMessage] = useState('');



    useEffect(() => {
        // Kết nối tới WebSocket endpoint của Spring Boot
        const socket = new SockJS('/ws');
        const client = Stomp.over(socket);
        client.connect({}, () => {
            setStompClient(client);
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (stompClient) {
            // Đăng ký để nhận tin nhắn từ WebSocket server
            stompClient.subscribe('/topic/messages', (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
        }
    }, [stompClient]);


    const sendMessage = () => {
        if (stompClient && inputMessage.trim() !== '') {
            const message = {
                accountSend: {
                    id: idAccount
                },
                accountReceive: {
                    id: idLover
                },
                content: inputMessage,
            };
            stompClient.send('/app/chat', {}, JSON.stringify(message));
            setInputMessage('');
        }
    };

    return (
        <>
            <div className="message__popup  false"
                 style={{width: 300, height: 400, backgroundColor: "transparent", marginRight: 50}}>
                <div className="message__popup--icon"
                     style={{
                         width: 300,
                         height: 400,
                         borderRadius: 10,
                         backgroundColor: "white",
                         boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                         border: "none"
                     }}>
                    <div style={{display: "flex"}}>
                        Nhắn tin đến: <p>{nickname}</p>
                        <button style={{marginLeft: 60, height: 40, border: "none", fontWeight: "bold", fontSize: 15}}
                                className={"btn"} onClick={() => setShowChat(false)}
                        >Thoát
                        </button>
                    </div>
                    <hr/>
                    <div style={{height: 200}}>
                        <div style={{marginLeft: 0}}>
                            <div>
                                <div>
                                    {messages.map((message, index) => (
                                        <div key={index}>
                                            <strong>Người gửi: </strong>
                                            {message.content}
                                        </div>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                />
                                <button onClick={sendMessage}>Send</button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
            </div>
        </>
    )
}