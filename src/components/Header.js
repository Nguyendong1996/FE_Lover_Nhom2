import React, {useContext, useEffect, useState} from 'react';
import {} from '../css/Header.css'
import {ButtonLogin} from "../pages/login/ButtonLogin";
import {Link} from "react-router-dom";
import {AppContext} from "../context/AppContext";
import {useNavigate} from "react-router";

import Modal from 'react-modal';

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {findByIdAccount} from "../services/inforUserService";
import axios from "axios";

const customStyles = {
    content: {
        top: '55%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        border: '2px solid #ccc',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        outline: 'none',
        maxHeight: '90vh', // Tăng chiều cao tối đa
        maxWidth: '90vw', // Tăng chiều rộng tối đa
        padding: '20px',
        boxSizing: 'border-box',
    },
};
const Header = () => {
    const {handleSearchChange} = useContext(AppContext);
    const {setVisibleProducts} = useContext(AppContext);
    const {searchValue} = useContext(AppContext);
    const idAccount = localStorage.getItem("idAccount")
    const role = localStorage.getItem("role")
    const navigate = useNavigate();
    const isLogin = localStorage.getItem("isLogin")
    const token = localStorage.getItem("token")
    const [modalIsOpen1, setIsOpen1] = React.useState(false);
    const [modalIsOpen2, setIsOpen2] = React.useState(false);
    const initialChosen = localStorage.getItem('chosen') || 1;
    const [chosen, setChosen] = useState(Number(initialChosen));
    const [image, setImage] = useState(String);

    // Lưu trạng thái vào localStorage mỗi khi biến 'chosen' thay đổi
    useEffect(() => {
        localStorage.setItem('chosen', chosen);
        if (idAccount == null || role === "ROLE_ADMIN") {
            setImage("../resources/raw/avatar6.png")
        } else {
            findByIdAccount(idAccount, token).then((res) => {
                setImage(res.avatarImage)
            })
        }
    }, [chosen, idAccount]);

    const handleItemClick = (index) => {
        setChosen(index);
    };
    let subtitle;

    //tìm kiếm theo tên:
    function searchByName(event) {
        const value = event.target.value;
        handleSearchChange(value);
        setVisibleProducts(4)
        navigate("")
    }


    function openModal1() {
        setIsOpen1(true);
    }

    function openModal2() {
        setIsOpen2(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#151313FF';
        subtitle.style.fontSize = '30px';
    }

    function closeModal1() {
        setIsOpen1(false);
    }

    function closeModal2() {
        setIsOpen2(false);
    }

    //top lover
    const [top4Lovers, setTop4Lovers] = useState([])
    const [top1Lover, setTop1Lover] = useState({})
    useEffect(() => {
        axios.get("http://localhost:8080/api/profileLover/findTop5Lover").then((res) => {
            setTop4Lovers(res.data.slice(1, 5))
            setTop1Lover(res.data[0])
        })
    }, [])
    return (
        <>
            <ToastContainer/>
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
                                                   onChange={(event) => {
                                                       searchByName(event);
                                                   }}/><span
                                            className="input-group-addon"><button type="button"
                                                                                  className="btn btn-default"><i
                                            className="fal fa-search" aria-hidden="true"/></button></span></span></div>
                                    </div>
                                </nav>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-center">
                            <li className={`header-li-1 ${chosen === 1 ? 'chosen' : ''}`}>
                                <Link to={"/"}>
                                    <a href="#"
                                       style={{fontWeight: "bold", color: chosen === 1 ? "#d00d0d" : "rgb(53, 64, 82)"}}
                                       onClick={() => handleItemClick(1)}>
                                        TRANG CHỦ
                                    </a>
                                </Link>
                            </li>

                            {(role === "ROLE_LOVER") &&
                                <li className={`header-li-1 ${chosen === 2 ? 'chosen' : ''}`}>
                                    {(role === "ROLE_LOVER") && (
                                        <Link to={"/homeProfileLover"}>
                                            <a href={"#"} style={{
                                                fontWeight: "bold",
                                                color: chosen === 2 ? "#d00d0d" : "rgb(53, 64, 82)"
                                            }} onClick={() => handleItemClick(2)}>
                                                TRANG LOVER
                                            </a>
                                        </Link>
                                    )}
                                </li>
                            }
                            {role === "ROLE_USER" &&
                                <li className={"header-li-1"}>
                                    <a href="#" onClick={() => toast.error("Bạn chưa đăng kí!")}
                                       style={{fontWeight: "bold", color: "rgb(53, 64, 82)"}}>TRANG LOVER</a>
                                </li>
                            }
                            {role === null &&
                                <li className={"header-li-1"}>
                                    <a href="#" onClick={() => toast.error("Bạn chưa đăng nhập!")}
                                       style={{fontWeight: "bold", color: "rgb(53, 64, 82)"}}>TRANG LOVER</a>
                                </li>
                            }


                            {role === null &&
                                <li className={"header-li-1"}>
                                    <a href="#" onClick={() => toast.error("Bạn chưa đăng nhập!")}
                                       style={{fontWeight: "bold", color: "rgb(53, 64, 82)"}}>TRANG USER</a>
                                </li>
                            }
                            {(role === "ROLE_USER" || role === "ROLE_LOVER") &&
                                <li className={`header-li-1 ${chosen === 3 ? 'chosen' : ''}`}>
                                    {(role === "ROLE_LOVER") && (
                                        <Link to={"/info-user/" + idAccount}>
                                            <a href={"#"} style={{
                                                fontWeight: "bold",
                                                color: chosen === 3 ? "#d00d0d" : "rgb(53, 64, 82)"
                                            }} onClick={() => handleItemClick(3)}>
                                                TRANG USER
                                            </a>
                                        </Link>
                                    )}
                                </li>
                            }

                            {(role === "ROLE_USER") &&
                                <li className={`header-li-1 ${chosen === 3 ? 'chosen' : ''}`}>
                                    {(role === "ROLE_USER") && (
                                        <Link to={"/info-user/" + idAccount}>
                                            <a href={"#"} style={{
                                                fontWeight: "bold",
                                                color: chosen === 3 ? "#d00d0d" : "rgb(53, 64, 82)"
                                            }} onClick={() => handleItemClick(3)}>
                                                TRANG USER
                                            </a>
                                        </Link>
                                    )}
                                </li>
                            }

                            {role === "ROLE_ADMIN" &&
                                <li className={"header-li-1"}>
                                    <Link to={"/home-admin/" + idAccount}><a href={"#"} style={{
                                        fontWeight: "bold",
                                        color: "rgb(53, 64, 82)"
                                    }}>TRANG ADMIN</a></Link>
                                </li>
                            }

                            <li className={`header-li-1 ${chosen === 4 ? 'chosen' : ''}`}>
                                <a
                                    href="#"
                                    style={{
                                        fontWeight: "bold",
                                        color: chosen === 4 ? "#d00d0d" : "rgb(53, 64, 82)",
                                    }}
                                    onClick={(event) => {
                                        handleItemClick(4);
                                        openModal1();
                                        event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ 'a'
                                    }}
                                >
                                    TOP LOVER
                                </a>
                            </li>
                            <li className={`header-li-1 ${chosen === 5 ? 'chosen' : ''}`}>
                                <a
                                    href="#"
                                    style={{
                                        fontWeight: "bold",
                                        color: chosen === 5 ? "#d00d0d" : "rgb(53, 64, 82)",
                                    }}
                                    onClick={(event) => {
                                        handleItemClick(5);
                                        openModal2();
                                        event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ 'a'
                                    }}
                                >
                                    TOP USER
                                </a>
                            </li>
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
                                    <img src={image} className="avt-img" alt="PD" style={{width: 50, height: 50}}/></a>
                            </li>
                            <li className={"item-icon balance"}><ButtonLogin isLogin={isLogin}/></li>
                        </ul>

                        {/*start modal TOP LOVER*/}
                        <Modal
                            isOpen={modalIsOpen1}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal1}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <div style={{ width: 600, height: 450 }}>
                                <h3
                                    ref={(_subtitle) => (subtitle = _subtitle)}
                                    style={{ textAlign: "center", fontWeight: "bold", color: "black" }}
                                >
                                    <span style={{ display: "block" }}>BẢNG XẾP HẠNG LOVER</span>
                                </h3>
                                <div>
                                    <div style={{ display: "flex", justifyContent: "center", marginTop: 30, textAlign: "center" }}>
                                        <div style={{
                                            position: "relative",
                                            width: 180,
                                            height: 140,
                                            margin: "auto",
                                            padding: "10px", // Tăng padding để tạo khoảng trắng xung quanh
                                            borderRadius: "10px", // Bo tròn góc
                                        }}>
                                            <img
                                                src={top1Lover.avatarImage}
                                                alt=""
                                                style={{ width: 80, height: 80, borderRadius: "50%" }}
                                            />
                                            <img
                                                src="https://files.playerduo.net/production/static-files/no1_top_list.png"
                                                alt=""
                                                style={{
                                                    width: 180,
                                                    height: 120,
                                                    position: "absolute",
                                                    left: -1,
                                                    top: -10,
                                                }}
                                            />

                                            <div style={{ textAlign: "center" ,marginTop : '5px'}}>
                                                <div style={{
                                                    fontWeight: "bold",
                                                    color: "red", // Thay đổi màu sắc
                                                    marginTop: 10, // Tăng khoảng cách với phần trên
                                                    fontSize: "20px"
                                                }}>
                                                    {top1Lover.account?.nickname}
                                                </div>
                                                <div style={{
                                                    fontWeight: "bold",
                                                    color: "orange", // Thay đổi màu sắc
                                                }}>{top1Lover.totalHourRented} giờ</div>
                                            </div>
                                        </div>

                                    </div>
                                    {/*{top1Lover.account?.nickname}*/}

                                    <div style={{ display: "flex", justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
                                        {top4Lovers.map((item, index) => (
                                            <div key={index} style={{ border: "1px solid #ddd", borderRadius: "8px", margin: "10px", padding: "10px", width: "calc(25% - 20px)", boxSizing: "border-box" }}>
                                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                                    <img
                                                        src="https://cdn-icons-png.flaticon.com/512/1486/1486474.png"
                                                        alt=""
                                                        style={{ width: 30, height: 30, marginRight: 10 }}
                                                    />
                                                    <i style={{ fontWeight: "bold", fontSize: 20 }}>{index + 2}</i>
                                                </div>

                                                <div  key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 10 }}>
                                                    <div style={{ position: "relative" }}>
                                                        <img
                                                            src={item.avatarImage}
                                                            alt=""
                                                            style={{ width: 62, height: 60, borderRadius: "50%" }}
                                                        />
                                                        <img
                                                            src={`https://playerduo.net/rank/${index + 2}.png`}
                                                            alt=""
                                                            style={{
                                                                width:80,
                                                                height: 80,
                                                                position: "absolute",
                                                                left: -10,
                                                                top: -12,
                                                            }}
                                                        />
                                                    </div>
                                                    <div style={{ marginTop: '20px', textAlign: "center" }}>
                                                        <div style={{ fontWeight: "bold" }}>{item.account?.nickname}</div>
                                                        <div>{item.totalHourRented} giờ</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        {/*end modal*/}


                        {/*start modal TOP USER*/}
                        <Modal
                            isOpen={modalIsOpen2}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal2}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >

                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}
                                style={{textAlign: "center", fontWeight: "bold", color: "black", marginBottom: "20px"}}>
                                <span style={{display: "block"}}>TOP USER</span>
                                <img alt="logo playerduo" src="../resources/raw/logo.png" style={{
                                    display: "block",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginTop: "10px",
                                    maxWidth: "50px"
                                }}/>
                            </h2>

                            <table style={{width: "100%", borderCollapse: "collapse"}}>
                                <tbody>
                                <tr style={{borderBottom: "1px solid #ccc"}}>
                                    <td style={{padding: "10px"}}>Tên lover:</td>

                                </tr>
                                <tr style={{borderBottom: "1px solid #ccc"}}>
                                    <td style={{padding: "10px"}}>Thời gian muốn thuê:</td>
                                    <td style={{padding: "10px"}}>

                                    </td>
                                </tr>
                                <tr style={{borderBottom: "1px solid #ccc"}}>
                                    <td style={{padding: "10px"}}>Chọn dịch vụ VIP:</td>
                                    <td style={{padding: "10px"}}>

                                    </td>
                                </tr>
                                <tr style={{borderBottom: "1px solid #ccc"}}>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{padding: "10px"}}>
                                        <button type="button" style={{
                                            backgroundColor: "#f0564a",
                                            borderRadius: "3px",
                                            color: "#ffffff",
                                            border: "none"
                                        }}>Thanh toán
                                        </button>
                                    </td>
                                    <td style={{padding: "10px"}}>
                                        <button onClick={closeModal2}
                                                style={{borderRadius: "3px", border: "none"}}>Đóng
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </Modal>
                        {/*end modal*/}
                    </div>
                </header>
            </div>
        </>
    )
        ;
};

export default Header;