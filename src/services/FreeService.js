import axios from "axios";

export function findAllFree() {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/freeService/findAll")
                .then((res) => {
                    return res.data;
                }).catch(() => {
                return []
            })
        )
    })
}