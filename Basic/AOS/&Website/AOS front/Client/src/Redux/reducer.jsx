import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userProfile: "",
  Auth: false,
  storeProfile: "",
  registerPage: "SignUp",
  registerMessage: "",
  location: "/",
  menu: false,
  openDetils: false,
  AppointmentDetail: false,
  basketData: [],
};

export const AllInfoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },

    Logout: (state) => {
      state.user = false;
    },

    register: (state, action) => {
      state.registerMessage = action.payload;
    },
    getUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    // store

    getStoreProfile: (state, action) => {
      state.storeProfile = action.payload;
    },

    ForgetPassword: (state) => {
      state.registerPage = "ForgetPassword";
    },
    SignUp: (state) => {
      state.registerPage = "SignUp";
    },
    Verification: (state) => {
      state.registerPage = "Verification";
    },
    menuHandeler: (state) => {
      state.menu = !state.menu;
    },
    menuClose: (state) => {
      state.menu = true;
    },
    menuOpen: (state) => {
      state.menu = false;
    },
    openDetilsHandeler: (state) => {
      state.openDetils = !state.openDetils;
    },
    AppointmentDetailHandeler: (state) => {
      state.AppointmentDetail = !state.AppointmentDetail;
    },
    Basket: (state, action) => {
      state.basketData = action.payload;
    },
  },
});
export const selectInfo = (state) => state.info;

// Action creators are generated for each case reducer function
// eslint-disable-next-line react-refresh/only-export-components
export const {
  LoginAuth,
  LogoutAuth,
  ForgetPassword,
  SignUp,
  Verification,
  menuHandeler,
  menuOpen,
  menuClose,
  openDetilsHandeler,
  AppointmentDetailHandeler,
  login,
  register,
  Logout,
  getUserProfile,
  getStoreInfo,
  getStoreProfile,
  Basket,
} = AllInfoSlice.actions;

export default AllInfoSlice.reducer;
