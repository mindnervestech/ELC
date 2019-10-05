import * as actionTypes  from './actionTypes';
import { API } from '../../api/api';
import { loadingSpinner } from './globals';

const callActionGetMenuNav = (payload) => {
    return {
        type : actionTypes.GET_MENU_NAVIGATION,
        payload : payload
    }
}

let check = true

export const getMenuNav = (payload) => {
    return dispatch => {
        const data = {
            store : payload.currentStore
        }
        dispatch(loadingSpinner({ loading: true }))
        dispatch({
			type: actionTypes.ADD_TO_CARD_LOADER,
			payload: { addToCardLoader: true, add_cart_open_popUp: false}
		});
        let cb = {
            success: (res) => {
                if(res.status && res.code ===200) {
                    let newState = {...res.data}
                    check = false
                    dispatch(loadingSpinner({ loading: false }))
                    dispatch(callActionGetMenuNav({menuNavData : newState, OfferMessage : res.OfferMessage}))
                }
                else{
                    let newState = {...res.data}
                    dispatch(callActionGetMenuNav({menuNavData : newState}))
                    dispatch(loadingSpinner({ loading: false }))
                }
            },
            error: (err) => {
                if(check){
                    check = false
                    API.getMenuNav(data, cb);
                }
                dispatch(loadingSpinner({ loading: false }))
            }
        }

    API.getMenuNav(data, cb);
    }
}