import React, {useContext, useState} from 'react';
import {} from '../css/Header.css'
import {ButtonLogin} from "../pages/login/ButtonLogin";
import {Link} from "react-router-dom";
import {AppContext} from "../context/AppContext";
import {useNavigate} from "react-router";

const Header = () => {
    const {handleSearchChange} = useContext(AppContext);
    const {setVisibleProducts} = useContext(AppContext);
    const {searchValue} = useContext(AppContext);
    const idAccount = localStorage.getItem("idAccount")
    const role = localStorage.getItem("role")
    const navigate = useNavigate();
    //tìm kiếm theo tên:
    function searchByName(event) {
        const value = event.target.value;
        handleSearchChange(value);
        setVisibleProducts(4)
        navigate("")
    }
    return (
        <>
            <link rel="manifest" href="https://playerduo.net/manifest.json"/>
            <meta name="msapplication-TileColor" content="#ffffff"/>
            <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png"/>
            <meta name="theme-color" content="#ffffff"/>
            <link rel="shortcut icon" href="../resources/raw/favicon.ico"/>
            <link href="../resources/all.css" rel="stylesheet"/>
            <link href="../resources/css.css" rel="stylesheet"/>
            <link href="../resources/8.97b85fe3.chunk.css" rel="stylesheet"/>
            <link href="../resources/main.3e229f12.chunk.css" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="../resources/0.cbdbec7b.chunk.css"/>
            <link rel="stylesheet" type="text/css" href="../resources/4.2ddfb1d3.chunk.css"/>
            <link rel="stylesheet" type="text/css" href="../resources/15.7bac9b00.chunk.css"/>
            <link rel="stylesheet" href="../resources/css-home.css"/>
            <link rel="stylesheet" href="../resources/css-user-profile.css"/>
            <div id="root">
                <header className="menu__header fix-menu" id="header-menu">
                    <div className="navbar-header"><a href className="logo"><img alt="logo playerduo"
                                                                                 src="../resources/raw/logo.png"/></a>
                    </div>
                    <div className="navbar">
                        <ul className="nav navbar-nav navbar-left">
                            <li className="item-search">
                                <nav className="Navbar__Item">
                                    <div className="Navbar__Link">
                                        <div className="Group-search visible "><span
                                            className="search input-group">
                                            <input placeholder="Nickname/Url ..." value={searchValue}
                                                   type="text" className="form-control"
                                                   onChange={(event) => {searchByName(event);
                                        }}/><span
                                            className="input-group-addon"><button type="button"
                                                                                  className="btn btn-default"><i
                                            className="fal fa-search" aria-hidden="true"/></button></span></span></div>
                                    </div>
                                </nav>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-center">
                            <li className={"header-li-1"}><Link to={""}><a href="#">Trang chủ</a></Link></li>
                            <li className={"header-li-1"}>
                                {role === "ROLE_LOVER" ? <Link to={"/homeProfileLover"}><a href={"#"}>Trang lover</a></Link> :
                                    <a href="#" onClick={() => alert("Bạn chưa đăng kí!")}>Trang lover</a>}
                            </li>
                            <li className={"header-li-1"}>
                                {role === null ?
                                    <a href="#" onClick={() => alert("Bạn chưa đăng nhập!")}>Trang user</a> :
                                    <Link to={"/info-user/" + idAccount}><a href={"#"}>Trang user</a></Link>
                                }
                            </li>
                            <li className={"header-li-1"}><Link to={""}>Top lover</Link></li>
                            <li className={"header-li-1"}><Link to={""}>Top user</Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="item-icon notificate dropdown"><a id="basic-nav-dropdown" role="button"
                                                                             className="dropdown-toggle"
                                                                             aria-haspopup="true" aria-expanded="false"
                                                                             href="#">
                                <div className="item-title"><i className="fal fa-bell"/></div>
                            </a>
                            </li>
                            <li className="item-icon balance"><a className="money-user"><i className="far fa-plus"/> 0 đ</a>
                            </li>
                            <li className="item-icon item-avatar dropdown">
                                <a id="header-nav-dropdown" role="button"
                                   className="dropdown-toggle"
                                   aria-haspopup="true" aria-expanded="false"
                                   href="#">
                                    <img src="../resources/raw/avatar6.png" className="avt-img" alt="PD"/></a>
                            </li>
                            <li className={"item-icon balance"}><ButtonLogin/></li>
                        </ul>
                    </div>
                </header>
            </div>
        </>
    );
};

export default Header;