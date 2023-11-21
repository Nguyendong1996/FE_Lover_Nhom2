import React, {useContext, useEffect, useState} from "react";
import {findNotificationByIdAccount} from "../../services/AdminService"
import {NotificationAdmin} from "./NotificationAdmin";
import {AppContext} from "../../context/AppContext";
import {ListProfileLover} from "./ListProfileLover";

export function HomeAdmin() {
    const idAccount = localStorage.getItem("idAccount")
    const token = localStorage.getItem("token")
    const [chose, setChose] = useState(0)
    const [notifications, setNotifications] = useState([]);
    const {check, setCheck} = useContext(AppContext);
    useEffect(() => {
        findNotificationByIdAccount(idAccount, token).then((res)=>{
            setNotifications(res)
        })
    }, [idAccount, check])
    return (
        <>
            <meta charSet="UTF-8"/>
            <link href="../resources/all.css" rel="stylesheet"/>
            <link href="../resources/css.css" rel="stylesheet"/>
            <link href="../resources/8.97b85fe3.chunk.css" rel="stylesheet"/>
            <link href="../resources/main.3e229f12.chunk.css" rel="stylesheet"/>


            <link rel="stylesheet" type="text/css" href="../resources/0.cbdbec7b.chunk.css"/>
            <link rel="stylesheet" type="text/css" href="../resources/4.2ddfb1d3.chunk.css"/>
            <link rel="stylesheet" type="text/css"
                  href="../resources/15.7bac9b00.chunk.css"/>

            <link rel="stylesheet" type="text/css"
                  href="../resources/9.cb7de3a7.chunk.css"/>
            <link rel="stylesheet" href="../resources/css-user-information.css"/>
            <div id="root" style={{marginTop: 80}}>
                <div className="wrapper">
                    <div className="setting__main row">
                        <div className="setting__main--menu col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <div className="menu">
                                <div className="menu__setting  panel-group">
                                    <div className="menu__setting--main panel panel-default">
                                        <div className="panel-collapse collapse in">
                                            <div className="panel-body">
                                                <div className="panel-group">
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">
                                                                {chose === 0 ? <span>
                                                                    <i className="fas fa-bell"></i>Thông báo ({notifications.length})</span> :
                                                                    <span onClick={() => setChose(0)}
                                                                          style={{color: "#354052"}}>
                                                                        <i className="fas fa-bell"></i>Thông báo ({notifications.length})</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">

                                                                {chose === 1
                                                                    ? <span><i className="fas fa-comment"></i>Tin nhắn</span>
                                                                    : <span onClick={() => setChose(1)}
                                                                            style={{color: "#354052"}}><i
                                                                        className="fas fa-comment"></i>Tin nhắn</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">
                                                                {chose === 2
                                                                    ? <span><i className="fas fa-list-ul"></i>Quản lý lover</span>
                                                                    : <span onClick={() => setChose(2)}
                                                                            style={{color: "#354052"}}><i
                                                                        className="fas fa-list-ul"></i>Quản lý lover</span>
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">
                                                                {chose === 3
                                                                    ? <span><i className="fas fa-list-ul"></i>Quản lý user</span>
                                                                    : <span onClick={() => setChose(3)}
                                                                            style={{color: "#354052"}}><i
                                                                        className="fas fa-list-ul"></i>Quản lý user</span>
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">
                                                                {chose === 4
                                                                    ? <span><i className="fas fa-cog"></i>Cài đặt tài khoản</span>
                                                                    : <span onClick={() => setChose(4)}
                                                                            style={{color: "#354052"}}><i
                                                                        className="fas fa-cog"></i>Cài đặt tài khoản</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-drawer-setting visible-xs"><i className="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                        {chose === 0 && <NotificationAdmin/>}
                        {chose === 2 && <ListProfileLover/>}
                    </div>
                </div>
            </div>
        </>
    )
}