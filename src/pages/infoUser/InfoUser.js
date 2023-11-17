import "../../css/InfoUser.css"
import {useEffect, useState} from "react";
import {findByIdAccount, updateAvatarUser} from "../../services/inforUserService"
import {useParams} from "react-router";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";
import {storage} from "../../firebase/Firebase"

export function InfoUser() {
    const [infoUser, setInfoUser] = useState({})
    const {id} = useParams();
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        findByIdAccount(id, token)
            .then((res) => {
                console.log(res)
                setInfoUser(res)
            })
    }, [id])

    // đổi ảnh đại diện:
    function updateAvt(file) {
        setLoading(true)
        console.log(file)
        // const storageRef = ref(storage, `images/${file.name + v4()}`);
        // const uploadTask = uploadBytes(storageRef, file);
        // uploadTask.then((snapshot) => {
        //     getDownloadURL(snapshot.ref).then((url) => {
        //         infoUser.avatarImage = url;
        //         updateAvatarUser(url, id, token)
        //             .then(() => {
        //                 alert("Cập nhật ảnh đại diện thành công!");
        //                 setLoading(false);
        //             })
        //     })
        // })
    }

    function showModalChoseImage() {
        const fileInput = document.getElementById('input-avatar-profile-user');
        fileInput.click();
    }
    function changeHistory() {
        document.getElementById("info-user").style.display="none";
    }
    function changeInfo() {
        document.getElementById("info-user").style.display="block";
    }
    return (
        <>
            <link rel="stylesheet" href="../resources/css-user-information.css"/>
            <div id={"root"} style={{marginTop: 100}}>
                <div className="wrapper">
                    <div className="setting__main row" >
                        <div className="setting__main--menu col-lg-3 col-md-3 col-sm-12 col-xs-12" style={{height:1000}}>
                            <div className="menu">
                                <div className="menu__setting  panel-group">
                                    <div className="menu__setting--main panel panel-default" style={{border: "none"}}>
                                        <div className="panel-collapse collapse in">
                                            <div className="panel-body">
                                                <div className="panel-group">
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className=" active panel-title"
                                                                 style={{textAlign: "left"}}>
                                                                <a href="#" onClick={changeInfo}><i className="fas fa-user-tie"></i> Thông tin cá nhân</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="title-sub  panel-title"
                                                                 style={{textAlign: "left"}}>
                                                                <a href="#" onClick={changeHistory}><i className="fas fa-history"></i> Lịch sử
                                                                    giao dịch</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="  panel-title" style={{textAlign: "left"}}>
                                                                <a href="#"><i className="fas fa-wallet"></i> Ví</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-drawer-setting visible-xs"><i className="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12" id={"info-user"}>
                            <div className="aside">
                                <div className="row flowaccount">
                                    <div className="col-sm-4 col-xs-12">
                                        <div className="border"><p className={"word-1"}>TỔNG TIỀN ĐÃ NẠP</p>
                                            <span>0đ </span></div>
                                    </div>
                                    <div className="col-sm-4 col-xs-12">
                                        <div className="border"><p className={"word-1"}>TỔNG TIỀN ĐÃ DONATE</p>
                                            <span>0đ </span></div>
                                    </div>
                                    <div className="col-sm-4 col-xs-12">
                                        <div className="border"><p className={"word-1"}>SỐ GIỜ ĐÃ THUÊ</p>
                                            <span>0 Giờ</span></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 col-xs-12 personalinfo">
                                        <div className="d-flex img-avatar">
                                            <div className="cropimg-avatar div-info-user-1">
                                                <img src={infoUser.avatarImage} alt=""
                                                     style={{width: 200, height: 200, borderRadius: 10}}/>
                                                <i onClick={showModalChoseImage}
                                                   className="fas fa-cog info-user-icon"></i>
                                                <input type="file" id={"input-avatar-profile-user"}
                                                       onChange={(event) => {
                                                           updateAvt(event.target.files[0])
                                                       }} style={{display: "none"}}/>
                                            </div>
                                        </div>
                                        <br/>

                                    </div>
                                    <div>
                                        <div className="fieldGroup div-info-user-2" style={{marginTop:30}}>
                                            <p>THÔNG TIN CHI TIẾT (Sửa lần cuối: {infoUser.updateAt})</p>
                                            <div className="control-label label-info-user">Họ: {infoUser.lastName}</div>
                                            <div className="control-label label-info-user">Tên: {infoUser.firstName}</div>
                                            <div className="control-label label-info-user">Nickname: {infoUser.account?.nickname}</div>
                                            <div className="control-label label-info-user">Địa chỉ email: {infoUser.account?.email}</div>
                                            <div className="control-label label-info-user">Số căn cước công dân: {infoUser.citizenNumber}</div>
                                            <div className="control-label label-info-user">Ngày tạo tài khoản: {infoUser.createAt}</div>
                                            <div className="control-label label-info-user">Số điện thoại: {infoUser.phoneNumber}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/>
                        </div>
                        <div id={"history-pay"} style={{marginLeft:300, textAlign:"center"}}>
                            <p>LỊCH SỬ GIAO DỊCH</p>
                            <p>LỊCH SỬ GIAO DỊCH</p>
                            <p>LỊCH SỬ GIAO DỊCH</p>
                            <p>LỊCH SỬ GIAO DỊCH</p>
                            <p>LỊCH SỬ GIAO DỊCH</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}