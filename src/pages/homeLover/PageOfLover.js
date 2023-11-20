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
                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12" >
                    <div style={{display: "flex", marginTop:10}}>
                        <div className="player-profile-left-wrap col-md-3">
                            <div className="d-flex img-avatar">
                                <div className="cropimg-avatar div-info-user-1">
                                    <img src={profileLover.avatarImage} alt=""
                                         style={{width: 300, height: 300, borderRadius: 10}}
                                         onClick={showModalChoseImage}/>
                                    <input type="file" id={"input-avatar-profile-user"}
                                           onChange={(event) => {
                                               updateAvt(event.target.files[0])
                                           }} style={{display: "none"}}/>
                                </div>
                            </div>
                            <div className="rent-time-wrap"><p className="ready">{profileLover.statusLover?.name}</p>
                            </div>
                            <div>
                                <button onClick={updateStatusLover}>{status ? 'Tắt' : 'Bật'} trạng thái</button>
                            </div>
                            <div className="member-since">
                                <div>Ngày tham gia:</div>
                                <span>
                                    {profileLover.createdAt}
                            </span>
                            </div>
                        </div>
                        <div className="player-profile-main-wrap col-md-6 col-md-pull-3" style={{marginLeft: 400, width:600}}>
                            <div>
                                <div className="row">
                                    <div className="center-item col-md-12">
                                    <span
                                        className="name-player-profile hidden-over-name">{profileLover.account?.nickname} 🐰🐰</span>
                                    </div>
                                </div>
                                <div className="nav-player-profile row">
                                    <div className="col-md-3 col-xs-6">
                                        <div className="item-nav-name"><span>Số Lượt thuê</span></div>
                                        <div className="item-nav-value">{profileLover.totalViews} <span>Lượt</span></div>
                                    </div>
                                    <div className="col-md-3 col-xs-6">
                                        <div className="item-nav-name"><span>Thời Gian được thuê</span></div>
                                        <div className="item-nav-value"><span>{profileLover.totalHourRented} Giờ</span>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-xs-6">
                                        <div className="item-nav-name"><span>Tỷ lệ hoàn thành</span></div>
                                        <div className="item-nav-value">100&nbsp;%</div>
                                    </div>
                                    <div className="col-md-3 col-xs-6">
                                        <div className="item-nav-name"><span>Thu nhập</span></div>
                                        <div className="item-nav-value">{profileLover.totalMoneyRented}</div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <div className="title-player-profile row">
                                            <div style={{marginLeft: '2%'}}>
                                                {!isEditingPrice ? (
                                                    <h5 className="control-label">
                                                        <i onClick={handlePriceEdit}
                                                           className="fas fa-cog info-uimgser-icon"></i>
                                                        <span>Price : {profileLover.price}</span></h5>
                                                ) : (
                                                    <Formik initialValues={profileLover}
                                                            enableReinitialize={true}
                                                            onSubmit={(e) => {
                                                                handlePriceSave(e)
                                                            }}>
                                                        <Form>
                                                            <div className="fieldGroup "><p className="control-label">New
                                                                Prcie</p>
                                                                <Field
                                                                    type="text"
                                                                    name="price"
                                                                    placeholder=""
                                                                    maxLength="5000"
                                                                    autoComplete="false"
                                                                    style={{width: '280px'}}
                                                                />
                                                                <button className="btn btn-success">Save</button>
                                                            </div>
                                                        </Form>
                                                    </Formik>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="title-player-profile row">
                                            <div className="col-xs-6"><span>Thông tin</span></div>
                                        </div>
                                        <div className="content-player-profile" style={{width:600}}>
                                            <p>{profileLover.description}</p>
                                            <div className="album-of-player">
                                                <div>
                                                    <div className="avt avt-lg">
                                                        <img src={profileLover.avatarImage} alt="Avatar"
                                                             style={{width: "60%", height: "60%"}}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    <p>Bình luận</p>
                    <p>Bình luận</p>
                    <p>Bình luận</p>
                    <p>Bình luận</p>
                    <p>Bình luận</p>
                    <p>Bình luận</p>
                    <p>Bình luận</p>
                    <p>Bình luận</p>
                    <p>Bình luận</p>
                    <p>Bình luậnd</p>
                    </div>

                </div>
        </>
    )
}