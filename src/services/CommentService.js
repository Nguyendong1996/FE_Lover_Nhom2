import axios from "axios";

export const createCommentByBill = (comment) => {
    return new Promise((resolve) => {
        axios.post("http://localhost:8080/api/comments", comment)
            .then(response => {
                // Xử lý kết quả thành công
                resolve(response.data);
            })
            .catch(error => {
                // Xử lý lỗi
            });
    });
};
export const findAllByIdAccountReceive = (id,token) =>{
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/comments/findAllByIdAccountReceive/"+id,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    return res.data;
                }).catch(() => {
                return []
            })
        )
    })
}