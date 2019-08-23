import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    page_data: {
        instagram: "https://www.instagram.com/nayomimena/",
        facebook: "https://www.facebook.com/NayomiMENA/",
        youtube: "https://www.youtube.com/NayomiMENA",
        whatsapp: "https://api.whatsapp.com/send?phone=971565069237",
        contactnumber_uae: "97143974173",
        contactnumber_ksa: "8001244443",
        contactnumber_int: "97143974173",
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