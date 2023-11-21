import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {
    acceptBillByIdAccountLover, acceptBillByIdAccountLover1, doneBillByLover, doneBillByLover1,
    findAllByAccountLoverId, listBillProfileLover,
    rejectBillByIdAccountLover
} from "../../services/BillService";
import "./HomeLover.css"
import {confirmAlert} from "react-confirm-alert";
import {deleteNotificationById} from "../../services/inforUserService";
import {toast} from "react-toastify";
export function ListBillOfProfileLover() {
    const token = localStorage.getItem("token")
    let id = localStorage.getItem("idAccount")
    const [bills, setBills] = useState([]);
    const {handleChangeCheck} = useContext(AppContext);
    const {check} = useContext(AppContext);
    //state:
    useEffect(() => {
        listBillProfileLover(id, token)
            .then((res) => {
                setBills(res)
                console.log(res)
            })
    }, [id, check])

    //function:
    function rejectBill(bill) {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="custom-confirm-alert-overlay">
                        <div className="custom-confirm-alert">
                            <span></span>
                            <h3 className="custom-confirm-alert-title">XÁC NHẬN</h3>
                            <p className="custom-confirm-alert-message">Bạn có chắc chắn từ chối đơn này không?</p>
                            <div className="custom-confirm-alert-buttons">
                                <button className="custom-confirm-alert-button" onClick={() => {
                                    rejectBillByIdAccountLover(bill.id, token)
                                        .then((res) => {
                                            if (res === 1) {
                                                toast.error("Đơn đã được người đặt huỷ trước đó!")
                                            }
                                            if (res === 2) {
                                                toast.success("Bạn đã từ chối đơn thành cônǵ!")
                                            }
                                            handleChangeCheck(check)
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

    function acceptBill(bill) {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="custom-confirm-alert-overlay">
                        <div className="custom-confirm-alert">
                            <span></span>
                            <h3 className="custom-confirm-alert-title">XÁC NHẬN</h3>
                            <p className="custom-confirm-alert-message">Bạn có chắc chắn xác nhận đơn này không?</p>
                            <div className="custom-confirm-alert-buttons">
                                <button className="custom-confirm-alert-button" onClick={() => {
                                    acceptBillByIdAccountLover1(bill.id, token)
                                            .then((res) => {
                                                console.log(res)
                                                handleChangeCheck(check)
                                                if (res === 1) {
                                                    return toast.error("Bạn đang có 1 đơn chưa hoàn thành!")
                                                }
                                                if (res === 2) {
                                                    return toast.error("Đơn này đã được người thuê huỷ trước đó!")
                                                }
                                                toast.success(res)
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

    function doneBill(bill) {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="custom-confirm-alert-overlay">
                        <div className="custom-confirm-alert">
                            <span></span>
                            <h3 className="custom-confirm-alert-title">XÁC NHẬN</h3>
                            <p className="custom-confirm-alert-message">Bạn có chắc chắn đơn này đã hoàn thành không?</p>
                            <div className="custom-confirm-alert-buttons">
                                <button className="custom-confirm-alert-button" onClick={() => {
                                    doneBillByLover1(bill.id, id, token)
                                        .then(() => {
                                            toast.success("Chúc mừng bạn đã hoàn thành đơn của mình!")
                                            handleChangeCheck(check)
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
            <div style={{marginLeft:15, width:1050}}>
                <table className={"table table-striped"}>
                    <thead>
                    <tr>
                        <th style={{}}>#</th>
                        <th>Người đặt</th>
                        <th>Thời gian đặt</th>
                        <th>Đặt lúc</th>
                        <th>Danh sách dịch vụ Vip được yêu cầu</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {bills.map((item, index) => {
                        return (
                            <>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.accountUser?.nickname}</td>
                                    <td>{item.time} giờ</td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.vipServices?.map((item2) => {
                                        return (
                                            <>
                                                {item2.name} ({item2.price} vnđ/giờ)
                                                <br/>
                                            </>
                                        )
                                    })
                                    }</td>
                                    <td>{item.totalMoney} vnđ</td>
                                    <td>{item.statusBill?.name}</td>
                                    {item.statusBill?.id === 3 && <>
                                        <td></td>
                                        <td></td>
                                    </>}
                                    {item.statusBill?.id === 1 &&
                                        <td>
                                            <button className={'btn btn-primary'}
                                                    onClick={() => {
                                                        acceptBill(item)
                                                    }}>Xác nhận
                                            </button>
                                        </td>}
                                    {item.statusBill?.id === 2 && <></>}
                                    {item.statusBill?.id === 1 &&
                                        <td>
                                            <button className={'btn btn-danger'}
                                                    onClick={() => {
                                                        rejectBill(item)
                                                    }}>Từ chối
                                            </button>
                                        </td>}
                                    {item.statusBill?.id === 2 &&
                                        <td colSpan={2} style={{textAlign: "center"}}>
                                            <button className={'btn btn-success'}
                                                    id={"btn-submit-2"}
                                                    onClick={() => {
                                                        doneBill(item)
                                                    }}
                                            >Hoàn thành
                                            </button>
                                        </td>
                                    }
                                </tr>
                            </>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )
}