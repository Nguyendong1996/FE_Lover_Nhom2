import axios from "axios";

export function findAllByAccountLoverId(id, token) {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/bill/findAllByAccountLoverId/" + id,
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

export function deleteById(id, token) {
    return new Promise((resolve) => {
        resolve(
            axios.delete("http://localhost:8080/api/bill/deleteById/" + id,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    alert(res.data)
                }).catch(() => {
            })
        )
    })
}

export function rejectBillByIdAccountLover(idBill, token) {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/bill/loverRejectBill/" + idBill,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    alert(res.data)
                }).catch(() => {
                alert("Đơn này không còn tồn tại!")
            })
        )
    })
}
export function acceptBillByIdAccountLover(idBill,idAccountLover, token) {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/bill/loverAcceptBill/" + idBill + "/" + idAccountLover,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    alert(res.data)
                }).catch(() => {
                alert("Đơn này không còn tồn tại!")
            })
        )
    })
}
export function doneBillByLover(idBill,idAccountLover, token) {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/bill/doneBillByLover/" + idBill + "/" + idAccountLover,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(() => {
                }).catch(() => {
                alert("Xảy ra lỗi ở phía máy chủ!")
            })
        )
    })
}
export function createBill(bill, token) {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/bill/createBill", bill,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(() => {
                    alert("Tạo bill thành công!")
                }).catch(() => {
                alert("Xảy ra lỗi trong quá trình tạo bill!")
            })
        )
    })
}