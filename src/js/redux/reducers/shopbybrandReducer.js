import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
	brands: []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_BRANDS_SHOP_BY_BRAND:
			return updateObject(state, action.payload);
		case actionTypes.GET_PRODUCTS_BY_BRANDS:
			return updateObject(state, action.payload);
		case actionTypes.CLEAR_BROWSE_BRAND_PRODUCTS:
				return updateObject(state, action.payload);

		default:
			return state;
	}
};

export default reducer;