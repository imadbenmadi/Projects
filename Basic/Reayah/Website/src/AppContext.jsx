import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

const initialState = {
    isAuth: false,
    userId: null,
    patientId: null,
    doctorId: null,
    user: null,
};
const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuth: true,
                userId: action.payload.userId,
                patientId: action.payload.patientId,
                doctorId: action.payload.doctorId,
            };
        case "LOGOUT":
            return {
                ...state,
                userId: null,
                patientId: null,
                doctorId: null,
                isAuth: false,
                user: null,
            };
        case "SET_AUTH":
            return {
                ...state,
                isAuth: action.payload,
            };
        case "SET_USER":
            return {
                ...state,
                user: action.payload, // Update user data
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
    const store_login = (userId, patientId, doctorId) => {
        dispatch({
            type: "LOGIN",
            payload: {
                userId,
                patientId,
                doctorId,
            },
        });
    };

    const store_logout = () => {
        dispatch({ type: "LOGOUT" });
    };
    const set_user = (user) => {
        dispatch({ type: "SET_USER", payload: user });
    };
    const AppContextValue = {
        ...state,
        store_login,
        store_logout,
        set_Auth,
        set_user,
    };

    return (
        <AppContext.Provider value={AppContextValue}>
            {children}
        </AppContext.Provider>
    );
};
