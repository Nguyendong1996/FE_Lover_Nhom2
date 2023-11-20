import Modal from 'react-modal';
import {toast, ToastContainer} from "react-toastify";
import {Field, Form, Formik} from "formik";
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {findImagesByIdLover} from "../../services/ImageService";
import "./ModalListImage.css"

const customStyles = {
    overlay: {
        background: 'rgba(0, 0, 0, 0.5)', // Thêm CSS để làm nền tối lại
        zIndex: 1000, // Xác định vị trí stacking order của overlay
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent', // Màu nền tối
        border: 'none', // Xóa viền của modal (tuỳ chọn)
    },
};

export function ModalListImage(props) {
    const {viewImage, setViewImage} = useContext(AppContext);

    // modal:
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(viewImage);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setViewImage(false);
    }



    function showDemo() {
        let imgFeature = document.querySelector(".image-main")
        let listImg = document.querySelectorAll(".list-img img")
        let prevBtn = document.querySelector(".prev")
        let nextBtn = document.querySelector(".next")
        let currentIndex = 0;
        updateImageByIndex(0)

        function updateImageByIndex(index) {
            document.querySelectorAll('.list-img div').forEach(item => {
                item.classList.remove("active-modal-image")
            })
            currentIndex = index
            imgFeature.src = listImg[index].getAttribute('src')
            listImg[index].parentElement.classList.add('active-modal-image')
        }

        listImg.forEach((imgElement, index) => {
            imgElement.addEventListener('click', e => {
                updateImageByIndex(index)
            })
        })
        prevBtn.addEventListener("click", e => {
            if (currentIndex === 0) {
                currentIndex = listImg.length - 1
            } else {
                currentIndex--
            }
            updateImageByIndex(currentIndex)
        })
        nextBtn.addEventListener("click", e => {
            if (currentIndex === listImg.length -1) {
                currentIndex = 0
            } else {
                currentIndex++
            }
            updateImageByIndex(currentIndex)
        })
    }



    // xử lí ảnh
    const [images, setImages] = useState([])
    useEffect(() => {
        findImagesByIdLover(props.idLover).then((res) => {
            setImages(res)
        })
    }, [props.idLover])
    return (
        <>
            {/*start modal*/}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}
                    style={{display: "none"}}>Hello</h2>
                <div id="container-modal-list-image">
                    <div className="main">
                        <img src={images[0]?.urlImage} className="image-main" alt=""/>
                        <div className={"control prev"}><i className="fa fa-angle-left"></i></div>
                        <div className={"control next"}><i className="fa fa-angle-right"></i></div>
                    </div>
                    <div className="list-img">
                        {images.map((i) => {
                            return (
                                <div style={{margin: 5}}><img onClick={showDemo} src={i.urlImage}
                                                              className="image-in-list" alt=""/></div>
                            )
                        })}
                    </div>
                </div>
            </Modal>
            {/*end modal*/}
        </>
    )

}