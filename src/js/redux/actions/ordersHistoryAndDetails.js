import * as actionType from './actionTypes';
import { API } from '../../api/api';
import { loadingSpinner } from './globals';

/////////////////////////////////GET ORDER HISTORY////////////////////////////////////

const callActionGetOrderHistory = (payload) => {

    return {
        type: actionType.GET_ORDER_HISTORY,
        payload: payload
    };
}

export const getOrderHistory = (payload) => {

    return (dispatch) => {
        const data = {
            ...payload,
        }

        dispatch(loadingSpinner({ loading: true }))
        let cb = {
            success: (res) => {
                if (res.status === true && res.code === 200) {
                    dispatch(callActionGetOrderHistory({ orders_history: res.orders_details, is_order_history_rec: true }))

                }
                dispatch(loadingSpinner({ loading: false }))

            },
            error: (err) => {

                //console.log(err);
                dispatch(loadingSpinner({ loading: false }))
            }
        }

        API.getOrderHistory(data, cb)

    }

}


/////////////////////////////////VIEW ORDERS DETAILS////////////////////////////////////

const callActionViewOrderDetails = (payload) => {

    return {
        type: actionType.ORDER_DETAILS_VIEW,
        payload: payload
    };
}

export const viewOrderDetails = (payload) => {

    return (dispatch) => {
        const data = {
            ...payload,
        }

        dispatch(loadingSpinner({ loading: true }))
        let cb = {
            success: (res) => {
                if (res.status === true && res.code === 200) {
                    dispatch(callActionViewOrderDetails({ orders_details: res.orders_details, is_order_details_rec: true }))

                }
                dispatch(loadingSpinner({ loading: false }))
            },
            error: (err) => {
                dispatch(loadingSpinner({ loading: false }))
                //console.log(err);
            }
        }

        API.getOrderDetailsInProfile(data, cb)

    }

}

export const clearState = () => {
    return {
        type: actionType.CLEAR_STATE,
        payload: { is_order_details_rec: false }
    };
}

export const orderJson = (payload) => {

    return (dispatch) => {
        const data = {
            order_id : payload.order_id
        };

        let cb = {
            success: (res) => {
                if (res.status === true && res.code === 200) {
                    //console.log(res.message);
                }
            },
            error: (err) => {
                //console.log(err);
            }
        }

        API.setOrderJson(data, cb)
    }
}