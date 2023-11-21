import Modal from "react-modal";
import {Field, Form, Formik} from "formik";
import React, {useContext, useEffect, useState} from "react";
import "./HomeAdmin.css"
import {acceptUserToLover, findNotificationByIdAccount} from "../../services/AdminService";
import {AppContext} from "../../context/AppContext";

export function NotificationAdmin() {
    const idAccount = localStorage.getItem("idAccount")
    const token = localStorage.getItem("token")
    const [idAccountUser, setIdAccountUser] = useState(0)
    const [notifications, setNotifications] = useState([])
    const {check, setCheck} = useContext(AppContext);
    useEffect(() => {
        findNotificationByIdAccount(idAccount, token).then((res) => {
            setNotifications(res)
        })
    }, [idAccount, check])

    function viewProfile(id) {
        setIdAccountUser(id);
        console.log(idAccountUser)
    }

    function acceptUserRequest(accountUser) {
        console.log(accountUser)
        acceptUserToLover(accountUser.id, token)
            .then((res) => {
                alert(res)
                setCheck(!check)
            })
    }

    return (
        <>
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <div className="aside">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12 personalinfo" style={{width: 925}}>
                            <div id={"div-container-info-user"}>

                                <table className={"table table-striped"}>
                                    <tbody>
                                    {notifications.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}.</td>
                                                <td style={{width: 500}}>{item.content}</td>
                                                <td><a href="#" style={{textDecoration: "underline"}}
                                                       onClick={() => viewProfile(item.accountSend?.id)}>Xem hồ sơ</a>
                                                </td>
                                                <td>
                                                    <button className={"btn btn-primary"} id={"btn-1"}
                                                            onClick={() => acceptUserRequest(item.accountSend)}>Cho
                                                        phép
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className={"btn btn-primary"} id={"btn-1"}>Từ chối
                                                    </button>
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