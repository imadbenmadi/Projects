import  { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

const initialState = {
    isAuth: false,
    FirstName: "",
    LastName: "",
    Email: "",
    Gender: null,
    Courses: [],
    Services: [],
    Notifications: [],
    IsEmailVerified : null,
    _id: null,
};
const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuth: true,
                FirstName: action.payload.FirstName,
                LastName: action.payload.LastName,
                Email: action.payload.Email,
                Gender: action.payload.Gender,
                Courses: action.payload.Courses,
                Services: action.payload.Services,
                Notifications: action.payload.Notifications,
                IsEmailVerified: action.payload.IsEmailVerified,
                _id: action.payload._id,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuth: false,
                FirstName: "",
                LastName: "",
                Email: "",
                Gender: null,
                Courses: [],
                Services: [],
                Notifications: [],
                IsEmailVerified: null,
                _id: null,
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
    const store_login = (
        FirstName,
        LastName,
        Email,
        Gender,
        Courses,
        Services,
        Notifications,
        IsEmailVerified,
        _id
    ) => {
        dispatch({
            type: "LOGIN",
            payload: {
                FirstName,
                LastName,
                Email,
                Gender,
                Courses,
                Services,
                Notifications,
                IsEmailVerified,
                _id,
            },
        });
    };

    const store_logout = () => {
        dispatch({ type: "LOGOUT" });
    };

    const AppContextValue = {
        ...state,
        store_login,
        store_logout,
        set_Auth,
    };

    return (
        <AppContext.Provider value={AppContextValue}>
            {children}
        </AppContext.Provider>
    );
};
