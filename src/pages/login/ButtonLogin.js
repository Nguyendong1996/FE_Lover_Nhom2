import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";

export function ButtonLogin(props) {
    const navigate = useNavigate();
    const isLogin = props.isLogin;
    if (isLogin) {
        return (
            <a href="#" className="nav-link scrollto" onClick={logOut}>Đăng xuất</a>
        )
    } else {
        return (
            <>
                <Link to={"/login"}>Đăng nhập</Link>
            </>
        )
    }

    function logOut() {
        localStorage.clear()
        navigate("/")
    }
}