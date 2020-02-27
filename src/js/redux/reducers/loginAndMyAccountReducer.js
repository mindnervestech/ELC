import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    customer_details: {},
    isUserLoggedIn: false,
    loginMessage: null,
    errorMessage: null,
    loading: false,
    store_id: null,
    registerUserDetails: {},
    forgotPasswordDetails: {},
    changePasswordDetails: {},
    addressBook: [],
    resetpasswordSucess: false,
    resetpasswordToken: false,
    resetpasswordLoader: false,
    newLink: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LOGIN:
            return updateObject(state, action.payload)

        case actionType.REGISTER:
            return updateObject(state, action.payload)

        case actionType.FORGOT_PASSWORD:
            return updateObject(state, action.payload)

        case actionType.CHANGE_PASSWORD:
            return updateObject(state, action.payload)

        case actionType.GET_ADDRESS_BOOK:
            return updateObject(state, action.payload)

        case actionType.CLEAR_CHANGE_PASS:
            return updateObject(state, action.payload)

        case actionType.CLEAR_FORGOT_PASS:
            return updateObject(state, action.payload)

        case actionType.CLEAR_REGISTRATION_ERROR:
            return updateObject(state, action.payload)

        case actionType.UPDATE_NEW_QUOTE_ID:
            return updateObject(state, action.payload)

        case actionType.CLEAR_RESETPASSWORD_FLAG:
            return updateObject(state, action.payload)

        case actionType.RESETPASSWORD_LOADER:
            return updateObject(state, action.payload)

        case actionType.RESET_PASSWORD_SUCCESS:
            return updateObject(state, action.payload)

        default:
            return state;
    }

}

export default reducer