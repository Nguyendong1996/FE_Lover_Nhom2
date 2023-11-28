import React, {useContext, useEffect, useState} from "react";
import {
    findAllByAccountUserId,
    listHistoryBillProfileLover,
    listHistoryBillProfileUser
} from "../../services/BillService"
import {AppContext} from "../../context/AppContext";
import "../../css/InfoUser.css"
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export function HistoryPay() {
    const [bills, setBills] = useState([])
    const idAccount = localStorage.getItem("idAccount")
    const token = localStorage.getItem("token")
    const {check, setCheck} = useContext(AppContext);
    useEffect(() => {
        listHistoryBillProfileUser(idAccount, token).then((res) => {
            setBills(res);
            console.log(res)
        })
    }, [idAccount, check]);

    function deleteBill() {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="custom-confirm-alert-overlay">
                        <div className="custom-confirm-alert">
                            <h1 className="custom-confirm-alert-title">Xác nhận</h1>
                            <p className="custom-confirm-alert-message">Bạn có chắc chắn muốn xóa?</p>
                            <div className="custom-confirm-alert-buttons">
                                <button className="custom-confirm-alert-button" onClick={() => {
                                    // Xử lý logic xóa ở đây
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
            <div>
                <table className={"table table-striped"} style={{width:"auto"}}>
                    <tbody>
                    <tr>
                        <td>#</td>
                        <td style={{width: 120, fontWeight:"bold"}}>Tên lover</td>
                        <td style={{width: 140, fontWeight:"bold"}}>Thời gian tạo bill</td>
                        <td style={{width: 380, fontWeight:"bold"}}>Dịch vụ vip</td>
                        <td style={{width: 130, fontWeight:"bold"}}>Thời gian thuê</td>
                        <td style={{width: 100, fontWeight:"bold"}}>Tổng tiền</td>
                        <td style={{width: 100, fontWeight:"bold"}}>Trạng thái</td>
                        <td></td>
                    </tr>
                    {bills.map((item, index) => {
                        return (
                            <tr>
                                <td>{index + 1}.</td>
                                <td>{item.accountLover?.nickname}</td>
                                <td>{item.createdAt.slice(11, 19)} <br/> {item.createdAt.slice(0, 10)}</td>
                                <td style={{textAlign: "left"}}>
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
                                    <button className={"btn btn-primary"} id={"btn-2"} onClick={deleteBill}>Xoá
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )
}