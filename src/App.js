import './App.css';
import {Route, Routes} from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import {FormLogin} from "./pages/login/FormLogin";
import {FormRegister} from "./pages/login/FormRegister"
import {NewPassword} from "./pages/login/NewPassword"
import {InfoLover} from "./pages/InfoLover/InfoLover";
import {InfoUser} from "./pages/infoUser/InfoUser";

import {HomeProfileLover} from "./pages/HomeProfileLover/HomeProfileLover";
import {ProfileLover} from "./pages/HomeProfileLover/ProfileLover";
import {Information} from "./pages/HomeProfileLover/Information";
import {ServiceProfileLover} from "./pages/HomeProfileLover/ServiceProfileLover";

import {HomeAdmin} from "./pages/admin/HomeAdmin";

import {ListBillOfProfileLover} from "./pages/HomeProfileLover/ListBillOfProfileLover";
import {HomeLover} from "./pages/homeLover/HomeLover";
import {InformationUser} from "./pages/infoUser/InformationUser";
import {ToastContainer} from "react-toastify";
import ChatRoom from "./message/ChatRoom";



function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Layout/>}>
                <Route path={""} element={<Home/>}></Route>

                <Route path="/homeProfileLover" element={<HomeLover/>}></Route>
                <Route path={'/info-lover/:id'} element={<InfoLover/>}></Route>
                <Route path={"/login"} element={<FormLogin/>}></Route>
                <Route path={"/register"} element={<FormRegister/>}></Route>
                <Route path={"/newPassword"} element={<NewPassword/>}></Route>
                <Route path={"/info-user/:id"} element={<InfoUser/>}></Route>
                <Route path={"/home-admin/:id"} element={<HomeAdmin/>}></Route>
            </Route>
            <Route path={"/demo/:id"} element={<ChatRoom/>}></Route>
        </Routes>
    )
}

export default App;
