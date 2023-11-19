import './App.css';
import {Route, Routes} from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import {FormLogin} from "./pages/login/FormLogin";
import {FormRegister} from "./pages/login/FormRegister"
import {InfoLover} from "./pages/InfoLover/InfoLover";
import {InfoUser} from "./pages/infoUser/InfoUser";

import {HomeProfileLover} from "./pages/HomeProfileLover/HomeProfileLover";
import {ProfileLover} from "./pages/HomeProfileLover/ProfileLover";
import {Information} from "./pages/HomeProfileLover/Information";
import {ServiceProfileLover} from "./pages/HomeProfileLover/ServiceProfileLover";

import {HomeAdmin} from "./pages/admin/HomeAdmin";

import {ListBillOfProfileLover} from "./pages/HomeProfileLover/ListBillOfProfileLover";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Layout/>}>
                <Route path={""} element={<Home/>}></Route>

                <Route path="/homeProfileLover" element={<HomeProfileLover />} >
                    <Route index element={<ProfileLover/>} />
                    <Route path={"information"} element={<Information/>} />
                    <Route path={"service-profile-lover"} element={<ServiceProfileLover/>} />
                    <Route path={"list-bill-profile-lover"} element={<ListBillOfProfileLover/>} />
                </Route>
                <Route path={'/info-lover/:id'} element={<InfoLover/>}></Route>
                <Route path={"/login"} element={<FormLogin/>}></Route>
                <Route path={"/register"} element={<FormRegister/>}></Route>
                <Route path={"/info-user/:id"} element={<InfoUser/>}></Route>
                <Route path={"/home-admin/:id"} element={<HomeAdmin/>}></Route>
            </Route>
      </Routes>
    )
}

export default App;
