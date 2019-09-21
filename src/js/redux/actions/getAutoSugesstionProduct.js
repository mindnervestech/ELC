
import * as actionTypes from './actionTypes';
import { API } from '../../api/api';
import { loadingSpinner, loadingSpinnerForProduct } from './globals';


export const callActionGetAutoSuggestionProductSearchList = payload => {
   
	return {
		type: actionTypes.GET_SUGGESTION_API,
		payload: payload,
	};
};



export const getAutoSuggestionProductSearchList = payload => {

	return dispatch => {
        const data = {
            q: payload.q,
            storeId:payload.storeId
        };
       
        let cb = {
            success: res => {
                if (res.status && res.code === 200) {
                  
                    dispatch(callActionGetAutoSuggestionProductSearchList({ autoSerachsuggestionData: res.data }));
                }else{
                    dispatch(callActionGetAutoSuggestionProductSearchList({ autoSerachsuggestionData: res.data }));
                }
            },
            error: err => {
               
            },
        };
        API.getAutoSuggestionProduct(data, cb);
        };};
