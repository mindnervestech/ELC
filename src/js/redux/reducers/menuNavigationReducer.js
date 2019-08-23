import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    menuNavData: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_MENU_NAVIGATION:            
            return updateObject(state, action.payload)
        default:
            return state;
    }

}

export default reducer;