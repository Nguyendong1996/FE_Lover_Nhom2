import axios from "axios";
export const findAllLover = () =>{
    return new Promise(resolve => {
        resolve(
            axios.get("http://localhost:8080/api/profileLoves").then((res) =>{
                return res.data
            }).catch(()=>{
                return []
            }))
    })
}

export const findByIdLover = (id) =>{
    return new Promise( resolve => {
        resolve(
            axios.get("http://localhost:8080/api/profileLoves/findByIdAccount/" + id).then((res) =>{
                return res.data
            })
        )
    })
}
export const SortProfileLoversByMoneyDescending = () =>{
    return new Promise(resolve => {
        resolve(
            axios.get("http://localhost:8080/api/profileLoves/sortProfileLoversByMoneyDescending").then((res) =>{
                return res.data
            })
        )
    })
}
export const findAllGender = () =>{
    return new Promise(resolve => {
        resolve(
            axios.get("http://localhost:8080/api/genders").then((res) =>{
                return res.data
            })
        )
    })
}
export const updateProfileLover = (profileLover,navigate) =>{
    return new Promise(resolve => {
        resolve(
            axios.post("http://localhost:8080/api/profileLoves/update",profileLover).then(() =>{
                    return navigate("/homeProfileLover")
                }
            )
        )
    })
}

export const findAllCountry = () =>{
    return new Promise(resolve => {
        resolve(
            axios.get("http://localhost:8080/api/countrys").then((res) =>{
                return res.data
            })
        )
    })
}
export const findAllCityByIdCountry =(id) =>{
    return new Promise(resolve => {
        resolve(
            axios.get("http://localhost:8080/api/citys/findAllById/" + id).then((res) =>{
                return res.data
            })
        )
    })
}
export const findAllService = () =>{
    return new Promise(resolve => {
        resolve(
            axios.get("http://localhost:8080/api/services").then((res) =>{
                return res.data
            })
        )
    })
}
export const updateListService = (profileLoverId, services) => {
    return axios
        .post(`http://localhost:8080/api/profileLoves/services/${profileLoverId}`, services)
        .then((res) => {
            return res.data; // Trả về dữ liệu phản hồi từ API nếu cần thiết
        })
        .catch((error) => {
            console.error("Lỗi khi cập nhật dịch vụ:", error);
            throw error;
        });
};
export const updateListFreeService = (profileLoverId, freeServices) => {
    return axios
        .post(`http://localhost:8080/api/profileLoves/freeServices/${profileLoverId}`, freeServices)
        .then((res) => {
            return res.data; // Trả về dữ liệu phản hồi từ API nếu cần thiết
        })
        .catch((error) => {
            console.error("Lỗi khi cập nhật dịch vụ:", error);
            throw error;
        });
};
export const findAllFreeService = () =>{
    return new Promise(resolve => {
        resolve(
            axios.get("http://localhost:8080/api/freeService/findAll").then((res) =>{
                return res.data
            })
        )
    })
}
export const findAllVipService = () =>{
    return new Promise(resolve => {
        resolve(
            axios.get("http://localhost:8080/api/vipService/findAll").then((res) =>{
                return res.data
            })
        )
    })
}
export const updateListVipService = (profileLoverId, freeServices) => {
    return axios
        .post(`http://localhost:8080/api/profileLoves/vipServices/${profileLoverId}`, freeServices)
        .then((res) => {
            return res.data; // Trả về dữ liệu phản hồi từ API nếu cần thiết
        })
        .catch((error) => {
            console.error("Lỗi khi cập nhật dịch vụ:", error);
            throw error;
        });
};
export const createProfileLover = (profileLover) =>{
    return new Promise(resolve => {
        resolve(
            axios.post("http://localhost:8080/api/profileLoves/update",profileLover).then(() =>{
                }
            )
        )
    })
}
export function userSendRequestRegisterToLover(profileLover, idAccount,token) {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/profileLover/userSendRequestRegisterToLover/" + idAccount, profileLover,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((res) => {
                return res.data
            })
                .catch((err) => {
                    return err
                })
        )
    })
}
export const findAllLoverByIdRoles = (idRoles) =>{
    return new Promise(resolve => {
        resolve(
            axios.post("http://localhost:8080/api/profileLoves/findAllProfileLoverByRoles/"+idRoles).then((res) =>{
                return res.data
            })
        )
    })
}