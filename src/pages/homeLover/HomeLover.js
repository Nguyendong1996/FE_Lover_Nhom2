import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {findNotificationByIdAccount} from "../../services/AdminService";
import {NotificationHomeLover} from "./NotificationHomeLover";
import {PageOfLover} from "./PageOfLover";
import "./HomeLover.css"
import {EditInfoLover} from "./EditInfoLover";
import {ListBillOfProfileLover} from "./ListBillOfProfileLover";

import {UpdateServicesLover} from "./UpdateServicesLover";

import {HistoryBillProfileLover} from "./HistoryBillProfileLover";
import {listBillProfileLover} from "../../services/BillService";
import {findByIdLover} from "../../services/ProfileLoverService";
import {ListImageProfileLover} from "./ListImageProfileLover";

export function HomeLover() {
    const [chosen, setChosen] = useState(1)
    const [notifications, setNotifications] = useState([])
    const idAccount = localStorage.getItem("idAccount")
    const token = localStorage.getItem("token")
    const {check, setCheck} = useContext(AppContext);
    const [bills, setBills] = useState([]);
    const [profileLover, setProfileLover] = useState({})
    useEffect(() => {
        findByIdLover(idAccount).then((res) => {
            setProfileLover(res)
        })
    }, [idAccount])
    useEffect(() => {
        findNotificationByIdAccount(idAccount, token).then((res) => {
            setNotifications(res)
            console.log("oke " + res)
        })
        listBillProfileLover(idAccount, token)
            .then((res) => {
                setBills(res)
                console.log(res)
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
                                                                {chosen === 5 ? <span><i className="fas fa-bell">
                                                                    </i>Thông báo ({notifications.length})</span> :
                                                                    <span onClick={() => setChosen(5)}
                                                                          style={{color: "#354052"}}>
                                                                        <i className="fas fa-bell"></i>Thông báo ({notifications.length})</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">
                                                                {chosen === 6
                                                                    ? <span><i className="fas fa-comment"></i>Tin nhắn</span>
                                                                    : <span onClick={() => setChosen(6)}
                                                                            style={{color: "#354052"}}><i
                                                                        className="fas fa-comment"></i>Tin nhắn</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">
                                                                {chosen === 1 ? <span onClick={() => setChosen(1)}>
                                                                    <i className="fas fa-user-tie"></i>
                                                                    Xem trang cá nhân
                                                                </span> : <span style={{color: "#354052"}}
                                                                                onClick={() => setChosen(1)}>
                                                                    <i className="fas fa-user-tie"></i>
                                                                    Xem trang cá nhân
                                                                </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">
                                                                {
                                                                    chosen === 3 ? <span onClick={() => setChosen(3)}>
                                                                    <i className="fas fa-cog"></i>
                                                                    Cập nhật thông tin
                                                                </span> : <span style={{color: "#354052"}}
                                                                                onClick={() => {
                                                                                    setChosen(3)
                                                                                }}>
                                                                    <i className="fas fa-cog"></i>
                                                                    Cập nhật thông tin
                                                                </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">
                                                                {
                                                                    chosen === 7 ? <span onClick={() => setChosen(7)}>
                                                                    <i className="fas fa-list"></i>
                                                                    Cập nhật dịch vụ
                                                                </span> : <span style={{color: "#354052"}}
                                                                                onClick={() => {
                                                                                    setChosen(7)
                                                                                }}>
                                                                    <i className="fas fa-list"></i>
                                                                    Cập nhật dịch vụ
                                                                </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">
                                                                {
                                                                    chosen === 8 ? <span onClick={() => setChosen(8)}>
                                                                    <i className="fas fa-list"></i>
                                                                    Danh sách đơn ({bills.length})
                                                                </span> : <span style={{color: "#354052"}}
                                                                                onClick={() => {
                                                                                    setChosen(8)
                                                                                }}>
                                                                    <i className="fas fa-list"></i>
                                                                    Danh sách đơn ({bills.length})
                                                                </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">
                                                                {chosen === 2 ? <span onClick={() => setChosen(2)}>
                                                                    <i className="fas fa-history"></i>
                                                                    Lịch sử giao dịch
                                                                </span> : <span style={{color: "#354052"}}
                                                                                onClick={() => {
                                                                                    setChosen(2)
                                                                                }}>
                                                                    <i className="fas fa-history"></i>
                                                                    Lịch sử giao dịch
                                                                </span>}

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">
                                                                {chosen === 9 ? <span onClick={() => setChosen(9)}>
                                                                    <i className="fas fa-album"></i>
                                                                    Album ảnh
                                                                </span> : <span style={{color: "#354052"}}
                                                                                onClick={() => {
                                                                                    setChosen(9)
                                                                                }}>
                                                                    <i className="fas fa-album"></i>
                                                                    Album ảnh
                                                                </span>}

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">
                                                                <span style={{color: "#354052"}}>
                                                                    <i className="fas fa-wallet"></i> Ví
                                                                </span>
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
                        {chosen === 5 && <NotificationHomeLover/>}
                        {chosen === 1 && <PageOfLover idLover={profileLover.id}/>}
                        {chosen === 3 && <EditInfoLover/>}

                        {chosen === 8 && <ListBillOfProfileLover/>}
                        {chosen === 2 && <HistoryBillProfileLover/>}
                        {chosen === 7 && <UpdateServicesLover/>}
                        {chosen === 9 && <ListImageProfileLover profleLover = {profileLover}/>}

                    </div>
                </div>
            </div>
        </>
    )
}