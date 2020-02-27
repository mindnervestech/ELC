// import React from 'react';
// import './styles/index.css';
// import App from './js/components/App';
// import ReactDOM from 'react-dom';

// //redux
// import { Provider } from 'react-redux';
// import { createStore, compose, combineReducers, applyMiddleware } from 'redux';

// // Redux Persist
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import { PersistGate } from 'redux-persist/integration/react'
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

// import myCartReducer from './js/redux/reducers/myCartReducer';
// import loginReducer from './js/redux/reducers/loginAndMyAccountReducer';
// import addressReducer from './js/redux/reducers/userAddressReducer';
// import orderHistoryReducer from './js/redux/reducers/orderHistoryReducer';
// import wishListReducer from './js/redux/reducers/wishListReducer';
// import globalReducer from './js/redux/reducers/globalReducer';
// import menuNavigationReducer from './js/redux/reducers/menuNavigationReducer';
// import productDetailReducer from './js/redux/reducers/productDetailReducer';
// import SpinnerReducer from './js/redux/reducers/SpinnerReducer';
// import thunk from 'redux-thunk';
// import Spinner2 from './js/components/Spinner/Spinner2';

// const AppRootReducer = combineReducers({
//     myCart: myCartReducer,
//     login: loginReducer,
//     address: addressReducer,
//     orders: orderHistoryReducer,
//     wishList: wishListReducer,
//     global: globalReducer,
//     menu: menuNavigationReducer,
//     productDetails: productDetailReducer,
//     spinner: SpinnerReducer,
// })

// const rootReducer = (state, action) => {
//     if (action.type === 'LOGOUT_USER') {
//         storage.removeItem('persist:root')
//         state = undefined;
//     }
//     return AppRootReducer(state, action);
// };

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// // const logger = (store) => {
// //     return next => {
// //         return action => {
// //             console.groupCollapsed("REDUX LOG");
// //             console.log('Action : ', action);

// //             const result = next(action);
// //             console.log('Store : ', store.getState());
// //             console.groupEnd();
// //             return result;
// //         }
// //     }

// // }


// const persistConfig = {
//     key: 'root',
//     storage: storage,
//     blacklist: ['productDetails', 'myCart', 'SpinnerReducer'],
//     stateReconciler: autoMergeLevel2,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
// let persistor = persistStore(store);

// const app = (
//     <Provider store={store}>
//         <PersistGate loading={<Spinner2 />} persistor={persistor}>
//             <App />
//         </PersistGate>
//     </Provider>

// );

// ReactDOM.render(app, document.getElementById('root'));