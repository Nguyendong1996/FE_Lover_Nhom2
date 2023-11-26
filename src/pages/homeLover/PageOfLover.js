import {Field, Form, Formik} from "formik";
import React, {useContext, useEffect, useState} from "react";
import {createProfileLover, findAllFreeService, findByIdLover} from "../../services/ProfileLoverService";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase/Firebase";
import {v4} from "uuid";
import {RingLoader} from "react-spinners";
import {ModalListImage} from "../InfoLover/ModalListImage";
import {AppContext} from "../../context/AppContext";
import {findImagesByIdLover} from "../../services/ImageService";
import {findAllByIdAccountReceive} from "../../services/CommentService";
import {Comment} from "../InfoLover/Comment";


export function PageOfLover(props) {
    const [profileLover, setProfileLover] = useState({})
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(false);
    const [check, setCheck] = useState(false);
    let id = localStorage.getItem("idAccount");
    const [isEditingPrice, setIsEditingPrice] = useState(false);
    const [comment,setComment] =useState([]);

    useEffect(() => {
        findByIdLover(id).then((res) => {
            setProfileLover(res)
            if (res.statusLover?.id === 1 || res.statusLover?.id === 2) {
                console.log(status)
                setStatus(true);
            }
        }).catch(() => {
            return {}
        })
        findAllFreeService().then((res) => {
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
    // xử lí modal ảnh
    const [images, setImages] = useState([])
    const {viewImage, setViewImage} = useContext(AppContext);
    useEffect(() => {
        findImagesByIdLover(props.idLover)
            .then((res) => {
                setImages(res)
            })
    }, [props.idLover])


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
                                                <div
                                                    style={{display: "flex", textAlign: "center", position: "relative", cursor:"pointer"}}
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
                                                            left: "66%",
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
                                                                              idLover={profileLover.id}/>}
                                                <div style={{fontSize: 15, marginTop:10}}>
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
                                                    <div style={{fontSize:20, fontWeight:"bold"}}>DỊCH VỤ CƠ BẢN</div>
                                                    {profileLover.serviceLovers?.map((item) => {
                                                        return (
                                                            <div style={{fontSize:15, marginTop:5}}>
                                                                {item.name}
                                                            </div>
                                                        )
                                                    })}
                                                    <br/>
                                                    <div style={{fontSize:20, fontWeight:"bold"}}>DỊCH VỤ VIP</div>
                                                    {profileLover.vipServices?.map((item) => {
                                                        return (
                                                            <div style={{fontSize:15, marginTop:5}}>
                                                                {item.name}
                                                            </div>
                                                        )
                                                    })}
                                                    <br/>
                                                    <div style={{fontSize:20, fontWeight:"bold"}}>DỊCH VỤ FREE</div>
                                                    {profileLover.freeServices?.map((item) => {
                                                        return (
                                                            <div style={{fontSize:15, marginTop:5}}>
                                                                {item.name}
                                                            </div>
                                                        )
                                                    })}
                                                    <br/>
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
                                                            <Comment id={id}/>
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