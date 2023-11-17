import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {ProfileLover} from "./ProfileLover";


export const HomeProfileLover = () =>{
    const {id} = useParams()
    const [profileLover, setProfileLover] = useState({})
    useEffect(()=>{

    })
    return(
        <>
            <div className="home-flex-category">
                <div className="fixed-cate"><h3 style={{textAlign:'center'}}><span>ProfileLover</span></h3>
                    <p style={{textAlign:'center',color:'black'}}><span>Trạng Thái</span></p>
                    <ul className="list-group">
                        <li className="list-item ">
                            <div className="media">
                                <div className="media-left"><img className="media-object" alt="715867c6-698f-411a-b4f9-1e9093130b60__f364f2e0-34ce-11ed-838c-b120e70abb59__game_avatars.jpg" src="../image/images.png" />
                                </div>
                                <div className="media-body media-middle"><p className="media-heading">Trang Cá Nhân</p>
                                </div>
                            </div>
                        </li>
                        <li className="list-item ">
                            <div className="media">
                                <div className="media-left"><img className="media-object" alt="715867c6-698f-411a-b4f9-1e9093130b60__f364f2e0-34ce-11ed-838c-b120e70abb59__game_avatars.jpg" src="../image/img.png" />
                                </div>
                                <div className="media-body media-middle"><p className="media-heading">Tin Nhắn</p>
                                </div>
                            </div>
                        </li>
                        <li className="list-item ">
                            <div className="media">
                                <div className="media-left"><img className="media-object" alt="715867c6-698f-411a-b4f9-1e9093130b60__f364f2e0-34ce-11ed-838c-b120e70abb59__game_avatars.jpg" src="../image/img_2.png" />
                                </div>
                                <div className="media-body media-middle"><p className="media-heading">Dịch Vụ Cơ Bản</p>
                                </div>
                            </div>
                        </li>
                        <li className="list-item ">
                            <div className="media">
                                <div className="media-left"><img className="media-object" alt="715867c6-698f-411a-b4f9-1e9093130b60__f364f2e0-34ce-11ed-838c-b120e70abb59__game_avatars.jpg" src="../image/img_2.png" />
                                </div>
                                <div className="media-body media-middle"><p className="media-heading">Dịch Vụ Vip</p>
                                </div>
                            </div>
                        </li>
                        <li className="list-item ">
                            <div className="media">
                                <div className="media-left"><img className="media-object" alt="715867c6-698f-411a-b4f9-1e9093130b60__f364f2e0-34ce-11ed-838c-b120e70abb59__game_avatars.jpg" src="../image/img_2.png" />
                                </div>
                                <div className="media-body media-middle"><p className="media-heading">Dịch Vụ Miễn Phí</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <ProfileLover/>

        </>
    )
}