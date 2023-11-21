import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {
    acceptBillByIdAccountLover1, doneBillByLover1, listBillProfileLover, listHistoryBillProfileLover,
    rejectBillByIdAccountLover
} from "../../services/BillService";
import "../../css/HistoryProfileLover.css"

export function HistoryBillProfileLover() {
    const token = localStorage.getItem("token")
    let id = localStorage.getItem("idAccount")
    const [bills, setBills] = useState([]);
    const {handleChangeCheck} = useContext(AppContext);
    const {check} = useContext(AppContext);
    //state:
    useEffect(() => {
        listHistoryBillProfileLover(id, token)
            .then((res) => {
                setBills(res)
                console.log(res)
            })
    }, [id, check])

    return (
        <><div style={{marginTop:'-55%',marginLeft:'25%'}}>
            <p style={{marginTop: 100, textAlign: "center", fontWeight: "bold", fontSize: 20}}></p>
            {bills.length === 0 && <p>Bạn chưa có đơn thuê nào!</p>}
            <table className={"table table-striped"}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Người đặt</th>
                    <th>Thời gian đặt</th>
                    <th style={{textAlign:'center'}}>Đặt lúc</th>
                    <th style={{width:350,textAlign:'center'}}>Danh sách dịch vụ Vip được yêu cầu</th>
                    <th>Tổng tiền</th>
                    <th style={{width:200,textAlign:"center"}}>Trạng thái</th>
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
                                <td style={{textAlign:'center'}}>{item.vipServices?.map((item2) => {
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