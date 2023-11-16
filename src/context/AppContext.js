import React, {createContext, useState} from 'react';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [searchValue, setSearchValue] = useState("");
    const [idVipService, setIdVipService] = useState(0);
    const [idFreeService, setIdFreeService] = useState(0);
    const [idBaseService, setIdBaseService] = useState(0);
    const [check, setCheck] = useState(false);
    const handleChangeCheck = (value) => {
        setCheck(!value)
    }
    const handleSearchChange = (value) => {
        setSearchValue(value)
        setIdVipService(0)
        setIdFreeService(0)
        setIdBaseService(0)
    };
    const handleIdVipServiceChange = (id) => {
        setIdVipService(id)
        setSearchValue("")
        setIdFreeService(0)
        setIdBaseService(0)
    }
    const handleFreeServiceChange = (id) => {
        setIdFreeService(id)
        setIdVipService(0)
        setSearchValue("")
        setIdBaseService(0)
    }
    const handleBaseServiceChange = (id) => {
        setIdBaseService(id)
        setSearchValue("")
        setIdFreeService(0)
        setIdVipService(0)
    }
    return (
        <AppContext.Provider value={{
            searchValue,
            idVipService,
            idFreeService,
            idBaseService,
            check,
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