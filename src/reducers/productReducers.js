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

export const allproductsReducer = (state = { products: [], page: 1, pages: 1 }, action) => {
    switch (action.type) {
        case "ALL_PRODUCTS_REQUEST":
            return { ...state, loading: true, products: [] };

        case "ALL_PRODUCTS_SUCCESS":
            return {
                ...state,
                loading: false,
                products: action.payload.results,
                page: action.payload.page,
                pages: action.payload.total_pages,
            };

        case "ALL_PRODUCTS_FAIL":
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export const searchProductReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case "SEARCH_PRODUCTS_REQUEST":
            return { ...state, loading: true, products: [] };

        case "SEARCH_PRODUCTS_SUCCESS":
            return {
                ...state,
                loading: false,
                products: action.payload,
            };

        case "SEARCH_PRODUCTS_FAIL":
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};


export const categoryDetailReducer = (state = { category: {}, products: [] }, action) => {
    switch (action.type) {
        case "CATEGORY_DETAIL_REQUEST":
            return { ...state, loading: true, category: {}, products: [] };

        case "CATEGORY_DETAIL_SUCCESS":
            return {
                ...state,
                loading: false,
                category: action.payload.results.category,
                products: action.payload.results.products,
            };

        case "CATEGORY_DETAIL_FAIL":
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export const categoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case "CATEGORY_LIST_REQUEST":
            return { loading: true, categories: [] };
        case "CATEGORY_LIST_SUCCESS":
            return { loading: false, categories: action.payload };
        case "CATEGORY_LIST_FAIL":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productDetailReducer = (state = { product: {}, relatedProducts: [] }, action) => {
    switch (action.type) {
        case "PRODUCT_DETAIL_REQUEST":
            return { ...state, loading: true, product: {}, relatedProducts: [] };
            

        case "PRODUCT_DETAIL_SUCCESS":
            return {
                ...state,
                loading: false,
                product: action.payload,
                relatedProducts: action.payload.related_products,
            };

        case "PRODUCT_DETAIL_FAIL":
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export const productsDetailedReducer = (state = { product: {}, relatedProducts: [] }, action) => {
    switch (action.type) {
        case "PRODUCTS_DETAILED_REQUEST":
            return { ...state, loading: true, product: {}, relatedProducts: [] };
            

        case "PRODUCTS_DETAILED_SUCCESS":
            return {
                ...state,
                loading: false,
                product: action.payload,
                relatedProducts: action.payload.related_products,
            };

        case "PRODUCTS_DETAILED_FAIL":
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export const productReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case "PRODUCT_REVIEW_REQUEST":
            return { loading: true };

        case "PRODUCT_REVIEW_SUCCESS":
            return { loading: false, success: true, review: action.payload };

        case "PRODUCT_REVIEW_FAIL":
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};