import React, {useContext, useEffect, useState} from 'react';
import SidebarSupplies from "./SidebarSupplies";
import {findAllLover} from "../../services/ProfileLoverService"
import {Link} from "react-router-dom";
import "../../css/FormLogin.css"
import {AppContext} from "../../context/AppContext";
import {} from "../../services/ServiceService"
import {findAllGender, findAllCountry, findAllCityByIdCountry} from "../../services/ProfileLoverService"
import {findAllVipService} from "../../services/VipService"
import {findAllFree} from "../../services/FreeService"
import {findAllStatusLover, findAllByFilter} from "../../services/HomeService"

const Home = () => {
    const [lovers, setLovers] = useState([])
    const {searchValue} = useContext(AppContext);
    const {idVipService, setIdVipService} = useContext(AppContext);
    const {idFreeService, setIdFreeService} = useContext(AppContext);
    const {idBaseService} = useContext(AppContext);
    const [idGender, setIdGender] = useState(0)
    const [genders, setGenders] = useState([])
    const [vipServices, setVipServices] = useState([])
    const [freeServices, setFreeServices] = useState([])
    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])
    const [idCity, setIdCity] = useState(0)
    const [idCountry, setIdCountry] = useState(0)
    const [statusLovers, setStatuslovers] = useState([])
    const [idStatusLover, setIdStatusLover] = useState(0)
    const [arrangeCost, setArrangeCost] = useState(1)
    const [filter, setFilter] = useState({
        idBaseService: 0,
        searchValue: "",
        idFreeService: 0,
        idVipService: 0,
        idGender: 0,
        idStatusLover: 0,
        idCity: 0,
        arrangeCost: 1,
        idCountry: 0
    })

    const {visibleProducts} = useContext(AppContext);
    const {setVisibleProducts} = useContext(AppContext);
    const {handleChangeVisibleProducts} = useContext(AppContext);

    const idAccount = localStorage.getItem("idAccount")
    const loadMoreProducts = () => {
        handleChangeVisibleProducts()
    };

    // tìm kiếm:
    function getFilter() {
        filter.idBaseService = idBaseService;
        filter.idVipService = idVipService;
        filter.idFreeService = idFreeService;
        filter.searchValue = searchValue;
        filter.idGender = idGender;
        filter.idStatusLover = idStatusLover
        filter.idCity = idCity;
        filter.arrangeCost = arrangeCost
        filter.idCountry = idCountry;
    }
    function changeGender(e) {
        setIdGender(e.target.value)
        setVisibleProducts(4)
    }
    function changeStatus(e) {
        setIdStatusLover(e.target.value)
        setVisibleProducts(4)
    }
    function changeCost(e) {
        setArrangeCost(e.target.value)
        setVisibleProducts(4)
    }
    function changeCountry(e) {
        setIdCountry(parseInt(e.target.value));
        setIdCity(0)
        setVisibleProducts(4)
    }
    function changeCity(e) {
        setIdCity(parseInt(e.target.value))
        setVisibleProducts(4)
    }

    useEffect(() => {
        findAllGender().then((res) => {
            setGenders(res)
        });
        findAllVipService().then((res) => {
            setVipServices(res)
        });
        findAllFree().then((res) => {
            setFreeServices(res)
        });
        findAllStatusLover().then((res) => {
            setStatuslovers(res)
        });
        findAllCountry().then((res) => {
            setCountries(res)
        });
    }, [])
    useEffect(()=>{
        getFilter()
        console.log(filter)
    },[searchValue, idBaseService, idGender, idVipService, idFreeService, idStatusLover, idCity, arrangeCost, idCountry])
    useEffect(() => {
        findAllCityByIdCountry(idCountry).then((res) => {
            setCities(res)
        })
    }, [idCountry])

    useEffect(() => {
        findAllByFilter(filter).then((res)=>{
            setLovers(res)
            console.log(res)
        })
    }, [searchValue, idBaseService, idGender, idVipService, idFreeService, idStatusLover, idCity, arrangeCost, idCountry])
    return (
        <>
            <div id="root" style={{marginTop: 70}}>
                <div className="wrapper">
                    <div className="home-flex">
                        <SidebarSupplies/>
                        <div className="home-flex-content">
                            <div className="slide banner carousel slide">
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <a href="src/pages/home/Home" target="_blank"
                                           rel="noopener noreferrer">
                                            <img
                                                src="../resources/raw/446982ba-1aeb-4730-8d52-8e4308776e4b__ca8ef380-0f15-11ee-a657-a54d6be1d46a__admin_banner.jpg"
                                                className="img-responsive" alt="banner"/>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href="https://www.facebook.com/groups/playerduovn"
                                           target="_blank" rel="noopener noreferrer">
                                            <img
                                                src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__ff5aee00-79ee-11ed-a19f-23a3b10d190e__admin_banner.jpg"
                                                className="img-responsive" alt="banner"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="filter-player  hidden" style={{marginLeft: 55}}>
                                <select className="form-control gender " style={{width: 80}}
                                        onChange={(e) => changeGender(e)}>
                                    <option value={0} selected="selected">Giới tính</option>
                                    {genders.map((item) => {
                                        return (
                                            <option value={item.id}>{item.name}</option>
                                        )
                                    })}
                                </select>
                                <select className="form-control gender " style={{width: 130}}
                                        onChange={(e) => setIdVipService(e.target.value)}>
                                    <option value={0} selected="selected">Dịch vụ VIP</option>
                                    {vipServices.map((item) => {
                                        return (
                                            <option value={item.id}>
                                                {/*{item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}*/}
                                                {item.name}
                                            </option>
                                        )
                                    })}
                                </select>
                                <select className="form-control gender " style={{width: 130}}
                                        onChange={(e) => setIdFreeService(e.target.value)}>
                                    <option value={0} selected="selected">Dịch vụ FREE</option>
                                    {freeServices.map((item) => {
                                        return (
                                            <option value={item.id}>
                                                {/*{item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}*/}
                                                {item.name}
                                            </option>
                                        )
                                    })}
                                </select>
                                <select className="form-control gender " style={{width: 130}}
                                        onChange={(e) => changeStatus(e)}>
                                    <option value={0} selected="selected">Trạng thái</option>
                                    {statusLovers.map((item) => {
                                        return (
                                            <option value={item.id}>
                                                {/*{item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}*/}
                                                {item.name}
                                            </option>
                                        )
                                    })}
                                </select>
                                <select className="form-control gender " style={{width: 160}}
                                        onChange={(e) => changeCost(e)}>
                                    <option value={1}>Giá từ thấp đến cao</option>
                                    <option value={2}>Giá từ cao xuống thấp</option>
                                </select>
                                <select className="form-control gender " style={{width: 90}}
                                        onChange={(e) => changeCountry(e)}>
                                    <option value={0}>Quốc gia</option>
                                    {countries.map((item) => {
                                        return (
                                            <option value={item.id}>
                                                {/*{item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}*/}
                                                {item.name}
                                            </option>
                                        )
                                    })}
                                </select>
                                <select className="form-control gender " style={{width: 100}}
                                        onChange={(e) => setIdCity(parseInt(e.target.value))}>
                                    {idCountry !== 0 ? (
                                        <>
                                            <option value={0}>Thành phố</option>
                                            {cities.map((item) => (
                                                <option value={item.id} key={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </>
                                    ) : (
                                        <option value={0}>Thành phố</option>
                                    )}
                                </select>
                            </div>
                            <div className="list-player">
                                <header className={"title-header vip"}>
                                    <div>
                                        <h5 className={"title-header-left"} style={{textAlign: "center"}}>DANH SÁCH
                                            LOVER</h5>
                                    </div>
                                </header>
                                <div className="card-player row">
                                    {lovers.slice(0, visibleProducts).map((item, key) => (
                                        <Link to={"/"}>
                                            <div className="col-md-3" key={key} style={{marginBottom: 20}}>
                                                <div className="player-information-card-wrap">
                                                    <div className="player-avatar">
                                                        <Link to={"/info-lover/" + item.id}>
                                                            <img src={item.avatarImage} className alt="PD"
                                                                 id="avt-img-reponsiver"
                                                                 style={{height: "100%", width: "100%"}}/>
                                                        </Link>
                                                        <a target="_blank" className="player-price"
                                                           href={"/"}>{item.price} đ/h</a>
                                                    </div>
                                                    <a target="_blank" className="player-information" href={"/"}>
                                                        <h3 className="player-name">
                                                            <a target="_blank"
                                                               href={"/"}>{item.account?.nickname}</a>
                                                        </h3>
                                                        <p className="player-title">
                                                            {item.serviceLovers[0]?.name},
                                                            {item.serviceLovers[1]?.name},
                                                            {item.serviceLovers[2]?.name},
                                                        </p>
                                                        <div className="category">
                                                            <div className="div--flex">
                                                                <div className="rate">
                                                                    <i className="fas fa-star"/>
                                                                    <p><i>Điểm đánh giá</i></p>
                                                                </div>
                                                                <div className="rate">
                                                                    <i className="fas fa-comment"/>
                                                                    <p><i>Bình luận</i></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </Link>

                                    ))}
                                </div>
                                <div style={{textAlign: "center"}}>
                                    {visibleProducts < lovers.length && (
                                        <button className={"btn btn-secondary"} onClick={loadMoreProducts} id={"button-load-more-home"}>
                                            Xem thêm...
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{
                backgroundColor: 'rgb(255, 255, 255)',
                border: '1px solid rgb(204, 204, 204)',
                boxShadow: 'rgba(0, 0, 0, 0.2) 2px 2px 3px',
                position: 'absolute',
                transition: 'visibility 0s linear 0.3s, opacity 0.3s linear 0s',
                opacity: 0,
                visibility: 'hidden',
                zIndex: 2000000000,
                left: '0px',
                top: '-10000px'
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    zIndex: 2000000000,
                    backgroundColor: 'rgb(255, 255, 255)',
                    opacity: '0.05'
                }}/>
                <div className="g-recaptcha-bubble-arrow" style={{
                    border: '11px solid transparent',
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    marginTop: '-11px',
                    zIndex: 2000000000
                }}/>
                <div className="g-recaptcha-bubble-arrow" style={{
                    border: '10px solid transparent',
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    marginTop: '-10px',
                    zIndex: 2000000000
                }}/>
                <div style={{zIndex: 2000000000, position: 'relative'}}>
                    <iframe title="hình ảnh xác thực reCAPTCHA sẽ hết hạn sau 2 phút nữa" src="index_1.html"
                            name="c-jfcpck8j42i6" frameBorder={0} scrolling="no"
                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
                            style={{width: '100%', height: '100%'}}/>
                </div>
            </div>
            <div style={{
                backgroundColor: 'rgb(255, 255, 255)',
                border: '1px solid rgb(204, 204, 204)',
                boxShadow: 'rgba(0, 0, 0, 0.2) 2px 2px 3px',
                position: 'absolute',
                transition: 'visibility 0s linear 0.3s, opacity 0.3s linear 0s',
                opacity: 0,
                visibility: 'hidden',
                zIndex: 2000000000,
                left: '0px',
                top: '-10000px'
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    zIndex: 2000000000,
                    backgroundColor: 'rgb(255, 255, 255)',
                    opacity: '0.05'
                }}/>
                <div className="g-recaptcha-bubble-arrow" style={{
                    border: '11px solid transparent',
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    marginTop: '-11px',
                    zIndex: 2000000000
                }}/>
                <div className="g-recaptcha-bubble-arrow" style={{
                    border: '10px solid transparent',
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    marginTop: '-10px',
                    zIndex: 2000000000
                }}/>
                <div style={{zIndex: 2000000000, position: 'relative'}}>
                    <iframe title="hình ảnh xác thực reCAPTCHA sẽ hết hạn sau 2 phút nữa" src="index_2.html"
                            name="c-837utcd6rzwu" frameBorder={0} scrolling="no"
                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
                            style={{width: '100%', height: '100%'}}/>
                </div>
            </div>
            <div style={{
                backgroundColor: 'rgb(255, 255, 255)',
                border: '1px solid rgb(204, 204, 204)',
                boxShadow: 'rgba(0, 0, 0, 0.2) 2px 2px 3px',
                position: 'absolute',
                transition: 'visibility 0s linear 0.3s, opacity 0.3s linear 0s',
                opacity: 0,
                visibility: 'hidden',
                zIndex: 2000000000,
                left: '0px',
                top: '-10000px'
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    zIndex: 2000000000,
                    backgroundColor: 'rgb(255, 255, 255)',
                    opacity: '0.05'
                }}/>
                <div className="g-recaptcha-bubble-arrow" style={{
                    border: '11px solid transparent',
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    marginTop: '-11px',
                    zIndex: 2000000000
                }}/>
                <div className="g-recaptcha-bubble-arrow" style={{
                    border: '10px solid transparent',
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    marginTop: '-10px',
                    zIndex: 2000000000
                }}/>
                <div style={{zIndex: 2000000000, position: 'relative'}}>
                    <iframe title="hình ảnh xác thực reCAPTCHA sẽ hết hạn sau 2 phút nữa" src="index_3.html"
                            name="c-xoyknwz7mz5" frameBorder={0} scrolling="no"
                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
                            style={{width: '100%', height: '100%'}}/>
                </div>
            </div>
            <div style={{
                backgroundColor: 'rgb(255, 255, 255)',
                border: '1px solid rgb(204, 204, 204)',
                boxShadow: 'rgba(0, 0, 0, 0.2) 2px 2px 3px',
                position: 'absolute',
                transition: 'visibility 0s linear 0.3s, opacity 0.3s linear 0s',
                opacity: 0,
                visibility: 'hidden',
                zIndex: 2000000000,
                left: '0px',
                top: '-10000px'
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    zIndex: 2000000000,
                    backgroundColor: 'rgb(255, 255, 255)',
                    opacity: '0.05'
                }}/>
                <div className="g-recaptcha-bubble-arrow" style={{
                    border: '11px solid transparent',
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    marginTop: '-11px',
                    zIndex: 2000000000
                }}/>
                <div className="g-recaptcha-bubble-arrow" style={{
                    border: '10px solid transparent',
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    marginTop: '-10px',
                    zIndex: 2000000000
                }}/>
                <div style={{zIndex: 2000000000, position: 'relative'}}>
                    <iframe title="hình ảnh xác thực reCAPTCHA sẽ hết hạn sau 2 phút nữa" src="index_4.html"
                            name="c-9s3rhxajcuwj" frameBorder={0} scrolling="no"
                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
                            style={{width: '100%', height: '100%'}}/>
                </div>
            </div>
        </>
    );
};

export default Home;