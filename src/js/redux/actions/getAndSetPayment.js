import * as actionType from './actionTypes';
import { API } from '../../api/api';
import { loadingSpinner } from './globals';

const callActionForGetPaymentDetails = (payload) => {
    return {
        type: actionType.GET_PAYMENT_CHECKOUT,
        payload: payload
    };
};

export const getPaymentDetails = (payload) => {

    return dispatch => {
        const data = {
            quote_id: payload.quote_id,
            store_id: payload.store_id,
        }
        dispatch(loadingSpinner({ loading: true }))
        let cb = {
            success: (res) => {
                if (res.status && res.code === 200) {
                    let payment_d = { ...res.data }
                    dispatch(callActionForGetPaymentDetails({
                        is_payment_details_rec: true,
                        payment_details: payment_d
                    }))
                }
                dispatch(loadingSpinner({ loading: false }))
            },
            error: (err) => {
                dispatch(loadingSpinner({ loading: false }))
            }
        }

        API.getPaymentDetails(data, cb)

    }

}

const callActionForSetPaymentDetails = (payload) => {
    //console.log(payload);
    return {
        type: actionType.SET_PAYMENT_CHECKOUT,
        payload: payload
    };
};

export const setPaymentDetails = (payload) => {

    return (dispatch, getState) => {
        const data = {
            quote_id: payload.quote_id,
            store_id: payload.store_id,
            payment_code: payload.payment_code
        }
        dispatch(loadingSpinner({ loading: true }))
        let cb = {
            success: (res) => {
                if (res.status && res.code === 200) {


                    let payment_details = {
                        ...getState().myCart.payment_details,
                        redirectToOrderConfirmation: true,
                        payment_code: payload.payment_code
                    }

                    dispatch(callActionForSetPaymentDetails({ payment_details: { ...payment_details } }))
                }
                dispatch(loadingSpinner({ loading: false }))
            },
            error: (err) => {
                //console.log(err);
                dispatch(loadingSpinner({ loading: false }))
            }
        }

        API.setPaymentDetails(data, cb)

    }

}