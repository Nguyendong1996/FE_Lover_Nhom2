import axios from "axios";

export function findAllService() {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/serviceLover/findAll")
                .then((res) => {
                    return res.data;
                }).catch(() => {
                return [];
            })
        )
    })
}