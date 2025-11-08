const InitialState = {
    featuredProducts: [],
    featuredCategories: [],
    popularProducts: [],
    recentlyViewedProducts: [],
    loading: false,
    error: null,
}

export const featuredProductsReducers = (state = InitialState, action) => {
    switch (action.type) {
        case 'FEATURED_PRODUCTS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FEATURED_PRODUCTS_SUCCESS':
            return {
                ...state,
                loading: false,
                featuredProducts: action.payload.featured_products,
                featuredCategories: action.payload.featured_categories,
                popularProducts: action.payload.popular_products,
                recentlyViewedProducts: action.payload.recently_viewed_products,
            };
        case 'FEATURED_PRODUCTS_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};