import React, {useContext, useState} from "react";
import {useNavigate} from "react-router";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {LoadingButton} from "./LoadingButton";
import "../../css/FormLogin.css"
import {AppContext} from "../../context/AppContext";
import {Link} from "react-router-dom";
export function FormLogin() {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const {handleChangeLogin} = useContext(AppContext);
    const {isLogin} = useContext(AppContext);

    function login(account) {
        setLoading(true)
        axios.post("http://localhost:8080/api/login", account).then((res) => {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("idAccount", res.data.id)
            localStorage.setItem("role", res.data.roles[0].authority)
            handleChangeLogin(isLogin)
            setLoading(false)
            if (res.data.roles[0].authority === "ROLE_ADMIN") {
                navigate("/layout-admin/home/" + res.data.id)
            } else {
                navigate("/")
            }
        }).catch(() => {
            // trường hợp kết nối được đến máy chủ nhưng tài khoản hoặc mật khẩu không đúng:
            alert("Lỗi kết nối đến máy chủ!")
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


    return (
        <>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div></div>
                <div style={{marginTop: 150, width: 600}}>
                    <h3 style={{textAlign: "center"}}>NHẬP THÔNG TIN</h3>
                    <div id={"container-form"}>
                        <div id={"content-form-login"}>
                            <div className="modal-body login">
                                <Formik
                                    initialValues={{}}
                                    onSubmit={(account) => {
                                        login(account)
                                    }}
                                >
                                    <Form>
                                        <Field type="text" className={"form-control"} id={"email-form-login"}
                                               placeholder={"Tên đăng nhập"}
                                               name={"username"}
                                               style={{textAlign: "center"}}/>
                                        <Field type="text" className={"form-control"} id={"email-form-login"}
                                               placeholder={"Mật khẩu"} name={"password"}
                                               style={{textAlign: "center", marginTop: 10}}/>
                                        <div id={"div-form-login-1"}>
                                            {!loading && <button type="submit"
                                                                 id={"button-login-1"} >
                                                Đăng nhập
                                            </button>}
                                            {loading && <LoadingButton/>}
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                            <div style={{textAlign:"center"}}>
                                <br/>
                                <div>
                                    <Link to={"/register"}>Đăng kí tài khoản</Link>
                                </div>
                                <div style={{marginTop:10}}>
                                    <Link to={"/"}>Quên mật khẩu</Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>

        </>
    )

}