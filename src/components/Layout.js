import React from 'react';
import Header from "./Header";
import {Outlet} from "react-router";
import Footer from "./Footer";
import {AppProvider} from "../context/AppContext";

const Layout = () => {
    return (
        <>
            <AppProvider>
                <Header/>
                <Outlet/>
                <Footer/>
            </AppProvider>
        </>
    );
};

export default Layout;