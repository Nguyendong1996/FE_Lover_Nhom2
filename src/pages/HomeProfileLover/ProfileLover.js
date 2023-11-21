import React, {useEffect, useState} from "react";
import {createProfileLover, findAllFreeService, findByIdLover} from "../../services/ProfileLoverService";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase/Firebase";
import {v4} from "uuid";
import {RingLoader} from "react-spinners";
import {Field, Form, Formik} from "formik";
export const ProfileLover = () =>{
    const [profileLover, setProfileLover] = useState({})
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(false);
    const [check,setCheck] = useState(false);
    let id = localStorage.getItem("idAccount");
    const [isEditingPrice, setIsEditingPrice] = useState(false);

    useEffect(() =>{
        findByIdLover(id).then((res) =>{
            setProfileLover(res)
            if (res.statusLover?.id ===1 || res.statusLover?.id ===2){
                console.log(status)
                setStatus(true);
            }
        }).catch(() =>{
            return {}
        })
        findAllFreeService().then((res) =>{
            console.log(res)
        })
    },[loading,check])
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
            account:{
                id:id,
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
        console.log(file)
        const storageRef = ref(storage, `images/${file.name + v4()}`);
        const uploadTask = uploadBytes(storageRef, file);
        uploadTask.then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const updatedProfileLover = {
                    ...profileLover,

                    account:{
                        id:id,
                    },
                    avatarImage:url}
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
                <div id={"root"} style={{marginTop:'-50%'}}>
                    <div className={"loading-info-user"}>
                        <RingLoader color="#f0564a" loading={true} size={80}/>
                    </div>
                </div>
            </>
        )
    }
    return(
        <>

                    <div className="container player-infomation" style={{marginLeft:300}}>
                        <div className="player-profile-left-wrap col-md-3" style={{marginTop:'10px',marginLeft:'0%'}}>
                            <div className="avt-player false">
                                <div>
                                    <div className="d-flex img-avatar">
                                        <div className="cropimg-avatar div-info-user-1" >
                                            <img src={profileLover.avatarImage} alt=""
                                                 style={{width: 300, height: 300, borderRadius: 10}} onClick={showModalChoseImage}/>
                                            <input type="file" id={"input-avatar-profile-user"}
                                                   onChange={(event) => {
                                                       updateAvt(event.target.files[0])
                                                   }} style={{display: "none"}}/>
                                        </div>
                                    </div>
                                    <div className="rent-time-wrap"><p className="ready">{profileLover.statusLover?.name}</p></div>
                                    <div>
                                        <button onClick={updateStatusLover}>{status ? 'Tắt' : 'Bật'} trạng thái</button>
                                    </div>
                                </div>

                            </div>

                            <div className="social-icon">
                            </div>
                            <div className="member-since">
                                <div>Ngày tham gia:</div>
                                <span>
                                    {profileLover.createdAt}
                            </span>
                            </div>
                        </div>
                        <div className="player-profile-main-wrap col-md-6 col-md-pull-3" style={{marginLeft:'25%'}}>
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
                                        <div className="item-nav-value"><span>{profileLover.totalHourRented} Giờ</span></div>
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
                                            <div style={{marginLeft:'2%'}}>
                                                {!isEditingPrice ? (
                                                    <h5 className="control-label">
                                                        <i onClick={handlePriceEdit}
                                                           className="fas fa-cog info-uimgser-icon"></i>
                                                        <span>Price : {profileLover.price}</span> </h5>
                                                ) : (
                                                    <Formik initialValues={profileLover}
                                                            enableReinitialize={true}
                                                            onSubmit={(e) =>{handlePriceSave(e)}}>
                                                        <Form>
                                                            <div className="fieldGroup "><p className="control-label">New Prcie</p>
                                                                <Field
                                                                    type="text"
                                                                    name="price"
                                                                    placeholder=""
                                                                    maxLength="5000"
                                                                    autoComplete="false"
                                                                    style={{width:'280px'}}
                                                                />
                                                                <button class="btn btn-success">Save</button>
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
                                        <div className="content-player-profile" >
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
                                        <div>
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
                                                                                            href="home/userProfile#">Top Donate
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

        </>
    )
}