import axios from "axios";

export function findAllVipService() {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/vipService/findAll")
                .then((res) => {
                    return res.data;
                }).catch(() => {
                return []
            })
        )
    })
}
export function findVipServicesByIdLover(id) {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/vipService/findVipServicesOfLover/" + id)
                .then((res) => {
                    return res.data
                }).catch(() => {
                return []
            })
        )
    })
}