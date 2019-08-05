import * as actionTypes  from './actionTypes';
import { API } from '../../api/api';

const callActionGetMenuNav = (payload) => {
    return {
        type : actionTypes.GET_MENU_NAVIGATION,
        payload : payload
    }
}

export const getMenuNav = (payload) => {
    return dispatch => {
        const data = {
            store : payload.currentStore
        }

        let cb = {
            success: (res) => {
                if(res.status && res.code ===200) {
                    let newState = {...res.data}
                    dispatch(callActionGetMenuNav({menuNavData : newState, OfferMessage : res.OfferMessage}))
                }
                else{
                    let newState = {...res.data}
                    dispatch(callActionGetMenuNav({menuNavData : newState}))
                }
            },
            error: (err) => {

            }
        }

    API.getMenuNav(data, cb);
    }
}