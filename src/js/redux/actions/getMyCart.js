import * as actionType from './actionTypes';
import { API } from '../../api/api';
import { loadingSpinner } from './globals';

/////////////////////////////////////////GET CART//////////////////////////////////////////////////
export const callActionForMyCart = (payload) => {

    return {
        type: actionType.GET_MY_CART,
        payload: payload
    };
}

export const getMyCart = (payload) => {
    //console.log('get my cart : ', payload)
    return dispatch => {

        const data = {
            quote_id: payload.quote_id,
            store_id: payload.store_id,
        }

        dispatch({
            type: actionType.LOADING_SPINNER,
            payload: { loading: true, shippingLoader: true, text: 'cart start' }
        });

        dispatch({
            type: actionType.CARD_LOADER,
            payload: { loader: true }
        });

        let cb = {
            success: (res) => {
                // console.log('LOCAL getMyCart res', res);

                if ((res.status) && (res.code == 200) && ('data' in res)) {
                    let newState = {
                        ...res.data,
                        is_cart_details_rec: true,
                    }
                    dispatch(callActionForMyCart(newState))

                } else if ((res.status) && (res.code == 200) && (!('data' in res))) {
                    dispatch(clearCartItem())
                }

                dispatch(loadingSpinner({ loading: false }))
                dispatch({
                    type: actionType.CARD_LOADER,
                    payload: { loader: false }
                });
                dispatch({
                    type: actionType.ADD_TO_CARD_LOADER,
                    payload: { addToCardLoader: false }
                });

                dispatch({
                    type: actionType.LOADING_SPINNER,
                    payload: { loading: false, text: 'cart end' }
                });

                dispatch({
                    type: actionType.QTY_UPDATE_LOADER,
                    payload: { update_loader: false }
                });

            },
            error: (err) => {
                dispatch(callActionForMyCart(err.data))
                dispatch(loadingSpinner({ loading: false, text: 'cart error' }))
                dispatch({
                    type: actionType.CARD_LOADER,
                    payload: { loader: false }
                });
                dispatch({
                    type: actionType.ADD_TO_CARD_LOADER,
                    payload: { addToCardLoader: false }
                });
                dispatch({
                    type: actionType.QTY_UPDATE_LOADER,
                    payload: { update_loader: false }
                });
            }
        }
        API.getMyCartApi(data, cb)
    }

}
/////////////////////////////////////////////UPDATE CART//////////////////////////////////////////////////
export const changeQtyState = (payload) => {

    return {
        type: actionType.CHANGE_QTY,
        payload: payload
    };

}

export const changeQty = (payload) => {

    return (dispatch, getState) => {
        let prodArray = getState().myCart.products;
        let newProduct = prodArray[payload.index];
        let newQty = newProduct.qty;

        if (payload.type === 'inc') {
            newQty = payload.qty + 1;

        } else if ((payload.type === 'dec') && (newQty > 1)) {
            newQty = payload.qty - 1;

        }


        let data = {
            product_id: newProduct.id,
            quote_id: getState().myCart.quote_id,
            qty: newQty,
            sku: newProduct.sku,
            store_id: getState().global.currentStore,
        }
        dispatch(loadingSpinner({ loading: true }))
        dispatch({
            type: actionType.QTY_UPDATE_LOADER,
            payload: { update_loader: true }
        });
        let cb = {
            success: (res) => {
                //console.log(res);
                if (res.status) {
                    if (payload.type === 'inc') {
                        newProduct.qty = res.data.cart_count;

                    } else if ((payload.type === 'dec') && (newProduct.qty > 1)) {
                        newProduct.qty = res.data.cart_count;

                    }

                    dispatch(changeQtyState({ products: prodArray }))
                    dispatch(getMyCart({
                        quote_id: getState().myCart.quote_id,
                        store_id: getState().global.currentStore,
                    }));

                }
                dispatch(loadingSpinner({ loading: false }))

            },
            error: (err) => {
                dispatch(changeQtyState(err.data))
                dispatch(loadingSpinner({ loading: false }))
                dispatch({
                    type: actionType.QTY_UPDATE_LOADER,
                    payload: { update_loader: false }
                });
            }
        }

        API.updateCart(data, cb)


    }
}


////////////////////////////////////////REMOVE PRODUCT CART/////////////////////////////////////////

export const removeProductState = (payload) => {
    //console.log(payload);
    return {
        type: actionType.REMOVE_ITEM,
        payload: payload
    };

}

