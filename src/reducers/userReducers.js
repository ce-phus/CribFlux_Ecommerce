const initialstate ={
    userInfo: null,
    loading: false,
    error: null,
}

export const userLoginReducer = (state=initialstate, action) => {
    switch(action.type){
        case "USER_LOGIN_REQUEST":
            return { ...state, loading: true, error: null }
        case "USER_LOGIN_SUCCESS":
            return { ...state, loading: false, userInfo: action.payload }
        case "USER_LOGIN_FAIL":
            return { ...state, loading: false, error: action.payload }
        case "USER_LOGOUT":
            return { ...initialstate }
        default:
            return state
    }
}

export const userRegisterReducer = (state=initialstate, action) => {
    switch(action.type){
        case "USER_REGISTER_REQUEST":
            return { ...state, loading: true, error: null }
        case "USER_REGISTER_SUCCESS":
            return { ...state, loading: false, userInfo: action.payload }
        case "USER_REGISTER_FAIL":
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}