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
    productReviewReducer,
    productsDetailedReducer
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
    productsDetailedReducer,

    featuredProductsReducers
})

export default allReducers;