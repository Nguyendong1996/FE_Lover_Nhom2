import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {
    acceptBillByIdAccountLover, doneBillByLover, doneBillByLover1,
    findAllByAccountLoverId,
    rejectBillByIdAccountLover
} from "../../services/BillService";

export function ListBillOfProfileLover() {
    const token = localStorage.getItem("token")
    let id = localStorage.getItem("idAccount")
    const [bills, setBills] = useState([]);
    const {handleChangeCheck} = useContext(AppContext);
    const {check} = useContext(AppContext);
    //state:
    useEffect(() => {
        findAllByAccountLoverId(id, token)
            .then((res) => {
                setBills(res)
                console.log(res)
            })
    }, [id, check])

    //function:
    function rejectBill(bill) {
        if (window.confirm("Bạn có chắc chắn từ chối đơn này không?")) {
            console.log(bill)
            rejectBillByIdAccountLover(bill.id, token)
                .then(() => {
                    handleChangeCheck(check)
                })
        }
    }

    function acceptBill(bill) {
        acceptBillByIdAccountLover(bill.id, id, token)
            .then(() => {
                handleChangeCheck(check)
            })
    }

    function doneBill(bill) {
        // eslint-disable-next-line no-restricted-globals
       if( confirm("bạn chắc chắn đơn này đã hoàn thành")){

        doneBillByLover1(bill.id, token)
            .then(() => {
                handleChangeCheck(check)
            })
       }
    }

    return (
        <><div style={{marginTop:'-55%',marginLeft:'16%'}}>
            <p style={{marginTop: 100, textAlign: "center", fontWeight: "bold", fontSize: 20}}></p>
            {bills.length === 0 && <p>Bạn chưa có đơn thuê nào!</p>}
            <table className={"table table-striped"}>
                <thead>
                <tr>
                    <th>#</th>
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
                                {item.statusBill?.id === 3 && <><td></td><td></td></>}
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