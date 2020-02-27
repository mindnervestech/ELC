import React from 'react';
import './styles/index.css';
import App from './js/components/App';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

//polyfill
import 'react-app-polyfill/ie11';
import 'core-js/features/array/find';
import 'core-js/features/array/includes';
import 'core-js/features/number/is-nan';
import 'core-js/es/object';
import 'core-js/features/url-search-params';
//redux
import cookie from 'react-cookies';
import { Provider } from 'react-redux';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import Spinner2 from './js/components/Spinner/Spinner2';
import { store } from './js/redux/store/store'
import { updateglobalReducer } from './js/redux/actions/globals';
import 'bootstrap/dist/css/bootstrap.css';
import { Spinner } from 'react-bootstrap';
import axios from 'axios'
let persistor = persistStore(store);
let GEO_IP_INFO_TOKEN = '604fcf895967a7'
let set_country = ''
let set_store_id = 0;
let set_store_locale = '';
let initialState = {};
let country_name;


// if(cookie.load("geoIPAPICallCount")===null || cookie.load("geoIPAPICallCount")===undefined){
// axios.get(`https://ipinfo.io/json?token=${GEO_IP_INFO_TOKEN}`)
//     .then((response) => {
//         let data = response.data;
//         country_name = data.country;
//         if (country_name !== '') {
//             if (country_name === 'IN') {
//                 set_country = 'KSA'
//                 set_store_id = 2
//                 set_store_locale = 'saudi-en'
//             } else {
//                 set_country = 'UAE'
//                 set_store_id = 4
//                 set_store_locale = 'uae-en'
//             }
//         }

//         initialState = {
//             allStores: {},
//             currentStore: cookie.load('storeid') ? cookie.load('storeid') : set_store_id,
//             language: cookie.load('language') ? cookie.load('language') : 'en',
//             country: cookie.load('country') ? cookie.load('country') : set_country,
//             region: cookie.load('store_locale') ? cookie.load('store_locale') : set_store_locale,
//             store_locale: cookie.load('store_locale') ? cookie.load('store_locale') : set_store_locale,
//             home_page_data: {},
//             count_geo_ip: 0,
//             ipInfo: {
//                 city: null,
//                 country: '',
//                 ip: null,
//                 loc: null,
//                 org: null,
//                 region: null,
//             },
//             discover_more: {}
//         }
//         store.dispatch(updateglobalReducer(initialState))
        
//             cookie.save("geoIPAPICallCount", 1)
//             cookie.save("countryThroughIPFromIndexjs",set_country)
//       ;
//     }).catch((err) => console.log(err))
// }


const app = (
    <Provider store={store}>
        <PersistGate loading={<Spinner2 />} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>

);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
