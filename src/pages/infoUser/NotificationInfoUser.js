import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {acceptUserToLover, findNotificationByIdAccount} from "../../services/AdminService";

export function NotificationInfoUser() {
    const idAccount = localStorage.getItem("idAccount")
    const token = localStorage.getItem("token")
    const [notifications, setNotifications] = useState([])
    const {check, setCheck} = useContext(AppContext);
    useEffect(() => {
        findNotificationByIdAccount(idAccount, token).then((res) => {
            setNotifications(res)
        })
    }, [idAccount, check])
    return (
        <>
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <div className="aside">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12 personalinfo" style={{width: "auto"}}>
                            <div id={"div-container-info-user"}>

                                <table className={"table table-striped"} style={{width:990}}>
                                    <tbody>
                                    {notifications.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}.</td>
                                                <td style={{width: 750}}>{item.content}</td>
                                                <td>
                                                    <button className={"btn btn-primary"} id={"btn-1"}>Xoá</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}