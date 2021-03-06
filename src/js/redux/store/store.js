
//redux
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';

// Redux Persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import cookie from 'react-cookies';
import myCartReducer from '../reducers/myCartReducer';
import loginReducer from '../reducers/loginAndMyAccountReducer';
import invalidLoginReducer from '../reducers/invalidLoginReducer';
import addressReducer from '../reducers/userAddressReducer';
import orderHistoryReducer from '../reducers/orderHistoryReducer';
import wishListReducer from '../reducers/wishListReducer';
import globalReducer from '../reducers/globalReducer';
import menuNavigationReducer from '../reducers/menuNavigationReducer';
import productDetailReducer from '../reducers/productDetailReducer';
import SpinnerReducer from '../reducers/spinnerReducer';
import GuestUserReducer from '../reducers/guestUserReducer';
import StaticPagesReducer from '../reducers/staticPagesReducers';
import vipRegReducer from '../reducers/vipRegReducer';
import contactUsReducer from '../reducers/contactReducer';
import birthdayclubReducer from '../reducers/birthdayclubReducer';
import productSuggestionSearchReducer from  '../reducers/productSuggestionSearchReducer';
import xmasPageReducer from '../reducers/xmasPageReducer';
import thunk from 'redux-thunk';
import shopbybrandReducer from '../reducers/shopbybrandReducer'
import presentfinder from '../reducers/presentfinderReducer'

const AppRootReducer = combineReducers({
    myCart: myCartReducer,
    presentfinder:presentfinder,
    login: loginReducer,
    invalidLogin: invalidLoginReducer,
    address: addressReducer,
    orders: orderHistoryReducer,
    wishList: wishListReducer,
    global: globalReducer,
    availabe_brand:shopbybrandReducer,
    menu: menuNavigationReducer,
    productDetails: productDetailReducer,
    spinner: SpinnerReducer,
    guest_user: GuestUserReducer,
    static: StaticPagesReducer,
    vipReg: vipRegReducer,
    contact: contactUsReducer,
    birthdayclubData:birthdayclubReducer,
    autoSerachProduct:productSuggestionSearchReducer,
    item_added:productDetailReducer,
    xmas:xmasPageReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_USER') {
        storage.removeItem('persist:root')
        state = undefined;
        // cookie.save('myCartItem', {});
        localStorage.setItem('myCartItem', '');
    }
    return AppRootReducer(state, action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['login', 'global', 'address', 'static', 'guest_user'],
    stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
