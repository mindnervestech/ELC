import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';
import cookie from 'react-cookies';

const initialState = {
    allStores: {},
    currentStore: cookie.load('storeid')? cookie.load('storeid'): 4,
    loading: false,
    language: cookie.load('language')? cookie.load('language'): 'en',
    country: cookie.load('country')? cookie.load('country'): 'UAE',
    region: cookie.load('store_locale')? cookie.load('store_locale'): 'uae-en',
    store_locale: cookie.load('store_locale')? cookie.load('store_locale'): 'uae-en',
    home_page_data: {},
    ipInfo: {
        city: null,
        country: '',
        ip: null,
        loc: null,
        org: null,
        region: null,
    },
    currentTime:'',
    discover_more: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_TIME_STAMP:
            return updateObject(state, action.payload)

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