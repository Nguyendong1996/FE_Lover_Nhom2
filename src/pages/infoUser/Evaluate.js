import React, {useContext, useEffect, useState} from "react";
import {
    findAllByAccountUserId, listBillProfileUserByEvaluate,
    listHistoryBillProfileLover,
    listHistoryBillProfileUser
} from "../../services/BillService"
import {AppContext} from "../../context/AppContext";
import "../../css/InfoUser.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {FormComment} from "../../comment/FormComment";
export function Evaluate() {
    const [bills, setBills] = useState([])
    const [bill, setBill] = useState({})
    const idAccount = localStorage.getItem("idAccount")
    const token = localStorage.getItem("token")
    const {check, setCheck} = useContext(AppContext);
    const {showComment, setShowComment} = useContext(AppContext);
    useEffect(() => {
        listBillProfileUserByEvaluate(idAccount, token).then((res) => {
            setBills(res);
            console.log(res)
        })
    }, [idAccount, check,showComment]);
    function checkComment(values) {
        setShowComment(true);
        setBill(values);
    }
    function deleteBill() {
        confirmAlert({
            customUI: ({ onClose }) => {
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
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12" style={{marginTop:0}}>
                <div className="aside" style={{marginTop:0}}>
                    <div className="row" style={{marginTop:0}}>
                        <div className="col-md-6 col-sm-12 col-xs-12" style={{width: "auto", marginTop:0}}>
                            <div id={""} >
                                {showComment && <FormComment bill={bill}/>}
                                <div>
                                    <table className={"table table-striped"} style={{width:990}}>
                                        <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>Tên lover</td>
                                            <td style={{width:140}}>Thời gian tạo bill</td>
                                            <td style={{width:310}}>Dịch vụ vip</td>
                                            <td style={{width:130}}>Thời gian thuê</td>
                                            <td>Tổng tiền</td>
                                            <td>Đánh Giá</td>
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
                                                    {item.assessment ? (
                                                        <td>
                                                            <button className="btn btn-primary" id="btn-2" onClick={()=> checkComment(item)}>
                                                               sửa Đánh Giá
                                                            </button>
                                                        </td>
                                                    ) : (
                                                        <td>
                                                            <button className="btn btn-primary" id="btn-2" onClick={()=>checkComment(item)}>
                                                                Đánh Giá
                                                            </button>
                                                        </td>
                                                    )}
                                                    <td>
                                                        <button className={"btn btn-primary"} id={"btn-2"} onClick={deleteBill}>Xoá</button>
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
            </div>
        </>
    )
}