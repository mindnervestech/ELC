import * as actionType from './actionTypes';
import { API } from '../../api/api';
import { loadingSpinner } from './globals';
import cookie from 'react-cookies';
import * as action from './index';
/////////////////////////////////////////GET CART//////////////////////////////////////////////////
export const callActionForMyCart = (payload) => {

    return {
        type: actionType.GET_MY_CART,
        payload: payload
    };
}

const CallActionForUpdateNewQuoteId = (payload) => {
    return {
        type: actionType.UPDATE_NEW_QUOTE_ID,
        payload: payload
    };
};

export const getMyCart = (payload) => {
    return (dispatch, getState) => {
        const data = {
            quote_id: payload !== undefined ? payload.quote_id : getState().login.customer_details.quote_id,
            store_id: payload !== undefined ? payload.store_id : getState().global.currentStore,
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

                if ((res.status) && (res.code == 200) && ('data' in res)) {
                    let newState = {
                        ...res.data,
                        is_cart_details_rec: true,
                    }
                    // cookie.save('myCartItem', newState);
                    localStorage.setItem('myCartItem', JSON.stringify(newState));
                    dispatch(callActionForMyCart(newState))
                    dispatch(action.getPaymentDetails({
                        quote_id: payload !== undefined ? payload.quote_id : getState().login.customer_details.quote_id,
                        store_id: payload !== undefined ? payload.store_id : getState().global.currentStore,
                    }));
                } else if ((res.status) && (res.code == 200) && (!('data' in res))) {
                    // dispatch(clearCartItem())
                    // cookie.save('myCartItem', {});
                    localStorage.setItem('myCartItem', '');
                }else if(!res.status && res.code === 400){
                    if (res.new_quote_id !== "") {
                        let newQuoteId = {
                            ...getState().login.customer_details,
                            quote_id: res.new_quote_id,
                        }
                        dispatch(CallActionForUpdateNewQuoteId({ customer_details: { ...newQuoteId } }))
                    }
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
        // let newQty = payload.qty;

        // if (payload.type === 'inc') {
        //     newQty = payload.qty + 1;

        // } else if ((payload.type === 'dec') && (newQty > 1)) {
        //     newQty = payload.qty - 1;

        // }


        let data = {
            product_id: payload.product_id,
            quote_id: payload.quote_id,
            qty: payload.qty,
            sku: payload.sku,
            store_id: payload.store_id,
        }
        dispatch(loadingSpinner({ loading: true }))
        dispatch({
            type: actionType.QTY_UPDATE_LOADER,
            payload: { update_loader: true }
        });
        let cb = {
            success: (res) => {
                if (res.status) {
                    // if (payload.type === 'inc') {
                    //     newProduct.qty = res.data.cart_count;

                    // } else if ((payload.type === 'dec') && (newProduct.qty > 1)) {
                    //     newProduct.qty = res.data.cart_count;

                    // }

                    dispatch(changeQtyState({ 
                        products: prodArray,
                        qtyData: res
                    }))
                    dispatch(getMyCart({
                        quote_id: getState().myCart.quote_id,
                        store_id: getState().global.currentStore,
                    }));

                }
                dispatch(loadingSpinner({ loading: false }))
                dispatch({
                    type: actionType.QTY_UPDATE_LOADER,
                    payload: { update_loader: false }
                });

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
            // product_id: newPorduct.id,
            sku:newPorduct.sku,
            quote_id: getState().myCart.quote_id,
        }
        dispatch(loadingSpinner({ loading: true }))
        let cb = {
            success: (res) => {
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
        payload: {
            // new_quote_id: null,
            startGuestCheckout: false,
            temp_quote_id: null,
        }
    }
}

export const clearShippingDetails = () => {
    return {
        type: actionType.CLEAR_SHIPPING_DETAILS,
        payload: {
           shipping_details:{}
        }
    }
}


export const setOrderSummary = (payload) => {
    return (dispatch, getState) => {
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

                if(getState().guest_user.startGuestCheckout){
                    dispatch(getMyCart({
                        quote_id: getState().myCart.quote_id,
                        store_id: getState().global.currentStore,
                    }));
                }
                dispatch({
                    type: actionType.SET_ORDER_SUMMARY_DATA,
                    payload: { order_summary: { order_data: res.order_data } }
                })
                dispatch(loadingSpinner({ loading: false }))
                dispatch(clearCartItem())
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
                if (res.status) {
                    dispatch(getMyCart({
                        quote_id: getState().myCart.quote_id,
                        store_id: getState().global.currentStore,
                    }));
                } else {
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
            type: actionType.REDIRECT_TO_DELIVERY,
            payload: {
                ...payload,
                shipping_details: {
                },

                payment_details: {

                },

                is_order_conf_details_rec: false,
                is_payment_details_rec: false,
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

export const applyVoucode = (payload) => {
    return dispatch => {
        const data = {
            ...payload
        }
 
        dispatch(loadingSpinner({ loading: true }))
        let cb = {
            success: (res) => {
                if (res.status) {
                    dispatch(action.getMyCartAfterVoucher({
                        store_id: payload.store,
                        quote_id: payload.quoteid
                    }));
                    dispatch(action.getPaymentDetails({
                        store_id: payload.store,
                        quote_id: payload.quoteid,
                        voucher: payload.voucode
                    }));
                    dispatch({
                        type: actionType.SET_VOU_CODE,
                        payload: { voucherSuccess: res.message }
                    })
                } else {
                    dispatch(loadingSpinner({ loading: false }))
                    dispatch({
                        type: actionType.SET_VOU_CODE,
                        payload: { voucher: payload.voucode, removevouher: false, voucherError: res.message }
                    });
                }
            },
            error: (err) => {
                dispatch(loadingSpinner({ loading: false }))
                dispatch({
                    type: actionType.SET_VOU_CODE,
                    payload: { voucher: payload.voucode, removevouher: false }
                });
            }
        }
 
 
        API.applyVoucode(data, cb);
    }
 }
 
 export const removeVoucode = (payload) => {
    return dispatch => {
        const data = {
            voucode: payload.voucode,
            quoteid: payload.quoteid
        }
 
        dispatch(loadingSpinner({ loading: true }))
        let cb = {
            success: (res) => {
                if (res.status) {
                    dispatch(action.getMyCartAfterVoucher({
                        store_id: payload.store,
                        quote_id: payload.quoteid
                    }));
                    dispatch(action.getPaymentDetails({
                        store_id: payload.store,
                        quote_id: payload.quoteid
                    }));
                    dispatch({
                        type: actionType.SET_VOU_CODE,
                        payload: { voucher: '', removevouher: false, voucherError: null, voucherSuccess: res.message }
                    })
                    setTimeout(()=>{
                        dispatch({
                            type: actionType.SET_VOU_CODE,
                            payload: { voucherSuccess: null }
                        })
                    }, 8000)
                } else {
                    dispatch(loadingSpinner({ loading: false }))
                    dispatch({
                        type: actionType.SET_VOU_CODE,
                        payload: { voucher: payload.voucode, removevouher: true, voucherError: res.message }
                    })
                }
            },
            error: (err) => {
                dispatch(loadingSpinner({ loading: false }))
                dispatch({
                    type: actionType.SET_VOU_CODE,
                    payload: { voucher: payload.voucode, removevouher: true }
                })
            }
        }
 
 
        API.removeVoucode(data, cb);
    }
 }

 export const getMyCartAfterVoucher = (payload) => {
    return (dispatch, getState) => {
 
        const data = {
            quote_id: payload.quote_id,
            store_id: payload.store_id,
        }
    
        let cb = {
            success: (res) => {
                const payload = getState().myCart;
                if ((res.status) && (res.code == 200) && ('data' in res)) {
                    let newState = {
                        ...payload,
                        products: res.data.products
                    }
                    dispatch(callActionForMyCart(newState))
 
                } else if ((res.status) && (res.code == 200) && (!('data' in res))) {
                    dispatch(clearCartItem())
                }
            },
            error: (err) => {
                dispatch(callActionForMyCart(err.data))
            }
        }
        API.getMyCartApi(data, cb)
    }
 
 }
