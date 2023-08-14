import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer.jsx";
//initial state for user obj
const INITIAL_STATE = {
    categories: JSON.parse(localStorage.getItem("categories")) || 'AllProducts'
}
//declare createContext
export const UIContext = createContext(INITIAL_STATE);
//declare createContext
export const UIContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE)
    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(state.categories))
    }, [state.categories])
    return <UIContext.Provider value={{ categories: state.categories, dispatch }}>
        {children}
    </UIContext.Provider>
}