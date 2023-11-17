import './App.css';
import {Route, Routes} from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import {HomeProfileLover} from "./pages/HomeProfileLover/HomeProfileLover";
function App() {
  return (
      <Routes>
      <Route path={"/"} element={<Layout/>}>
        <Route path={""} element={<Home/>}></Route>
        <Route path={"/homeProfileLover"} element={<HomeProfileLover/>}>

        </Route>
        {/*<Route path={"registerCCDV/:id"} element={<RegisterCCDV/>}></Route>*/}
        {/*<Route path={"registerProfile"} element={<RegisterProfile/>}></Route>*/}
        {/*<Route path={"/userDetail/:id"} element={<Detail/>}></Route>*/}
      </Route>
        </Routes>
  )
}

export default App;
