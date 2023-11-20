import {useEffect, useState} from "react";
import {findAllLoverByIdRoles} from "../../services/ProfileLoverService";

export const ListProfileUser =() =>{
    const [profileUsers,setProfileUser] = useState([]);
    useEffect(() =>{
        findAllLoverByIdRoles(2)
    })
}