import React, {useContext, useEffect, useState} from 'react';
import {findAllService} from "../../services/ServiceService";
import {AppContext} from "../../context/AppContext";

const SidebarSupplies = () => {

    const [baseServices, setBaseServices] = useState([])
    const {handleBaseServiceChange} = useContext(AppContext);
    const {idBaseService} = useContext(AppContext);
    const {setVisibleProducts} = useContext(AppContext);

    function change1(id) {
        handleBaseServiceChange(id)
        setVisibleProducts(4)
    }

    function change2() {
        handleBaseServiceChange(0)
        setVisibleProducts(4)
    }

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
                    <div>
                        {(idBaseService === 0) ?
                            <button style={{fontSize: 20, marginLeft: 4, color:"#f0564a", border:"none"}} className="media-heading" onClick={change2}>Dịch vụ cơ bản</button>
                            : <button style={{fontSize: 20, border:"none", marginLeft: 4}} className="media-heading" onClick={change2}>Dịch vụ cơ bản</button>
                        }
                    </div>

                    <ul className="list-group">

                        {baseServices.map((item) => {
                            return (
                                <li className="list-item ">
                                    <div className="media">
                                        <div className="media-body media-middle">
                                            {(idBaseService === item.id) ?
                                                <p className="media-heading" style={{fontSize: 15, color: "#f0564a"}}
                                                   onClick={() => change1(item.id)}>{item.name}</p> :
                                                <p className="media-heading" style={{fontSize: 15}}
                                                   onClick={() => change1(item.id)}>{item.name}</p>}
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