import * as actionTypes from './actionTypes';
import { API } from '../../api/api';
import { getMyCart ,getGuestCartId} from '../actions/index';
import cookie from 'react-cookies'
import { loadingSpinner, loadingSpinnerForProduct } from './globals';

export const callActionAddToWishlist = payload => {
	return {
		type: actionTypes.ADD_TO_WISHLIST,
		payload: payload,
	};
};
export const clearProductWishDetail = payload => {
    return dispatch=> {
		dispatch(callProductWishDetail({ productWishDetail: {} }))   
    };
}


export const callProductWishDetail = payload => {
	return ({
		type: actionTypes.PRODUCT_WISH_DETAIL,
		payload: payload
	})
}

const CallActionForUpdateNewQuoteId = (payload) => {
    return {
        type: actionTypes.UPDATE_NEW_QUOTE_ID,
        payload: payload
    };
};

export const addToWishlist = payload => {
	return dispatch => {
		const data = {
			customer_id: payload.customer_id,
			product_id: payload.product_id,
		};
		dispatch(loadingSpinnerForProduct({ loadingProduct: true,statusAlert:true }))
		let cb = {
			success: res => {
				dispatch(loadingSpinnerForProduct({ loadingProduct: false,statusAlert:false }))

				if (res.status && res.code === 200) {
					dispatch(callProductWishDetail({ productWishDetail: { is_in_wishlist: res.is_in_wishlist, wishlist_itemid: res.wishlist_itemid ,wishlist_success:res.message,} }))
				} else {
				}
			},
			error: err => {
				dispatch(loadingSpinnerForProduct({ loadingProduct: false }))
			 },
		};
		API.addToWishlist(data, cb);
	};
};

export const callActionGetProductSearchList = payload => {
	return {
		type: actionTypes.GET_PRODUCT_SEARCH_LIST,
		payload: payload,
	};
};

export const getProductSearchList = payload => {

	return dispatch => {
		const data = {
			customerid: payload.customerid,
			q: payload.q,
			page: payload.page,
			limit: payload.limit,
			sortby: payload.sortby,
			storeId: payload.storeid,
			filters: payload.filters,
		};
		dispatch(loadingSpinnerForProduct({ loadingProduct: true }))
		let cb = {
			success: res => {
				let product_data = [];
				dispatch(loadingSpinnerForProduct({ loadingProduct: false }))
				if (res.status && res.code === 200 && res.data) {

					if (Object.keys(payload.filters).length !== 0 && payload.filters.constructor === Object) {
						Object.keys(res.data.product_data).map(key => {
							product_data.push(res.data.product_data[key]);
						});
						dispatch(
							callActionGetProductSearchList({
								products: product_data,
								filters: res.data.filters,
								metainfo: { ...res.data }
							})
						);
					} else {
						dispatch(
							callActionGetProductSearchList({
								products: res.data,
								filters: res.data.filters,
								metainfo: { ...res.data }
							})
						);
					}

				} else {
					let newState = { ...res.data };
					dispatch(
						callActionGetProductSearchList({
							products: []
						})
					);
				}
			},
			error: err => {
				dispatch(loadingSpinnerForProduct({ loadingProduct: false }))
			},
		};

		API.getProductSearchList(data, cb);
	};
};

export const callActionGetProductList = payload => {
	return {
		type: actionTypes.GET_PRODUCT_LIST,
		payload: payload,
	};
};

export const getYouMayAlsoLikeData = (payload) => {
	return (dispatch, getState) => {
	const data = {
		currentStore: payload.currentStore,
	};
	dispatch(callProductDetailLoader({ productDetailLoader: true }))
	let cb = {
		success: res => {
			if (res.status && res.code === 200) {
				dispatch(callProductDetailLoader({ productDetailLoader: false }))
				dispatch(callActionYouMayAlsoLikeDetails({ YouMayAlsoLike: res.product }));
				if (getState().guest_user.temp_quote_id === null) {
					dispatch(getGuestCartId());
				}
			}else{
				dispatch(callProductDetailLoader({ productDetailLoader: false }))
			}
		},
		error: err => {
			dispatch(callProductDetailLoader({ productDetailLoader: false }))
		},
	};
	API.getYouMayAlsoLikeData(data, cb);
	};
}

const callActionYouMayAlsoLikeDetails = payload => {
	return {
		type: actionTypes.CREAR_PRODUCT_DETAILS,
		payload: payload,
	};
};

