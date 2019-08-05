import * as actionTypes from './actionTypes';
import { API } from '../../api/api';

import { loadingSpinner } from './globals';

export const CallActionForFaqData = payload => {
    return {
        type: actionTypes.GET_FAQ_DATA,
        payload: payload,
    };
};

export const getFaqPageData = () => {
    return (dispatch, getState) => {
        const data = {
            //storeId: getState().global.currentStore
            storeId: getState().global.currentStore
        };

        let cb = {
            success: res => {
                //console.log('response', res);

                dispatch(CallActionForFaqData({ faq: { ...res } }))

            },
            error: err => { },
        };
        API.getFaqPageData(data, cb);
    };
};

//////////////////////GET HELP PAGE DATA/////////////////////

export const CallActionForhelpData = payload => {
    return {
        type: actionTypes.GET_HELP_DATA,
        payload: payload,
    };
};

export const getHelpPageData = () => {
    return (dispatch, getState) => {
        const data = {
            //storeId: getState().global.currentStore
            storeId: getState().global.currentStore
        };

        let cb = {
            success: res => {
                //console.log('response', res);
                dispatch(CallActionForhelpData({ help: { ...res } }))

            },
            error: err => { },
        };
        API.getHelpPageData(data, cb);
    };
}