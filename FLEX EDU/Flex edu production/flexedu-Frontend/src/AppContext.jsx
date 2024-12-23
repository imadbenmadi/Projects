import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

const initialState = {
    isAuth: false,
    userId: null,
    userType: null,
    user: null,
    Notifications: null,
};
const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                // isAuth: true,
                userId: action.payload.userId,
                userType: action.payload.userType,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuth: false,
                userId: null,
                userType: null,
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
        
        
        case "SET_NOTIFICATIONS":
            return {
                ...state,
                Notifications: action.payload,
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
    const store_login = (userId, userType) => {
        dispatch({
            type: "LOGIN",
            payload: {
                userId,
                userType,
            },
        });
    };

    const store_logout = () => {
        dispatch({ type: "LOGOUT" });
    };
    const set_user = (user) => {
        dispatch({ type: "SET_USER", payload: user });
    };
    
   
    const set_Notifications = (Notifications) => {
        dispatch({
            type: "SET_NOTIFICATIONS",
            payload: Notifications,
        });
    };
    const AppContextValue = {
        ...state,
        store_login,
        set_Notifications,
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
