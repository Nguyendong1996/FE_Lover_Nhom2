import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {
    findAllNotificationByIdAccount,
    findAllProfileUserByIdStatusUser,
    findNotificationByIdAccount
} from "../../services/AdminService";
import {confirmAlert} from "react-confirm-alert";
import {deleteNotificationById} from "../../services/inforUserService";
import {toast} from "react-toastify";

export function NotificationHomeLover() {
    const idAccount = localStorage.getItem("idAccount")
    const token = localStorage.getItem("token")
    const [notifications, setNotifications] = useState([])
    const {check, setCheck} = useContext(AppContext);
    useEffect(() => {
        findAllNotificationByIdAccount(idAccount, token).then((res) => {
            setNotifications(res)
        })
    }, [idAccount, check])
    function deleteNotification(id) {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="custom-confirm-alert-overlay">
                        <div className="custom-confirm-alert">
                            <span></span>
                            <h3 className="custom-confirm-alert-title">XÁC NHẬN</h3>
                            <p className="custom-confirm-alert-message">Bạn có chắc chắn xoá không?</p>
                            <div className="custom-confirm-alert-buttons">
                                <button className="custom-confirm-alert-button" onClick={() => {
                                    deleteNotificationById(id, token).then(() => {
                                        toast.success("Xoá thành công!")
                                        setCheck(!check)
                                    })
                                    onClose();
                                }}>
                                    Có
                                </button>
                                <button className="custom-confirm-alert-button" onClick={() => {
                                    // Xử lý logic khi không xóa ở đây
                                    onClose();
                                }}>
                                    Không
                                </button>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    }

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
                                                <td style={{width: 750, textAlign:"left"}}>{item.content}</td>
                                                <td style={{width: 200}}>{item.timeSend}</td>
                                                <td>
                                                    <button className={"btn btn-primary"} id={"btn-1"}
                                                    onClick={()=>deleteNotification(item.id)}>Xoá</button>
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