import {AppContext} from "../context/AppContext";
import React, {useContext, useEffect, useRef, useState} from 'react';
import UserService from "../services/UserService";
import {toast, ToastContainer} from "react-toastify";
import {useWebSocket} from "../context/WebSocketContext";
import {useParams} from "react-router";
import axios from "axios";
import "./ChatRoomDemo.css"
export function ChatRoom(props) {
    const {showChat, setShowChat} = useContext(AppContext);

    const [idLover, setIdLover] = useState(props.idLover) //id account của lover

    const [nickname, setNickname] = useState(props.nickname)

    const [listFriendChat, setListFriendChat] = useState([]);

    const [listFriendInChat, setListFriendInChat] = useState([]);

    const messageInputRef = useRef(null);

    const [newMessage, setNewMessage] = useState('');

    const [idToUser, setIdToUser] = useState([]); // id của người mình muốn chat


    const [load, setLoad] = useState(true);

    let id = localStorage.getItem("idAccount");

    let userToken = localStorage.getItem("token");

    // const {idLover} = useParams();

    const [profileUser, setProfileUser] = useState({})

    const webSocket = useWebSocket();

    // nếu websocket thay đổi thì lấy ra 1 list tin nhắn của hai người đang trò chuyện với nhau:
    // hàm này chạy khi gửi tin nhắn
    useEffect(() => {
        if (webSocket) {
            webSocket.subscribe('/chat/user/queue/position-update', async (message) => {
                const msg = JSON.parse(message.body);
                let principal = {
                    id: msg.fromUser.id,
                    username: msg.fromUser.username,
                };
                try {
                    const response = await UserService.messageAllInFriend(msg.toUser.id, principal);
                    setListFriendInChat(response.data);
                } catch (error) {
                    toast.warning("Failed to find friend messages!");
                }
                setLoad(true)
            });
        }
    }, [webSocket]);

    useEffect(() => {
        var objDiv = document.getElementById("list-message-container");
        objDiv.scrollTop = objDiv.scrollHeight;

    }, [load]);

    // hàm này lấy ra tất cả tin nhắn đầu tiên của tất cả bạn bè mà người dùng đã chat: (hiển thị ở sizebar bên trái)
    useEffect(() => {
        axios.get("http://localhost:8080/allFriend/" + id)
            .then((res) => {
                res.data.sort((a, b) => {
                    return new Date(b.time) - new Date(a.time);
                });
                setListFriendChat(res.data);
                console.log("listfriendChat khi tải trang lần đầu:", listFriendChat)
                setLoad(false)
            })
    }, [load])

    // hàm này lấy ra tin nhắn của người dùng với một người đang nhắn tin cùng:
    const messageInFriend = (toUserId, userName) => {
        let principal = {
            id: localStorage.getItem("idAccount"),
            username: userName
        }
        console.log("Người dùng mà bạn đang muốn nhắn tin:", toUserId)
        setIdToUser(toUserId) // set cái id này để lát nữa gửi tin nhắn đi là sẽ biết gửi đến người nào
        axios.post("http://localhost:8080/all/" + toUserId, principal)
            .then((res) => {
                setListFriendInChat(res.data)
                setLoad(true)
            })
    }

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    }
    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            let message = {
                fromUser: {id: localStorage.getItem("idAccount")},
                toUser: {id: idToUser},
                content: newMessage,
            };
            try {
                const response = await UserService.sendMessage(message);
                console.log(response);
                if (webSocket.readyState === WebSocket.OPEN) {
                    webSocket.send(JSON.stringify({
                        type: 'message',
                        content: message,
                    }));
                }
                setNewMessage('');
            } catch (error) {
                toast.warning("Hãy chọn người mà bạn muốn nhắn tin!");
            }
        }
    }


    function calculateTimeChat(createdAt) {
        const currentTime = new Date();
        const postedTime = new Date(createdAt);
        const timeDiff = currentTime - postedTime;
        if (timeDiff < 60000) {
            return Math.floor(timeDiff / 1000) + " seconds ago";
        } else if (timeDiff < 3600000) {
            return Math.floor(timeDiff / 60000) + " minutes ago";
        } else if (timeDiff < 86400000) {
            return Math.floor(timeDiff / 3600000) + " hours ago";
        } else if (timeDiff < 2592000000) {
            return Math.floor(timeDiff / 86400000) + " days ago";
        } else if (timeDiff < 31536000000) {
            return Math.floor(timeDiff / 2592000000) + " months ago";
        } else {
            return Math.floor(timeDiff / 31536000000) + " years ago";
        }
    }

    return (
        <>
            <div className="message__popup  false"
                 style={{
                     width: "80%",
                     height: "80%",
                     backgroundColor: "transparent",
                     marginRight: 140,
                     display: "flex",
                     justifyContent: "center",
                 }}>

                <div style={{backgroundColor: "white", borderRadius:10, height:441, boxShadow:"0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2)"}}>
                    <div style={{display: "flex"}} className="container-info">
                        <div style={{width: 300, borderRadius: 10, border: "1px solid black"}}
                             className={"image-info"}>
                            {listFriendChat.map((m) => (
                                (idToUser === m.toUser.id || idToUser === m.fromUser.id)
                                    ? (<div style={{
                                        backgroundColor: "#b3d7ff",
                                        marginTop: 0,
                                        borderRadius: 10,
                                        marginBottom: 10
                                    }}
                                            onClick={() => messageInFriend(m.toUser.id == id ? m.fromUser.id : m.toUser.id, m.toUser.id == id ? m.toUser.username : m.fromUser.username)}>
                                        <div style={{display: "flex", width: 300}}>

                                            {m.toUser.id == id ? <img src={m.fromUser.image} alt=""
                                                                      style={{
                                                                          width: 50,
                                                                          height: 50,
                                                                          borderRadius: "50%"
                                                                      }}/> :
                                                <img src={m.toUser.image} alt=""
                                                     style={{width: 50, height: 50, borderRadius: "50%"}}/>}


                                            {m.toUser.id == id ? <p style={{marginLeft: 10}}>{m.fromUser.nickname}</p> :
                                                <p>{m.toUser.nickname}</p>}
                                            <p style={{marginLeft: 10}}>({calculateTimeChat(m.time)})</p>
                                        </div>
                                        <div style={{textAlign: "left"}}>
                                            <span>{m.content.slice(0, 10)} ...</span>
                                        </div>
                                    </div>)
                                    :
                                    (<div style={{marginTop: 0, borderRadius: 10, marginBottom: 10}}
                                          onClick={() => messageInFriend(m.toUser.id == id ? m.fromUser.id : m.toUser.id, m.toUser.id == id ? m.toUser.username : m.fromUser.username)}>
                                        <div style={{display: "flex", width: 300}}>

                                            {m.toUser.id == id ? <img src={m.fromUser.image} alt=""
                                                                      style={{
                                                                          width: 50,
                                                                          height: 50,
                                                                          borderRadius: "50%"
                                                                      }}/> :
                                                <img src={m.toUser.image} alt=""
                                                     style={{width: 50, height: 50, borderRadius: "50%"}}/>}


                                            {m.toUser.id == id ?
                                                <p style={{marginLeft: 10}}>{m.fromUser.nickname}</p> :
                                                <p style={{marginLeft: 10}}>{m.toUser.nickname}</p>}
                                            <p style={{marginLeft: 10}}>({calculateTimeChat(m.time)})</p>
                                        </div>
                                        <div style={{textAlign: "left"}}>
                                            <span>{m.content.slice(0, 10)} ...</span>
                                        </div>
                                    </div>)


                            ))}
                        </div>
                        <div style={{borderRadius: 10, border: "1px solid black"}}>
                            <div style={{width: 600, height: 400}}
                                 className={"info-info"}>
                                {listFriendInChat != null ? (
                                        < >
                                            <div id={"list-message-container"}>
                                                {listFriendInChat.map((m) => (
                                                    m.toUser.id == id ?
                                                        (<div style={{display: "flex"}}>
                                                            {m.toUser.id == id ?
                                                                <img src={m.fromUser.image} alt=""
                                                                     style={{
                                                                         width: 50,
                                                                         height: 50,
                                                                         borderRadius: "50%"
                                                                     }}/> :
                                                                <img src={m.toUser.image} className={"img-message-you"}
                                                                     alt=""
                                                                     style={{
                                                                         width: 50,
                                                                         height: 50,
                                                                         borderRadius: "50%"
                                                                     }}/>}
                                                            <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginLeft:10}}><span>{m.content}</span></div>
                                                        </div>) :
                                                        (<div style={{display: "flex", flexDirection: "row-reverse"}}>
                                                            {m.toUser.id == id ?
                                                                <img src={m.toUser.image} className={"img-message-me"}
                                                                     alt=""
                                                                     style={{
                                                                         width: 50,
                                                                         height: 50,
                                                                         borderRadius: "50%"
                                                                     }}/> :
                                                                <img src={m.fromUser.image} alt=""
                                                                     style={{
                                                                         width: 50,
                                                                         height: 50,
                                                                         borderRadius: "50%"
                                                                     }}/>}
                                                            <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginRight:10}}><span>{m.content}</span></div>
                                                        </div>)
                                                ))}
                                            </div>

                                        </>
                                    ) :
                                    <h4>Hãy Chọn Người Dùng muốn nhắn tin !</h4>}
                            </div>
                            <div style={{}}>
                                <input id={"send-message-input"}
                                       style={{
                                           height: 40,
                                           width: 500,
                                           marginLeft: 10,
                                           marginRight:20,
                                           borderRadius: 5
                                       }}
                                       ref={messageInputRef}
                                       type="text"
                                       value={newMessage}
                                       onChange={handleNewMessageChange}
                                       placeholder="Nhập nội dung..."
                                />
                                <button onClick={() => handleSendMessage()} id={"send-message-button"} className={"btn"}
                                style={{width:60,}}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button style={{
                    height: 30, border: "none", fontWeight: "bold", fontSize: 15,
                    backgroundColor: "#f0564a", position:"absolute", right:125, borderRadius:10
                }} onClick={() => setShowChat(false)}>Thoát
                </button>
            </div>
        </>
    )
}