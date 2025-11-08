import {
    userLoginReducer,
    userRegisterReducer
} from "../reducers/userReducers";

import {
    getprofileReducer
} from "./profileReducers"

import {
    featuredProductsReducers
} from "./productReducers"

import { combineReducers } from "redux";

const allReducers = combineReducers({
    userLoginReducer,
    userRegisterReducer,
    getprofileReducer,

    featuredProductsReducers
})

export default allReducers;