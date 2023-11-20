import React, {useContext, useState} from "react";
import {useNavigate} from "react-router";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {LoadingButton} from "./LoadingButton";
import "../../css/FormLogin.css"
import {Link} from "react-router-dom";
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


    let message;
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
            <div className="notifications-wrapper" ></div>
            <div className="main-singin-box">
                <div className="wrapper" style={{backgroundColor: "#eee9e9"}}>
                    <div className="container">

                        {/*<div className="leftside">*/}
                        {/*    <div className="air-balloon one">*/}
                        {/*        <img src="/resources/img/404-balloon.png" alt="404-balloon"/>*/}
                        {/*    </div>*/}
                        {/*    <div className="air-balloon two">*/}
                        {/*        <img src="/resources/img/404-balloon.png" alt="404-balloon"/>*/}
                        {/*    </div>*/}
                        {/*    <div className="air-balloon three">*/}
                        {/*        <img src="/resources/img/404-balloon.png" alt="404-balloon"/>*/}
                        {/*    </div>*/}
                        {/*    <div className="air-balloon foure">*/}
                        {/*        <img src="/resources/img/404-balloon.png" alt="404-balloon"/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

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
                                            <Link to={"/"}>Quên mật khẩu</Link>
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

                        {/*<div className="rightside">*/}
                        {/*    <div className="air-balloon one">*/}
                        {/*        <img src="/resources/img/404-balloon.png" alt="404-balloon"/>*/}
                        {/*    </div>*/}
                        {/*    <div className="air-balloon two">*/}
                        {/*        <img src="/resources/img/404-balloon.png" alt="404-balloon"/>*/}
                        {/*    </div>*/}
                        {/*    <div className="air-balloon three">*/}
                        {/*        <img src="/resources/img/404-balloon.png" alt="404-balloon"/>*/}
                        {/*    </div>*/}
                        {/*    <div className="air-balloon foure">*/}
                        {/*        <img src="/resources/img/404-balloon.png" alt="404-balloon"/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
            <div id="fb-root" style={{position: 'absolute', top: '-10000px', width: '0px', height: '0px'}}
                 className="fb_reset">
            </div>
        </>
    )

}