import React, {useContext, useEffect, useState} from "react";
import {
    cancelBillUser,
    findAllByAccountUserId, listBillProfileUser,
    listHistoryBillProfileLover,
    listHistoryBillProfileUser
} from "../../services/BillService"
import {AppContext} from "../../context/AppContext";
import "../../css/InfoUser.css"
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {toast} from "react-toastify";

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

    function cancelBill(id) {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="custom-confirm-alert-overlay">
                        <div className="custom-confirm-alert">
                            <h1 className="custom-confirm-alert-title">XÁC NHẬN</h1>
                            <p className="custom-confirm-alert-message">Bạn có chắc chắn huỷ đơn không?</p>
                            <div className="custom-confirm-alert-buttons">
                                <button className="custom-confirm-alert-button" onClick={() => {
                                    // Xử lý logic xóa ở đây
                                    cancelBillUser(id, token).then((res) => {
                                            setCheck(!check)
                                            toast.success(res)
                                        }
                                    )
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
                <table className="table table-striped custom-table">
                    <tbody>
                    <tr>
                        <th>#</th>
                        <th style={{width:100}}>Tên lover</th>
                        <th>Thời gian tạo</th>
                        <th style={{width:400}}>Dịch vụ VIP</th>
                        <th>Thời gian</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                    {bills.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}.</td>
                            <td>{item.accountLover?.nickname}</td>
                            <td>
                                {item.createdAt.slice(11, 19)} <br/> {item.createdAt.slice(0, 10)}
                            </td>
                            <td style={{textAlign:"left"}}>
                                {item.vipServices?.map((service, serviceIndex) => (
                                    <span key={serviceIndex}>
                                                {serviceIndex + 1}, {service.name} (+ {service.price} vnđ) <br/>
                                            </span>
                                ))}
                            </td>
                            <td>{item.time} giờ</td>
                            <td>{item.totalMoney} vnđ</td>
                            <td>{item.statusBill?.name}</td>
                            <td>
                                <button className="btn btn-primary" id={"btn-2"} onClick={() => cancelBill(item.id)}>
                                    Huỷ Đơn
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}