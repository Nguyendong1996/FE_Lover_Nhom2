import React, {useEffect, useState} from "react";
import {findByIdAccount, updateAvatarUser, updateInfoUser} from "../../services/inforUserService";
import {deleteById, findAllByAccountUserId} from "../../services/BillService";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";
import {storage} from "../../firebase/Firebase"
import Modal from "react-modal";
import {Field, Form, Formik} from "formik";
import "../../css/InformationUser.css"

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

export function InformationUser() {
    const [infoUser, setInfoUser] = useState({})
    const id = localStorage.getItem("idAccount")
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(false)
    const [bills, setBills] = useState([])
    const [checkDeleted, setCheckDeleted] = useState(false);
    // tìm profileUser theo idAccount
    useEffect(() => {
        findByIdAccount(id, token)
            .then((res) => {
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


    return (
        <>
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <div className="aside">
                    <div className="row flowaccount">
                        <div className="col-sm-4 col-xs-12">
                            <div className="border"><p>TỔNG TIỀN ĐÃ NẠP</p><span>0đ </span></div>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                            <div className="border"><p>TỔNG TIỀN ĐÃ DONATE</p><span>0đ </span></div>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                            <div className="border"><p>SỐ GIỜ ĐÃ THUÊ</p><span>0 Giờ</span></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12 personalinfo" style={{width: 700}}>
                            <h3>THÔNG TIN CÁ NHÂN</h3>

                            <div id={"div-container-info-user"}>
                                <div className="cropimg-avatar div-info-user-1">
                                    <img src={infoUser.avatarImage} alt=""
                                         style={{width: 250, height: 250, borderRadius: 10}}/>
                                    <i onClick={showModalChoseImage}
                                       className="fas fa-edit info-user-icon"></i>
                                    <input type="file" id={"input-avatar-profile-user"}
                                           onChange={(event) => {
                                               updateAvt(event.target.files[0])
                                           }} style={{display: "none"}}/>
                                </div>
                                <div className={"div-info-user-2"}>
                                    <div className="label-info-user">
                                        Cập nhật lần cuối: {infoUser.updateAt?.slice(0,10)}
                                        <i className="fas fa-cog icon-setting-info" onClick={openModal} style={{marginLeft:3}}></i>
                                    </div>
                                    <div className="label-info-user">Họ: {infoUser.lastName}</div>
                                    <div className="label-info-user">Tên: {infoUser.firstName}</div>
                                    <div className="label-info-user">Số căn cước công
                                        dân: {infoUser.citizenNumber}</div>
                                    <div className="label-info-user">Ngày tham gia: {infoUser.createAt?.slice(0,10)}</div>
                                    <div className="label-info-user">Số điện thoại: {infoUser.phoneNumber}</div>
                                </div>
                            </div>
                            {/*start modal*/}
                            <Modal
                                isOpen={modalIsOpen}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <h3 style={{textAlign: "center", color: "#f0564a"}}>CẬP NHẬT THÔNG
                                    TIN CÁ NHÂN</h3>
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
                                            {/*<div style={{textAlign: "center"}}>*/}
                                            {/*    <button className={"info-user-btn"}>Lưu</button>*/}
                                            {/*</div>*/}


                                            <div style={{textAlign: "center", marginTop: 10}}>
                                                <button className="btn btn-secondary"
                                                        id={"button-update-info-profile-user"}
                                                        type={"submit"}>Cập nhật
                                                </button>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>

                            </Modal>
                            {/*end modal*/}

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}