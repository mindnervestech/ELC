import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {

    myCartTwoRec: false,
    addNewAddress: false,
    available_address: false,

    is_cart_details_rec: false,
    is_shipping_details_rec: false,
    is_payment_details_rec: false,
    is_order_conf_details_rec: false,
    is_order_placed: false,
    redirectToOrderConfirmation: false,

    cart_count: 0,
    quote_id: 0,
    subtotal: 0,
    subtotal_with_discount: 0,
    discount_amount: 0,
    grand_total: 0,

    payment_code: 'cashondelivery',
    delivery_type: null,

    products: [],
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
    loader: false,
    update_loader: false,
    orderDetailLoader:false

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_MY_CART:
            return updateObject(state, action.payload)

        case actionType.CLEAR_CART_ITEM:
            return updateObject(state, initialState)

        case actionType.CHANGE_QTY:
            return updateObject(state, action.payload)

        case actionType.REMOVE_ITEM:
            return updateObject(state, action.payload)

        case actionType.GET_SHIPPING_TYPE:
            return updateObject(state, action.payload)

        case actionType.SET_SHIPPING_TYPE:
            return updateObject(state, action.payload)

        case actionType.GET_PAYMENT_CHECKOUT:
            return updateObject(state, action.payload)

        case actionType.SET_PAYMENT_CHECKOUT:
            return updateObject(state, action.payload)

        case actionType.GET_ORDER_DETAILS_CHECKOUT:
            return updateObject(state, action.payload)

        case actionType.PLACE_ORDER_CHECKOUT:
            return updateObject(state, action.payload)

        case actionType.SET_ORDER_SUMMARY:
            return updateObject(state, action.payload)

        case actionType.REMOVE_OUT_OF_STOCK_ITEM:
            return updateObject(state, action.payload)

        case actionType.REDIRECT_TO_PAYMENT:
            return updateObject(state, action.payload)

        case actionType.REDIRECT_TO_DELIVERY:
            return updateObject(state, action.payload)

        case actionType.REDIRECT_TO_CART:
            return updateObject(state, action.payload)

        case actionType.CARD_LOADER:
            return updateObject(state, action.payload)

        case actionType.QTY_UPDATE_LOADER:
            return updateObject(state, action.payload)
        
        case actionType.SET_ORDER_DETAILS_LOADER:
            return updateObject(state, action.payload)

        default:
            return state;
    }

}

export default reducer