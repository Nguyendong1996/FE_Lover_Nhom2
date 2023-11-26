import React, {useState} from "react";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {LoadingButton} from "./LoadingButton";
import "../../css/FormLogin.css"
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
export function FormRegister() {
    const [account] = useState({
        nickname: "",
        username: "",
        password: "",
        email: "",
        password2: "",
    })
    const navigate = useNavigate();
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const validationSchema = Yup.object().shape({
        nickname: Yup.string().required("Vui lòng nhập tên hiển thị trong ứng dụng!").matches(/^[a-zA-Z0-9]{1,10}$/, "Tên hiển thị chỉ chứa tối đa 10 kí tự gồm chữ cái và chữ số, không chứa kí tự đặc biệt!"),
        email: Yup.string().email('Email không đúng định dạng!').required('Vui lòng nhập email!'),
        password: Yup.string().required('Vui lòng nhập mật khẩu!').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, "Mật khẩu phải chứa tối thiểu 8 kí tự, ít nhất 1 chữ cái viết thường, ít nhất một chữ cái viết hoa, ít nhất một chữ số!"),
        password2: Yup.string().required("Vui lòng nhập lại mật khẩu").oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
        username: Yup.string().required("Vui lòng nhập tên đăng nhập!").matches(/^[a-zA-Z0-9]{1,10}$/, "Tên đăng nhập chỉ chứa tối đa 10 kí tự gồm chữ cái và chữ số, không chứa kí tự đặc biệt!"),
    });

    function sendCodeToEmail() {
        let email = document.getElementById("email-form-register").value;
        if (email === "") {
            return toast.error("Bạn chưa nhập email!")
        }
        setLoading1(true)
        axios.post("http://localhost:8080/api/sendCodeToEmail/" + email).then((res) => {
            alert(res.data);
            setLoading1(false)
        })
    }

    function registerNewAccount(account) {
        let code = document.getElementById("code-email-verification").value;
        if (code === "") {
            return toast.error("Hãy điền mã xác nhận")
        }
        setLoading2(true)
        console.log(code, account)
        const account2 = {
            username: account.username,
            email: account.email,
            password: account.password,
            nickname: account.nickname
        }
        try {
            axios.post("http://localhost:8080/api/createNewAccount/" + code, account2).then((res) => {
                setLoading2(false)
                if (res.data === 1) {
                    return toast.error("Nickname đã tồn tại!")
                }
                if (res.data === 2) {
                    return  toast.error("Username đã tồn tại!")
                }
                if (res.data === 3) {
                    return  toast.error("Email đã tồn tại!")
                }
                if (res.data === 4) {
                    toast.success("Tạo tài khoản thành công!")
                    navigate("/login")
                }
                if (res.data === 5) {
                    return  toast.error("Mã xác nhận không khớp!")
                }
            })
        } catch (error) {
            toast.error("Không thể kết nối đến máy chủ!")
        }
    }



    return (
        <>

            <div className="notifications-wrapper"></div>
            <div className="main-singin-box">
                <div className="wrapper" style={{backgroundColor: "#eee9e9"}}>
                    <div className="container">


                        <div className="row login-page">
                            <div className="col-md-7 hidden-sm hidden-xs image-login">
                                <img style={{height: '100%'}}
                                     src="../resources/raw/banner_login.png" className=""
                                     alt="PD"/>
                            </div>
                            <div className="content-main" style={{
                                width: '530px',
                                border: '1px',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                padding: '20px',
                                boxShadow: '5px 5px 7px 0',
                                height: '560px'
                            }}>
                                {/*<img alt="logo playerduo" src="../resources/raw/logo.png" style={{ display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "10px", maxWidth: "80px" }} />*/}
                                <Formik
                                    initialValues={account}
                                    onSubmit={(account) => {
                                        registerNewAccount(account)
                                    }}
                                    validationSchema={validationSchema}
                                >
                                    <Form>
                                        <Field type="text" className={"form-control"}
                                               placeholder={"Tên đăng nhập"} style={{textAlign: "center", marginTop: 10}}
                                               name={"username"}/>
                                        <ErrorMessage name="username"/>
                                        <Field type="text" className={"form-control"}
                                               placeholder={"Tên hiển thị trong ứng dụng"}
                                               style={{textAlign: "center", marginTop: 10}}
                                               name={"nickname"}/>
                                        <ErrorMessage name="nickname"/>
                                        <Field type="password" className={"form-control"}
                                               placeholder={"Mật khẩu"} style={{textAlign: "center", marginTop: 10}}
                                               name={"password"}/>
                                        <ErrorMessage name="password"/>
                                        <Field type="password" className={"form-control"}
                                               placeholder={"Nhập lại mật khẩu"} style={{textAlign: "center", marginTop: 10}}
                                               name={"password2"}/>
                                        <ErrorMessage name="password2"/>
                                        <Field type="text" className={"form-control"} id={"email-form-register"}
                                               placeholder={"Email"} style={{textAlign: "center", marginTop: 10}} name={"email"}/>
                                        <ErrorMessage name="email"/>
                                        <div style={{
                                            display: "flex",
                                            marginTop: 10,
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <input type="text" placeholder={"Nhập mã xác nhận email"}
                                                   className={"form-control"} id={"code-email-verification"}
                                                   style={{width: 500, marginRight:10}}/>
                                            <Button1 loading1={!loading1}/>
                                        </div>
                                        <div style={{display: "flex", marginTop: 10, justifyContent: "center"}}>
                                            <Button2 loading2={!loading2}/>
                                        </div>
                                    </Form>
                                </Formik>
                               <div style={{marginTop: '15px'}}>
                                   <div>
                                       <a  className="col-md-9 hidden-sm hidden-xs image-login" >
                                           <Link to={"/login"}>Đăng nhập</Link>
                                       </a>
                                   </div>
                                   <div>
                                       <span> <Link to={"/NewPassword"}>Quên mật khẩu</Link></span>
                                   </div>
                               </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div id="fb-root" style={{position: 'absolute', top: '-10000px', width: '0px', height: '0px'}}
                 className="fb_reset">
            </div>
        </>
    )

    function Button1({loading1}) {
        if (loading1) {
            return (
                <button type="button"
                        id={"button-send-code-form-register"}
                        onClick={sendCodeToEmail} style={{marginBottom: "28px", height: '41px'}}>Lấy mã
                </button>
            )
        }
        return (
            <LoadingButton/>
        )
    }

    function Button2({loading2}) {
        if (loading2) {
            return (
                <button type="submit"
                        id={"button-submit-form-register"}
                        style={{marginTop: 10}}>Đăng ký tài khoản
                </button>
            )
        }
        return (
            <LoadingButton/>
        )
    }
}