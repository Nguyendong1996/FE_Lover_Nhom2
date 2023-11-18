import {useEffect, useState} from "react";
import {findAllService} from "../../services/ServiceService";
import {findAllFreeService, findByIdLover, updateListService} from "../../services/ProfileLoverService";
import {findAllVipService} from "../../services/VipService";

export const ServiceProfileLover =() =>{
    const [serviceProfileLover,setServiceProfileLover] = useState([])
    const [freeServiceProfileLover,setFreeServiceProfileLover] = useState([])
    const [vipServiceProfileLover,setVipServiceProfileLover] = useState([])
    const [selectedServices, setSelectedServices] = useState([]);
    const [profileLover,setProfileLover] = useState({})
    let id = localStorage.getItem("idAccount")

    useEffect(() =>{
        findAllService().then((res) =>{
            setServiceProfileLover(res)
        }).catch(() =>{
            return []
        })
        findByIdLover(id).then((res) =>{
            setProfileLover(res)
        }).catch(() =>{
            return {}
        })
        findAllFreeService((res) =>{
            setFreeServiceProfileLover(res)
        }).catch(() =>{
            return []
        })
        findAllVipService().then((res) =>{
            setVipServiceProfileLover(res)
        }).catch(() =>{
            return []
        })
    },[])
    const handleCheckboxChange = (serviceId) => {
        setSelectedServices((prevSelectedServices) => {
            if (prevSelectedServices.includes(serviceId)) {
                return prevSelectedServices.filter((id) => id !== serviceId);
            } else {
                return [...prevSelectedServices, serviceId];
            }
        });
        console.log(selectedServices)
    };
    const handleSubmit = () => {
        updateListService(profileLover.id, selectedServices).then(() => {
            return alert("cập nhập dịch vụ thành công")
        })
    };
    return(
        <>
            <div style={{width:'80%',marginTop:'-47%',marginLeft:'20%'}}>
            <div className="col-md-4">
            <div className="modal-header" style={{textAlign: "center", display: "inline"}}>
                <span style={{fontSize: 25}}>Cập nhật Dịch vụ cơ bản:</span>
            </div>
            <div className="modal-body">
                <div>
                    {serviceProfileLover.map((service) => (
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
                    <button onClick={handleSubmit} className="btn btn-danger">Cập nhật</button>
                </div>
            </div>
            </div>
            <div className="col-md-4">
                <div className="modal-header" style={{textAlign: "center", display: "inline"}}>
                    <span style={{fontSize: 25}}>Cập nhật Dịch vụ Vip:</span>
                </div>
                <div className="modal-body">
                    <div>
                        {vipServiceProfileLover.map((service) => (
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
                        <button onClick={handleSubmit} className="btn btn-danger">Cập nhật</button>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="modal-header" style={{textAlign: "center", display: "inline"}}>
                    <span style={{fontSize: 25}}>Cập nhật Dịch vụ Free:</span>
                </div>
                <div className="modal-body">
                    <div>
                        {freeServiceProfileLover.map((service) => (
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
                        <button onClick={handleSubmit} className="btn btn-danger">Cập nhật</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}