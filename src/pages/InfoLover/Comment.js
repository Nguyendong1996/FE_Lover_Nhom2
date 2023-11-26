import React, {useEffect, useState} from "react";
import {findAllByIdAccountReceive} from "../../services/CommentService";

export function Comment(pros) {
    const [comment,setComment] =useState([]);
    const [check,setCheck] = useState(false);
    const token = localStorage.getItem("token");
    useEffect(() => {
        findAllByIdAccountReceive(pros.id,token).then((res) =>{
            console.log(pros.id +"c")
            setComment(res)
            if (res.length !== 0){
                setCheck(true);
            }
        }).catch(() =>{
            return []
        })
    }, []);
    return (
        <>
            {comment.map((comment) =>{
                const starsArray = Array(comment.rating).fill(null)
                return(
                    <>
                        <div className="text-center review-duo-player row">
                            <div className="col-md-12">
                                <div className="wrapper-content-rating">
                                    <div className="review-content"><a target="_blank"
                                                                       href="https://playerduo.net/page600ce889399d5e2bc1ed8e5d">
                                        <p className="name-player-review color-vip-1">{comment.accountSend?.nickname}</p>
                                    </a>
                                        <p className="time-player-review"><span>{comment.bill?.createdAt}</span>
                                        </p></div>
                                    <div className="review-rating">
                                        <div className="rateting-style">
                                            {starsArray.map((star, index) => (
                                                <i key={index} className="fas fa-star"></i>
                                            ))}
                                            &nbsp;
                                        </div>
                                        <span
                                            className="time-rent-review">(<span>Thuê</span>&nbsp;{comment.bill.time}h)</span>
                                    </div>
                                    <p className="content-player-review">{comment.content}</p></div>
                            </div>
                        </div>
                    </>
                )
            })}

                <div className="col-md-12">
                    <div className="page_account"><p className="active">1</p>
                        <p className="">2</p>
                        <p className="">3</p>
                        <p className="">4</p>
                        <p className="">5</p>
                        <p className="active" style={{cursor: "auto"}}>1/36</p>
                    </div>
                </div>
        </>
    )
}