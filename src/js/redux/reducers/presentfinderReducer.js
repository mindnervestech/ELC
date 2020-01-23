
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    presentfinder:[]
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_PRESENT_FINDER_DATA:
            return updateObject(state,action.payload);
        case actionTypes.GET_PRESENT_FINDER_PRODUCTS:
			return updateObject(state,action.payload);
		
		default:
			return state;
	}
};

export default reducer;