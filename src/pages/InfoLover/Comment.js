import React, { useEffect, useState } from "react";
import { findAllByIdAccountReceive } from "../../services/CommentService";

export function Comment(props) {
    const [comment, setComment] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        findAllByIdAccountReceive(props.id, token)
            .then((res) => {
                setComment(res);
            })
            .catch(() => {
                return [];
            });
    }, [props.id]);

    return (
        <>
                    {comment.map((comments) => {
                        const rating = comments?.rating;
                        let starsArray = []
                        if (rating !== undefined) {
                            starsArray = Array(rating).fill(null);
                        }
                        return (
                            <div key={comments?.id} className="text-center review-duo-player row">
                                <div className="col-md-12">
                                    <div className="wrapper-content-rating">
                                        <div className="review-content">
                                            <a
                                                target="_blank"
                                                href="https://playerduo.net/page600ce889399d5e2bc1ed8e5d"
                                            >
                                                <p className="name-player-review color-vip-1">
                                                    {comments?.accountSend?.nickname}
                                                </p>
                                                 ({comments.createdAt?.slice(11,19)} ngày {comments.createdAt?.slice(0,10)}):
                                            </a>
                                        </div>
                                        <div className="review-rating">
                                            <div className="rateting-style">
                                                {starsArray.map((star, index) => (
                                                    <i key={index} className="fas fa-star"></i>
                                                ))}
                                                &nbsp;
                                            </div>
                                            <span className="time-rent-review">
                        (<span>Thuê</span>&nbsp;{comments?.bill?.time}h)
                      </span>
                                        </div>
                                        <p className="content-player-review" style={{fontWeight:"bold"}}>{comments?.content}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="col-md-12">
                        <div className="page_account">
                            <p className="active">1</p>
                            <p className="">2</p>
                            <p className="">3</p>
                            <p className="">4</p>
                            <p className="">5</p>
                            <p className="active" style={{ cursor: "auto" }}>
                                1/36
                            </p>
                        </div>
                    </div>
        </>
    );
}