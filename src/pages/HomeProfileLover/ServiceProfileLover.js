import React, {useEffect, useState} from "react";
import {findAllService} from "../../services/ServiceService";
import {
    findAllFreeService,
    findByIdLover,
    updateListFreeService,
    updateListService, updateListVipService
} from "../../services/ProfileLoverService";
import {findAllVipService} from "../../services/VipService";
import "../HomeProfileLover/Service.css"
import {useNavigate} from "react-router";
import {RingLoader} from "react-spinners";

export const ServiceProfileLover =() =>{
    const [serviceProfileLover,setServiceProfileLover] = useState([])
    const [freeServiceProfileLover,setFreeServiceProfileLover] = useState([])
    const [vipServiceProfileLover,setVipServiceProfileLover] = useState([])
    const [selectedServices, setSelectedServices] = useState([]);
    const [profileLover,setProfileLover] = useState({})
    let id = localStorage.getItem("idAccount")
    let [service, setService] = useState([]);
    let [serviceFree, setServiceFree] = useState([]);
    let [vipService, setVipService] = useState([]);
    const [selectedService, setSelectedService] = useState([]);
    const [check,setCheck] = useState(false)
    const [count,setCount] = useState("")
    useEffect(() =>{
        findAllService().then((res) =>{
            setServiceProfileLover(res)
        }).catch(() =>{
            return []
        })
        findByIdLover(id).then((res) =>{
            setProfileLover(res)
            setService(res.serviceLovers)
            setServiceFree(res.freeServices)
            setVipService(res.vipServices)
        }).catch(() =>{
            return {}
        })
        findAllVipService().then((res) =>{
            console.log(res)
            setVipServiceProfileLover(res)
        }).catch(() =>{
            return []
        })
        findAllFreeService().then((res) =>{
            console.log(res)
            setFreeServiceProfileLover(res)
        })
       .catch(() =>{
            return []
        })
    },[check])
    const handleCheckboxChange = (serviceId) => {
        setSelectedServices((prevSelectedServices) => {
            if (prevSelectedServices.includes(serviceId)) {
                return prevSelectedServices.filter((id) => id !== serviceId);
            } else {
                return [...prevSelectedServices, serviceId];
            }
        });
    };
    const handleSubmit = () => {
        updateListService(profileLover.id, selectedServices).then(() => {
            setCheck(!check);
            setIsExpanded(!isExpanded)
            return alert("cập nhập dịch vụ thành công")

        })
    };
    const handleUpdateService = () =>{
        switch (count){
            case "":
                alert("bạn vui lòng chọn dịch vụ cần cung cấp")
                break;
            case "1":
                handleSubmit()
                break;
            case "2":
                updateFreeService();
                break;
            case "3":
                updateVipService();
                break;
        }
    }
    const updateFreeService = () => {
        updateListFreeService(profileLover.id, selectedServices).then(() => {
            setCheck(!check)
            setIsExpanded(!isExpanded)
            return alert("cập nhập dịch vụ miễn phí thành công")
        })
    }
    const updateVipService = () => {
        updateListVipService(profileLover.id, selectedServices).then(() => {
            setCheck(!check)
            setIsExpanded(!isExpanded)
            return alert("cập nhập dịch vụ Víp thành công")
        })
    }
    const handleServiceChange = (event) => {
        const value = event.target.value;
        switch (value){
            case "":
                setSelectedService([]);
                setCount("");
                break;
            case "1":
                setSelectedService(serviceProfileLover);
                setCount("1")
                break;
            case "2":
                setSelectedService(freeServiceProfileLover);
                setCount("2")
                break;
            case "3":
                setSelectedService(vipServiceProfileLover);
                setCount("3")
                break;
        }
    };
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };
    return(
        <>
            <div style={{width:'80%',marginTop:'-47%',marginLeft:'20%'}}>
                <h2 style={{textAlign:'center',marginLeft:'-10%',color:'red'}}>Dịch vụ profile Lover</h2>
                <hr/>
                <div className="service-list-container">
                    <div className="service-select-wrapper">
                        <label htmlFor="services">Cập Nhập Dịch Vụ:</label>
                        <select id="services" onChange={handleServiceChange}>
                            <option value="">Chọn Dịch Vụ</option>
                            <option value="1">Dịch Vụ Cơ Bản</option>
                            <option value="2">Dịch Vụ Miễn Phí</option>
                            <option value="3">Dịch Vụ VIP</option>
                        </select>
                    </div>
                    <div className={`service-update-wrapper ${ isExpanded ? 'expanded' : ''}`} style={{marginLeft:'-20%'}}>
                        <div className="modal-header" style={{ textAlign: "left" }}>
                            <span style={{ fontSize: 25 }}>Cập nhật Dịch vụ:</span>
                        </div>
                            <div>
                                <div className="modal-body">
                                    {selectedService.map((service) => (
                                        <div key={service.id}>
                                            <input
                                                type="checkbox"
                                                id={`service-${service.id}`}
                                                checked={selectedServices.includes(service.id)}
                                                onChange={() => handleCheckboxChange(service.id)}
                                            />
                                            <label htmlFor={`service-${service.id}`}>{service.name}</label>
                                        </div>
                                    ))}
                            </div>
                            <button onClick={handleUpdateService} className="btn btn-danger">Cập nhật</button>
                        </div>
                    </div>
                </div>
                <button onClick={handleToggle} className="btn btn-primary">Chọn dịch vụ</button>
                <hr/>
                <div>
            <div className="col-md-4">
                <div style={{marginBottom: 10}}>
                    <i className="bi bi-check-all" style={{color: "#d81a1a"}}/>
                    <span style={{fontWeight: "bold", color: "grey"}}>Dịch Vụ cơ bản:</span>
                    <i className="bi bi-gear-fill" id={"setting-nickname-profile-user"}
                       data-bs-toggle={"modal"}
                       data-bs-target={"#edit-info-profile-user"}>
                    </i>
                </div>
                {service.map((service) => {
                    return (
                        <>
                            <div style={{marginBottom: 10}}>
                                <img className={"info-info-image"} style={{marginLeft: 3}}
                                     src={service.avatarService} alt=""/>
                                <span style={{marginLeft: 3, fontStyle: "italic"}}>{service.name}</span>
                            </div>
                        </>
                    )
                })}
            </div>
            <div className="col-md-4">
                <div style={{marginBottom: 10}}>
                    <i className="bi bi-check-all" style={{color: "#d81a1a"}}/>
                    <span style={{fontWeight: "bold", color: "grey"}}>Dịch Vụ Vip:</span>
                    <i className="bi bi-gear-fill" id={"setting-nickname-profile-user"}
                       data-bs-toggle={"modal"}
                       data-bs-target={"#edit-info-profile-user"}>
                    </i>
                </div>
                {vipService.map((service) => {
                    return (
                        <>
                            <div style={{marginBottom: 10}}>
                                <img className={"info-info-image"} style={{marginLeft: 3}}
                                     src={service.avatarService} alt=""/>
                                <span style={{marginLeft: 3, fontStyle: "italic"}}>{service.name}</span>
                            </div>
                        </>
                    )
                })}
            </div>
            <div className="col-md-4">
                <div style={{marginBottom: 10}}>
                    <i className="bi bi-check-all" style={{color: "#d81a1a"}}/>
                    <span style={{fontWeight: "bold", color: "grey"}}>Dịch Vụ free:</span>
                    <i className="bi bi-gear-fill" id={"setting-nickname-profile-user"}
                       data-bs-toggle={"modal"}
                       data-bs-target={"#edit-info-profile-user"}>
                    </i>
                </div>
                {serviceFree.map((service) => {
                    return (
                        <>
                            <div style={{marginBottom: 10}}>
                                <img className={"info-info-image"} style={{marginLeft: 3}}
                                     src={service.avatarService} alt=""/>
                                <span style={{marginLeft: 3, fontStyle: "italic"}}>{service.name}</span>
                            </div>
                        </>
                    )
                })}
            </div>
                </div>
            </div>
        </>
    )
}