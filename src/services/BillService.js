import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
export function findAllByAccountUserId(id, token) {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/bill/findAllByAccountUserId/" + id,
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
                    return res.data
                }).catch(() => {
                // toast.error("User đã huỷ đơn trước đó!")
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
                    alert(res)
                }).catch(() => {
                    // toast.error("User đã huỷ đơn trước đó!")
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
                toast.error("Xảy ra lỗi ở phía máy chủ!")
            })
        )
    })
}
export function doneBillByLover1(idBill, token) {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/bill/doneBillByProfileLover/" + idBill,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(() => {
                }).catch(() => {
                toast.error("Xảy ra lỗi ở phía máy chủ!")
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

                }).catch(() => {

            })
        )
    })
}
export function acceptBillByIdAccountLover1(idBill, token) {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/bill/lover-accept-bill/" + idBill,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    return res.data
                }).catch(() => {
                // alert("Đơn này không còn tồn tại!")
            })
        )
    })
}
export const listBillProfileLover = (id,token) =>{
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/bill/listBillByAccountProfileLoverId/" + id,
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
export const listHistoryBillProfileLover = (id,token) =>{
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/bill/listHistoryBillByAccountProfileLoverId/" + id,
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
export const listHistoryBillProfileUser = (id,token) =>{
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/bill/listHistoryBillByAccountProfileUserId/" + id,
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
export const listBillProfileUser = (id,token) =>{
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/bill/listBillByAccountProfileUserId/" + id,
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
export const cancelBillUser = (id,token) =>{
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/bill/cancelBill/" + id,
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