import React, {useEffect, useState} from "react";
import {} from "../../services/HomeService"
import axios from "axios";
import Modal from "react-modal";
import {Field, Form, Formik} from "formik";
import {findByIdAccount} from "../../services/inforUserService";
import "../../css/InformationAccount.css"

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

export function InformationAccount() {
    const id = localStorage.getItem("idAccount")
    const [account, setAccount] = useState({})
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const [infoUser, setInfoUser] = useState({})
    // tìm profileUser theo idAccount
    useEffect(() => {
        findByIdAccount(id, token)
            .then((res) => {
                console.log(res)
                setInfoUser(res)
            })
    }, [id])
    useEffect(() => {
        axios.get("http://localhost:8080/api/findById/" + id,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then((res) => {
            setAccount(res.data)
            console.log(account)
        })
    }, [id])

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

    //đăng kí tài khoản
    const [newProfileLover, setNewProfileLover] = useState({})

    function registerToLover(newProfileLover) {
        console.log(newProfileLover)
    }

    return (
        <>
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <div className="">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12 personalinfo">
                            <h3 style={{fontSize: 25}}>CÀI ĐẶT TÀI KHOẢN</h3>
                            {role === "ROLE_USER" &&
                                <div className="label-info-user">
                                    <a href="#" style={{textDecoration: "underline"}}
                                       onClick={openModal}>
                                        Đăng kí tài khoản lover</a></div>
                            }
                            <div className="label-info-user">Nickname (tên hiển thị): {account.nickname}</div>
                            <div className="label-info-user">Username (tên đăng nhập): {account.nickname}</div>
                            <div className="label-info-user">Địa chỉ
                                email: {account.email?.replace(/^.{5}/, '*****')}</div>
                            <div className="label-info-user">Quyền hạn: {role}</div>
                            <div className="label-info-user">Trạng thái tài khoản: {infoUser.statusUser?.name}</div>
                            <div className="label-info-user">Trạng thái hoạt động: {account.statusAccount?.name}
                                {account.statusAccount?.id === 1 &&
                                    <a href="#" style={{textDecoration: "underline", marginLeft: 5}}>
                                        (Nhấn để tắt)</a>}
                                {account.statusAccount?.id === 2 &&
                                    <a href="#" style={{textDecoration: "underline", marginLeft: 5}}>
                                        (Nhấn để bật)</a>}
                            </div>
                            <div className="label-info-user"><a href="#" style={{textDecoration: "underline"}}>Đổi mật
                                khẩu</a></div>
                            <div className="label-info-user"><a href="#"
                                                                style={{textDecoration: "underline", color: "black"}}>Vô
                                hiệu hoá tài khoản!</a></div>
                        </div>
                    </div>
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
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{display: "none"}}>Chi tiết đơn thuê</h2>
                <div>
                    <span><h3 style={{textAlign:"center", color:"#f0564a"}}>ĐIỀN ĐẦY ĐỦ THÔNG TIN ĐỂ ĐĂNG KÝ</h3></span>
                    <Formik
                        initialValues={{}}
                        onSubmit={(newProfileLover) => {
                            registerToLover(newProfileLover)
                        }}
                    >
                        <Form>
                            <div>
                                <div id={"modal-content-form-register-to-lover"}>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>Giới tính:</td>
                                            <td>
                                                <Field name={"gender.id"} as={'select'} className={'form-control'}
                                                       style={{height: 35, marginBottom:5}}>
                                                    <option value={1}>Nam</option>
                                                    <option value={2}>Nữ</option>
                                                </Field>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Quốc gia:</td>
                                            <td>
                                                <Field name={"gender.id"} as={'select'} className={'form-control'}
                                                       style={{height: 35, marginBottom:5}}>
                                                    <option value={1}>Nam</option>
                                                    <option value={2}>Nữ</option>
                                                </Field>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Thành phố:</td>
                                            <td>
                                                <Field name={"gender.id"} as={'select'} className={'form-control'}
                                                       style={{height: 35, marginBottom:5}}>
                                                    <option value={1}>Nam</option>
                                                    <option value={2}>Nữ</option>
                                                </Field>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Chiều cao:(cm)</td>
                                            <td>
                                                <Field name={"dateOfBirth"} type="number" className={"form-control"}
                                                       style={{height: 35, marginBottom:5}}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Cân nặng:(kg)</td>
                                            <td>
                                                <Field name={"dateOfBirth"} type="number" className={"form-control"}
                                                       style={{height: 35, marginBottom:5}}/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table style={{marginLeft:30, width:300}}>
                                        <tbody>
                                        <tr>
                                            <td>Sở thích:</td>
                                            <td>
                                                <Field name={"gender.id"} as="textarea" className={'form-control'}
                                                       style={{height: 35, marginBottom:5}} rows="3"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Mô tả:</td>
                                            <td>
                                                <Field name={"gender.id"} as="textarea" className={'form-control'}
                                                       style={{marginBottom:5}} rows="5"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Yêu cầu:</td>
                                            <td>
                                                <Field name={"dateOfBirth"} type="text" className={"form-control"}
                                                       style={{height: 35, marginBottom:5}}/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div style={{textAlign: "center", marginTop:10}}>
                                <button className={"btn btn-primary"} id={"btn-submit-info-1"}>Đăng ký</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </Modal>
            {/*end modal*/}
        </>
    )
}