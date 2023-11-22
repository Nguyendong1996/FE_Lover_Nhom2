import React, {useContext, useState} from "react";
import "./Message.css"
import {AppContext} from "../context/AppContext";

export function Message(props) {
    const {showChat, setShowChat} = useContext(AppContext);
    const [idLover, setIdLover] = useState(props.idLover) //id tài khoản của lover
    const idAccount = localStorage.getItem("idAccount") //id tài khoản của người đăng nhật
    const [nickname, setNickname] = useState(props.nickname)
    return (
        <>
            <div className="message__popup  false"
                 style={{width: 300, height: 400, backgroundColor: "transparent", marginRight: 50}}>
                <div className="message__popup--icon"
                     style={{width: 300, height: 400, borderRadius: 10, backgroundColor: "white",boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.5)", border:"none"}}>
                    <div style={{display: "flex"}}>
                        Nhắn tin đến: <p>{nickname}</p>
                        <button style={{marginLeft: 60, height: 40, border: "none", fontWeight: "bold", fontSize: 15}}
                                className={"btn"} onClick={()=>setShowChat(false)}
                        >Thoát
                        </button>
                    </div>
                    <hr/>
                    <div style={{height: 200}}>
                        Lịch sử tin nhắn
                    </div>
                    <hr/>
                    <div style={{marginLeft:0}}>
                        <div style={{marginLeft:0}}>Nội dung tin nhắn</div>
                        <input type="t"/>
                        <button>Gửi</button>
                    </div>
                </div>
            </div>
        </>
    )
}