export const getProductList = payload => {

	return dispatch => {
		const data = {
			customerid: payload.customerid,
			url_key: payload.url_key,//"dressing-up-role-play",
			sortby: payload.sortby,
			storeid: payload.storeid,
			filters: payload.filters,
		};
		dispatch(loadingSpinnerForProduct({ loadingProduct: true }))
		dispatch(
			callActionGetProductSearchList({
				category_name: null
			})
		);
		let cb = {
			success: res => {
				let product_data = [];
				dispatch(loadingSpinnerForProduct({ loadingProduct: false }))
				if (res.status && res.code === 200) {
					let newState = { ...res.data };
					// if (Object.keys(payload.filters).length !== 0 && payload.filters.constructor === Object) {
					// 	Object.keys(res.data.product_data).map(key => {
					// 		product_data.push(res.data.product_data[key]);
					// 	});
					// 	dispatch(
					// 		callActionGetProductSearchList({
					// 			products: product_data,
					// 			filters: newState.filters,
					// 			category_name: res.data.category_name,
					// 			category_description: res.data.category_description,
					// 			metainfo: { ...res.data }
					// 		})
					// 	);
					// } else {
						dispatch(
							callActionGetProductSearchList({
								products: res.data,
								filters: newState.filters,
								category_name: res.data.category_name,
								category_description: res.data.category_description,
								metainfo: { ...res.data }
							})
						);
					// }

				} else {

					dispatch(
						callActionGetProductSearchList({
							products: [],
							category_name: null
						})
					);
				}
			},
			error: err => {
				dispatch(loadingSpinnerForProduct({ loadingProduct: false }))
				dispatch(
					callActionGetProductSearchList({
						category_name: null
					})
				);
			},
		};
		API.getProductList(data, cb);
	};
};

// Guest Add to cart Start
export const callActionForGuestAddToCart = payload => {
	return {
		type: actionTypes.GUEST_ADD_TO_CART,
		payload: payload,
	};
};

export const guestAddToCart = (payload, myCart) => {
	return dispatch => {
		const data = {
			cart_item: payload,
		};
		dispatch({
			type: actionTypes.ADD_TO_CARD_LOADER,
			payload: { addToCardLoader: true, add_cart_open_popUp: false}
		});
		let cb = {
			success: res => {

				myCart.quote_id = res.quote_id;
				// res['item_added_res'] = true;
				// myCart.quote_id = parseInt(res.quote_id);

				// if (res.status && res.code === 200) {
				//     let newState = { ...res.product[0] }
				dispatch(callActionitem_added({ item_added: res, add_cart_error : false, add_cart_open_popUp: true}));
				dispatch(getMyCart(myCart));
				// }
				// else {
				//     let newState = { ...res.product[0] }
				//     dispatch(callActionGetProductDetails({ productData: newState }))
				// }

				dispatch(callActionForGuestAddToCart({ new_quote_id: res.quote_id }))


			},
			error: err => { 
				dispatch(callActionitem_added({ item_added: err, add_cart_error : true, add_cart_open_popUp: true}));
				dispatch({
					type: actionTypes.ADD_TO_CARD_LOADER,
					payload: { addToCardLoader: false}
				});
			},
		};

		API.guestAddToCart(data, cb, payload.quote_id);
	};
};
// Guest Add to cart end

export const callActionForMyCart = payload => {
	//console.log(payload);
	return {
		type: actionTypes.GET_MY_CART,
		payload: payload,
	};
};

export const addToCart = (payload, myCart) => {
	
	return dispatch => {
		const data = {
			cart_item: payload,
		};
		dispatch({
			type: actionTypes.ADD_TO_CARD_LOADER,
			payload: { addToCardLoader: true, add_cart_open_popUp: false}
		});
		let cb = {
			success: res => {
				//console.log('myCartreq', myCart);

				// if (res.status && res.code === 200) {
				//     let newState = { ...res.product[0] }
				dispatch(getMyCart(myCart));
				dispatch(callActionitem_added({ item_added: res, add_cart_error : false, add_cart_open_popUp: true}));
				// }
				// else {
				//     let newState = { ...res.product[0] }
				//     dispatch(callActionGetProductDetails({ productData: newState }))
				// }
			},
			error: err => {
				dispatch(callActionitem_added({ item_added: err, add_cart_error : true, add_cart_open_popUp: true}));
				dispatch({
					type: actionTypes.ADD_TO_CARD_LOADER,
					payload: { addToCardLoader: false}
				});
			 },
		};

		API.addToCart(data, cb);
	};
};

const callActionGetSize = payload => {
	return {
		type: actionTypes.GET_PRODUCT_SIZE,
		payload: payload,
	};
};

export const getSize = payload => {
	return dispatch => {
		const data = {
			selectedSize: payload.selectedSize,
			selectedVal: payload.selectedVal,
		};
		dispatch(callActionGetSize({ productSize: data, totalQty: payload.totalQty }));
	};
};

