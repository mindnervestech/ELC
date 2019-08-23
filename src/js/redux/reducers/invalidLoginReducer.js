import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
   
}

const reducer = (state = initialState, action) => {
    switch (action.type) {


        case actionType.INVALID_LOGIN:
            return updateObject(state, action.payload)

        default:
            return state;
    }

}

export default reducer