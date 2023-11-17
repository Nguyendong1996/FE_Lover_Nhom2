import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {
    findAllCityByIdCountry,
    findAllCountry,
    findAllGender,
    findByIdLover, updateProfileLover
} from "../../services/ProfileLoverService";
import {useNavigate} from "react-router";



export const Information = () =>{
    const [gender,setGender] = useState([])
    const [country,setCountry] = useState([])
    const [city,setCity] = useState([])
    const [idCountry,setIdCountry] =useState(String);
    const [profileLover,setProfileLover] = useState({})
    const navigate = useNavigate()

    useEffect(() =>{
        findAllGender().then((res) =>{
            setGender(res)
        }).catch(() =>{
            return []
        })
        findAllCountry().then((res) =>{
            setCountry(res)
        }).catch(() =>{
            return []
        })
        findAllCityByIdCountry(idCountry).then((res) =>{
            setCity(res)
            console.log(res)
        }).catch(()=>{
            return []
        })
        findByIdLover(1).then((res) =>{
            setProfileLover(res)
        })
    },[idCountry])

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
            account:{
                id:1,
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
    return(
        <>
            <div className="wrapper">
                <div className="setting__main row">
                    <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12"
                    style={{marginLeft:'35%',marginTop:'-47%'}}
                    >
                        <div className="aside">
                            <div className="row">
                                <div className="col-md-6 col-sm-12 col-xs-12 personalinfo">
                                    <h3 style={{textAlign:'center',color:'red'}}>Thông tin cá nhân</h3>
                                    <Formik initialValues={profileLover}
                                            enableReinitialize={true}
                                            onSubmit={(values) =>{updateProfileLover1(values)}}
                                    >
                                    <Form className="from-userinfo">
                                        <div className="col-md-6" style={{marginLeft:'-50%'}}>
                                        <div className="fieldGroup " style={{width:'100%'}}><p className="control-label">Họ và tên</p>
                                            <Field
                                            type="text"
                                            name="fullName"
                                            placeholder=""
                                            maxLength="5000"
                                            autoComplete="false"
                                            style={{width:'480px'}}
                                            />
                                        </div>
                                        <div className="fieldGroup "><p className="control-label">Ngày Sinh</p>
                                            <Field
                                            type="date"
                                            name="dateOfBirth"
                                            placeholder=""
                                            maxLength="5000"
                                            autoComplete="false"
                                            style={{width:'480px'}}
                                            />
                                        </div>
                                        <div className="fieldGroup "><p className="control-label">CMT/CCCD</p>
                                            <Field
                                            type="text"
                                            name="citizenNumber"
                                            placeholder=""
                                            maxLength="5000"
                                            autoComplete="false"
                                            style={{width:'480px'}}
                                            />
                                        </div>
                                            <div className="fieldGroup "><p className="control-label">Cân Nặng</p>
                                                <Field
                                                    type="text"
                                                    name="weight"
                                                    placeholder=""
                                                    maxLength="5000"
                                                    autoComplete="false"
                                                    style={{width:'480px'}}
                                                />
                                            </div>
                                            <div className="fieldGroup "><p className="control-label">Chiều Cao</p>
                                                <Field
                                                    type="text"
                                                    name="height"
                                                    placeholder=""
                                                    maxLength="5000"
                                                    autoComplete="false"
                                                    style={{width:'480px'}}
                                                />
                                            </div>

                                        </div>
                                        <div className="col-md-6" style={{marginLeft:'70%'}}>
                                            <div className="fieldGroup "><p className="control-label">Giới Tính</p>
                                                <Field as="select" name="gender.id" className="form-control" id="gender" style={{width:'480px'}}>
                                                    <option>------------</option>
                                                    {gender.map((c) => (
                                                        <option value={c.id}>{c.name}</option>
                                                    ))}
                                                </Field>
                                            </div>
                                            <div className="fieldGroup "><p className="control-label">Quốc Gia</p>
                                                <select name={'profileLover.country.id'} onChange={(e) => {
                                                    const textCountry = e.target.value;
                                                    setIdCountry(textCountry)
                                                }} className={"form-select"} style={{width:'480px'}}>
                                                    <option>--Chọn Quốc Gia--</option>
                                                    {country.map((c) => {
                                                        return (
                                                            <option value={c.id}>{c.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        <div className="fieldGroup "><p className="control-label">thành Phố</p>
                                            <Field as="select" name="city.id" className="form-control" id="gender" style={{width:'480px'}}>
                                                <option>------------</option>
                                                {city.map((c) => (
                                                    <option value={c.id}>{c.name}</option>
                                                ))}
                                            </Field>
                                        </div>
                                            <div className="fieldGroup "><p className="control-label">Sở Thích</p>
                                                <Field
                                                    type="text"
                                                    name="hobby"
                                                    placeholder=""
                                                    maxLength="5000"
                                                    autoComplete="false"
                                                    style={{width:'480px'}}
                                                />
                                            </div>

                                        <div className="fieldGroup "><p className="control-label">Yêu Cầu Đối với người thuê</p>
                                            <Field
                                                type="text"
                                                name="requestToUser"
                                                placeholder=""
                                                maxLength="5000"
                                                autoComplete="false"
                                                style={{width:'480px'}}
                                                />
                                        </div>
                                        </div>
                                        <div className="fieldGroup "><p className="control-label" style={{textAlign:'center'}}>Mô Tả Bản Thân</p>
                                            <Field
                                                as="textarea"
                                                name="description"
                                                placeholder=""
                                                maxLength="5000"
                                                autoComplete="false"
                                                style={{width:'1100px',marginLeft:'-47%'}}
                                            />
                                        </div>
                                        <div style={{marginLeft:'40%'}}>
                                            <button type="submit" className="btn-update" >Cập nhật</button>
                                        </div>
                                    </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}