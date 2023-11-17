import './App.css';
import {Route, Routes} from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import {FormLogin} from "./pages/login/FormLogin";
import {FormRegister} from "./pages/login/FormRegister"
import {InfoLover} from "./pages/InfoLover/InfoLover";
import {InfoUser} from "./pages/infoUser/InfoUser";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Layout/>}>
                <Route path={""} element={<Home/>}></Route>
                <Route path={'/info-lover/:id'} element={<InfoLover/>}></Route>
                <Route path={"/login"} element={<FormLogin/>}></Route>
                <Route path={"/register"} element={<FormRegister/>}></Route>
                <Route path={"/info-user/:id"} element={<InfoUser/>}></Route>
            </Route>
        </Routes>
    )
}

export default App;
