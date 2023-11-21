import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {findByIdLover} from "../../services/ProfileLoverService";
import {findImagesByIdLover} from "../../services/ImageService";
import {createBill} from "../../services/BillService";
import Modal from 'react-modal';
import {toast, ToastContainer} from "react-toastify";
import {ModalListImage} from "./ModalListImage";
import {AppContext} from "../../context/AppContext";

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


export function InfoLover() {
    const [profileLover, setProfileLover] = useState({})
    const {id} = useParams();
    const [vipService, setVipService] = useState([])
    const [freeService, setFreeService] = useState([])
    const [baseService, setBaseService] = useState([])
    const [linkFb, setLinkFb] = useState("")
    const [images, setImages] = useState([])
    const idAccount = localStorage.getItem("idAccount")
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [statusProfilelover, setStatusProfileLover] = useState({})
    const {check, setCheck} = useContext(AppContext);
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#151313FF';
        subtitle.style.fontSize = '30px';
    }

    function closeModal() {
        setMoneyTime(0)
        setBill({
            time: "",
            accountUser: {
                id: 0,
            },
            accountLover: {
                id: 0,
            },
            vipServices: [0],
            totalMoney: 0,
            statusBill: {
                id: 1
            },
        })
        setIsOpen(false);
        setSelectedOptions([])
    }

    const [bill, setBill] = useState({
        time: "",
        accountUser: {
            id: 0,
        },
        accountLover: {
            id: 0,
        },
        vipServices: [0],
        totalMoney: 0,
        statusBill: {
            id: 1
        },
    })
    const [moneyTime, setMoneyTime] = useState(0)
    useEffect(() => {
        findByIdLover(id)
            .then((res) => {
                setProfileLover(res)
                setFreeService(res.freeServices)
                setVipService(res.vipServices)
                setBaseService(res.serviceLovers)
                setLinkFb(res.facebookLink)
                setStatusProfileLover(res.statusLover)
            })
    }, [id])

    useEffect(() => {
        findImagesByIdLover(id)
            .then((res) => {
                setImages(res)
            })
    }, [id])


    function changeTime(time) {
        setMoneyTime(time * profileLover.price)
        bill.time = time;
        let total = bill.totalMoney - moneyTime;
        total += time * profileLover.price;
        setBill({...bill, totalMoney: total})
    }


    function rentLover() {
        if (idAccount === null) {
            return toast.error("Bạn chưa đăng nhập!")
        }
        if (bill.time === "") {
            return toast.error("Bạn chưa chọn giờ!")
        }
        bill.accountLover.id = +profileLover.account.id;
        bill.accountUser.id = +idAccount;
        if (parseInt(statusProfilelover.id) === 2) {
            toast.error("Lover [" + profileLover.account.nickname + "] đang cung cấp dịch vụ khác! Vui lòng thử lại sau!")
        } else if (parseInt(statusProfilelover.id) === 3) {
            toast.error("Lover [" + profileLover.account.nickname + "] đang tạm thời không cung cấp dịch vụ!")
        } else {
            // eslint-disable-next-line no-restricted-globals
            createBill(bill, token)
                .then(() => {
                    toast.success("Tạo bill thành công!")
                    setCheck(!check)
                    setIsOpen(false)
                    setBill({
                        time: "",
                        accountUser: {
                            id: 0,
                        },
                        accountLover: {
                            id: 0,
                        },
                        vipServices: [0],
                        totalMoney: 0,
                        statusBill: {
                            id: 1
                        },
                    })
                    setMoneyTime(0)
                    setSelectedOptions([])
                }).catch(() => {
                alert("Lỗi kết nối!")
            })
        }

    }

    function checkLover() {
        if (idAccount === null) {
            return toast.error("Bạn phải đăng nhập trước!")
        }
        console.log(profileLover)
        if (profileLover.statusLover.id === 2) {
            return toast.error("Lover đang được thuê!")
        }
        if (profileLover.statusLover.id === 3) {
            return toast.error("Lover tạm thời không cung cấp dịch vụ!")
        }
        openModal()
    }


    const [selectedOptions, setSelectedOptions] = useState([]); // Mảng chứa các lựa chọn đã chọn

    function handleCheckboxChange(event) {
        let selectedOption = event.target.value; // Giá trị của checkbox đã thay đổi
        if (event.target.checked) {
            // Nếu checkbox được chọn, thêm lựa chọn vào mảng
            selectedOptions.push(selectedOption);
        } else {
            // Nếu checkbox bị bỏ chọn, loại bỏ lựa chọn khỏi mảng
            let index = selectedOptions.indexOf(selectedOption);
            if (index > -1) {
                selectedOptions.splice(index, 1);
            }
        }
        let arr = [];
        for (let i = 0; i < vipService.length; i++) {
            for (let j = 0; j < selectedOptions.length; j++) {
                if (vipService[i].id == selectedOptions[j]) {
                    arr.push(vipService[i]);
                }
            }
        }
        let money = 0;
        for (let i = 0; i < arr.length; i++) {
            money += arr[i].price
        }
        money += moneyTime;
        bill.totalMoney = money;
        setBill({...bill, vipServices: arr})
    }

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });

    //modal ảnh
    const {viewImage, setViewImage} = useContext(AppContext);

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
            <title>PlayerDuo - Thuê người chơi</title>
            <link href="../resources/8.97b85fe3.chunk.css" rel="stylesheet"/>
            <link href="../resources/main.3e229f12.chunk.css" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="../resources/0.cbdbec7b.chunk.css"/>
            <link rel="stylesheet" type="text/css" href="../resources/3.fe7e74cf.chunk.css"/>
            <link rel="stylesheet" type="text/css" href="../resources/10.697bc269.chunk.css"/>
            <link rel="stylesheet" href="../resources/css-user-profile.css"/>
            <div>
                <div className="hidden">
                    <audio src="../resources/raw/notification-sound.805a8904.mp3"/>
                    <audio src="../resources/raw/notification-group-sound.4c7ac55b.mp3"/>
                    <audio src="../resources/raw/unconvinced.1de6c75d.mp3"/>
                </div>
                <div className="notifications-wrapper"/>
                <div className="message__popup  false">
                    <div className="message__popup--icon">
                        <img src="../resources/raw/popup-chat.png" className alt="PD"/></div>
                </div>
                <div className="wrapper">
                    <div className="container player-infomation">
                        <div className="player-profile-left-wrap col-md-3">
                            <div className="avt-player false">
                                <div>
                                    <div className="avt avt-lg">
                                        {
                                            <img src={profileLover.avatarImage} alt="Avatar"
                                                 style={{width: "100%", height: "100%"}}/>
                                        }
                                    </div>
                                </div>
                            </div>
                            {/*<span*/}
                            {/*    className="name-player-profile hidden-over-name"><h3>{profileLover.account?.nickname} 🐰🐰</h3></span>*/}

                            <div className="rent-time-wrap"><p className="ready">{profileLover.statusLover?.name}</p>
                            </div>
                            <div className="social-icon">
                                <div className="icon-wrap user-page">
                                    <a href="https://playerduo.net/rabbitnee" target="_blank" rel="noopener noreferrer">
                                        {<img src={profileLover.avatarImage} style={{width: "50px", height: "50px"}}
                                              alt="PD" title="Trang cá nhân"
                                              className="option-icon img-rounded"/>}
                                    </a>
                                </div>
                            </div>
                            <div className="member-since">
                                <div>Ngày tham gia:</div>
                                <span>
        {new Date(profileLover.createdAt).toLocaleDateString()}
    </span>
                            </div>
                        </div>
                        <div className="player-profile-right-wrap col-md-3 col-md-push-6">
                            <div className="right-player-profile" style={{marginTop: "80px"}}><p
                                className="price-player-profile">{profileLover.price} vnđ/giờ</p>
                                <div className="rateting-style"><i className="fas fa-star"></i><i
                                    className="fas fa-star"></i><i
                                    className="fas fa-star"></i><i className="fas fa-star"></i><i
                                    className="fas fa-star-half-alt"></i>&nbsp;<span>352 <span>Đánh giá</span></span>
                                </div>
                                <div className="text-center">
                                    {(parseInt(idAccount) === profileLover.account?.id)
                                        ?
                                        <p style={{fontSize: 20, fontWeight: "bold"}}>(TRANG CỦA BẠN)</p>
                                        :
                                        <>
                                            <button onClick={openModal} className="btn-my-style red"
                                                    onClick={checkLover}>Thuê
                                            </button>
                                            <button className="btn-my-style white">Donate</button>
                                            <button className="btn-my-style white"><i
                                                className="fas fa-comment-alt"></i>Chat
                                            </button>
                                        </>
                                    }


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

                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}
                                style={{textAlign: "center", fontWeight: "bold", color: "black", marginBottom: "20px"}}>
                                <span style={{display: "block"}}>THUÊ PLAYER</span>
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
                                    <td style={{padding: "10px"}}>{profileLover.account?.nickname}</td>
                                </tr>
                                <tr style={{borderBottom: "1px solid #ccc"}}>
                                    <td style={{padding: "10px"}}>Thời gian muốn thuê:</td>
                                    <td style={{padding: "10px"}}>
                                        <select
                                            style={{width: "100%", padding: "10px", boxSizing: "border-box"}}
                                            onChange={(e) => {
                                                changeTime(e.target.value)
                                            }}
                                            className={"form-control"}
                                        >
                                            <option value="">Chọn giờ</option>
                                            {/* Các option khác */}
                                            <option value="1">1 giờ</option>
                                            <option value="2">2 giờ</option>
                                            <option value="3">3 giờ</option>
                                            <option value="4">4 giờ</option>
                                            <option value="5">5 giờ</option>
                                            <option value="24">1 ngày</option>
                                            <option value="48">2 ngày</option>
                                            <option value="168">1 tuần</option>
                                            <option value="336">2 tuần</option>
                                            <option value="720">1 tháng</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr style={{borderBottom: "1px solid #ccc"}}>
                                    <td style={{padding: "10px"}}>Chọn dịch vụ VIP:</td>
                                    <td style={{textAlign: "left"}}>
                                        {vipService.map((item) => (
                                            <>
                                                <input type="checkbox" id={`check${item.id}`} value={item.id}
                                                       onChange={handleCheckboxChange}/>
                                                <label htmlFor={`check${item.id}`}
                                                       style={{marginLeft: "5px"}}>{item.name} (+{item.price}vnđ)</label>
                                                <br/>
                                            </>
                                        ))}
                                    </td>
                                </tr>
                                <tr style={{borderBottom: "1px solid #ccc"}}>
                                    <td style={{padding: "10px"}}>Tổng tiền:</td>
                                    <td style={{padding: "10px"}}>{bill.totalMoney} vnđ</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} style={{padding: "10px"}}>
                                    </td>
                                    <td style={{padding: "10px"}}>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div style={{textAlign: "center"}}>
                                <button type="button" onClick={rentLover} style={{
                                    backgroundColor: "#f0564a",
                                    borderRadius: "3px",
                                    color: "#ffffff",
                                    border: "none",
                                    height: 30, marginLeft: 10, marginRight: 20,
                                }}>Thanh toán
                                </button>
                                <button onClick={closeModal}
                                        style={{borderRadius: "3px", border: "none", marginRight: 20, height: 30}}>Đóng
                                </button>
                            </div>
                        </Modal>
                        {/*end modal*/}
                        <div className="player-profile-main-wrap col-md-6 col-md-pull-3">
                            <div>
                                <div className="row" style={{marginTop: "80px"}}>
                                    <div className="center-item col-md-12">
                                    <span
                                        className="name-player-profile hidden-over-name">{profileLover.account?.nickname} 🐰🐰</span>
                                        <button className="btn-follow-player"><i className="fas fa-heart"></i>&nbsp;
                                            <span
                                                className="plus"><span>Theo dõi</span></span></button>
                                    </div>
                                </div>
                                <div className="nav-player-profile row">
                                    <div className="col-md-3 col-xs-6">
                                        <div className="item-nav-name"><span> Đánh giá trung bình</span></div>
                                        <div className="item-nav-value"> <span>{profileLover.averageRateScore} <i
                                            className="fas fa-star"></i></span></div>
                                    </div>
                                    <div className="col-md-3 col-xs-6">
                                        <div className="item-nav-name"><span>Đã được thuê</span></div>
                                        <div className="item-nav-value">{bill.length}&nbsp;
                                            <span> {profileLover.totalHourRented} giờ</span></div>
                                    </div>
                                    <div className="col-md-3 col-xs-6">
                                        <div className="item-nav-name"><span>Tỷ lệ hoàn thành</span></div>
                                        <div className="item-nav-value">100&nbsp;%</div>
                                    </div>
                                    <div className="col-md-3 col-xs-6">
                                        <div className="item-nav-name"><span>Tình trạng thiết bị</span></div>
                                        <div className="item-nav-value"><i className="fas fa-microphone"></i></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="game-category row">
                                        <div className="choose-game"
                                             style={{background: "url(&quot;715867c6-698f-411a-b4f9-1e9093130b60__2649fa50-37c9-11ed-838c-b120e70abb59__game_backgrounds.jpg&quot;) center center no-repeat"}}>
                                            {/*<p className="overlay">{interest.length > 0 ? interest[0].interest : 'no'}</p>*/}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="title-player-profile row">
                                            <div className="col-xs-6"><span>Thông tin <i
                                                className="bi bi-info-circle"></i></span></div>
                                        </div>
                                        <div className="title-player-profile row">
                                            <div className="col-xs-6">
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        textAlign: "center",
                                                        position: "relative",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => setViewImage(true)}>
                                                    {images.slice(0, 4).map((item) => {
                                                        return (
                                                            <div>
                                                                <img src={item.urlImage} alt="" style={{
                                                                    width: 130,
                                                                    height: 130,
                                                                    marginLeft: 10,
                                                                    borderRadius: 3
                                                                }}/>
                                                            </div>
                                                        )
                                                    })}
                                                    {
                                                        (images.length > 4) &&
                                                        <div style={{
                                                            position: "absolute",
                                                            backgroundColor: 'rgba(26,24,24,0.62)',
                                                            width: 130,
                                                            height: 130,
                                                            borderRadius: 3,
                                                            left: "145%",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            display: "flex"
                                                        }}><span style={{
                                                            color: "white",
                                                            fontSize: 40,
                                                            fontWeight: "normal"
                                                        }}>+{images.length - 4}</span></div>
                                                    }
                                                </div>
                                                {viewImage && <ModalListImage open={viewImage}
                                                                              idLover={profileLover.account?.id}/>}
                                            </div>
                                        </div>
                                        <div className="content-player-profile">
                                            <p>Tên: {profileLover.account?.nickname} </p>
                                            <p>Địa Chỉ: {profileLover.city?.name}</p>
                                            <p>Năm Sinh: 2000 </p>
                                            <p>Chiều Cao: {profileLover.height}</p>
                                            <p>Cân Nặng: {profileLover.weight}</p>
                                            <p>Sở thích: {profileLover.hobby}</p>
                                            <p>Mô tả về bản thân: {profileLover.description}</p>
                                            <p>Yêu cầu với người thuê: {profileLover.requestToUser}</p>

                                            {/*<span style={{fontWeight: "bold", color: "grey"}}>Dịch vụ cơ bản:</span>*/}
                                            <div className="title-player-profile row">
                                                <div className="col-xs-6"><span>Dịch vụ cơ bản:</span></div>
                                            </div>
                                            {baseService.map((item) => {
                                                return (
                                                    <>
                                                        <div>
                                                            <img className={"info-info-image"}
                                                                 src={item.avatarService} alt=""
                                                                 style={{width: "30px", height: "30px"}}/>
                                                            <span>{item.name}
                                            </span>
                                                        </div>
                                                    </>
                                                )
                                            })}

                                            <div className="title-player-profile row">
                                                <div className="col-xs-6"><span>Dịch vụ miễn phí:</span></div>
                                            </div>
                                            {freeService.map((item) => {
                                                return (
                                                    <>
                                                        <div>
                                                            <img className={"info-info-image"}
                                                                 src={item.avatarService} alt=""
                                                                 style={{width: "30px", height: "30px"}}/>
                                                            <span>{item.name}</span>
                                                        </div>
                                                    </>
                                                )
                                            })}

                                            <div className="title-player-profile row">
                                                <div className="col-xs-6"><span>Dịch vụ vip:</span></div>
                                            </div>
                                            {vipService.map((item) => {
                                                return (
                                                    <>
                                                        <div>
                                                            <img className={"info-info-image"}
                                                                 src={item.avatarService} alt=""
                                                                 style={{width: "30px", height: "30px"}}/>
                                                            <span>{item.name}
                                                                + {item.price} /h</span>
                                                        </div>
                                                    </>
                                                )
                                            })}

                                        </div>
                                        <div style={{marginTop: "30px"}}>
                                            <div id="top-donate">
                                                <ul role="tablist" className="nav nav-tabs">
                                                    <li role="presentation" className="active"><a id="top-donate-tab-1"
                                                                                                  role="tab"
                                                                                                  aria-controls="top-donate-pane-1"
                                                                                                  aria-selected="true"
                                                                                                  href="home/userProfile#">Top
                                                        Donate</a></li>
                                                    <li role="presentation" className=""><a id="top-donate-tab-2"
                                                                                            role="tab"
                                                                                            aria-controls="top-donate-pane-2"
                                                                                            tabIndex="-1"
                                                                                            aria-selected="false"
                                                                                            href="home/userProfile#">Top
                                                        Donate
                                                        Tháng</a></li>
                                                </ul>
                                                <div className="tab-content">
                                                    <div id="top-donate-pane-1" aria-labelledby="top-donate-tab-1"
                                                         role="tabpanel"
                                                         aria-hidden="false" className="fade tab-pane active in">
                                                        <div className="mg-24">
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#1</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs">
                                                                        <img
                                                                            src="../resources/raw/2b0863d5-e2cb-4443-8aff-70327f5860f1__87172be0-0768-11ee-a657-a54d6be1d46a__page_avatar.jpg"
                                                                            className="avt-img" alt="PD"/>
                                                                        <img src="../resources/raw/10.png"
                                                                             className="vip-avatar undefined" alt="PD"
                                                                             style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span className="name-player-review color-vip-10">bun bun</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">297,651,000 đ
                                                                </div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#2</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs">
                                                                        <img
                                                                            src="../resources/raw/477e90cb-6b84-42fa-b9a2-c2b8fc5a0f21__6d2688b0-f59b-11eb-9157-1d40c57aa487__page_avatar.jpg"
                                                                            className="avt-img" alt="PD"/>
                                                                        <img src="../resources/raw/8.png"
                                                                             className="vip-avatar undefined" alt="PD"
                                                                             style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span
                                                                        className="name-player-review color-vip-6">Lỗi</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">23,120,000 đ
                                                                </div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#3</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs">
                                                                        <img
                                                                            src="../resources/raw/17d6baa2-8102-41a9-84d1-d54828c6c45e__c94e1fc0-4573-11ee-a657-a54d6be1d46a__page_avatar.jpg"
                                                                            className="avt-img" alt="PD"/>
                                                                        <img src="../resources/raw/14.png"
                                                                             className="vip-avatar undefined" alt="PD"
                                                                             style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span className="name-player-review color-vip-14">Hoàng Mjn™️</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">20,940,000 đ
                                                                </div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#4</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs">
                                                                        <img
                                                                            src="../resources/raw/69ecdfc8-4e52-47ae-ad94-7d07b349a510__777433c0-dc72-11ed-a19f-23a3b10d190e__page_avatar.jpg"
                                                                            className="avt-img" alt="PD"/>
                                                                        <img src="../resources/raw/10.png"
                                                                             className="vip-avatar undefined" alt="PD"
                                                                             style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span
                                                                        className="name-player-review color-vip-10">Mlem</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">19,650,000 đ
                                                                </div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#5</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs">
                                                                        <img
                                                                            src="../resources/raw/7cf12af4-a0c8-4c19-942d-0ad22b25fbea__eb2bb5a0-2a1a-11ed-92ac-1b8d2f5bc2b5__page_avatar.jpg"
                                                                            className="avt-img" alt="PD"/>
                                                                        <img src="../resources/raw/14.png"
                                                                             className="vip-avatar undefined" alt="PD"
                                                                             style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span className="name-player-review color-vip-14">Lê Đức Nam 1</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">12,200,000 đ
                                                                </div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#6</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs">
                                                                        <img
                                                                            src="../resources/raw/6be09225-9c6a-4334-a0f3-5bb74406f487__8121abb0-33ec-11ee-a657-a54d6be1d46a__page_avatar.jpg"
                                                                            className="avt-img" alt="PD"/>
                                                                        <img src="../resources/raw/10.png"
                                                                             className="vip-avatar undefined" alt="PD"
                                                                             style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span
                                                                        className="name-player-review color-vip-10">- ATM</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">12,053,000 đ
                                                                </div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#7</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs">
                                                                        <img
                                                                            src="../resources/raw/37594339-d6a2-4bfd-9f61-fb75105fb9f0__1546dbb0-433f-11ee-a657-a54d6be1d46a__page_avatar.jpg"
                                                                            className="avt-img" alt="PD"/>
                                                                        <img src="../resources/raw/14.png"
                                                                             className="vip-avatar undefined" alt="PD"
                                                                             style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span
                                                                        className="name-player-review color-vip-14">Chaien</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">10,354,000 đ
                                                                </div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#8</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs">
                                                                        <img
                                                                            src="../resources/raw/cd93c193-b5c6-4b0b-b09c-206d89668ab5__9c08f0a0-a3f5-11ed-a19f-23a3b10d190e__page_avatar.jpg"
                                                                            className="avt-img" alt="PD"/>
                                                                        <img src="../resources/raw/10.png"
                                                                             className="vip-avatar undefined" alt="PD"
                                                                             style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span className="name-player-review color-vip-10">Loli Tử Nghiên</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">9,953,000 đ</div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#9</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs">
                                                                        <img
                                                                            src="../resources/raw/5e6d3dda-cb9c-490d-8a05-66d8d40fbae8__2dae96e0-a917-11ea-a951-25554c403ce6__page_avatar.jpg"
                                                                            className="avt-img" alt="PD"/>
                                                                        <img
                                                                            src="../resources/raw/9.png"
                                                                            className="vip-avatar undefined" alt="PD"
                                                                            style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span
                                                                        className="name-player-review color-vip-6">OFF</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">8,225,000 đ</div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#10</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs"><img
                                                                        src="../resources/raw/a95aebcb-606b-4c5d-ab51-c24209674fc8__70cbb490-4894-11eb-a34e-dd03c3a22289__page_avatar.jpg"
                                                                        className="avt-img" alt="PD"/>
                                                                        <img src="../resources/raw/7.png"
                                                                             className="vip-avatar undefined" alt="PD"
                                                                             style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span className="name-player-review color-vip-6">[TOP] - GIA TỘC GIRL TOP Donate cho cả sever 10K</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">8,000,000 đ</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="top-donate-pane-2" aria-labelledby="top-donate-tab-2"
                                                         role="tabpanel"
                                                         aria-hidden="true" className="fade tab-pane">
                                                        <div className="mg-24">
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#1</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs">
                                                                        <img
                                                                            src="../resources/raw/17d6baa2-8102-41a9-84d1-d54828c6c45e__c94e1fc0-4573-11ee-a657-a54d6be1d46a__page_avatar.jpg"
                                                                            className="avt-img" alt="PD"/><img
                                                                        src="../resources/raw/14.png"
                                                                        className="vip-avatar undefined" alt="PD"
                                                                        style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span className="name-player-review color-vip-14">Hoàng Mjn™️</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">15,640,000 đ
                                                                </div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#2</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs">
                                                                        <img
                                                                            src="../resources/raw/2165c780-ac3b-4fe4-9f7f-1f14854b4b92__52ca3f30-3c15-11ee-a657-a54d6be1d46a__page_avatar.jpg"
                                                                            className="avt-img" alt="PD"/>
                                                                        <img src="../resources/raw/6.png"
                                                                             className="vip-avatar undefined" alt="PD"
                                                                             style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span
                                                                        className="name-player-review color-vip-6">Happybirthdayy me</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">5,000,000 đ</div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#3</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs">
                                                                        <img
                                                                            src="../resources/raw/3d2af408-b49a-4bc3-9be4-20f93cfa2c54__665f89f0-221c-11ee-a657-a54d6be1d46a__page_avatar.jpg"
                                                                            className="avt-img" alt="PD"/>
                                                                        <img src="../resources/raw/9.png"
                                                                             className="vip-avatar undefined" alt="PD"
                                                                             style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span
                                                                        className="name-player-review color-vip-6">S1mple09</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">2,000,000 đ</div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#4</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs">
                                                                        <img
                                                                            src="../resources/raw/avatar23.png"
                                                                            className="avt-img"
                                                                            alt="PD"/><img src="../resources/raw/11.png"
                                                                                           className="vip-avatar undefined"
                                                                                           alt="PD"
                                                                                           style={{
                                                                                               height: "17px",
                                                                                               width: "17px"
                                                                                           }}/>
                                                                    </div>
                                                                    <span
                                                                        className="name-player-review color-vip-10">Cam</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">715,000 đ</div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#5</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs"><img
                                                                        src="../resources/raw/19782b1f-b796-4185-a69b-c1a782379a26__a96a7860-2f8f-11ee-a657-a54d6be1d46a__page_avatar.jpg"
                                                                        className="avt-img" alt="PD"/><img
                                                                        src="../resources/raw/5-1.png"
                                                                        className="vip-avatar undefined" alt="PD"
                                                                        style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span
                                                                        className="name-player-review color-vip-1">WildAsian</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">375,000 đ</div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#6</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs"><img
                                                                        src="../resources/raw/6d352f52-335d-4c89-8056-e6ca3f338d3e__2166e040-d998-11ed-a19f-23a3b10d190e__page_avatar.jpg"
                                                                        className="avt-img" alt="PD"/><img
                                                                        src="../resources/raw/5-1.png"
                                                                        className="vip-avatar undefined" alt="PD"
                                                                        style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span className="name-player-review color-vip-1">Tuấn April</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">170,000 đ</div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#7</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs"><img
                                                                        src="../resources/raw/660c6b83-6a8b-470f-962f-1a09a56f0381__425307b0-d485-11ed-a19f-23a3b10d190e__page_avatar.jpg"
                                                                        className="avt-img" alt="PD"/><img
                                                                        src="../resources/raw/5-1.png"
                                                                        className="vip-avatar undefined" alt="PD"
                                                                        style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span className="name-player-review color-vip-1">Trần Huy Tùng</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">150,000 đ</div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#8</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs"><img
                                                                        src="../resources/raw/517206b6-20e0-4d18-8b1b-22281fc2d370__f5954ea0-3b41-11ee-a657-a54d6be1d46a__page_avatar.jpg"
                                                                        className="avt-img" alt="PD"/><img
                                                                        src="../resources/raw/1-2.png"
                                                                        className="vip-avatar undefined" alt="PD"
                                                                        style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span
                                                                        className="name-player-review color-vip-1">Name</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">147,000 đ</div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#9</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs"><img
                                                                        src="../resources/raw/3aa2c4a6-25e0-4a7a-9f77-247453949a9d__00804540-3d6d-11ee-a657-a54d6be1d46a__page_avatar.jpg"
                                                                        className="avt-img" alt="PD"/><img
                                                                        src="../resources/raw/3-1.png"
                                                                        className="vip-avatar undefined" alt="PD"
                                                                        style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span className="name-player-review color-vip-1">Dan Pham</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">100,000 đ</div>
                                                            </div>
                                                            <div className="top-donate-player row">
                                                                <div className="ky-1 col-xs-1">#10</div>
                                                                <div className="col-xs-7">
                                                                    <div className="avt avt-xs"><img
                                                                        src="../resources/raw/0c28f031-fd10-44a2-a632-0d736608110a__49a14880-b322-11ed-a19f-23a3b10d190e__page_avatar.jpg"
                                                                        className="avt-img" alt="PD"/><img
                                                                        src="../resources/raw/1-2.png"
                                                                        className="vip-avatar undefined" alt="PD"
                                                                        style={{height: "17px", width: "17px"}}/>
                                                                    </div>
                                                                    <span className="name-player-review color-vip-1">Trần Hiền</span>
                                                                </div>
                                                                <div className="total-amount col-xs-4">50,000 đ</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="title-player-profile row">
                                                    <div className="col-xs-6"><span>Đánh giá</span></div>
                                                </div>
                                                <div className="text-center review-duo-player row">
                                                    <div className="col-md-12">
                                                        <div className="full-size">
                                                            <div className="review-image-small">
                                                                <div className="avt-rank avt-md"><img
                                                                    src="../resources/raw/79e3149c-ec0a-49bc-b15f-a0b38e5a23d9__27f3bc20-14be-11ed-92ac-1b8d2f5bc2b5__page_avatar.jpg"
                                                                    className="avt-1-15 avt-img" alt="PD"/>
                                                                    <img src="../resources/raw/4.png"
                                                                         className="rank-1-15 rank-img"
                                                                         alt="PlayerDuo"/>
                                                                </div>
                                                            </div>
                                                            <div className="wrapper-content-rating">
                                                                <div className="review-content"><a target="_blank"
                                                                                                   href="https://playerduo.net/traiyeumeo">
                                                                    <p
                                                                        className="name-player-review color-vip-1">Hữu
                                                                        Lulu</p></a>
                                                                    <p className="time-player-review"><span>20:29:56 29/8/2023</span>
                                                                    </p></div>
                                                                <div className="review-rating">
                                                                    <div className="rateting-style"><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i>&nbsp;
                                                                    </div>
                                                                    <span
                                                                        className="time-rent-review">(<span>Thuê</span>&nbsp;2h)</span>
                                                                </div>
                                                                <p className="content-player-review">Dễ thương</p></div>
                                                        </div>
                                                        <div className="full-size">
                                                            <div className="review-image-small">
                                                                <div className="avt-rank avt-md"><img
                                                                    src="../resources/raw/17d6baa2-8102-41a9-84d1-d54828c6c45e__a8fd8110-46cd-11ee-a657-a54d6be1d46a__page_avatar.jpg"
                                                                    className="avt-1-15 avt-img" alt="PD"/>
                                                                    <img src="../resources/raw/14-1.png"
                                                                         className="rank-1-15 rank-img"
                                                                         alt="PlayerDuo"/></div>
                                                            </div>
                                                            <div className="wrapper-content-rating">
                                                                <div className="review-content"><a target="_blank"
                                                                                                   href="https://playerduo.net/page61d7d8a16afb847ad39c91bf">
                                                                    <p className="name-player-review color-vip-14">Hoàng
                                                                        Mjn™️</p></a>
                                                                    <p className="time-player-review"><span>03:07:42 15/8/2023</span>
                                                                    </p></div>
                                                                <div className="review-rating">
                                                                    <div className="rateting-style"><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i>&nbsp;
                                                                    </div>
                                                                    <span
                                                                        className="time-rent-review">(<span>Thuê</span>&nbsp;1h)</span>
                                                                </div>
                                                                <p className="content-player-review">1 sao</p></div>
                                                        </div>
                                                        <div className="full-size">
                                                            <div className="review-image-small">
                                                                <div className="avt-rank avt-md"><img
                                                                    src="../resources/raw/6be09225-9c6a-4334-a0f3-5bb74406f487__8121abb0-33ec-11ee-a657-a54d6be1d46a__page_avatar.jpg"
                                                                    className="avt-1-15 avt-img" alt="PD"/><img
                                                                    src="../resources/raw/10-1.png"
                                                                    className="rank-1-15 rank-img"
                                                                    alt="PlayerDuo"/></div>
                                                            </div>
                                                            <div className="wrapper-content-rating">
                                                                <div className="review-content"><a target="_blank"
                                                                                                   href="https://playerduo.net/anhtamheone">
                                                                    <p
                                                                        className="name-player-review color-vip-10">-
                                                                        ATM</p></a>
                                                                    <p className="time-player-review"><span>21:41:25 11/8/2023</span>
                                                                    </p></div>
                                                                <div className="review-rating">
                                                                    <div className="rateting-style"><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i>&nbsp;
                                                                    </div>
                                                                    <span
                                                                        className="time-rent-review">(<span>Thuê</span>&nbsp;1h)</span>
                                                                </div>
                                                                <p className="content-player-review">Đau để trưởng
                                                                    thành</p></div>
                                                        </div>
                                                        <div className="full-size">
                                                            <div className="review-image-small">
                                                                <div className="avt-rank avt-md"><img
                                                                    src="../resources/raw/ed3a6cba-07d7-46d3-aff5-d6cc547e1ecf__b372abe0-439c-11ee-a657-a54d6be1d46a__page_avatar.jpg"
                                                                    className="avt-1-15 avt-img" alt="PD"/></div>
                                                            </div>
                                                            <div className="wrapper-content-rating">
                                                                <div className="review-content"><a target="_blank"
                                                                                                   href="https://playerduo.net/junseo">
                                                                    <p className="name-player-review">Dunn</p></a>
                                                                    <p className="time-player-review"><span>04:59:18 3/8/2023</span>
                                                                    </p></div>
                                                                <div className="review-rating">
                                                                    <div className="rateting-style"><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i>&nbsp;
                                                                    </div>
                                                                    <span
                                                                        className="time-rent-review">(<span>Thuê</span>&nbsp;1h)</span>
                                                                </div>
                                                                <p className="content-player-review">⭐⭐⭐⭐⭐</p></div>
                                                        </div>
                                                        <div className="full-size">
                                                            <div className="review-image-small">
                                                                <div className="avt-rank avt-md"><img
                                                                    src="../resources/raw/a383d1b5-c026-4e2c-9efb-48eb5c5fa0ee__02b241b0-10d1-11ee-a657-a54d6be1d46a__page_avatar.jpg"
                                                                    className="avt-1-15 avt-img" alt="PD"/><img
                                                                    src="../resources/raw/3.png"
                                                                    className="rank-1-15 rank-img"
                                                                    alt="PlayerDuo"/></div>
                                                            </div>
                                                            <div className="wrapper-content-rating">
                                                                <div className="review-content"><a target="_blank"
                                                                                                   href="https://playerduo.net/minhquann">
                                                                    <p
                                                                        className="name-player-review color-vip-1">Minh
                                                                        Quân</p></a>
                                                                    <p className="time-player-review"><span>01:16:52 30/6/2023</span>
                                                                    </p></div>
                                                                <div className="review-rating">
                                                                    <div className="rateting-style"><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i>&nbsp;
                                                                    </div>
                                                                    <span
                                                                        className="time-rent-review">(<span>Thuê</span>&nbsp;8h)</span>
                                                                </div>
                                                                <p className="content-player-review">dth</p></div>
                                                        </div>
                                                        <div className="full-size">
                                                            <div className="review-image-small">
                                                                <div className="avt-rank avt-md"><img
                                                                    src="../resources/raw/dfd390d0-598e-42f4-be7d-61ea27b15e83__52c6e810-b9e5-11ed-a19f-23a3b10d190e__page_avatar.jpg"
                                                                    className="avt-1-15 avt-img" alt="PD"/><img
                                                                    src="../resources/raw/1-1.png"
                                                                    className="rank-1-15 rank-img"
                                                                    alt="PlayerDuo"/></div>
                                                            </div>
                                                            <div className="wrapper-content-rating">
                                                                <div className="review-content"><a target="_blank"
                                                                                                   href="https://playerduo.net/page5e3b1230aec0db0a2f982738">
                                                                    <p className="name-player-review color-vip-1">Anh
                                                                        Tuan</p></a>
                                                                    <p className="time-player-review"><span>04:25:50 22/6/2023</span>
                                                                    </p></div>
                                                                <div className="review-rating">
                                                                    <div className="rateting-style"><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i>&nbsp;
                                                                    </div>
                                                                    <span
                                                                        className="time-rent-review">(<span>Thuê</span>&nbsp;1h)</span>
                                                                </div>
                                                                <p className="content-player-review">.</p></div>
                                                        </div>
                                                        <div className="full-size">
                                                            <div className="review-image-small">
                                                                <div className="avt-rank avt-md"><img
                                                                    src="../resources/raw/upload_5a5fa35b31030f87671090dad3bbadeb.jpg.png"
                                                                    className="avt-1-15 avt-img" alt="PD"/><img
                                                                    src="../resources/raw/7-1.png"
                                                                    className="rank-1-15 rank-img"
                                                                    alt="PlayerDuo"/></div>
                                                            </div>
                                                            <div className="wrapper-content-rating">
                                                                <div className="review-content"><a target="_blank"
                                                                                                   href="https://playerduo.net/page5b99fcf16ccbeb40c6674c50">
                                                                    <p className="name-player-review color-vip-6">noel
                                                                        một mình</p></a>
                                                                    <p className="time-player-review"><span>23:17:27 1/6/2023</span>
                                                                    </p></div>
                                                                <div className="review-rating">
                                                                    <div className="rateting-style"><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i>&nbsp;
                                                                    </div>
                                                                    <span
                                                                        className="time-rent-review">(<span>Thuê</span>&nbsp;1h)</span>
                                                                </div>
                                                                <p className="content-player-review">Thủy no1 =))</p>
                                                            </div>
                                                        </div>
                                                        <div className="full-size">
                                                            <div className="review-image-small">
                                                                <div className="avt-rank avt-md"><img
                                                                    src="../resources/raw/avatar9.png"
                                                                    className="avt-1-15 avt-img"
                                                                    alt="PD"/><img src="../resources/raw/1-1.png"
                                                                                   className="rank-1-15 rank-img"
                                                                                   alt="PlayerDuo"/></div>
                                                            </div>
                                                            <div className="wrapper-content-rating">
                                                                <div className="review-content"><a target="_blank"
                                                                                                   href="https://playerduo.net/page5f39cabb7687ab35ae406812">
                                                                    <p className="name-player-review color-vip-1">văn
                                                                        Phước</p></a>
                                                                    <p className="time-player-review"><span>06:26:20 21/5/2023</span>
                                                                    </p></div>
                                                                <div className="review-rating">
                                                                    <div className="rateting-style"><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i>&nbsp;
                                                                    </div>
                                                                    <span
                                                                        className="time-rent-review">(<span>Thuê</span>&nbsp;2h)</span>
                                                                </div>
                                                                <p className="content-player-review">ok</p></div>
                                                        </div>
                                                        <div className="full-size">
                                                            <div className="review-image-small">
                                                                <div className="avt-rank avt-md"><img
                                                                    src="../resources/raw/40d0273e-dc9a-4d3b-97cb-b5d60108788c__2cc85db0-2736-11ee-a657-a54d6be1d46a__page_avatar.jpg"
                                                                    className="avt-1-15 avt-img" alt="PD"/><img
                                                                    src="../resources/raw/5.png"
                                                                    className="rank-1-15 rank-img"
                                                                    alt="PlayerDuo"/></div>
                                                            </div>
                                                            <div className="wrapper-content-rating">
                                                                <div className="review-content"><a target="_blank"
                                                                                                   href="https://playerduo.net/minh07092001">
                                                                    <p
                                                                        className="name-player-review color-vip-1">M
                                                                        💔</p></a>
                                                                    <p className="time-player-review"><span>08:07:05 17/5/2023</span>
                                                                    </p></div>
                                                                <div className="review-rating">
                                                                    <div className="rateting-style"><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i>&nbsp;
                                                                    </div>
                                                                    <span
                                                                        className="time-rent-review">(<span>Thuê</span>&nbsp;1h)</span>
                                                                </div>
                                                                <p className="content-player-review">bạn này đáng iu
                                                                    nè</p></div>
                                                        </div>
                                                        <div className="full-size">
                                                            <div className="review-image-small">
                                                                <div className="avt-rank avt-md"><img
                                                                    src="../resources/raw/5479a954-2ca4-4043-a3bf-fdd87d0ae4af__a5140ef0-e482-11ed-a19f-23a3b10d190e__page_avatar.jpg"
                                                                    className="avt-1-15 avt-img" alt="PD"/><img
                                                                    src="../resources/raw/2-1.png"
                                                                    className="rank-1-15 rank-img"
                                                                    alt="PlayerDuo"/></div>
                                                            </div>
                                                            <div className="wrapper-content-rating">
                                                                <div className="review-content"><a target="_blank"
                                                                                                   href="https://playerduo.net/page600ce889399d5e2bc1ed8e5d">
                                                                    <p className="name-player-review color-vip-1">Haro</p>
                                                                </a>
                                                                    <p className="time-player-review"><span>13:14:44 3/5/2023</span>
                                                                    </p></div>
                                                                <div className="review-rating">
                                                                    <div className="rateting-style"><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i><i
                                                                        className="fas fa-star"></i>&nbsp;
                                                                    </div>
                                                                    <span
                                                                        className="time-rent-review">(<span>Thuê</span>&nbsp;8h)</span>
                                                                </div>
                                                                <p className="content-player-review">sap xep lai thoi
                                                                    gian ngu nghi nhe</p></div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="page_account"><p className="active">1</p>
                                                            <p className="">2</p>
                                                            <p className="">3</p>
                                                            <p className="">4</p>
                                                            <p className="">5</p>
                                                            <p className="active" style={{cursor: "auto"}}>1/36</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoLover