import * as actionType from './actionTypes';
import { API } from '../../api/api';


/////////////////////////////////GET GUEST CART ID////////////////////////////////////

const callActionGetGuestCartId = (payload) => {

    return {
        type: actionType.GUEST_USER_CART_ID,
        payload: payload
    };
}

export const getGuestCartId = () => {

    return (dispatch) => {

        let data = {

        }

        let cb = {
            success: (res) => {
                // console.log('LOCAL getGuestCartId:', res);
                if (res !== null) {
                    dispatch(callActionGetGuestCartId({ temp_quote_id: res }))
                }
            },
            error: (err) => {
                //console.log(err);
            }
        }

        API.getGuestCartId(data, cb)

    }

}


/////////////////////////////////GET GUEST CART////////////////////////////////////

const callActionForGetGuestCart = (payload) => {

    return {
        type: actionType.REMOVE_PRODUCT_FROM_WISHLIST,
        payload: payload
    };
}

export const getGuestCart = (payload) => {


    return (dispatch, getState) => {

        const data = {
            cart_id: payload,
        }


        let cb = {
            success: (res) => {
                console.log(res);
                // if (res.status === true && res.code === 200) {
                //    // prodArray.splice(payload.index, 1)
                //     dispatch(callActionForGetGuestCart())

                // }
            },
            error: (err) => {
                //console.log(err);
            }
        }

        API.getGuestCart(data, cb)

    }

}
////////////////////////////////////////////////

export const startGuestCheckout = () => {
    //console.log('START_GUEST_CHECKOUT');
    return {
        type: actionType.START_GUEST_CHECKOUT,
        payload: { startGuestCheckout: true }
    };
}