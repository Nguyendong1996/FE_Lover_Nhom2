import {Outlet, useParams} from "react-router";
import React from "react";
import {Link} from "react-router-dom";


export const HomeProfileLover = () =>{
    const {id} = useParams()
    return(
        <>
            <div className="home-flex-category" style={{marginLeft:'0%'}}>
                <div className="fixed-cate" style={{margin:'auto'}}>

                        <Link to={"/homeProfileLover"}>
                            <h3 style={{ textAlign: "center" }}><span>ProfileLover</span></h3>
                            </Link>

                    <ul className="list-group">
                        <li className="list-item ">
                            <div className="media">
                                <div className="media-left"><img className="media-object" alt="715867c6-698f-411a-b4f9-1e9093130b60__f364f2e0-34ce-11ed-838c-b120e70abb59__game_avatars.jpg" src="../image/images.png" />
                                </div>
                                <div className="media-body media-middle"><Link to={"information"}><p className="media-heading">Cập Nhập Trang Cá Nhân</p></Link>
                                </div>
                            </div>
                        </li>
                        <li className="list-item ">
                            <div className="media">
                                <div className="media-left"><img className="media-object" alt="715867c6-698f-411a-b4f9-1e9093130b60__f364f2e0-34ce-11ed-838c-b120e70abb59__game_avatars.jpg" src="../image/img_2.png" />
                                </div>
                                <div className="media-body media-middle"><p className="media-heading">Dịch Vụ Lover</p>
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

                    </ul>
                </div>
            </div>
            <Outlet/>

        </>
    )
}