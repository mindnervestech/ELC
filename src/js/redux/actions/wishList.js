import * as actionType from './actionTypes';
import { API } from '../../api/api';


/////////////////////////////////GET WISHLIST////////////////////////////////////

const callActionGetWishlist = (payload) => {

    return {
        type: actionType.GET_WISHLIST_ITEM,
        payload: payload
    };
}

export const callProductWishDetail = payload => {
    return ({
        type: actionType.PRODUCT_WISH_DETAIL,
        payload: payload
    })
}

export const getWishlist = (payload) => {

    return (dispatch) => {
        const data = {
            ...payload,
        }

        dispatch({
            type: actionType.WISH_LIST_LOADER,
            payload: { wishLoader: true}
        });
        let cb = {
            success: (res) => {
                dispatch({
                    type: actionType.WISH_LIST_LOADER,
                    payload: { wishLoader: false}
                });
                if (res.status === true && res.code === 200) {

                    if (res.data !== null) {
                        dispatch(callActionGetWishlist({ products: [...res.data] }))

                    } else {
                        dispatch(callActionGetWishlist({ products: [] }))

                    }

                }
            },
            error: (err) => {
                //console.log(err);
                dispatch({
                    type: actionType.WISH_LIST_LOADER,
                    payload: { wishLoader: false}
                });
            }
        }

        API.getWishList(data, cb)

    }

}


/////////////////////////////////REMOVE WISHLIST////////////////////////////////////

const callActionForRemoveWishlist = (payload) => {

    return {
        type: actionType.REMOVE_PRODUCT_FROM_WISHLIST,
        payload: payload
    };
}

export const removeWishList = (payload) => {


    return (dispatch, getState) => {
        let prodArray = getState().wishList.products;
        const data = {
            wishilistitemid: payload.wishlist_id
        }

        dispatch({
            type: actionType.WISH_LIST_LOADER,
            payload: { wishLoader: true}
        });
        let cb = {
            success: (res) => {
                dispatch({
                    type: actionType.WISH_LIST_LOADER,
                    payload: { wishLoader: false}
                });
                if (res.status === true && res.code === 200) {
                    if (payload.index != -1) {
                        prodArray.splice(payload.index, 1);
                        dispatch(callActionForRemoveWishlist({ products: [...prodArray] }))
                    }
                    dispatch(callProductWishDetail({ productWishDetail: { is_in_wishlist: false, wishlist_itemid: null } }))

                }
            },
            error: (err) => {
                // console.log(err);
                dispatch({
                    type: actionType.WISH_LIST_LOADER,
                    payload: { wishLoader: false}
                });
            }
        }

        API.removeWishList(data, cb)

    }

}