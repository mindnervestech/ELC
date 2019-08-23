import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    loading: false,
    loadingProduct: false,
    shippingLoader: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {


        case actionType.LOADING_SPINNER:
            return updateObject(state, action.payload)

        case actionType.LOADING_SPINNER_PRODUCT:
            return updateObject(state, action.payload)

        default:
            return state;
    }

}

export default reducer