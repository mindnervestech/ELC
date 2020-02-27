import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    temp_quote_id: null,
    new_quote_id: null,
    startGuestCheckout: false,
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GUEST_USER_CART_ID:
            return updateObject(state, action.payload)

        case actionType.GET_GUEST_USER_CART_ITEM:
            return updateObject(state, action.payload)

        case actionType.GUEST_ADD_TO_CART:
            return updateObject(state, action.payload)

        case actionType.START_GUEST_CHECKOUT:
            return updateObject(state, action.payload)

        case actionType.CLEAR_CART_ITEM:
            return updateObject(state, initialState)

        default:
            return state;
    }

}

export default reducer