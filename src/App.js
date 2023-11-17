import './App.css';
import {Route, Routes} from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import {InfoLover} from "./pages/InfoLover/InfoLover";


function App() {
  return (
      <Routes>
      <Route path={"/"} element={<Layout/>}>
        <Route path={""} element={<Home/>}></Route>
          <Route path={'/info-lover/:id'} element={<InfoLover/>}></Route>
        {/*<Route path={"register"} element={<Register/>}></Route>*/}
        {/*<Route path={"registerCCDV/:id"} element={<RegisterCCDV/>}></Route>*/}
        {/*<Route path={"registerProfile"} element={<RegisterProfile/>}></Route>*/}
        {/*<Route path={"/userDetail/:id"} element={<Detail/>}></Route>*/}
      </Route>
        </Routes>
  )
}

export default App;
