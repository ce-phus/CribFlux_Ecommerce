import {
    userLoginReducer,
    userRegisterReducer
} from "../reducers/userReducers";

import {
    getprofileReducer
} from "./profileReducers"

import { combineReducers } from "redux";

const allReducers = combineReducers({
    userLoginReducer,
    userRegisterReducer,
    getprofileReducer
})

export default allReducers;