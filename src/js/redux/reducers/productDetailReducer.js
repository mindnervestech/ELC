import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
	products: [],
	filters: [],
	productData: {},
	loading: false,
	totalQty: 0,
	productColor: {
		selectedColor: '',
		selectedVal: false,
	},
	productSize: {
		selectedSize: '',
		selectedVal: false,
	},
	bandSize: {
		selectedBandSize: '',
		selectedBandVal: false,
	},
	cupSize: {
		selectedCupSize: '',
		selectedCupVal: false,
	},
	payfort_data: null,
	redirect: false,
	productDetailLoader: false,
	productWishDetail: {},
	sizeChart: {},
	metainfo: {},
	addToCardLoader: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_PRODUCT_SEARCH_LIST:
			return updateObject(state, action.payload);
		case actionTypes.GET_PRODUCT_LIST:
			return updateObject(state, action.payload);
		case actionTypes.CREAR_PRODUCT_DETAILS:
			return updateObject(state, action.payload);
		case actionTypes.GET_PRODUCT_SIZE:
			return updateObject(state, action.payload);
		case actionTypes.GET_PRODUCT_BAND_SIZE:
			return updateObject(state, action.payload);
		case actionTypes.GET_PRODUCT_CUP_SIZE:
			return updateObject(state, action.payload);
		case actionTypes.GET_PRODUCT_COLOR:
			return updateObject(state, action.payload);
		case actionTypes.GET_PRODUCT_DETAILS:
			return updateObject(state, action.payload);
		case actionTypes.GET_PLACE_ORDER:
			return updateObject(state, action.payload);
		case actionTypes.PRODUCT_DETAIL_LOADER:
			return updateObject(state, action.payload);
		case actionTypes.PRODUCT_WISH_DETAIL:
			return updateObject(state, action.payload);
		case actionTypes.SET_SIZE_CHART:
			return updateObject(state, action.payload)
		case actionTypes.ADD_TO_CARD_LOADER:
			return updateObject(state, action.payload)
		default:
			return state;
	}
};

export default reducer;
