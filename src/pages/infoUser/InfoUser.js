import React, {useContext, useEffect, useState} from "react";
import {InformationUser} from "./InformationUser";
import {InformationAccount} from "./InformationAccount";
import {AppContext} from "../../context/AppContext";
import {findAllNotificationByIdAccount, findNotificationByIdAccount} from "../../services/AdminService";
import {NotificationInfoUser} from "./NotificationInfoUser";
import {HistoryPay} from "./HistoryPay";
import {ListBillProfileUser} from "./ListBillProfileUser";
import {listBillProfileUser} from "../../services/BillService";
import {Evaluate} from "./Evaluate";

export function InfoUser() {
    const [chosen, setChosen] = useState(1)
    const [notifications, setNotifications] = useState([])
    const idAccount = localStorage.getItem("idAccount")
    const token = localStorage.getItem("token")
    const {check, setCheck} = useContext(AppContext);
    const [bills, setBills] = useState([])


    useEffect(() => {
        findAllNotificationByIdAccount(idAccount, token).then((res)=>{
            setNotifications(res)
        })
        listBillProfileUser(idAccount, token).then((res) => {
            setBills(res);
            console.log(res)
        })
    }, [idAccount, check])

    function showInfo() {
        setChosen(1)
    }

    function showHistory() {
        setChosen(2)
    }

    function showAccount() {
        setChosen(3)
    }

    function showNotification() {
        setChosen(4)
    }

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
            <link rel="stylesheet" href="../resources/css-user-profile.css" />
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
                                                                {
                                                                    chosen === 1 ? <span onClick={showInfo}>
                                                                    <i className="fas fa-user-tie"></i>
                                                                    Thông tin cá nhân
                                                                </span> : <span style={{color: "#354052"}}
                                                                                onClick={showInfo}>
                                                                    <i className="fas fa-user-tie"></i>
                                                                    Thông tin cá nhân
                                                                </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">
                                                                {
                                                                    chosen === 3 ? <span onClick={showAccount}>
                                                                    <i className="fas fa-cog"></i>
                                                                    Cài đặt tài khoản
                                                                </span> : <span style={{color: "#354052"}}
                                                                                onClick={showAccount}>
                                                                    <i className="fas fa-cog"></i>
                                                                    Cài đặt tài khoản
                                                                </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">
                                                                {
                                                                    chosen === 8 ? <span onClick={()=>setChosen(8)}>
                                                                    <i className="fas fa-list"></i>
                                                                    Danh sách đơn DV ({bills.length})
                                                                </span> : <span style={{color: "#354052"}}
                                                                                onClick={()=>{setChosen(8)}}>
                                                                    <i className="fas fa-list"></i>
                                                                    Danh sách đơn DV ({bills.length})
                                                                </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">
                                                                {chosen === 2 ? <span onClick={showHistory}>
                                                                    <i className="fas fa-history"></i>
                                                                    Lịch sử giao dịch
                                                                </span> : <span style={{color: "#354052"}}
                                                                                onClick={showHistory}>
                                                                    <i className="fas fa-history"></i>
                                                                    Lịch sử giao dịch
                                                                </span>}

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="active panel-title">
                                                                {
                                                                    chosen === 9 ? <span onClick={()=>setChosen(9)}>
                                                                    <i className="fas fa-list"></i>
                                                                    đánh giá ({bills.length})
                                                                </span> : <span style={{color: "#354052"}}
                                                                                onClick={()=>{setChosen(9)}}>
                                                                    <i className="fas fa-list"></i>
                                                                    Đánh Giá ({bills.length})
                                                                </span>
                                                                }
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
                        {chosen === 1 && <InformationUser/>}
                        {chosen === 3 && <InformationAccount/>}
                        {chosen === 5 && <NotificationInfoUser/>}
                        {chosen === 2 && <HistoryPay/>}
                        {chosen === 8 && <ListBillProfileUser/>}
                        {chosen === 9 && <Evaluate/>}
                    </div>
                </div>
            </div>
        </>
    )
}