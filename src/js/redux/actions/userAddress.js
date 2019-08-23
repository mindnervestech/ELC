import * as actionType from './actionTypes';
import { API } from '../../api/api';
import { loadingSpinner } from './globals';

/////////////////////////////////GET ADDRESS////////////////////////////////////

const callActionGetUserAddress = (payload) => {

    return {
        type: actionType.GET_ADDRESS_BOOK,
        payload: payload
    };
}

export const getUserAddress = (payload) => {

    return (dispatch) => {
        const data = {
            ...payload,
        }
       
        dispatch(callActionOnEditAddress({ addressResp: {} }))
        let cb = {
            success: (res) => {
                if (res.status === true && res.code === 200) {
                    dispatch(callActionGetUserAddress({ addressBook: res.addressData, isAddBookRec: true }))
                } else {
                    dispatch(callActionGetUserAddress({ addressBook: res.addressData, isAddBookRec: true }))
                }
            },
            error: (err) => {
                console.log(err);
            }
        }

        API.getAddressBook(data, cb)

    }

}


/////////////////////////////////ADD ADDRESS////////////////////////////////////


const callActionAddNewAddress = (payload) => {
    // console.log(payload);
    return {
        type: actionType.ADD_NEW_ADDRESS,
        payload: payload
    };
};

export const addNewAddress = (payload) => {

    return dispatch => {
        const data = {
            ...payload
        }
        dispatch(loadingSpinner({loading : true}))
        dispatch(callActionAddNewAddress({ addressResp: {} }))
        let cb = {
            success: (res) => {
                //console.log(res);
                if (res.status === true && res.code === 200) {
                    let newState = {
                        ...res
                    }
                    dispatch(callActionAddNewAddress({ addressResp: { ...newState } }))
                }
                dispatch(loadingSpinner({loading : false}))
            },
            error: (err) => {
                dispatch(loadingSpinner({loading : false}))
            }
        }

        API.addNewAddress(data, cb)

    }

}


/////////////////////////////////EDIT ADDRESS////////////////////////////////////


const callActionOnEditAddress = (payload) => {
    // console.log(payload);
    return {
        type: actionType.EDIT_ADDRESS,
        payload: payload
    };
};

export const editAddress = (payload) => {

    return dispatch => {
        const data = {
            ...payload
        }

        dispatch(callActionOnEditAddress({ addressResp: {} }));
        dispatch(loadingSpinner({loading : true}))
        let cb = {
            success: (res) => {
                //console.log(res);
                if (res.status === true && res.code === 200) {
                    let newState = {
                        ...res
                    }
                    dispatch(callActionOnEditAddress({ addressResp: { ...newState } }))
                }
                dispatch(loadingSpinner({loading : false}))
            },
            error: (err) => {
                dispatch(loadingSpinner({loading : false}))
            }
        }

        API.editAddress(data, cb)

    }

}




/////////////////////////////////DELETE ADDRESS////////////////////////////////////


const callActiOnDeleteAddress = (payload) => {

    return {
        type: actionType.DELETE_ADDRESS,
        payload: payload
    };
};

export const deleteAddress = (payload) => {

    return dispatch => {
        const data = {
            ...payload
        }

        dispatch(callActiOnDeleteAddress({ addressResp: {} }));
        dispatch(loadingSpinner({loading : true}));
        let cb = {
            success: (res) => {
                if (res.status === true && res.code === 200) {
                    let newState = {
                        ...res
                    }
                    dispatch(callActiOnDeleteAddress({ addressResp: { ...newState } }))
                }
                dispatch(loadingSpinner({loading : false}))
            },
            error: (err) => {
                dispatch(loadingSpinner({loading : false}))
            }
        }

        API.deleteAddress(data, cb)

    }

}


/////////////////////////////////GET COUNTRY LIST////////////////////////////////////


const callActionGetCountryList = (payload) => {

    return {
        type: actionType.GET_COUNTRIES,
        payload: payload
    };
};

export const getCountryList = (payload) => {

    return dispatch => {
        const data = {

        }

        let cb = {
            success: (res) => {

                let cList = res.filter((item, index) => {
                    if (item.hasOwnProperty('available_regions')) {
                        return item;
                    }
                })

                dispatch(callActionGetCountryList({ countryList: [...cList], isContryRec: true }))
            },
            error: (err) => {

            }
        }

        API.getCountryList(data, cb)

    }

}

/////////////////////////////////GET STORE LIST////////////////////////////////////


const callActionGetStoreList= (payload) => {

    return {
        type: actionType.GET_STORE_LIST,
        payload: payload
    };
};

export const getStoreList = (payload) => {

    return dispatch => {
        const data = {
            country_id: payload.country_id,
            city: payload.city
        }

        let cb = {
            success: (res) => {

              let newState = {
                storeList : [...res.data]
              }

                dispatch(callActionGetStoreList({ ...newState }))
            },
            error: (err) => {

            }
        }

        API.getStoreList(data, cb)

    }

}