import React, {useContext, useEffect, useState} from "react";
import "./FormComment.css"
import {AppContext} from "../context/AppContext";
import {Field, Form, Formik} from "formik";
import {createCommentByBill} from "../services/CommentService";
import {createBill, save} from "../services/BillService";

export function FormComment(props) {
    const {showComment, setShowComment} = useContext(AppContext);
    const token = localStorage.getItem("token")
    const handleSubmit = (values) => {
        const comment = {
            accountSend:{
                id:props.bill.accountUser.id,
            },
            accountReceive:{
                id:props.bill.accountLover.id,
            },
            content:values.content,
            bill:{
                id:props.bill.id,
            },
            rating:values.rating
        }
       const bills ={
            ... props.bill,
           assessment:true,
        }
        console.log(comment);
        createCommentByBill(comment).then(() =>{
            alert("cam on ban da danh gia")
        })
        save(bills,token).then(() =>{
        })

    };
    return (
        <>
            <div className="message__popup  false"
                 style={{width: '66.66%', height: '85%', backgroundColor: "transparent", marginRight: 230}}>
                <div className="message__popup--icon" style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                    backgroundColor: "white",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                    border: "none"
                }}>
                    <div style={{display: "flex"}}>
                        <h3 style={{marginLeft: "45%"}}>Đánh Giá </h3>
                        <button style={{marginLeft: 335, height: 40, border: "none", fontWeight: "bold", fontSize: 15}}
                                className={"btn"} onClick={() => setShowComment(false)}>Thoát
                        </button>
                    </div>
                    <hr/>
                    <div style={{height: 'calc(100% - 400px)'}}> {/* Điều chỉnh chiều cao phần lịch sử tin nhắn */}
                        Đánh giá gần nhất của bạn
                    </div>
                    <hr/>
                    <Formik initialValues={{rating: 0, content: ""}} onSubmit={handleSubmit}>
                        <Form>
                            <div className="star-rating">
                                <div className="star-rating">
                                    <Field type="radio" id="star5" name="rating" value="5"/>
                                    <label htmlFor="star5"></label>
                                    <Field type="radio" id="star4" name="rating" value="4"/>
                                    <label htmlFor="star4"></label>
                                    <Field type="radio" id="star3" name="rating" value="3"/>
                                    <label htmlFor="star3"></label>
                                    <Field type="radio" id="star2" name="rating" value="2"/>
                                    <label htmlFor="star2"></label>
                                    <Field type="radio" id="star1" name="rating" value="1"/>
                                    <label htmlFor="star1"></label></div>
                            </div>
                            <hr/>
                            <div style={{marginLeft: 0}}>
                                <div style={{marginLeft: 0}}>Nội dung đánh giá</div>
                                <Field type="text" name="content"/>
                                <button type="submit">Gửi</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}