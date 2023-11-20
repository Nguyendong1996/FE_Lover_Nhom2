import React, {useEffect, useState} from "react";
import {findAllLoverByIdRoles} from "../../services/ProfileLoverService";

export const ListProfileLover =() =>{
    const [profileLovers,setProfileLovers] = useState([]);
    useEffect(() =>{
findAllLoverByIdRoles(2).then((res) =>{
    setProfileLovers(res)
    console.log(res)
}).catch(() =>{
    return []
})
    },[])
    return(
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
                                        <td style={{width:140}}>Tên lover</td>
                                        <td style={{width:340}}>Ngày đăng ký</td>
                                        <td style={{width:430}}>Trạng thái</td>
                                        <td style={{width:330,textAlign:"center"}}>Số lượt thuê</td>
                                        <td style={{width:330}}>Thời gian được thuê</td>
                                        <td style={{width:430}}>Số tiền kiếm được</td>
                                        <td colSpan={2} style={{width:10,textAlign:'center'}}>Thay đổi trạng thái</td>
                                        <td></td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {profileLovers.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}.</td>
                                                <td>{item.account?.nickname}</td>
                                                <td>{item.createdAt}</td>
                                                <td>{item.statusLover.name}</td>
                                                <td>{item.totalViews}</td>
                                                <td>{item.totalHourRented}</td>
                                                <td>{item.totalMoneyRented}</td>
                                                <td style={{width:10}}>
                                                    <button className={"btn btn-primary"} id={"btn-2"}>Cảnh Báo</button>
                                                </td>
                                                <td>
                                                    <button className={"btn btn-primary"} id={"btn-2"}>Ngưng CCDV</button>
                                                </td>
                                                <td>
                                                    <button className={"btn btn-primary"} id={"btn-2"}>Khoá vĩnh viễn</button>
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