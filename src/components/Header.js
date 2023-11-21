import React, {useContext, useState} from 'react';
import {} from '../css/Header.css'
import {ButtonLogin} from "../pages/login/ButtonLogin";
import {Link} from "react-router-dom";
import {AppContext} from "../context/AppContext";
import {useNavigate} from "react-router";
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
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
    const [modalIsOpen, setIsOpen] = React.useState(false);
    let subtitle;
    //tìm kiếm theo tên:
    function searchByName(event) {
        const value = event.target.value;
        handleSearchChange(value);
        setVisibleProducts(4)
        navigate("")
    }

    const [chosen, setChosen] = useState(1)



    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#151313FF';
        subtitle.style.fontSize = '30px';
    }

    function closeModal() {
        setIsOpen(false);
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
                            <li className={"header-li-1"}><Link to={"/"}>
                                <a href="#" style={{fontWeight: "bold", color: "rgb(53, 64, 82)"}}
                                   onClick={() => {
                                       setChosen(1)
                                   }}>TRANG CHỦ</a></Link></li>

                            {(role === "ROLE_LOVER") &&
                                <li className={"header-li-1"}><Link to={"/homeProfileLover"}>
                                    <a href={"#"} style={{fontWeight: "bold", color: "rgb(53, 64, 82)"}}>TRANG LOVER</a></Link></li>
                            }
                            {role === "ROLE_USER" &&
                                <li className={"header-li-1"}>
                                    <a href="#" onClick={() => alert("Bạn chưa đăng kí!")} style={{fontWeight: "bold", color: "rgb(53, 64, 82)"}}>TRANG LOVER</a>
                                </li>
                            }
                            {role === null &&
                                <li className={"header-li-1"}>
                                    <a href="#" onClick={() => alert("Bạn chưa đăng nhập!")} style={{fontWeight: "bold", color: "rgb(53, 64, 82)"}}>TRANG LOVER</a>
                                </li>
                            }


                            {role === null &&
                                <li className={"header-li-1"}>
                                    <a href="#" onClick={() => alert("Bạn chưa đăng nhập!")} style={{fontWeight: "bold", color: "rgb(53, 64, 82)"}}>TRANG USER</a>
                                </li>
                            }
                            {(role === "ROLE_USER" || role === "ROLE_LOVER") &&
                                <li className={"header-li-1"}>
                                    <Link to={"/info-user/" + idAccount}><a href={"#"} style={{fontWeight: "bold", color: "rgb(53, 64, 82)"}}>TRANG USER</a></Link>
                                </li>
                            }
                            {role === "ROLE_ADMIN" &&
                                <li className={"header-li-1"}>
                                    <Link to={"/home-admin/" + idAccount}><a href={"#"} style={{fontWeight: "bold", color: "rgb(53, 64, 82)"}}>TRANG ADMIN</a></Link>
                                </li>
                            }

                            <li className={"header-li-1"}><a href={"#"} style={{fontWeight: "bold", color: "rgb(53, 64, 82)"}} onClick={openModal}>TOP LOVER</a></li>
                            <li className={"header-li-1"}><a href={"#"} style={{fontWeight: "bold", color: "rgb(53, 64, 82)"}} onClick={openModal}>TOP USER</a></li>
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
                            <li className={"item-icon balance"}><ButtonLogin isLogin={isLogin}/></li>
                        </ul>

                        {/*start modal TOP LOVER*/}
                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >

                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}
                                style={{textAlign: "center", fontWeight: "bold", color: "black", marginBottom: "20px"}}>
                                <span style={{display: "block"}}>TOP LOVER</span>
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
                                        <button onClick={closeModal}
                                                style={{borderRadius: "3px", border: "none"}}>Đóng
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </Modal>
                        {/*end modal*/}




                        {/*start modal TOP USER*/}
                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
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
                                        <button onClick={closeModal}
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