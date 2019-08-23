import * as actionType from './actionTypes';
import { API } from '../../api/api';
import { loadingSpinner } from './globals';
import { getMyCart } from './getMyCart';

const callActionLoginUser = (payload) => {
    // console.log(payload);
    return {
        type: actionType.LOGIN,
        payload: payload
    };
};

const callActionInvalidLoginUser = (payload) => {
    // console.log(payload);
    return {
        type: actionType.INVALID_LOGIN,
        payload: payload
    };
};
export const loginUser = (payload) => {

    return (dispatch, getState) => {
        const data = {
            email: payload.email,
            password: payload.password,
            guestquote: payload.guestquote,
        }
        dispatch(loadingSpinner({ loading: true }))

        //console.log(data);
        let cb = {
            success: (res) => {
                dispatch(loadingSpinner({ loading: false, text: 'login true' }))
                if (getState().guest_user.startGuestCheckout != true) {
                    dispatch(logoutUser())
                }

                if (res.status === true && res.code === 200) {
                    let newState = {
                        customer_details: { ...res.customer_details },
                        isUserLoggedIn: res.status,
                        loginMessage: res.message
                    }

                    dispatch(callActionLoginUser({ ...newState }))

                } else {
                    let newState = {
                        isUserLoggedIn: res.status,
                        errorMessage: res.message
                    }
                    dispatch(callActionInvalidLoginUser({ ...newState }))

                }
                //dispatch(callActionLoginUser({ ...newState }))

            },
            error: (err) => {
                let newState = {
                    isUserLoggedIn: false,
                    errorMessage: 'Something Went Wrong..'
                }
                dispatch(callActionInvalidLoginUser({ ...newState }))
            }
        }

        API.loginUser(data, cb)

    }

}

///////////////////////////////////// REGISTER /////////////////////////////////////////

const callActionRegisterUser = (payload) => {

    return {
        type: actionType.REGISTER,
        payload: payload
    };
}

export const registerUser = (payload) => {
    
    return (dispatch, getState) => {
        payload.store_id = payload.store_id ? payload.store_id : getState().login.store_id;
        const data = {
            ...payload
        }
        //dispatch(loadingSpinner({ loading: true }))
        dispatch(callActionRegisterUser({ registerUserDetails: {} }))
        let cb = {
            success: (res) => {


                if (res.status === true && res.code === 200) {

                    let newState = {
                        ...res,
                        isUserLoggedIn: res.status,
                        loginMessage: res.message
                    }

                    let registerUserDetails = {
                        ...res
                    }

                    dispatch(callActionRegisterUser({ ...newState, registerUserDetails: { ...registerUserDetails } }))
                } else {
                    let registerUserDetails = {
                        ...res
                    }
                    dispatch(callActionRegisterUser({ registerUserDetails: { ...registerUserDetails } }))
                }
                dispatch(loadingSpinner({ loading: false }))
            },
            error: (err) => {
                // console.log(err);
                dispatch(loadingSpinner({ loading: false }))
            }
        }

        API.registerSave(data, cb)

    }

}

///////////////////////////////////// FORGOT PASS /////////////////////////////////////////

const callActionForgotPassword = (payload) => {

    return {
        type: actionType.FORGOT_PASSWORD,
        payload: payload
    };
}

export const forgotPassword = (payload) => {

    return (dispatch) => {
        const data = {
            ...payload,
        }
        dispatch(callActionForgotPassword({ forgotPasswordDetails: {} }))
        let cb = {
            success: (res) => {
                if (res.status === true && res.code === 200) {
                    dispatch(callActionForgotPassword({ forgotPasswordDetails: { ...res } }))
                } else {
                    dispatch(callActionForgotPassword({ forgotPasswordDetails: { ...res } }))
                }
            },
            error: (err) => {
                // console.log(err);
            }
        }

        API.forgotPassword(data, cb)

    }

}

/////////////////////////////////CHANGE PASS////////////////////////////////////

const callActionchangePassword = (payload) => {

    return {
        type: actionType.CHANGE_PASSWORD,
        payload: payload
    };
}

export const changePassword = (payload) => {

    return (dispatch) => {
        const data = {
            ...payload,
        }
        dispatch(callActionchangePassword({ changePasswordDetails: {} }))
        let cb = {
            success: (res) => {
                if (res.status === true && res.code === 200) {
                    dispatch(callActionchangePassword({ changePasswordDetails: { ...res } }))
                } else {
                    dispatch(callActionchangePassword({ changePasswordDetails: { ...res } }))
                }
            },
            error: (err) => {
                //console.log(err);
            }
        }

        API.changePassword(data, cb)

    }

}

/////////////////////////////////LOG OUT////////////////////////////////////

export const logoutUser = () => {

    return {
        type: actionType.LOGOUT_USER,
    };

}

/////////////////////////////// Clear Chnage Pass //////////////////////////

export const clearChangePass = () => {
    return {
        type: actionType.CLEAR_CHANGE_PASS,
        payload: {
            changePasswordDetails: {}
        }
    };
}

/////////////////////////////// Clear Forgot Pass //////////////////////////

export const clearForgotPass = () => {
    return {
        type: actionType.CLEAR_FORGOT_PASS,
        payload: {
            forgotPasswordDetails: {}
        }
    };
}

/////////////////////////////// Clear Registration Error //////////////////////////

export const clearRegisterError = () => {
    return {
        type: actionType.CLEAR_REGISTRATION_ERROR,
        payload: {
            registerUserDetails: {}
        }
    };
}


export const resetFlag = (payload) => {
    return (dispatch) => {
        dispatch({
            type: actionType.CLEAR_RESETPASSWORD_FLAG,
            payload: {
                resetpasswordSucess: payload.resetpasswordSucess,
                resetpasswordToken: payload.resetpasswordToken,
                newLink: false
            }
        })
    }
}

export const resetPassword = (payload) => {
    return dispatch => {
        const data = {
            ...payload,
        }
        dispatch({
            type: actionType.RESETPASSWORD_LOADER,
            payload: { resetpasswordLoader: true }
        });
        let cb = {
            success: (res) => {

                if (res.status === true) {
                    dispatch({ 
                        type: actionType.RESET_PASSWORD_SUCCESS,
                        payload: {  resetpasswordSucess: true,
                                    resetpasswordToken: false,
                                    newLink: true}
                    })
                } else {
                    dispatch({ 
                        type: actionType.RESET_PASSWORD_SUCCESS,
                        payload: { resetpasswordSucess: false,
                                   resetpasswordToken: true,
                                    newLink: true}
                    })
                }

                dispatch({
                    type: actionType.RESETPASSWORD_LOADER,
                    payload: { resetpasswordLoader: false }
                });
            },
            error: (err) => {
                //console.log(err);
                dispatch({
                    type: actionType.RESETPASSWORD_LOADER,
                    payload: { resetpasswordLoader: false }
                });
            }
        }

        API.resetPassword(data, cb) 
    }
}

