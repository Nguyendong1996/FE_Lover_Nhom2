import React from "react";

export function Comment() {
    return (
        <>
            <div className="text-center review-duo-player row">
                <div className="col-md-12">
                    <div className="full-size">
                        <div className="wrapper-content-rating">
                            <div className="review-content">
                                <p className="name-player-review color-vip-1">Nhập đánh giá của bạn:</p>
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
                            <p className="content-player-review">sap xep lai thoi gian ngu nghi nhe</p>
                        </div>
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
        </>
    )
}