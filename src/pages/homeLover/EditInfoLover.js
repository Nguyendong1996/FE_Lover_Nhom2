import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {
    findAllCityByIdCountry,
    findAllCountry,
    findAllGender,
    findByIdLover, updateProfileLover
} from "../../services/ProfileLoverService";
import {useNavigate} from "react-router";
import './HomeLover.css'
export function EditInfoLover() {
    const [gender, setGender] = useState([])
    const [country, setCountry] = useState([])
    const [city, setCity] = useState([])
    const [idCountry, setIdCountry] = useState(String);
    const [profileLover, setProfileLover] = useState({})
    const navigate = useNavigate()
    let id = localStorage.getItem("idAccount")


    useEffect(() => {
        findAllGender().then((res) => {
            setGender(res)
        }).catch(() => {
            return []
        })
        findAllCountry().then((res) => {
            setCountry(res)
        }).catch(() => {
            return []
        })
        findAllCityByIdCountry(idCountry).then((res) => {
            setCity(res)
            console.log(res)
        }).catch(() => {
            return []
        })
        findByIdLover(id).then((res) => {
            setProfileLover(res)
        })
    }, [idCountry])

    const updateProfileLover1 = (values) => {
        const updatedProfileLover = {
            ...profileLover,
            fullName: values.fullName,
            citizenNumber: values.citizenNumber,
            gender: {
                ...profileLover.gender,
                id: values.gender.id,
            },
            city: {
                ...profileLover.city,
                id: values.city.id,
            },
            account: {
                id: id,
            },
            dateOfBirth: values.dateOfBirth,
            height: values.height,
            weight: values.weight,
            hobby: values.hobby,
            description: values.description,
            requestToUser: values.requestToUser,
        };
        updateProfileLover(updatedProfileLover, navigate).then(() => {
                return alert("update thanh cong !!!")
            }
        );
    };
    return (
        <>
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <div className="aside">
                    <div className="row" style={{marginLeft:5}}>
                        <div className="col-md-6 col-sm-12 col-xs-12 personalinfo" style={{width:"fit-content"}}>
                            <Formik initialValues={profileLover}
                                    enableReinitialize={true}
                                    onSubmit={(values) =>{updateProfileLover1(values)}}
                            >
                                <Form className="from-userinfo">
                                    <div style={{display:"flex"}}>

                                        <div className="" style={{}}>
                                            <div className="fieldGroup " style={{}}><p className="control-label" style={{fontSize:15}}>Họ và tên</p>
                                                <Field
                                                    type="text"
                                                    name="fullName"
                                                    placeholder=""
                                                    maxLength="5000"
                                                    autoComplete="false"
                                                    style={{width:'450px'}}
                                                />
                                            </div>
                                            <div className="fieldGroup "><p className="control-label" style={{fontSize:15}}>Ngày Sinh</p>
                                                <Field
                                                    type="date"
                                                    name="dateOfBirth"
                                                    placeholder=""
                                                    maxLength="5000"
                                                    autoComplete="false"
                                                    style={{width:'450px'}}
                                                />
                                            </div>
                                            <div className="fieldGroup "><p className="control-label" style={{fontSize:15}}>CMT/CCCD</p>
                                                <Field
                                                    type="text"
                                                    name="citizenNumber"
                                                    placeholder=""
                                                    maxLength="5000"
                                                    autoComplete="false"
                                                    style={{width:'450px'}}
                                                />
                                            </div>
                                            <div className="fieldGroup "><p className="control-label" style={{fontSize:15}}>Cân Nặng</p>
                                                <Field
                                                    type="text"
                                                    name="weight"
                                                    placeholder=""
                                                    maxLength="5000"
                                                    autoComplete="false"
                                                    style={{width:'450px'}}
                                                />
                                            </div>
                                            <div className="fieldGroup "><p className="control-label" style={{fontSize:15}}>Chiều Cao</p>
                                                <Field
                                                    type="text"
                                                    name="height"
                                                    placeholder=""
                                                    maxLength="5000"
                                                    autoComplete="false"
                                                    style={{width:'450px'}}
                                                />
                                            </div>
                                        </div>
                                        <div style={{marginLeft:50}}>
                                            <div className="fieldGroup "><p className="control-label" style={{fontSize:15}}>Giới Tính</p>
                                                <Field as="select" name="gender.id" className="form-control" id="gender" style={{width:'450px'}}>
                                                    <option>------------</option>
                                                    {gender.map((c) => (
                                                        <option value={c.id}>{c.name}</option>
                                                    ))}
                                                </Field>
                                            </div>
                                            <div className="fieldGroup "><p className="control-label" style={{fontSize:15}}>Quốc Gia</p>
                                                <select name={'profileLover.city.country.id'} onChange={(e) => {
                                                    const textCountry = e.target.value;
                                                    setIdCountry(textCountry)
                                                }} className={"form-select"} style={{width:'450px', height:10, marginBottom:7}} >
                                                    <option>--Chọn Quốc Gia--</option>
                                                    {country.map((c) => {
                                                        return (
                                                            <option value={c.id}>{c.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className="fieldGroup "><p className="control-label" style={{fontSize:15}}>Thành phố</p>
                                                <Field as="select" name="city.id" className="form-control" id="gender" style={{width:'450px'}}>
                                                    <option>------------</option>
                                                    {city.map((c) => (
                                                        <option value={c.id}>{c.name}</option>
                                                    ))}
                                                </Field>
                                            </div>
                                            <div className="fieldGroup "><p className="control-label" style={{fontSize:15}}>Sở Thích</p>
                                                <Field
                                                    type="text"
                                                    name="hobby"
                                                    placeholder=""
                                                    maxLength="5000"
                                                    autoComplete="false"
                                                    style={{width:'450px'}}
                                                />
                                            </div>

                                            <div className="fieldGroup "><p className="control-label" style={{fontSize:15}}>Yêu Cầu Đối với người thuê</p>
                                                <Field
                                                    type="text"
                                                    name="requestToUser"
                                                    placeholder=""
                                                    maxLength="5000"
                                                    autoComplete="false"
                                                    style={{width:'450px'}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div >
                                        <p className="control-label" style={{textAlign:'center', fontSize:15, fontWeight:"bold"}}>Mô Tả Bản Thân</p>
                                        <Field
                                            as="textarea"
                                            name="description"
                                            placeholder=""
                                            maxLength="5000"
                                            autoComplete="false"
                                            style={{width:'950px', height: '300px'}}
                                        />
                                    </div>
                                    <div style={{textAlign:"center", marginTop:30, marginBottom:20}}>
                                        <button type="submit" className="btn" id={"btn-submit-1"} >Cập nhật</button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}