const callActionGetBandSize = payload => {
	return {
		type: actionTypes.GET_PRODUCT_BAND_SIZE,
		payload: payload,
	};
};

export const getBandSize = payload => {
	return dispatch => {
		const data = {
			selectedBandSize: payload.selectedBandSize,
			selectedBandVal: payload.selectedBandVal,
		};
		dispatch(callActionGetBandSize({ bandSize: data, cupSize: {}, totalQty: 0 }));
	};
};

const callActionGetCupSize = payload => {
	return {
		type: actionTypes.GET_PRODUCT_CUP_SIZE,
		payload: payload,
	};
};

export const getCupSize = payload => {
	return dispatch => {
		const data = {
			selectedCupSize: payload.selectedCupSize,
			selectedCupVal: payload.selectedCupVal,
		};
		dispatch(callActionGetCupSize({ cupSize: data, totalQty: payload.totalQty }));
	};
};




const callActionGetProductDetails = payload => {
	return {
		type: actionTypes.GET_PRODUCT_DETAILS,
		payload: payload,
	};
};

const callActionitem_added = payload => {
	return {
		type: actionTypes.GET_ITEM_ADDED,
		payload: payload,
	};
};


const callActionGetColor = payload => {
	return {
		type: actionTypes.GET_PRODUCT_COLOR,
		payload: payload,
	};
};

const callProductDetailLoader = payload => {
	return {
		type: actionTypes.PRODUCT_DETAIL_LOADER,
		payload: payload
	}
}

export const getColor = payload => {
	return dispatch => {
		const data = {
			selectedColor: payload.selectedColor,
			selectedVal: payload.selectedVal,
		};
		dispatch(callActionGetColor({ productColor: data, configurable_item_options: payload.option }));
	};
};

const callActionClearProductDetails = payload => {
	return {
		type: actionTypes.CREAR_PRODUCT_DETAILS,
		payload: payload,
	};
};

export const clearProductDetails = payload => {
	return dispatch => {
		const data = {};

		dispatch(callActionClearProductDetails({ productData: [] }));
	};
};

export const getProductDetails = payload => {
	return (dispatch, getState) => {
		const data = {
			customerid: payload.customerid,
			store: payload.store,
			url_key: payload.url_key,
		};
		dispatch(callActionClearProductDetails({ productData: [] }));
		dispatch(callProductDetailLoader({ productDetailLoader: true }))
		dispatch({
			type: actionTypes.ADD_TO_CARD_LOADER,
			payload: { add_cart_open_popUp: false}
		});
		dispatch(loadingSpinnerForProduct({statusAlert:true }))

		let cb = {
			success: res => {
				dispatch(callProductDetailLoader({ productDetailLoader: false }))
				if (res.status && res.code === 200) {
					let newState = { ...res.product[0] };
					dispatch(callProductWishDetail({ productWishDetail: { is_in_wishlist: res.product[0].is_in_wishlist, wishlist_itemid: res.product[0].wishlist_itemid } }))
					dispatch(callActionGetProductDetails({ productData: newState, redirect: true }));
					if (getState().guest_user.temp_quote_id === null) {
						dispatch(getGuestCartId());
					}
				} else {
					let newState = { ...res.product[0] };
					dispatch(callActionGetProductDetails({ productData: newState, redirect: true }));
				}
			},
			error: err => {
				dispatch(callProductDetailLoader({ productDetailLoader: false }))
			},
		};

		API.getProductDetails(data, cb);
	};
};

export const getPlaceOrder = payload => {
	return (dispatch, getState) => {
		const data = {
			store_id: payload.store_id,
			quote_id: payload.quote_id
		}
		dispatch(loadingSpinner({ loading: true }))
		let cb = {
			success: res => {
				dispatch(loadingSpinner({ loading: false }))
				dispatch({
					type: actionTypes.GET_PLACE_ORDER,
					payload: { payfort_data: res.payfort_data }
				})
				// cookie.save('myCartItem', {});
				localStorage.setItem('myCartItem', '');
				if (res.order_data.new_quote_id !== "") {
					let newQuoteId = {
						...getState().login.customer_details,
						quote_id: res.order_data.new_quote_id,
					}
					dispatch(CallActionForUpdateNewQuoteId({ customer_details: { ...newQuoteId } }))
				}
			},
			error: err => {
				dispatch(loadingSpinner({ loading: false }))
			},
		};

		API.getPlaceOrder(data, cb);
	}
}

export const getSizeChart = payload => {
	return dispatch => {
		const data = {
			store_id: payload.store_id
		};
		let cb = {
			success: res => {
				dispatch({
					type: actionTypes.SET_SIZE_CHART,
					payload: { sizeChart: res.data }
				})
			},
			error: err => {
			},
		};

		API.getSizeChart(data, cb);
	}
}
