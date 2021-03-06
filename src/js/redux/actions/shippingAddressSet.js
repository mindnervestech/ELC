import * as actionType from './actionTypes';
import { API } from '../../api/api';
import { loadingSpinner } from './globals';
import { getMyCart } from './getMyCart';
import * as action from './index';
/////////////////////////////// GET ADDRESS /////////////////////////////

export const callActiongetAddressFromShippingDetails = (payload) => {

    return {
        type: actionType.GET_SHIPPING_TYPE,
        payload: payload
    };
}

export const getAddressFromShippingDetails = (payload) => {
    return (dispatch, getState) => {
        const data = {
            customer_id: payload.customer_id,
            store_id: payload.store_id,
        }
        dispatch(loadingSpinner({ shippingLoader: true }))

        if (getState().guest_user.startGuestCheckout === true) {
            if (getState().login.customer_details.quote_id) {
                dispatch(getMyCart({
                    quote_id: getState().login.customer_details.quote_id,
                    store_id: getState().global.currentStore
                }))
            }else{
                dispatch(getMyCart({
                    quote_id: getState().login.customer_details.quote_id !== undefined ? getState().login.customer_details.quote_id : getState().guest_user.new_quote_id,
                    store_id: getState().global.currentStore
                }))
            }
        }
        let cb = {
            success: (res) => {

                if (res.status && res.code === 200) {
                 
                    let newState = {
                        available_address: res.addressData.length > 0,
                        addressData: res.addressData,
                        citywise_shipping_methods:res.citywise_shipping_methods,
                        is_shipping_details_rec: true,
                        active_shipping_methods: res.active_shipping_methods,
                    }
                    dispatch(callActiongetAddressFromShippingDetails(newState))
                   
                }

                dispatch(loadingSpinner({ shippingLoader: false }))
            },
            error: (err) => {

                dispatch(loadingSpinner({ shippingLoader: false }))

            }
        }

        API.getShippingType(data, cb)

    }

}


/////////////////////////////// ADD NEW ADDRESS /////////////////////////////

export const callActionForAddNewAddressAndRedirectToCheckout = (payload) => {
    //console.log(payload);
    return {
        type: actionType.SET_SHIPPING_TYPE,
        payload: payload,
    };

}



export const AddNewAddressAndRedirectToCheckout = (payload) => {
    let payload_shipping_type=''
   
    return (dispatch, getState) => {
        if(payload.payload_shipping_type==="samedaydelivery_shipping_samedaydelivery_shipping")
        {
            payload_shipping_type= getState().myCart.active_shipping_methods[0].code;
        }else if(payload.payload_shipping_type==="express_shipping_express_shipping"){
             payload_shipping_type= getState().myCart.active_shipping_methods[1].code;
        }
        else{
             payload_shipping_type= getState().myCart.active_shipping_methods[2].code;
        }
    
        const data = {
            store_id: getState().global.currentStore,
            quote_id: getState().myCart.quote_id,
            address_id: '',
            shipping_code:payload_shipping_type,
            nayomi_store_id: '',
            address_object: {
                addressId: payload.addressId, UserID: payload.UserID, userFirstName: payload.userFirstName, userLastName: payload.userLastName
                , customer_email: payload.customer_email, country_id: payload.country_id, state: payload.state, region_id: payload.region_id, city: payload.city,
                street: payload.street, carrier_code: payload.carrier_code, telephone: payload.telephone, customer_address_type: payload.customer_address_type,
                postcode: payload.postcode
            },
            fname: '',
            lname: '',
            cnumber: '',
            mnumber: '',
            email: '',
            message: payload.message,
            gift_wrap_flag: payload.gift_wrap_flag

        }

        dispatch(loadingSpinner({ shippingLoader: true }))
        let cb = {
            success: (res) => {

                if (res.code === 200 && res.status === true) {
                    let newState = {
                        ...data,
                        delivery_type: 'delivery_on_address_new',
                        payload: { ...payload }
                    }
                    dispatch(callActionForAddNewAddressAndRedirectToCheckout({ shipping_details: { ...newState } }))
                }
                dispatch(loadingSpinner({ shippingLoader: false }))
            },
            error: (err) => {
                dispatch(loadingSpinner({ shippingLoader: false }))
            }
        }

        API.setdelivery(data, cb)

    }

}

/////////////////////////////// ADD OLD ADDRESS /////////////////////////////

export const callActionForAddOldAddressAndRedirectToCheckout = (payload) => {

    return {
        type: actionType.SET_SHIPPING_TYPE,
        payload: payload
    };

}

export const AddOldAddressAndRedirectToCheckout = (payload) => {
let payload_shipping_type=''
    return (dispatch, getState) => {
        if(payload.payload_shipping_type==="samedaydelivery_shipping_samedaydelivery_shipping")
        {
            payload_shipping_type= getState().myCart.active_shipping_methods[0].code;
        }else if(payload.payload_shipping_type==="express_shipping_express_shipping"){
             payload_shipping_type= getState().myCart.active_shipping_methods[1].code;
        }
        else{
             payload_shipping_type= getState().myCart.active_shipping_methods[2].code;
        }
  
        const data = {
            store_id: getState().global.currentStore,
            quote_id: getState().myCart.quote_id,
            address_id: payload.address_id.Id,
            address_object:{},
            shipping_code: payload_shipping_type,
            nayomi_store_id: '',
            fname: '',
            lname: '',
            cnumber: '',
            mnumber: '',
            email: '',
            message:payload.message,
            gift_wrap_flag:payload.gift_wrap_flag
           
        }
        dispatch(loadingSpinner({ shippingLoader: true }))
        let cb = {
            success: (res) => {

                if (res.code === 200 && res.status === true) {
                    let newState = {
                        ...data,
                        delivery_type: 'delivery_on_address_old',
                        payload: { ...payload }
                    }
                    dispatch(callActionForAddOldAddressAndRedirectToCheckout({ shipping_details: { ...newState } }))
                }
                dispatch(loadingSpinner({ shippingLoader: false }))
            },
            error: (err) => {
                dispatch(loadingSpinner({ shippingLoader: false }))
                //console.log(err);
            }
        }

        API.setdelivery(data, cb)

    }

}

/////////////////////////////// CLICK AND COLLECT /////////////////////////////

const callActionForClickAndCollect = (payload) => {

    return {
        type: actionType.SET_SHIPPING_TYPE,
        payload: payload,
    };

}

export const clickAndCollect = (payload) => {
    //console.log('>>payload :', payload);
    return (dispatch, getState) => {

        const data = {
            store_id: getState().global.currentStore,
            quote_id: getState().myCart.quote_id,
            address_id: '',
            shipping_code: getState().myCart.active_shipping_methods[1].code,
            nayomi_store_id: payload.store.id,
            address_object: {},
            fname: payload.contact.firstName,
            lname: payload.contact.lastName,
            cnumber: payload.contact.carrierCode,
            mnumber: payload.contact.contactNumber,
            email: payload.contact.email,

        }
        dispatch(loadingSpinner({ shippingLoader: true }))
        let cb = {
            success: (res) => {

                if (res.code === 200 && res.status === true) {

                    let newState = {
                        ...data,
                        delivery_type: 'click_and_collect',
                        payload: { ...payload }

                    }

                    dispatch(callActionForClickAndCollect({ shipping_details: { ...newState } }))
                }
                dispatch(loadingSpinner({ shippingLoader: false }))
            },
            error: (err) => {
                dispatch(loadingSpinner({ shippingLoader: false }))
                //console.log(err);
            }
        }

        API.setdelivery(data, cb)

    }

}