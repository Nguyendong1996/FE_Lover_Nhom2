import React, {useEffect, useState} from "react";
import {findAllService} from "../../services/ServiceService";
import {
    findAllFreeService,
    findByIdLover,
    updateListFreeService,
    updateListService, updateListVipService
} from "../../services/ProfileLoverService";
import {findAllVipService} from "../../services/VipService";

import './HomeLover.css'
import {toast, ToastContainer} from "react-toastify";
import {confirmAlert} from 'react-confirm-alert';

export function UpdateServicesLover() {
    const [serviceProfileLover, setServiceProfileLover] = useState([])
    const [freeServiceProfileLover, setFreeServiceProfileLover] = useState([])
    const [vipServiceProfileLover, setVipServiceProfileLover] = useState([])
    const [selectedServices, setSelectedServices] = useState([]);
    const [profileLover, setProfileLover] = useState({})
    let id = localStorage.getItem("idAccount")
    let [service, setService] = useState([]);
    let [serviceFree, setServiceFree] = useState([]);
    let [vipService, setVipService] = useState([]);
    const [selectedService, setSelectedService] = useState([]);
    const [check, setCheck] = useState(false)
    const [count, setCount] = useState("")
    useEffect(() => {
        findAllService().then((res) => {
            setServiceProfileLover(res)
        }).catch(() => {
            return []
        })
        findByIdLover(id).then((res) => {
            setProfileLover(res)
            setService(res.serviceLovers)
            setServiceFree(res.freeServices)
            setVipService(res.vipServices)
        }).catch(() => {
            return {}
        })
        findAllVipService().then((res) => {
            console.log(res)
            setVipServiceProfileLover(res)
        }).catch(() => {
            return []
        })
        findAllFreeService().then((res) => {
            console.log(res)
            setFreeServiceProfileLover(res)
        })
            .catch(() => {
                return []
            })
    }, [check])
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
        confirmAlert({
            customUI: ({onClose}) => {
                updateListService(profileLover.id, selectedServices).then(() => {
                    setCheck(!check);
                    setIsExpanded(!isExpanded)
                    return toast.success("Cập nhật dịch vụ cơ bản thành công!")

                })
            }
        });
    };
    const handleUpdateService = () => {
        switch (count) {
            case "":
                toast.error("Vui lòng chọn dịch vụ cần cung cấp!")
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
        confirmAlert({
            customUI: ({onClose}) => {
                updateListFreeService(profileLover.id, selectedServices).then(() => {
                    setCheck(!check)
                    setIsExpanded(!isExpanded)
                    return toast.success("Cập nhập dịch vụ miễn phí thành công")
                })
            }
        });
    }
    const updateVipService = () => {
        confirmAlert({
            customUI: ({onClose}) => {
                updateListVipService(profileLover.id, selectedServices).then(() => {
                    setCheck(!check)
                    setIsExpanded(!isExpanded)
                    return toast.success("Cập nhập dịch vụ VIP thành công")
                })
            }
        });
    }
    const handleServiceChange = (event) => {
        const value = event.target.value;
        switch (value) {
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
    return (
        <>
            <ToastContainer/>
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12" style={{marginTop: 20}}>
                <div style={{}}>
                    <div style={{}}>
                        <div className="service-selet-wrapper" style={{width: 700, display: "flex"}}>
                            <div style={{fontWeight: "bold", fontSize: 20, marginTop: 5}}>DỊCH VỤ CẦN CẬP NHẬP:
                            </div>
                            <div>
                                <select onChange={handleServiceChange}
                                        style={{width: 200, height: 40, marginLeft: 10, marginTop: 0}}
                                        className={"form-control"}>
                                    <option value="">Chọn Dịch Vụ</option>
                                    <option value="1">Dịch Vụ Cơ Bản</option>
                                    <option value="2">Dịch Vụ Miễn Phí</option>
                                    <option value="3">Dịch Vụ VIP</option>
                                </select>
                            </div>
                        </div>
                        <br/>
                        <span style={{fontWeight: "bold", fontSize: 15}}>LỰA CHỌN CỦA BẠN:</span>
                        <div style={{marginTop: 10}}>
                            <div style={{display: "flex", flexWrap: "wrap"}}>
                                <div style={{flexBasis: "50%", maxWidth: "50%", boxSizing: "border-box"}}>
                                    {selectedService.slice(0, 5).map((service) => (
                                        <div key={service.id} style={{display: "flex", alignItems: "center", marginBottom: 8}}>
                                            <input
                                                type="checkbox"
                                                id={`service-${service.id}`}
                                                checked={selectedServices.includes(service.id)}
                                                onChange={() => handleCheckboxChange(service.id)}
                                                style={{marginRight: 8}}
                                            />
                                            <label
                                                htmlFor={`service-${service.id}`}
                                                style={{
                                                    fontSize: 15,
                                                    marginLeft: 5,
                                                    userSelect: "none",
                                                    cursor: "pointer",
                                                    display: "inline-block",
                                                    padding: "8px",
                                                    borderRadius: "5px",
                                                    border: selectedServices.includes(service.id) ,
                                                    backgroundColor: selectedServices.includes(service.id) ,
                                                    color: selectedServices.includes(service.id) ,
                                                }}
                                            >
                                                {service.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div style={{flexBasis: "50%", maxWidth: "50%", boxSizing: "border-box"}}>
                                    {selectedService.slice(5, 10).map((service) => (
                                        <div key={service.id} style={{display: "flex", alignItems: "center", marginBottom: 8}}>
                                            <input
                                                type="checkbox"
                                                id={`service-${service.id}`}
                                                checked={selectedServices.includes(service.id)}
                                                onChange={() => handleCheckboxChange(service.id)}
                                                style={{marginRight: 8}}
                                            />
                                            <label
                                                htmlFor={`service-${service.id}`}
                                                style={{
                                                    fontSize: 15,
                                                    marginLeft: 5,
                                                    userSelect: "none",
                                                    cursor: "pointer",
                                                    display: "inline-block",
                                                    padding: "8px",
                                                    borderRadius: "5px",
                                                    border: selectedServices.includes(service.id) ,
                                                    backgroundColor: selectedServices.includes(service.id),
                                                    color: selectedServices.includes(service.id),
                                                }}
                                            >
                                                {service.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={handleUpdateService}
                                    className="btn btn-danger"
                                    style={{
                                        marginLeft: 10,
                                        border: "2px solid",
                                        display: selectedService.length > 0 ? "inline-block" : "none"
                                    }}
                                    id={"btn-submit-2"}
                                >
                                    <span style={{fontWeight: "bold"}}>CẬP NHẬP</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleToggle} className="btn btn-primary" style={{display: "none"}}>Chọn dịch vụ
                    </button>
                </div>
                <br/>
                <div style={{display: "flex"}}>
                    <div style={{}}>
                        <div style={{}}>
                            <span style={{fontWeight: "bold", color: "grey", fontSize: 15}}>DỊCH VỤ CƠ BẢN:</span>
                        </div>
                        <br/>
                        {service.map((service) => {
                            return (
                                <>
                                    <div style={{marginBottom: 10}}>
                                        <img className={"info-info-image"}
                                             src={service.avatarService} alt=""
                                             style={{width: "30px", height: "30px"}}/>
                                                        <span style={{
                                                            marginLeft: 3,
                                                        }}>{service.name}</span>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    <div style={{marginLeft: 200}}>
                        <div style={{}}>
                            <span style={{fontWeight: "bold", color: "grey"}}>DỊCH VỤ VIP:</span>
                        </div>
                        <br/>
                        {vipService.map((service) => {
                            return (
                                <>
                                    <div style={{marginBottom: 10}}>
                                        <img className={"info-info-image"}
                                             src={service.avatarService} alt=""
                                             style={{width: "30px", height: "30px"}}/>
                                                        <span style={{
                                                            marginLeft: 3,
                                                        }}>{service.name}</span>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    <div style={{marginLeft: 200}}>
                        <div style={{}}>
                            <span style={{fontWeight: "bold", color: "grey"}}>DỊCH VỤ FREE:</span>
                        </div>
                        <br/>
                        {serviceFree.map((service) => {
                            return (
                                <>
                                    <div style={{marginBottom: 10}}>
                                        <img className={"info-info-image"}
                                             src={service.avatarService} alt=""
                                             style={{width: "30px", height: "30px"}}/>
                                        <span style={{
                                            marginLeft: 3,
                                        }}>{service.name}</span>
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