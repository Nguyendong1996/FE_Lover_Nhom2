import React, {useContext, useEffect, useState} from 'react';
import {findAllService} from "../../services/ServiceService";
import {AppContext} from "../../context/AppContext";

const SidebarSupplies = () => {

    const [baseServices, setBaseServices] = useState([])
    const {handleBaseServiceChange} = useContext(AppContext);
    const {idBaseService} = useContext(AppContext);

    useEffect(() => {
        findAllService().then((res) => {
            setBaseServices(res)
            console.log(res)
        })
    }, [])
    return (
        <>
            <div className="home-flex-category">
                <div className="fixed-cate">
                    {(idBaseService === 0) ? <p style={{fontSize: 20, color:"#f0564a"}}><span>Dịch vụ cơ bản</span></p>
                        : <p style={{fontSize: 20}}><span>Dịch vụ cơ bản</span></p>
                    }

                    <ul className="list-group">

                        {baseServices.map((item) => {
                            return (
                                <li className="list-item ">
                                    <div className="media">
                                        <div className="media-body media-middle">
                                            {(idBaseService === item.id) ?
                                                <p className="media-heading" style={{fontSize: 15, color: "#f0564a"}}
                                                   onClick={() => handleBaseServiceChange(item.id)}>{item.name}</p> :
                                                <p className="media-heading" style={{fontSize: 15}}
                                                   onClick={() => handleBaseServiceChange(item.id)}>{item.name}</p>}
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    );

};

export default SidebarSupplies;