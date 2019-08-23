import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    addressBook:[],
    countryList:[],
    addressResp : {},
    storeList : [],
    isAddBookRec: false,
    isContryRec : false
}

const reducer = (state = initialState, action) => {
    switch(action.type){

        case actionType.GET_ADDRESS_BOOK:
        return updateObject(state, action.payload)

        case actionType.GET_COUNTRIES:
        return updateObject(state, action.payload)

        case actionType.ADD_NEW_ADDRESS:
        return updateObject(state, action.payload)

        case actionType.EDIT_ADDRESS:
        return updateObject(state, action.payload)

        case actionType.DELETE_ADDRESS:
        return updateObject(state, action.payload)

        case actionType.GET_STORE_LIST:
        return updateObject(state, action.payload)

        
        default:
        return state;
    }

}

export default reducer