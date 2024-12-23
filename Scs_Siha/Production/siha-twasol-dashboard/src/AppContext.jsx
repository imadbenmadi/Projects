import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

const initialState = {
    isAuth: false,
};
const reducer = (state, action) => {
    switch (action.type) {
        case "LOGOUT":
            return {
                ...state,
                isAuth: false,
            };
        case "SET_AUTH":
            return {
                ...state,
                isAuth: action.payload,
            };
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const set_Auth = (isAuth) => {
        dispatch({ type: "SET_AUTH", payload: isAuth });
    };

    const store_logout = () => {
        dispatch({ type: "LOGOUT" });
    };

    const AppContextValue = {
        ...state,
        store_logout,
        set_Auth,
    };

    return (
        <AppContext.Provider value={AppContextValue}>
            {children}
        </AppContext.Provider>
    );
};
