import axios from "axios";

export const findByIdAccount = (id) =>{
    return new Promise(resolve => {
        resolve(
            axios.get("http://localhost:8080/api/profileUsers/" + id).then((res) =>{
                return res.data
            })
        )
    })
}