import React, { createContext, useMemo, useState } from "react";
import AuthApi from "./API/AuthApi";
//context ref
export const DataContext = createContext()

//context provider
function DataProvider(props) {
    const [token, setToken] = useState('')


    const data = {
        authApi: AuthApi(token)
    }
    const memoValue = useMemo(() => ({
        // title: "welcome to react";
        token,
        data
    }), [token])
    return (
        <DataContext.Provider value={memoValue}>
            {props.children}
        </DataContext.Provider>
    )


}


export default DataProvider