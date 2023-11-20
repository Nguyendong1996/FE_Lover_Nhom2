import React, {createContext, useState} from 'react';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [searchValue, setSearchValue] = useState("");
    const [idVipService, setIdVipService] = useState(0);
    const [idFreeService, setIdFreeService] = useState(0);
    const [idBaseService, setIdBaseService] = useState(0);


    const [check, setCheck] = useState(false);
    const [visibleProducts, setVisibleProducts] = useState(4);
    const handleChangeVisibleProducts = () => {
        setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 4);
    }

    const handleChangeCheck = (value) => {
        setCheck(!value)
    }
    const handleSearchChange = (value) => {
        setSearchValue(value)

    };
    const handleIdVipServiceChange = (id) => {
        setIdVipService(id)

    }
    const handleFreeServiceChange = (id) => {
        setIdFreeService(id)

    }
    const handleBaseServiceChange = (id) => {
        setIdBaseService(id)

    }
    return (
        <AppContext.Provider value={{
            searchValue,
            idVipService, setIdVipService,
            idFreeService, setIdFreeService,
            idBaseService,
            check, setCheck,
            visibleProducts,
            setVisibleProducts,
            handleChangeVisibleProducts,
            handleChangeCheck,
            handleFreeServiceChange,
            handleIdVipServiceChange,
            handleSearchChange,
            handleBaseServiceChange
        }}>
            {children}
        </AppContext.Provider>
    );
};