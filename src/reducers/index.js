import {
    userLoginReducer,
    userRegisterReducer
} from "../reducers/userReducers";

import {
    getprofileReducer
} from "./profileReducers"

import {
    featuredProductsReducers,
    allproductsReducer,
    searchProductReducer,
    categoryDetailReducer,
    categoryListReducer,
    productDetailReducer,
    productReviewReducer
} from "./productReducers"

import { combineReducers } from "redux";

const allReducers = combineReducers({
    userLoginReducer,
    userRegisterReducer,
    getprofileReducer,

    allproductsReducer,
    searchProductReducer,
    categoryDetailReducer,
    categoryListReducer,
    productDetailReducer,
    productReviewReducer,

    featuredProductsReducers
})

export default allReducers;