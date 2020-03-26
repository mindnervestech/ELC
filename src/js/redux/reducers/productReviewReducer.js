import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    post_review: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_REVIEW:
            return updateObject(state, action.payload);

        case actionTypes.GET_ALL_REVIEWS:
            return updateObject(state, action.payload)
        case actionTypes.CLEAR_PRODUCT_REVIEW:
        return updateObject(state,action.payload)


        default:
            return state;
    }
};

export default reducer;