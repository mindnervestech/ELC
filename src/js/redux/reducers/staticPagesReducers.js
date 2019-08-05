import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    faq: {},
    help: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {


        case actionType.GET_FAQ_DATA:
            return updateObject(state, action.payload)

        case actionType.GET_HELP_DATA:
            return updateObject(state, action.payload)

        default:
            return state;
    }

}

export default reducer