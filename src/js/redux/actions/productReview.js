import * as actionType from "./actionTypes";
import { API } from "../../api/api";
import { loadingSpinner } from "./globals";


export const callForPostReviews = (payload) => {
    return {
        type: actionType.POST_REVIEW,
        payload: payload
    }

}
export const clearProductReview=()=>{
    return{
        type:actionType.CLEAR_PRODUCT_REVIEW,
        payload:{
            post_product_review_response:{}
        }
    }
}
export const callForGetAllReviews = (payload) => {
    return {
        type: actionType.GET_ALL_REVIEWS,
        payload: payload
    }
}

export const postReview = (payload) => {
    return dispatch => {
        const data = {
            ...payload
        }

        dispatch(loadingSpinner({ loading: true }))

        let cb = {
            success: res => {
                if (res.status && res.code === 200) {

                    dispatch(
                        callForPostReviews({
                            post_product_review_response: { ...res }
                        })
                    );
                    dispatch(loadingSpinner({ loading: false }))

                }
                else {
                    dispatch(
                        callForPostReviews({
                            post_product_review_response: { ...res }
                        })
                    );
                    dispatch(loadingSpinner({ loading: false }))
                }
            },
            error: err => {
                dispatch(loadingSpinner({ loading: false }))
            }
        };

        API.postReviews(data, cb);
    };
}


export const getProductReviewBySKU = payload => {

    return dispatch => {
        const data = {
            sku: payload.sku
        }
        dispatch(loadingSpinner({ loading: true }))
        let cb = {
            success: res => {
                if (res.status && res.code === 200) {
                    dispatch(
                        callForGetAllReviews({
                            product_review_by_sku_response: { ...res }
                        })
                    );
                    dispatch(loadingSpinner({ loading: false }))
                }
                else {
                    dispatch(
                        callForGetAllReviews({
                            product_review_by_sku_response: { ...res }
                        })
                    );
                    dispatch(loadingSpinner({ loading: false }))
                }
            },
            error: err => {
                dispatch(loadingSpinner({ loading: false }))
            }
        };
        API.getProductReviews(data, cb);
    };
}