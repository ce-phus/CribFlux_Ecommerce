import allReducers from "./reducers/index";
import { configureStore } from "@reduxjs/toolkit";

const userInfoFromStorage = typeof window !== "undefined" 
? localStorage.getItem("userInfo")
: null;

const store = configureStore({
    reducer: allReducers,
    preloadedState: {
        userLoginReducer: { userInfo: userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null }
    }
})

export default store;