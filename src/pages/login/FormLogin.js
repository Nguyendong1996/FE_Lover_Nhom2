import React, {useContext, useState} from "react";
import {useNavigate} from "react-router";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {LoadingButton} from "./LoadingButton";
import "../../css/FormLogin.css"
import {Link} from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function FormLogin() {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    function login(account) {
        setLoading(true)
        axios.post("http://localhost:8080/api/login", account).then((res) => {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("idAccount", res.data.id)
            localStorage.setItem("role", res.data.roles[0].authority)
            setLoading(false)
            if (res.data.roles[0].authority === "ROLE_ADMIN") {
                navigate("/home-admin/" + res.data.id)
            } else {
                navigate("/")
            }
        }).catch(() => {
            // trường hợp kết nối được đến máy chủ nhưng tài khoản hoặc mật khẩu không đúng:
            toast.error("Tài khoản hoặc mật khẩu không đúng")
            setLoading(false)
        })
    }

    function sendCode() {
        let email = document.getElementById("email-form-forgot-password").value;
        if (email === "") {
            return alert("Bạn chưa nhập email!")
        }
        setLoading(true)
        axios.post("http://localhost:8080/api/sendCodeToEmail2/" + email).then((res) => {
            alert(res.data);
            setLoading(true)
        }).catch(() => {
            alert("Địa chỉ email không đúng!")
            setLoading(true)
        })
    }


    let message;
    return (
        <>
            <div className="notifications-wrapper" ></div>
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
                                height: '480px'
                            }}>
                                <img alt="logo playerduo" src="../resources/raw/logo.png" style={{ display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "10px", maxWidth: "80px" }} />
                                <Formik
                                    initialValues={{}}
                                    onSubmit={(account) => {
                                        login(account)
                                    }}
                                >
                                    <Form>
                                        <div className="fieldGroup">
                                            <Field type="text" name="username"
                                                   placeholder="Tên đăng nhập hoặc email"
                                                   maxLength={18} autoComplete="false"/>
                                            <ErrorMessage name={'username'}/>
                                            {
                                                message && <p style={{textAlign: 'center'}}>{message}</p>
                                            }
                                        </div>
                                        <div className="fieldGroup">
                                            <Field type="password" name="password" placeholder="Mật khẩu"
                                                   maxLength={50} autoComplete="false"/>
                                            <ErrorMessage name={'password'}/>
                                        </div>
                                        <p className="forgot-password">
                                            <Link to={"/newPassword"}>Quên mật khẩu</Link>
                                        </p>
                                        <div id={"div-form-login-1"}>
                                            {!loading && <button type="submit"
                                                                 id={"button-login-1"}  style={{width: "100%", borderRadius:'10px', height:'45px'}}>
                                                Đăng nhập
                                            </button>}
                                            {loading && <LoadingButton/>}
                                        </div>
                                    </Form>
                                </Formik>
                                <button className="btn btn-default">
                                    <i className="fab fa-facebook"></i>
                                    <span>Đăng nhập bằng Facebook</span>
                                </button>
                                <a className="create-new">
                                    <Link to={"/register"}>Đăng kí tài khoản</Link>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="fb-root" style={{position: 'absolute', top: '-10000px', width: '0px', height: '0px'}}
                 className="fb_reset">
            </div>
            <ToastContainer/>
        </>
    )

}