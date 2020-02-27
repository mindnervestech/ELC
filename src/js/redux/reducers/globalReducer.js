import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';
import{ store} from '../store/store'
import {updateglobalReducer} from '../actions/globals'
import cookie from 'react-cookies';
import axios from 'axios'
let GEO_IP_INFO_TOKEN = '604fcf895967a7'
let set_country = ''
let set_store_id = 0;
let set_store_locale = '';
let initialState = {};
let country_name;
// const res = await axios.get(`https://ipinfo.io/json?token=${GEO_IP_INFO_TOKEN}`)
var fetchIPInfo = async () => {
  
    const res = await axios.get(`https://ipinfo.io/json?token=${GEO_IP_INFO_TOKEN}`)
    //let data = await res.data;
    return  res;
}
// }
// if(!cookie.load("countryThroughIPFromIndexjs")){
fetchIPInfo().then(data => {

    country_name = data.data.country;
    if (country_name !== '') {
        if (country_name === 'KSA') {
            set_country = 'KSA'
            set_store_id = 2
            set_store_locale = 'saudi-en'
        } else {
            set_country = 'UAE'
            set_store_id = 4
            set_store_locale = 'uae-en'
        }
    }

    initialState = {
        allStores: {},
        currentStore: cookie.load('storeid') ? cookie.load('storeid') : set_store_id,
        language: cookie.load('language') ? cookie.load('language') : 'en',
        country: cookie.load('country') ? cookie.load('country') : set_country,
        region: cookie.load('store_locale') ? cookie.load('store_locale') : set_store_locale,
        store_locale: cookie.load('store_locale') ? cookie.load('store_locale') : set_store_locale,
        home_page_data: {},
        count_geo_ip: 0,
        ipInfo: {
            city: null,
            country: '',
            ip: null,
            loc: null,
            org: null,
            region: null,
        },
        discover_more: {},
        isUpdateThroughIP:true
    }
    //dispatch(updateglobalReducer(initialState))
     store.dispatch(updateglobalReducer(initialState))
    cookie.save("geoIPAPICallCount", 1)
    cookie.save("countryThroughIPFromIndexjs", set_country)
})
    .catch(err => { /*...handle the error...*/ });

const reducer = (state = initialState, action) => {
    if(initialState && initialState!==null ){
    switch (action.type) {
        case  actionType.UPDATE_GLOBAL_REDUCER:
            return updateObject(state, action.payload)

        case  actionType.STORE_REGION:
            return updateObject(state, action.payload)

        case  actionType.GET_STORE_ID:
            return updateObject(state, action.payload)

        case  actionType.STORE_LOCALE:
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
}

export default reducer