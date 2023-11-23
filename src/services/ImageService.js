import axios from "axios";

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
                return alert("thêm ảnh thành công")
            })
        )
    })
}
export const deleteImage = (id) =>{
    return new Promise(resolve => {
        resolve(
            axios.delete("http://localhost:8080/api/image/"+id).then(() =>{
                return alert("xoa anh thanh cong")
            }).catch(() =>{
                return alert("anh khong ton tai")
            })
        )
    })
}