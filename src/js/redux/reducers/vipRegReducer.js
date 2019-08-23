import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    registerUserDetails: {},
    errorMessage: null,
    loading: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.VIP_REGISTER:
            return updateObject(state, action.payload)
        default:
            return state;
    }

}

export default reducer