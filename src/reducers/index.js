import {
    userLoginReducer,
    userRegisterReducer
} from "../reducers/userReducers";

import { combineReducers } from "redux";

const allReducers = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
})

export default allReducers;