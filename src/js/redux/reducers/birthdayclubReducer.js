import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionType.SAVE_BIRTHDAY_CLUB_DATA:
      return updateObject(state, action.payload);

    default:
      return state;
  }
};

export default reducer;
