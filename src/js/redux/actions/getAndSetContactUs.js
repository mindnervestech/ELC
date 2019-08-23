import * as actionType from './actionTypes';
import { API } from '../../api/api';
import { loadingSpinner } from './globals';

const callActionForGetContactUsData = (payload) => {
    return {
        type: actionType.GET_CONTACT_US_DATA,
        payload: payload
    };
};

export const getContactUsData = (payload) => {

    return dispatch => {
        const data = {
            storeId: payload.storeId,
        }
        // dispatch(loadingSpinner({ loading: true }))
        let cb = {
            success: (res) => {
                if (res.status && res.code === 200) {
                    dispatch(callActionForGetContactUsData({
                        page_data: { ...res }
                    }))
                    dispatch(loadingSpinner({ loading: false }))
                } else {

                    //console.log(res.message);
                    dispatch(loadingSpinner({ loading: false }))
                }

            },
            error: (err) => {
                //console.log(err);

            }
        }

        API.getContactUsData(data, cb)

    }

}

const callActionForSaveContactUsData = (payload) => {
    return {
        type: actionType.SAVE_CONTACT_US_DATA,
        payload: payload
    };
};

export const saveContactUsData = (payload) => {

    return dispatch => {
        const data = {
            ...payload
        }
        dispatch(loadingSpinner({ loading: true }))
        let cb = {
            success: (res) => {
                if (res.status && res.code === 200) {
                    dispatch(loadingSpinner({ loading: false }))
                    dispatch(callActionForSaveContactUsData({ save_responce: { ...res } }))
                } else {
                    dispatch(loadingSpinner({ loading: false }))
                    dispatch(callActionForSaveContactUsData({ save_responce: { ...res } }))
                }

            },
            error: (err) => {
                //console.log(err);
                dispatch(loadingSpinner({ loading: false }))
            }
        }

        API.saveContactUsData(data, cb)

    }

}

export const clearContactUsResponse = () => {
    return {
        type: actionType.CLEAR_RESPONSE,
        payload: { save_responce: {} }
    };
};

