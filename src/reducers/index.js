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

import {
    cartReducer
} from "./cartReducer"

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

    featuredProductsReducers,

    cartReducer
})

export default allReducers;