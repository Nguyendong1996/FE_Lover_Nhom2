import React, {useContext, useEffect, useState} from "react";
import {findAllByAccountUserId} from "../../services/BillService"
import {AppContext} from "../../context/AppContext";
import "../../css/InfoUser.css"

export function HistoryPay() {
    const [bills, setBills] = useState([])
    const idAccount = localStorage.getItem("idAccount")
    const token = localStorage.getItem("token")
    const {check, setCheck} = useContext(AppContext);
    useEffect(() => {
        findAllByAccountUserId(idAccount, token).then((res) => {
            setBills(res);
            console.log(res)
        })
    }, [idAccount, check])
    return (
        <>
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <div className="aside">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12 personalinfo" style={{width: 925}}>
                            <div id={"div-container-info-user"}>

                                <table className={"table table-striped"}>
                                    <thead>
                                    <tr>
                                        <td>#</td>
                                        <td>Tên lover</td>
                                        <td style={{width:140}}>Thời gian tạo bill</td>
                                        <td style={{width:310}}>Dịch vụ vip chọn thêm</td>
                                        <td style={{width:100}}>Thời gian thuê</td>
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
                                                    <button className={"btn btn-primary"} id={"btn-2"}>Xoá</button>
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