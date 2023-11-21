import React, {useContext, useEffect, useState} from "react";
import {
    cancelBillUser,
    findAllByAccountUserId, listBillProfileUser,
    listHistoryBillProfileLover,
    listHistoryBillProfileUser
} from "../../services/BillService"
import {AppContext} from "../../context/AppContext";
import "../../css/InfoUser.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
export function ListBillProfileUser() {
    const [bills, setBills] = useState([])
    const idAccount = localStorage.getItem("idAccount")
    const token = localStorage.getItem("token")
    const {check, setCheck} = useContext(AppContext);
    useEffect(() => {
        listBillProfileUser(idAccount, token).then((res) => {
            setBills(res);
            console.log(res)
        })
    }, [idAccount, check]);
    function deleteBill(idBill) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="custom-confirm-alert-overlay">
                        <div className="custom-confirm-alert">
                            <h1 className="custom-confirm-alert-title">Xác nhận</h1>
                            <p className="custom-confirm-alert-message">Bạn có chắc chắn muốn Huỷ đơn không?</p>
                            <div className="custom-confirm-alert-buttons">
                                <button className="custom-confirm-alert-button" onClick={() => {
                                    // Xử lý logic xóa ở đây
                                    cancelBill(idBill)
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
    function cancelBill(id){
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Bạn có chắc chắn muốn Huỷ đơn không?")){
            cancelBillUser(id,token).then(() =>{
                setCheck(!check)
                alert("bạn huỷ đơn thành công")
                }
            )
        }
    }
    return (
        <>
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <div className="aside">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12 personalinfo" style={{width: "auto"}}>
                            <div id={"div-container-info-user"}>
                                <table className={"table table-striped"} style={{width:990}}>
                                    <thead>
                                    <tr>
                                        <td>#</td>
                                        <td>Tên lover</td>
                                        <td style={{width:140}}>Thời gian tạo bill</td>
                                        <td style={{width:310}}>Dịch vụ vip</td>
                                        <td style={{width:130}}>Thời gian thuê</td>
                                        <td>Tổng tiền</td>
                                        <td>Trạng thái</td>
                                        <td></td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {bills.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}.</td>
                                                <td>{item.accountLover?.nickname}</td>
                                                <td>{item.createdAt.slice(11,19)} <br/> {item.createdAt.slice(0,10)}</td>
                                                <td>
                                                    {item.vipServices?.map((item, index) => {
                                                        return (
                                                            <>
                                                                {index + 1}, {item.name} (+ {item.price} vnđ) <br/>
                                                            </>
                                                        )
                                                    })}
                                                </td>
                                                <td>{item.time} giờ</td>
                                                <td>{item.totalMoney} vnđ</td>
                                                <td>{item.statusBill?.name}</td>
                                                <td>
                                                    <button className={"btn btn-primary"} id={"btn-2"} onClick={() =>{cancelBill(item.id)}}>Huỷ Đơn</button>
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