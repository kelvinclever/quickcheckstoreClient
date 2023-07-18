import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
    ui: JSON.parse(localStorage.getItem("ui")) || 'profile'
}

export const Shop= createContext(INITIAL_STATE);

export const UIShopProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE)
    useEffect(() => {
        localStorage.setItem("ui", JSON.stringify(state.ui))
    }, [state.ui])
    return <Shop.Provider value={{ ui: state.ui, dispatch }}>
        {children}
    </Shop.Provider>
}