import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    page_data: {
        instagram: "",
        facebook: "",
        youtube: "",
        whatsapp: "",
        contactnumber_uae: "",
        contactnumber_ksa: "",
        contactnumber_int: "",
    },
    save_responce: {},
}


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_CONTACT_US_DATA:
            return updateObject(state, action.payload)

        case actionType.SAVE_CONTACT_US_DATA:
            return updateObject(state, action.payload)

        case actionType.CLEAR_RESPONSE:
            return updateObject(state, action.payload)

        default:
            return state;
    }

}

export default reducer