const initialState = {
    profile: null,
    loading: false,
    error: null,
}

export const getprofileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PROFILE_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            }
        case 'PROFILE_SUCCESS':
            return {
                ...state,
                loading: false,
                profile: action.payload,
            }
        case 'PROFILE_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}