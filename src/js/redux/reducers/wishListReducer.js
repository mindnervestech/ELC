import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    products: [],
    wishLoader: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_WISHLIST_ITEM:
            return updateObject(state, action.payload)

        case actionType.ADD_PRODUCT_IN_WISHLIST:
            return updateObject(state, action.payload)

        case actionType.REMOVE_PRODUCT_FROM_WISHLIST:
            return updateObject(state, action.payload)
        
        case actionType.WISH_LIST_LOADER:
            return updateObject(state, action.payload)

        default:
            return state;
    }

}

export default reducer