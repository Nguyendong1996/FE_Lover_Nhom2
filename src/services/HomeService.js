import axios from "axios";

export function findAllByNameContaining(name) {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/profileLover/findAllByNickname/" + name)
                .then((res) => {
                    return res.data
                }).catch(() => {
                return []
            })
        )
    })
}

export function findAllByVipService(id) {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/profileLover/findAllByVipService/" + id)
                .then((res) => {
                    return res
                }).catch(() => {
                return []
            })
        )
    })
}

export function findAllByFreeService(id) {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/profileLover/findAllByFreeService/" + id)
                .then((res) => {
                    return res
                }).catch(() => {
                return []
            })
        )
    })
}

export function findAllByBaseService(id) {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/profileLover/findAllByBaseService/" + id)
                .then((res) => {
                    return res.data
                }).catch(() => {
                return []
            })
        )
    })
}

export function findAllStatusLover() {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/profileLover/findAllStatusLover")
                .then((res) => {
                    return res.data
                }).catch(() => {
                return []
            })
        )
    })
}

export function findAllByFilter(filter) {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/profileLover/findAllByFilter", filter)
                .then((res) => {
                    return res.data
                })
                .catch(() => {
                    return [];
                })
        )
    })
}