export const removeProduct = (payload) => {

    return (dispatch, getState) => {
        let prodArray = getState().myCart.products;
        let newPorduct = prodArray[payload.index];

        let data = {
            product_id: newPorduct.id,
            quote_id: getState().myCart.quote_id,
        }
        dispatch(loadingSpinner({ loading: true }))
        let cb = {
            success: (res) => {
                //console.log(res);
                if (res.status) {
                    prodArray.splice(payload.index, 1)

                    dispatch(removeProductState({ products: [...prodArray] }))
                }
                dispatch(getMyCart({
                    quote_id: getState().myCart.quote_id,
                    store_id: getState().global.currentStore,
                }));
                dispatch(loadingSpinner({ loading: false }))
            },
            error: (err) => {
                dispatch(removeProductState(err.data))
                dispatch(loadingSpinner({ loading: false }))
            }
        }


        API.deleteCart(data, cb);

    }
}

//////////////////////////////////////////CLEAR CART ITEM ///////////////////////////

export const clearCartItem = () => {
    return {
        type: actionType.CLEAR_CART_ITEM,
        payload: {}
    }
}


export const setOrderSummary = (payload) => {
    return dispatch => {
        const data = {
            store_id: payload.store_id,
            order_id: payload.order_id
        }
        dispatch(loadingSpinner({ loading: true }))
        let cb = {
            success: res => {
                dispatch({
                    type: actionType.SET_ORDER_SUMMARY,
                    payload: { order_summary: { order_data: res.order_data } }
                })
                dispatch({
                    type: actionType.SET_ORDER_SUMMARY_DATA,
                    payload: { order_summary: { order_data: res.order_data } }
                })
                dispatch(loadingSpinner({ loading: false }))
            },
            error: err => {
                dispatch(loadingSpinner({ loading: false }))
            },
        };

        API.getOrderSummary(data, cb);
    }
}

////////////////////////////////////////REMOVE PRODUCT Out OF STOACK/////////////////////////////////////////

export const removeOutOfStockProduct = (payload) => {
    //console.log(payload);
    return {
        type: actionType.REMOVE_OUT_OF_STOCK_ITEM,
        payload: payload
    };

}

export const removeAllOutOfStockProduct = (payload) => {

    return (dispatch, getState) => {

        const data = {
            quote_id: payload.quote_id,
        }

        dispatch(loadingSpinner({ loading: true }))
        let cb = {
            success: (res) => {
                //console.log(res);
                if (res.status) {
                    dispatch(getMyCart({
                        quote_id: getState().myCart.quote_id,
                        store_id: getState().global.currentStore,
                    }));
                } else {
                    console.log('Error');
                    dispatch(loadingSpinner({ loading: false }))
                }

            },
            error: (err) => {
                dispatch(loadingSpinner({ loading: false }))
            }
        }


        API.removeOutOfStock(data, cb);

    }
}

//////////////////////////////////////////Redirect To Payment //////////////////////////////

export const redirectToPayment = () => {

    return (dispatch, getState) => {
        const payload = getState().myCart.payment_details;

        dispatch({
            type: actionType.REDIRECT_TO_PAYMENT,
            payload: {
                payment_details: {
                    ...payload,
                    redirectToOrderConfirmation: false
                },
                is_order_conf_details_rec: false,
                order_details: {

                }

            }
        })

    }


}

//////////////////////////////////////////Redirect To Payment //////////////////////////////

export const redirectToDelivery = () => {

    return (dispatch, getState) => {
        const payload = getState().myCart;
        const payment = getState().myCart.payment_details;
        dispatch({
            type: actionType.REDIRECT_TO_PAYMENT,
            payload: {
                ...payload,
                shipping_details: {
                },

                payment_details: {
                    ...payment,
                    redirectToOrderConfirmation: false
                },

                is_order_conf_details_rec: false,
                order_details: {

                }
            }
        })

    }


}

//////////////////////////////////////////Redirect To Cart //////////////////////////////

export const redirectToCart = () => {

    return (dispatch, getState) => {
        const payload = getState().myCart;
        dispatch({
            type: actionType.REDIRECT_TO_CART,
            payload: {
                ...payload,
                myCartTwoRec: false,
                addNewAddress: false,
                available_address: false,

                is_shipping_details_rec: false,
                is_payment_details_rec: false,
                is_order_conf_details_rec: false,
                is_order_placed: false,
                redirectToOrderConfirmation: false,

                payment_code: 'cashondelivery',
                delivery_type: null,

                addressData: [],
                shipping_details: {},
                payment_details: {},
                order_details: {},
                order_summary: {
                    order_data: {
                        address: {},
                        order_summary: {},
                        product_details: []
                    }
                },
            }
        }
        )

    }


}

