import React, {useEffect, useState} from "react";
import "../../css/image.css"
import {deleteImage, findImagesByIdLover, saveImage} from "../../services/ImageService";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase/Firebase";
import {v4} from "uuid";
import {RingLoader} from "react-spinners";

export const ListImageProfileLover = (drops) => {
    const [images, setImages] = useState([])
    const [count, setCount] = useState(0);
    let idAccount = localStorage.getItem("idAccount")
    const [loading, setLoading] = useState(false)
    const [idImage,setIdImage] = useState(0);
    useEffect(() => {
        findImagesByIdLover(drops.profleLover.id).then((res) => {
            setImages(res)
            console.log(res)
            setCount(res.length)
            console.log(res.length)
        })
    }, [count, idAccount])

    function updateImage(file) {
        setLoading(true)
        const storageRef = ref(storage, `images/${file.name + v4()}`);
        const uploadTask = uploadBytes(storageRef, file);
        uploadTask.then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const img = {
                    urlImage: url,
                    profileLover: {
                        id: drops.profleLover.id,
                    }
                }

                saveImage(img).then(() => {
                    setCount(count + 1)
                    setLoading(false)

                })
            })
        })
    }

    function create(file, id) {
        setLoading(true)
        const storageRef = ref(storage, `images/${file.name + v4()}`);
        const uploadTask = uploadBytes(storageRef, file);
        uploadTask.then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const image = {
                    id: id,
                    urlImage: url,
                    profileLover: {
                        id: drops.profleLover.id,
                    }
                }
                saveImage(image).then(() => {
                    setLoading(false)
                    setCount(count + 1)
                })
            })
        })
    }

    function showModalChoseImage(id) {
        setIdImage(id)
        const fileInput = document.getElementById('input-avatar-profile-user');
        fileInput.click();
    }
    function showModalChoseImage1() {
        const fileInput = document.getElementById('input-avatar-profile-user1');
        fileInput.click();
    }
    function deleteImage1(id){
        // eslint-disable-next-line no-restricted-globals
        if (confirm("ban co muon xoa anh nay khong ?")){
            deleteImage(id).then((res) =>{
                setCount(count -1)
            })
        }
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
            <div className="list-container" style={{marginTop: '-40%', marginLeft: '25%'}}>
                <div className="image-list">
                    {images.map((image, index) => {

                        return (
                            <div className="image-item" key={index}>
                                <i className="fas fa-times" onClick={() =>{deleteImage1(image.id)}}></i>
                                <img src={image.urlImage} alt={image.alt} onClick={() =>{showModalChoseImage(image.id)}}/>
                                <input
                                    type="file"
                                    id="input-avatar-profile-user"
                                    onChange={(event) => {
                                        create(event.target.files[0],idImage)
                                    }}
                                    style={{ display: "none" }}
                                />
                            </div>
                        );
                    })}
                    <div className="image-item">
                        { count < 10  && <div className="image-frame">
                            <div>
                                <img src="../image/img_5.png" alt="Them anh"
                                     style={{width: '100%', height: '100%', borderRadius: 10}}
                                     onClick={showModalChoseImage1}/>
                                <input type="file" id={"input-avatar-profile-user1"}
                                       onChange={(event) => {
                                           updateImage(event.target.files[0])
                                       }} style={{display: "none"}}/>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}