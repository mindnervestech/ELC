// import { createStore, applyMiddleware, compose } from "redux";
// import { connectRouter, routerMiddleware } from "connected-react-router";
// import { persistStore, persistReducer } from "redux-persist";
// import thunk from 'redux-thunk';

// import storage from 'redux-persist/lib/storage'
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

// import rootReducer from "./rootReducer";

// const persistConfig = {
//     key: 'root',
//     storage: storage,
//     blacklist: ['productDetails', 'myCart', 'spinner'],
//     stateReconciler: autoMergeLevel2,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default (initialState = {}, history) => {
//     const middlewares = [routerMiddleware(history), thunk];
//     const enhancers = [applyMiddleware(...middlewares)];
//     const composeEnhancers =
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//     const store = createStore(
//         connectRouter(history)(persistedReducer),
//         composeEnhancers(...enhancers)
//     );
//     const persistor = persistStore(store);
//     return { store, persistor };
// };