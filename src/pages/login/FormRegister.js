import React, {useState} from "react";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {LoadingButton} from "./LoadingButton";
import "../../css/FormLogin.css"
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

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
            return alert("Bạn chưa nhập email!")
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
            return alert("Hãy điền mã xác nhận")
        }
        setLoading2(true)
        try {
            axios.post("http://localhost:8080/api/createNewAccount/" + code, account).then((res) => {
                setLoading2(false)
                console.log(res.data)
                if (res.data === 1) {
                    return alert("Nickname đã tồn tại!")
                }
                if (res.data === 2) {
                    return alert("Username đã tồn tại!")
                }
                if (res.data === 3) {
                    return alert("Email đã tồn tại!")
                }
                if (res.data === 4) {
                    alert("Tạo tài khoản thành công!")
                    navigate("/login")
                }
                if (res.data === 5) {
                    return alert("Mã xác nhận không khớp!")
                }
            })
        } catch (error) {
            alert("Không thể kết nối đến máy chủ!")
        }
    }



    return (
        <>
            <link rel="shortcut icon" href="../resources/raw/favicon.ico"/>
            <link href="/resources/all.css" rel="stylesheet"/>
            <link href="/resources/css.css" rel="stylesheet"/>
            <title>PlayerDuo - Thuê người yêu</title>
            <link href="/resources/8.97b85fe3.chunk.css" rel="stylesheet"/>
            <link href="/resources/main.3e229f12.chunk.css" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/resources/9.cb7de3a7.chunk.css"/>
            <link rel="stylesheet" href="/resources/css-login.css"/>
            <link rel="stylesheet" type="text/css" href="/resources/css/style.css"/>
            <title>React App</title>
            <header className="menu__header" id="header-menu">
                <div className="navbar-header"><a href="https://playerduo.net/" className="logo"><img
                    alt="logo playerduo"
                    src="../resources/raw/logo.png"/></a>
                </div>
                <div className="navbar">
                    <ul className="nav navbar-nav navbar-left">
                        <li className="item-search">
                            <nav className="Navbar__Item">
                                <div className="Navbar__Link">
                                    <div className="Group-search visible "><span className="search input-group"><input
                                        disabled=""
                                        placeholder="Nickname/Url ..."
                                        type="text"
                                        className="form-control"
                                        value=""/><span
                                        className="input-group-addon"><button disabled="" type="button"
                                                                              className="btn btn-default"><i
                                        className="fal fa-search" aria-hidden="true"></i></button></span></span></div>
                                </div>
                            </nav>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-center">
                        <li className="item-icon"><a className="group-user " href="https://playerduo.net/"><i
                            className="fal fa-home-alt"></i></a></li>
                        <li className="item-icon"><a className="group-user " href="https://playerduo.net/stories"><i
                            className="fal fa-camera-movie"></i></a></li>
                        <li className="item-icon group-fb"><a className="group-user"><i
                            className="fal fa-trophy-alt"></i></a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="item-icon group-fb"><a className="group-user flag"><i
                            className="fal fa-globe"></i></a>
                        </li>
                        <li className="item-icon group-fb"><a className="group-user"><i
                            className="fab fa-facebook-f"></i></a>
                        </li>
                        <li className="item-icon authent"><a className="money-user" href=""><i
                            className="fal fa-power-off"></i><span>Đăng nhập</span></a>
                        </li>
                        <li className="item-icon mode"><a className="group-user"><i className="fas fa-moon"></i></a>
                        </li>
                    </ul>
                </div>
                <div className="navbar-mobile hidden">
                    <button type="button" className="btn-login btn btn-default"><span>Đăng nhập</span></button>
                    <a className="btn-bars"><i className="fal fa-bars"></i></a>
                    <div className="flex-side hidden">
                        <div className="overlay"></div>
                        <div className="content">
                            <div className="box-search">
                                <nav className="Navbar__Item">
                                    <div className="Navbar__Link">
                                        <div className="Group-search visible "><span
                                            className="search input-group"><input
                                            disabled=""
                                            placeholder="Nickname/Url ..."
                                            type="text"
                                            className="form-control"
                                            value=""/><span
                                            className="input-group-addon"><button disabled="" type="button"
                                                                                  className="btn btn-default"><i
                                            className="fal fa-search" aria-hidden="true"></i></button></span></span>
                                        </div>
                                    </div>
                                </nav>
                                <a className="btn-close"><i className="fal fa-times fa-2x"></i></a></div>
                            <ul className="list-page"><a href="https://playerduo.net/">
                                <li className="item-icon "><a className="group-user"><i className="fal fa-home-alt"></i>
                                    <span>Trang chủ</span></a></li>
                            </a><a href="https://playerduo.net/stories">
                                <li className="item-icon "><a className="group-user"><i
                                    className="fal fa-camera-movie"></i> Stories</a>
                                </li>
                            </a>
                                <li className="item-icon"><a className="group-user"><i
                                    className="fal fa-trophy-alt"></i> <span>Bảng xếp hạng</span></a>
                                </li>
                            </ul>
                            <div className="list-mode">
                                <div className="item"><p className="title"><span>Chế độ</span></p><a
                                    className="func mode"><i
                                    className="fas fa-moon op"></i><i className="fas fa-sun false"></i></a></div>
                                <div className="item"><p className="title"><span>Cộng đồng</span></p>
                                    <div className="func group"><a href="https://www.facebook.com/groups/playerduovn"
                                                                   target="_blank" rel="noopener noreferrer"><i
                                        className="fal fa-globe"></i></a><a href="https://www.facebook.com/playerduo"
                                                                            target="_blank" rel="noopener noreferrer"><i
                                        className="fab fa-facebook-f"></i></a></div>
                                </div>
                                <div className="item"><p className="title"><span>Ngôn ngữ</span></p><a
                                    className="func lang"><img
                                    src="../resources/raw/1.png" className="flag op" alt="PD"/><img
                                    src="../resources/raw/2.png"
                                    className="flag false"
                                    alt="PD"/></a>
                                </div>
                                <div className="item"><p className="title"><span>Tải App</span></p>
                                    <div className="func app"><a href="https://testflight.apple.com/join/r6H9YvY4"
                                                                 target="_blank"
                                                                 rel="noopener noreferrer" download="">PlayerChat</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
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
                                       <span> <Link to={"/"}>Quên mật khẩu</Link></span>
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