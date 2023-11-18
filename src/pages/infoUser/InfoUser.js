import "../../css/InfoUser.css"
import React, {useEffect, useState} from "react";
import {findByIdAccount, updateAvatarUser, updateInfoUser} from "../../services/inforUserService"
import {useParams} from "react-router";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";
import {storage} from "../../firebase/Firebase"
import {RingLoader} from "react-spinners";
import Modal from "react-modal";
import {Field, Form, Formik} from "formik";
import {deleteById, findAllByAccountUserId} from "../../services/BillService"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export function InfoUser() {
    const [infoUser, setInfoUser] = useState({})
    const {id} = useParams();
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(false)
    const [bills, setBills] = useState([])
    const [checkDeleted, setCheckDeleted] = useState(false);
    // tìm profileUser theo idAccount
    useEffect(() => {
        findByIdAccount(id, token)
            .then((res) => {
                console.log(res)
                setInfoUser(res)
            })
    }, [id])
    //tìm bills theo idAccount:
    useEffect(() => {
        findAllByAccountUserId(id)
            .then((res) => {
                setBills(res)
            })
    }, [id, checkDeleted])

    //deleteBill
    function deleteBill(id) {
        if (window.confirm("Bạn có chắc chắn huỷ đơn này không?")) {
            deleteById(id, token).then(() => {
                setCheckDeleted(!checkDeleted)
            })
        }
    }

    // đổi ảnh đại diện:
    function updateAvt(file) {
        setLoading(true)
        console.log(file)
        const storageRef = ref(storage, `images/${file.name + v4()}`);
        const uploadTask = uploadBytes(storageRef, file);
        uploadTask.then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                infoUser.avatarImage = url;
                updateAvatarUser(url, id, token)
                    .then(() => {
                        alert("Cập nhật ảnh đại diện thành công!");
                        setLoading(false);
                    })
            })
        })
    }

    function showModalChoseImage() {
        const fileInput = document.getElementById('input-avatar-profile-user');
        fileInput.click();
    }

    // lựa chọn:
    function changeHistory() {
        document.getElementById("info-user").style.display = "none";
        document.getElementById("history-pay").style.display = "block";
    }

    function changeInfo() {
        document.getElementById("info-user").style.display = "block";
        document.getElementById("history-pay").style.display = "none";

    }

    // modal:
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    // cập nhật thông tin user
    function updateInfoProfileUser(infoUser) {
        updateInfoUser(infoUser, token)
            .then((res) => {
                setInfoUser(res)
                alert("Update thành công!")
                document.getElementById("")
                setIsOpen(false)
            })
            .catch(() => {
                alert("Xảy ra lỗi không thể update!")
            })
    }

    if (loading) {
        return (
            <>
                <div id={"root"}>
                    <div className={"loading-info-user"}>
                        <RingLoader color="#f0564a" loading={true} size={80}/>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div id={"root"} style={{marginTop: 100}}>
                <div className="wrapper">
                    <div className="setting__main row container-info-user">
                        <div
                            className="setting__main--menu col-lg-3 col-md-3 col-sm-12 col-xs-12container-left-info-user">
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
                                                                <a href="#" onClick={changeInfo}><i
                                                                    className="fas fa-user-tie"></i> Thông tin cá
                                                                    nhân</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="title-sub  panel-title"
                                                                 style={{textAlign: "left"}}>
                                                                <a href="#" onClick={changeHistory}><i
                                                                    className="fas fa-history"></i> Lịch sử giao
                                                                    dịch</a>
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
                            </div>
                        </div>
                        <div className={"container-right-info-user"}>
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
                                        <div className="col-md-6 col-sm-12 col-xs-12 personalinfo" style={{width: 450}}>
                                            <div className="d-flex img-avatar">
                                                <div className="cropimg-avatar div-info-user-1">
                                                    <img src={infoUser.avatarImage} alt=""
                                                         style={{width: 300, height: 300, borderRadius: 10}}/>
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
                                        <div className={"div-info-user-2"}>
                                            <div className="fieldGroup">
                                                <span className="control-label"
                                                      style={{color: "#f0564a", fontSize: 17, fontWeight: "bold"}}>
                                                    THÔNG TIN CHI TIẾT
                                                    <i className="fas fa-cog icon-setting-info" onClick={openModal}></i>
                                                </span>
                                                {/*start modal*/}
                                                <Modal
                                                    isOpen={modalIsOpen}
                                                    onAfterOpen={afterOpenModal}
                                                    onRequestClose={closeModal}
                                                    style={customStyles}
                                                    contentLabel="Example Modal"
                                                >
                                                    <h3 style={{textAlign: "center", color: "#f0564a"}}>CẬP NHẬT THÔNG
                                                        TIN USER</h3>
                                                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}
                                                        style={{display: "none"}}>Hello</h2>
                                                    <button onClick={closeModal} style={{display: "none"}}
                                                            id={"btn-close-modal-info-user"}>CLOSE
                                                    </button>
                                                    <div className="modal-body-info-user">
                                                        <Formik
                                                            initialValues={infoUser}
                                                            enableReinitialize={true}
                                                            onSubmit={(infoUser) => {
                                                                updateInfoProfileUser(infoUser)
                                                            }}
                                                        >
                                                            <Form>
                                                                <table style={{marginLeft: 50, marginRight: 70}}>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            Họ:
                                                                        </td>
                                                                        <td>
                                                                            <Field name={"lastName"}
                                                                                   className={"form-control"}
                                                                                   placeHolder={"Nhập họ của bạn"}
                                                                                   style={{
                                                                                       marginLeft: 20,
                                                                                       height: 30,
                                                                                       marginBottom: 5
                                                                                   }}></Field>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            Tên:
                                                                        </td>
                                                                        <td>
                                                                            <Field name={"firstName"}
                                                                                   className={"form-control"}
                                                                                   placeHolder={"Nhập tên của bạn"}
                                                                                   style={{
                                                                                       marginLeft: 20,
                                                                                       height: 30,
                                                                                       marginBottom: 5
                                                                                   }}></Field>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            Số điện thoại:
                                                                        </td>
                                                                        <td>
                                                                            <Field name={"phoneNumber"}
                                                                                   placeHolder={"Nhập số điện thoại của bạn"}
                                                                                   className={"form-control"} style={{
                                                                                marginLeft: 20,
                                                                                height: 30,
                                                                                marginBottom: 5
                                                                            }}></Field>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Số căn cước công dân:</td>
                                                                        <td>
                                                                            <Field name={"citizenNumber"}
                                                                                   placeHolder={"Nhập số căn cước công dân"}
                                                                                   className={"form-control"} style={{
                                                                                marginLeft: 20,
                                                                                height: 30,
                                                                                marginBottom: 5
                                                                            }}></Field>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                                <div style={{textAlign: "center"}}>
                                                                    <button className={"info-user-btn"}>Lưu</button>
                                                                </div>


                                                                {/*<div style={{textAlign: "center", marginTop: 10}}>*/}
                                                                {/*    <button className="btn btn-secondary" id={"button-update-info-profile-user"}*/}
                                                                {/*            type={"submit"}>Cập nhật*/}
                                                                {/*    </button>*/}
                                                                {/*</div>*/}
                                                            </Form>
                                                        </Formik>
                                                    </div>

                                                </Modal>
                                                {/*end modal*/}

                                                <span>(Sửa lần cuối: {infoUser.updateAt})</span>
                                                <div
                                                    className="control-label label-info-user"
                                                    style={{marginTop: 10}}>Họ: {infoUser.lastName}</div>
                                                <div
                                                    className="control-label label-info-user">Tên: {infoUser.firstName}</div>
                                                <div
                                                    className="control-label label-info-user">Nickname: {infoUser.account?.nickname}</div>
                                                <div className="control-label label-info-user">Địa chỉ
                                                    email: {infoUser.account?.email}</div>
                                                <div className="control-label label-info-user">Số căn cước công
                                                    dân: {infoUser.citizenNumber}</div>
                                                <div className="control-label label-info-user">Ngày tạo tài
                                                    khoản: {infoUser.createAt}</div>
                                                <div className="control-label label-info-user">Số điện
                                                    thoại: {infoUser.phoneNumber}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                            </div>
                            <div id={"history-pay"} style={{display: "none", marginLeft: 330}}>
                                <p style={{
                                    color: "#f0564a",
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    textAlign: "center"
                                }}>LỊCH SỬ GIAO DỊCH</p>
                                {(bills.length === 0) && <div>Bạn chưa có hoá đơn nào</div>}
                                {(bills.length !== 0) &&
                                    <table className={"table table-striped"}>
                                        <tbody>
                                        <tr>
                                            <td>#</td>
                                            <td>Tên lover</td>
                                            <td>Đặt lúc</td>
                                            <td>Thời gian thuê</td>
                                            <td>Tổng tiền</td>
                                            <td>Trạng thái</td>
                                            <td></td>
                                        </tr>
                                        {bills.map((item, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.accountLover?.nickname}</td>
                                                        <td>{item.createdAt}</td>
                                                        <td>{item.time} giờ</td>
                                                        <td>{item.totalMoney} vnđ</td>
                                                        <td>{item.statusBill?.name}</td>
                                                        <td>
                                                            {(item.statusBill.id === 1) &&
                                                                <button className={"btn btn-warning"}
                                                                        onClick={() => {
                                                                            deleteBill(item.id)
                                                                        }}>Huỷ</button>}
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                        </tbody>
                                    </table>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}