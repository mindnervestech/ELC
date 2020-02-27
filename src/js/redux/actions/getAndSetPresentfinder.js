import * as actionTypes from './actionTypes';
import { API } from '../../api/api';
import { loadingSpinner, loadingSpinnerForProduct } from './globals';


///-------------------------------- GET PRSENT FINDER DATA ----------------------------------------///
export const callForGetPresentFinderData = (payload) => {
	return {
		type: actionTypes.GET_PRESENT_FINDER_DATA,
		payload: payload
	}
}

export const getPresentFinderData = payload => {
	return (dispatch, getState) => {
		const data = {
			storeid: payload.storeid,
		};

		dispatch(loadingSpinner({ loadingSpinner: true }))
 
		let cb = {
			success: res => {

				if (true) {
					dispatch(callForGetPresentFinderData({ present_finder_data: res }))
					dispatch(loadingSpinner({ loadingSpinner: true }))
				} else {
					dispatch(loadingSpinner({ loadingSpinner: true }))
				}
			},
			error: err => {
				dispatch(loadingSpinner({ loadingSpinner: true }))
			},
		};

		API.getPresentFinderInfo(data, cb);
	};
}

export const callForSetPresentFinderData = (payload) => {
	return {
		type: actionTypes.GET_PRESENT_FINDER_PRODUCTS,
		payload: payload
	}
}



export const getAndSetPresentFinderProducts = payload => {
	return (dispatch, getState) => {

		const data = {
			storeid:payload.storeid,
			age: payload.age,
			priceFrom:payload.priceFrom,
			priceTo:payload.priceTo
		};
	
		
		dispatch(loadingSpinner({ loadingSpinner: true }))
		
		let cb = {
			success: res => {

				if (res.status===true) {
					dispatch(callForSetPresentFinderData({ productData: res }))
					dispatch(loadingSpinner({ loadingSpinner: true }))
				} else
				{
					dispatch(callForSetPresentFinderData({ productData: res }))
					dispatch(loadingSpinner({ loadingSpinner: false }))
				}
			},
			error: err => {
				dispatch(loadingSpinner({ loadingSpinner: false }))
			},
		};

		API.getPresentFinderProducts(data, cb);
	};
}


