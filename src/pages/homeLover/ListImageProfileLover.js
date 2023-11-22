import React, {useEffect, useState} from "react";
import "../../css/image.css"
import {findImagesByIdLover} from "../../services/ImageService";
export const ListImageProfileLover =() =>{
    const [images, setImages] = useState([])
useEffect(() =>{
    findImagesByIdLover(4).then((res) =>{
        setImages(res)
        console.log(res)
    })
},[])
    function showModalChoseImage() {
        const fileInput = document.getElementById('input-avatar-profile-user');
        fileInput.click();
    }
    return(
        <>
            <div className="list-container" style={{marginTop:'-40%',marginLeft:'25%'}}>
            <div className="image-list">
                {images.map((image, index) => (
                    <div className="image-item" key={index}>
                        <img src={image.urlImage} alt={image.alt} />
                    </div>
                ))}
                <div className="image-item">
                <div className="image-frame">
                   <button onClick={showModalChoseImage}><img alt="Thêm ảnh" /></button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}