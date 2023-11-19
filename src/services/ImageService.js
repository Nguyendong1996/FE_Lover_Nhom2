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