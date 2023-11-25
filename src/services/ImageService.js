import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
export const findImagesByIdLover = (id) => {
    return new Promise(resolve => {
        resolve(
            axios.get("http://localhost:8080/api/image/findAllByIdProfileLover/" + id).then((res) => {
                return res.data
            })
        )
    })
}
export const saveImage =(image) =>{
    return new Promise(resolve => {
        resolve(
            axios.post("http://localhost:8080/api/image", image).then(() =>{
                return toast.success("Thêm ảnh thành công")
            })
        )
    })
}
export const deleteImage = (id) =>{
    return new Promise(resolve => {
        resolve(
            axios.delete("http://localhost:8080/api/image/"+id).then(() =>{
                return toast.success("Xóa ảnh thành công")
            }).catch(() =>{
                return toast.error("Ảnh không tồn tại!")
            })
        )
    })
}