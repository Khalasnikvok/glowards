import React, { createContext, useContext } from 'react';
import useLocalStorageId from '../hooks/useLocalStorageId';

const IdContext = createContext();

export const useIdContext = () => useContext(IdContext);

export const IdProvider = ({ children }) => {
    const [data, setData, clearData] = useLocalStorageId();

    return (
        <IdContext.Provider value={{ data, setData, clearData }}>
            {children}
        </IdContext.Provider>
    );
};
