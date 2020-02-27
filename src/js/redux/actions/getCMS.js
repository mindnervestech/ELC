import * as actionType from './actionTypes';
import { API } from '../../api/api';


/////////////////////////////////GET WISHLIST////////////////////////////////////

const getCMSPageDetails = (payload) => {

    return {
        type: actionType.GET_DISCOVER_CMS,
        payload: payload
    };
}

export const getCMSPage = (payload) => {

    return (dispatch) => {
        const data = {
        }
        let cb = {
            success: (res) => {
                //console.log(res);
                dispatch(getCMSPageDetails({ discover_more: res }))
            },
            error: (err) => {
                //console.log(err);
            }
        }

        API.getCMSPage(data, cb, payload.identifier, payload.store_id)

    }

}