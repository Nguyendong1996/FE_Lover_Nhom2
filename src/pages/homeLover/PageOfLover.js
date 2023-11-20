import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {createProfileLover, findAllFreeService, findByIdLover} from "../../services/ProfileLoverService";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase/Firebase";
import {v4} from "uuid";
import {RingLoader} from "react-spinners";


export function PageOfLover() {
    const [profileLover, setProfileLover] = useState({})
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(false);
    const [check, setCheck] = useState(false);
    let id = localStorage.getItem("idAccount");
    const [isEditingPrice, setIsEditingPrice] = useState(false);

    useEffect(() => {
        findByIdLover(id).then((res) => {
            setProfileLover(res)
            console.log(res)
            if (res.statusLover?.id === 1 || res.statusLover?.id === 2) {
                console.log(status)
                setStatus(true);
            }
        }).catch(() => {
            return {}
        })
        findAllFreeService().then((res) => {
            console.log(res)
        })
    }, [loading, check])
    const updateStatusLover = () => {
        if (profileLover.statusLover?.id === 2) {
            alert("Đang trong quá trình cung cấp dịch vụ! Không được thay đổi thông tin!!!");
        } else {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Bạn có muốn thay đổi trạng thái hoạt động không?")) {
                let newIdStatus;
                if (profileLover.statusLover?.id === 1) {
                    newIdStatus = 3;
                    alert("Bạn đã tắt trạng thái hoạt động");
                    setStatus(false);
                } else if (profileLover.statusLover?.id === 3) {
                    newIdStatus = 1;
                    alert("Bạn đã bật trạng thái hoạt động");
                    setStatus(true);
                }

                const updatedProfileLover = {
                    ...profileLover,
                    account: {
                        id: id,
                    },
                    statusLover: {
                        id: newIdStatus,
                    },
                };

                createProfileLover(updatedProfileLover).then(() => {
                    setCheck(!check)
                    // Thực hiện các hành động khác sau khi đã gọi createProfileLover
                });
            }
        }
    };

    const handlePriceEdit = () => {
        setIsEditingPrice(true); // Kích hoạt chế độ chỉnh sửa
    };
    const handlePriceSave = (e) => {
        const updatedProfileLover = {
            ...profileLover,
            account: {
                id: id,
            },
            price: e.price,
        }
        createProfileLover(updatedProfileLover).then(() => {
                setCheck(!check)
                return alert("update thanh cong !!!")
            }
        );
        setIsEditingPrice(false); // Tắt chế độ chỉnh sửa
    };

    function showModalChoseImage() {
        const fileInput = document.getElementById('input-avatar-profile-user');
        fileInput.click();
    }

    function updateAvt(file) {
        setLoading(true)
        const storageRef = ref(storage, `images/${file.name + v4()}`);
        const uploadTask = uploadBytes(storageRef, file);
        uploadTask.then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const updatedProfileLover = {
                    ...profileLover,

                    account: {
                        id: id,
                    },
                    avatarImage: url
                }
                createProfileLover(updatedProfileLover)
                    .then(() => {
                        alert("Cập nhật ảnh đại diện thành công!");
                        setLoading(false);
                    })
            })
        })
    }

    if (loading) {
        return (
            <>
                <div id={"root"} style={{marginTop: '-50%'}}>
                    <div className={"loading-info-user"}>
                        <RingLoader color="#f0564a" loading={true} size={80}/>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <div className="aside">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12 personalinfo"
                             style={{width: "auto", display: "flex"}}>
                            <div id={"container-avatar"}>
                                <div className="cropimg-avatar div-info-user-1">
                                    <img src={profileLover.avatarImage} alt=""
                                         style={{width: 300, height: 300, borderRadius: 10}}
                                         onClick={showModalChoseImage}/>
                                    <input type="file" id={"input-avatar-profile-user"}
                                           onChange={(event) => {
                                               updateAvt(event.target.files[0])
                                           }} style={{display: "none"}}/>
                                </div>
                                <div style={{marginTop: 10, color: "rgb(53, 64, 82)"}}>
                                    <div style={{textAlign: "center"}}>
                                        <span style={{fontSize: 30}}>{profileLover.account?.nickname} 🐰🐰</span>
                                    </div>
                                    <div style={{textAlign: "center", fontSize: 15, fontWeight: "bold", marginTop: 10}}>
                                        {profileLover.statusLover?.id === 1 &&
                                            <span style={{color: "green"}}>{profileLover.statusLover?.name}</span>
                                        }
                                        {profileLover.statusLover?.id === 2 &&
                                            <span style={{color: "#f0564a"}}>{profileLover.statusLover?.name}</span>
                                        }
                                        {profileLover.statusLover?.id === 3 &&
                                            <span style={{color: "red"}}>{profileLover.statusLover?.name}</span>
                                        }
                                        {status
                                            ? <a id={"a-change-status"}
                                                 style={{textDecoration: "underline", marginLeft: 5, color: "red"}}
                                                 onClick={updateStatusLover}>(Tắt)
                                            </a>
                                            :
                                            <a id={"a-change-status"}
                                               style={{textDecoration: "underline", marginLeft: 5, color: "green"}}
                                               onClick={updateStatusLover}>(Bật)
                                            </a>
                                        }
                                        <div style={{marginTop: 10}}>NGÀY THAM
                                            GIA: {profileLover.createdAt?.slice(0, 10)}</div>
                                        <div style={{marginTop: 10}}><span style={{
                                            color: "#f0564a",
                                            fontWeight: "bold",
                                            fontSize: 20
                                        }}>GIÁ: {profileLover.price} vnđ/giờ</span></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div style={{width: "max-content", marginLeft: 50}}>
                                    <div>
                                        <div className="nav-player-profile row"
                                             style={{color: "#f0564a", fontWeight: "bold"}}>
                                            <div className="col-md-3 col-xs-6" style={{width: 130, marginLeft: 50}}>
                                                <div className="item-nav-name"><span>Số Lượt thuê</span></div>
                                                <div className="item-nav-value">{profileLover.totalViews}
                                                    <span>Lượt</span></div>
                                            </div>
                                            <div className="col-md-3 col-xs-6" style={{width: 180}}>
                                                <div className="item-nav-name"><span>Thời gian được thuê</span></div>
                                                <div className="item-nav-value">
                                                    <span>{profileLover.totalHourRented} Giờ</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-xs-6" style={{width: 150}}>
                                                <div className="item-nav-name"><span>Tỷ lệ hoàn thành</span></div>
                                                <div className="item-nav-value">100&nbsp;%</div>
                                            </div>
                                            <div className="col-md-3 col-xs-6" style={{width: 100}}>
                                                <div className="item-nav-name"><span>Thu nhập</span></div>
                                                <div className="item-nav-value">{profileLover.totalMoneyRented}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div>

                                                <h3 style={{textAlign: "center", fontWeight:"bold"}}>THÔNG TIN</h3>
                                                <div style={{fontSize: 15}}>
                                                    <div
                                                        style={{marginBottom: 5}}>Tên: {profileLover.account?.nickname}</div>
                                                    <div style={{marginBottom: 5}}>Địa
                                                        chỉ: {profileLover.city?.name}</div>
                                                    <div style={{marginBottom: 5}}>Năm
                                                        sinh: {profileLover.dateOfBirth}</div>
                                                    <div style={{marginBottom: 5}}>Chiều
                                                        cao: {profileLover.height}</div>
                                                    <div style={{marginBottom: 5}}>Cân
                                                        nặng: {profileLover.weight}</div>
                                                    <div style={{marginBottom: 5}}>Sở
                                                        thích: {profileLover.hobby}</div>
                                                    <div style={{marginBottom: 5}}>Yêu cầu đối với người
                                                        thuê: {profileLover.requestToUser}</div>
                                                    <br/>
                                                </div>
                                                <div className="content-player-profile" style={{width: 650}}>
                                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                                        <span style={{
                                                            textAlign: "justify",
                                                            width: "fit-content",
                                                            fontSize: 15
                                                        }}>Mô tả về bản thân: {profileLover.description}</span>
                                                    </div>
                                                    <br/>
                                                    <div className=""
                                                         style={{display: "flex", justifyContent: "center"}}>
                                                        <img src={profileLover.avatarImage} alt="Avatar"
                                                             style={{
                                                                 width: 100,
                                                                 height: 100,
                                                                 borderRadius: 5,
                                                                 marginRight: 10
                                                             }}/>
                                                        <img src={profileLover.avatarImage} alt="Avatar"
                                                             style={{
                                                                 width: 100,
                                                                 height: 100,
                                                                 borderRadius: 5,
                                                                 marginRight: 10
                                                             }}/>
                                                        <img src={profileLover.avatarImage} alt="Avatar"
                                                             style={{
                                                                 width: 100,
                                                                 height: 100,
                                                                 borderRadius: 5,
                                                                 marginRight: 10
                                                             }}/>
                                                        <img src={profileLover.avatarImage} alt="Avatar"
                                                             style={{
                                                                 width: 100,
                                                                 height: 100,
                                                                 borderRadius: 5,
                                                                 marginRight: 10
                                                             }}/>
                                                        <img src={profileLover.avatarImage} alt="Avatar"
                                                             style={{
                                                                 width: 100,
                                                                 height: 100,
                                                                 borderRadius: 5,
                                                                 marginRight: 10
                                                             }}/>
                                                    </div>
                                                    <br/>
                                                    <div style={{fontSize:20, fontWeight:"bold"}}>DỊCH VỤ CƠ BẢN</div>
                                                    {profileLover.serviceLovers?.map((item) => {
                                                        return (
                                                            <div style={{fontSize:15, marginTop:5}}>
                                                                {item.name}
                                                            </div>
                                                        )
                                                    })}
                                                    <div style={{fontSize:20, fontWeight:"bold"}}>DỊCH VỤ VIP</div>
                                                    {profileLover.vipServices?.map((item) => {
                                                        return (
                                                            <div style={{fontSize:15, marginTop:5}}>
                                                                {item.name}
                                                            </div>
                                                        )
                                                    })}
                                                    <div style={{fontSize:20, fontWeight:"bold"}}>DỊCH VỤ FREE</div>
                                                    {profileLover.freeServices?.map((item) => {
                                                        return (
                                                            <div style={{fontSize:15, marginTop:5}}>
                                                                {item.name}
                                                            </div>
                                                        )
                                                    })}
                                                    <div style={{fontSize:20, fontWeight:"bold"}}>TOP DONATE THÁNG</div>
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
                                                    <div style={{fontSize:20, fontWeight:"bold"}}>ĐÁNH GIÁ</div>
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
            </div>
        </>
    )
}