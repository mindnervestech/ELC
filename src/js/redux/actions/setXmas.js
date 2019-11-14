import * as actionType from "./actionTypes";
import { API } from "../../api/api";
import { loadingSpinner } from "./globals";



export const clearBirthdayClubRegisterError = () => {
  return {
      type: actionType.BIRTHDAY_CLUB_ERROR,
      payload: {
        registerXmasPageDetails: {}
      }
  };
}

const callActionForSaveXmasageData = payload => {
  return {
    type: actionType.SET_XMAS_DATA,
    payload: payload
  };
};

export const setXmasPageData = payload => {
  return dispatch => {
    const data = {
      ...payload
  }
     
    let cb = {
      success: res => {
        if (res.status && res.code === 200) {
          let registerXmasPageDetails = {
            ...res
        }
          dispatch(
            callActionForSaveXmasageData({
            
              xmas_page_response: { ...res }
            })
          );
         
        } else {
          let registerBClubUserDetails = {
            ...res
        }
        dispatch(
            callActionForSaveXmasageData({
            
                xmas_page_response: { ...res }
              })
        );
         
         
        }
      },
      error: err => {
        //console.log(err);
      }
    };

    API.saveXmasData(data, cb);
  };
};



export const clearXmasResponse = () => {
    return {
        type: actionType.CLEAR_XMAS_RESPONSE,
        payload: { xmas_page_response: {} }
    };
};
