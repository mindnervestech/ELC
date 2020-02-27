import * as actionTypes  from './actionTypes';
import { API } from '../../api/api';
import { loadingSpinner } from './globals';

const callActionVipRegisterUser = (payload) => {

    return {
        type: actionTypes.VIP_REGISTER,
        payload: payload
    };
}

export const vipRegisterUser = (payload) => {

    //console.log('PAYLoad: ', payload);

    return (dispatch, getState) => {
         const data = {
            firstname: payload.firstname,
            lastname: payload.lastname,
            countryCode: payload.countryCode,
            phoneNumber: payload.phoneNumber,
            email: payload.email,
            Dob: payload.Dob,
            Dowa: payload.Dowa,
        }
        dispatch(loadingSpinner({ loading: true }))
        dispatch(callActionVipRegisterUser({ registerUserDetails: {} }))
        let cb = {
            success: (res) => {


                if (res.status === true && res.code === 200) {

                    let newState = {
                        ...res,
                        isVipRegSuccess: res.status,
                        vipRegStatsMessage: res.message
                    }

                    let registerUserDetails = {
                        ...res
                    }

                    dispatch(callActionVipRegisterUser({ ...newState, registerUserDetails: { ...registerUserDetails } }))
                } else {
                    let registerUserDetails = {
                        ...res
                    }
                    dispatch(callActionVipRegisterUser({ registerUserDetails: { ...registerUserDetails } }))
                }
                dispatch(loadingSpinner({ loading: false }))
            },
            error: (err) => {
               // console.log(err);
                dispatch(loadingSpinner({ loading: false }))
            }
        }

        API.vipRegisterUser(data, cb)

    }

}