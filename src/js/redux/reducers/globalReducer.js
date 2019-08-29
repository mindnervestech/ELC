import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    allStores: {},
    currentStore: 2,
    loading: false,
    language: 'en',
    country: 'UAE',
    region: 'uae-en',
    store_locale: 'uae-en',
    home_page_data: {},
    ipInfo: {
        city: null,
        country: '',
        ip: null,
        loc: null,
        org: null,
        region: null,
    },


    discover_more: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.STORE_REGION:
            return updateObject(state, action.payload)

        case actionType.GET_STORE_ID:
            return updateObject(state, action.payload)

        case actionType.STORE_LOCALE:
            return updateObject(state, action.payload)

        case actionType.CHANGE_STORE:
            return updateObject(state, action.payload)

        case actionType.GET_HOME_PAGE_DATA:
            return updateObject(state, action.payload)

        case actionType.GET_IP_INFO:
            return updateObject(state, action.payload)

        case actionType.GET_DISCOVER_CMS:
            return updateObject(state, action.payload)

        default:
            return state;
    }

}

export default reducer