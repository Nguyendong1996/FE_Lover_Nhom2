import Modal from "react-modal";
import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import "./HomeAdmin.css"
import {findNotificationByIdAccount} from "../../services/AdminService";
export function NotificationAdmin() {
    const idAccount = localStorage.getItem("idAccount")
    const token = localStorage.getItem("token")
    const [idAccountUser, setIdAccountUser] = useState(0)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        findNotificationByIdAccount(idAccount, token).then((res)=>{
            setNotifications(res)
        })
    }, [idAccount])
    function viewProfile(id) {
        setIdAccountUser(id);
        console.log(idAccountUser)
    }
 return (
     <>
         <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
             <div className="aside">
                 <div className="row">
                     <div className="col-md-6 col-sm-12 col-xs-12 personalinfo" style={{width: 925}}>
                         <div id={"div-container-info-user"}>
                             {notifications.map((item, index)=>{
                                 return (
                                     <table className={"table table-striped"}>
                                         <tbody>
                                         <tr>
                                             <td>{index+1}.</td>
                                             <td style={{width:500}}>{item.content}</td>
                                             <td><a href="#" style={{textDecoration:"underline"}} onClick={()=>viewProfile(item.accountSend?.id)}>Xem hồ sơ</a></td>
                                             <td><button className={"btn btn-primary"} id={"btn-1"}>Cho phép</button></td>
                                             <td><button className={"btn btn-primary"} id={"btn-1"}>Từ chối</button></td>
                                         </tr>
                                         </tbody>
                                     </table>
                                 )
                             })}
                             {/*<div className={"div-info-user-2"}>*/}
                             {/*    <div className="label-info-user">*/}
                             {/*        <i className="fas fa-cog icon-setting-info" ></i>*/}
                             {/*    </div>*/}
                             {/*    <div className="label-info-user">Họ:</div>*/}
                             {/*    <div className="label-info-user">Tên: </div>*/}
                             {/*    <div className="label-info-user">Số căn cước công*/}
                             {/*        dân: </div>*/}
                             {/*    <div className="label-info-user">Ngày tham gia: </div>*/}
                             {/*    <div className="label-info-user">Số điện thoại:</div>*/}
                             {/*</div>*/}
                         </div>
                     </div>
                 </div>
             </div>
         </div>

     </>
 )
}