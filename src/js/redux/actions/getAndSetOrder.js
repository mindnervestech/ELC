import * as actionType from './actionTypes';
import { API } from '../../api/api';
import { loadingSpinner } from './globals';

const callActionForGetOrderDetails = (payload) => {
    return {
        type: actionType.GET_ORDER_DETAILS_CHECKOUT,
        payload: payload
    };
};

export const getOrderDetails = (payload) => {

    return dispatch => {
        const data = {
            quote_id: payload.quote_id,
            store_id: payload.store_id,
        }
        dispatch(loadingSpinner({ loading: true }))
        dispatch({
            type: actionType.SET_ORDER_DETAILS_LOADER,
            payload: { orderDetailLoader: true}
        })
        let cb = {
            success: (res) => {

                if (res.status && res.code === 200) {
                    let order_details = { ...res }
                    //console.log('order_details : ', order_details)
                    dispatch(callActionForGetOrderDetails({
                        is_order_conf_details_rec: true,
                        order_details: order_details
                    }))
                } else {
                    //console.log(res.message);

                }
                dispatch(loadingSpinner({ loading: false }))
                dispatch({
                    type: actionType.SET_ORDER_DETAILS_LOADER,
                    payload: { orderDetailLoader: false}
                })
            },
            error: (err) => {
                //console.log(err);
                dispatch(loadingSpinner({ loading: false }))
                dispatch({
                    type: actionType.SET_ORDER_DETAILS_LOADER,
                    payload: { orderDetailLoader: false}
                })
            }
        }

        API.getOrderDetails(data, cb)

    }

}

const callActionForPlaceOrder = (payload) => {
    return {
        type: actionType.PLACE_ORDER_CHECKOUT,
        payload: payload
    };
};

const CallActionForUpdateNewQuoteId = (payload) => {
    return {
        type: actionType.UPDATE_NEW_QUOTE_ID,
        payload: payload
    };
};



export const placeOrder = (payload) => {

    return (dispatch, getState) => {
        const data = {
            quote_id: payload.quote_id,
            store_id: payload.store_id,

        }
        dispatch(loadingSpinner({ loading: true }))
        let cb = {
            success: (res) => {
                //console.log(res);
                if (res.status) {
                    let newState = {
                        order_details: { ...getState().myCart.order_details },
                        is_order_placed: true,
                        order_id: res.order_data.order_number,
                        order_data: { ...res.order_data }
                    }

                    if (res.order_data.new_quote_id !== "") {
                        let newQuoteId = {
                            ...getState().login.customer_details,
                            quote_id: res.order_data.new_quote_id,
                        }
                        dispatch(CallActionForUpdateNewQuoteId({ customer_details: { ...newQuoteId } }))
                    }
                    dispatch(callActionForPlaceOrder({ is_order_placed: true, order_summary: { ...newState } }))

                }
                dispatch(loadingSpinner({ loading: false }))
            },
            error: (err) => {
                dispatch(loadingSpinner({ loading: false }))
            }
        }

        API.placeOrder(data, cb)

    }

}