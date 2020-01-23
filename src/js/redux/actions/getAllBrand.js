import * as actionTypes from './actionTypes';
import { API } from '../../api/api';
import { loadingSpinner, loadingSpinnerForProduct } from './globals';

///-------------------------------- GET AVAILABLE BRANDS ----------------------------------------///
export const callForGetAllBrabds = (payload) => {
    return {
        type: actionTypes.GET_BRANDS_SHOP_BY_BRAND,
        payload: payload
    }
}

export const getAvailabeBrands = payload => {
    return (dispatch, getState) => {
		
		const data = {
            storeid: payload.storeid,	
		};
	
		dispatch(loadingSpinner({ loadingSpinner: true }))

		let cb = {
			success: res => {
				
				if (true) {
                    dispatch(callForGetAllBrabds({brand:res}))
                    dispatch(loadingSpinner({ loadingSpinner: true }))
				} else {
					dispatch(loadingSpinner({ loadingSpinner: true }))
				}
			},
			error: err => {
				dispatch(loadingSpinner({ loadingSpinner: true }))
			},
		};

		API.getAllBrands(data, cb);
	};
}

export const callForGetProductsBrabds = (payload) => {
    return {
        type: actionTypes.GET_PRODUCTS_BY_BRANDS,
        payload: payload
    }
}



export const getProductsByBrands = payload => {
    return (dispatch, getState) => {
		
		const data = {
            storeid: payload.storeid,	
		};
	
		dispatch(loadingSpinner({ loadingSpinner: true }))

		let cb = {
			success: res => {
				
				if (true) {
                    dispatch(callForGetProductsBrabds({productData:res}))
                    dispatch(loadingSpinner({ loadingSpinner: true }))
				} else {
					dispatch(loadingSpinner({ loadingSpinner: true }))
				}
			},
			error: err => {
				dispatch(loadingSpinner({ loadingSpinner: true }))
			},
		};

		API.getProductsByBrand(data, cb);
	};
}


