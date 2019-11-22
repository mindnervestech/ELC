import * as actionType from "./actionTypes";
import { API } from "../../api/api";
import { loadingSpinner } from "./globals";



export const clearBirthdayClubRegisterError = () => {
  return {
      type: actionType.BIRTHDAY_CLUB_ERROR,
      payload: {
        registerBClubUserDetails: {}
      }
  };
}

const callActionForSaveBirthDayClubData = payload => {
  return {
    type: actionType.SAVE_BIRTHDAY_CLUB_DATA,
    payload: payload
  };
};

export const setBirthDayClubData = payload => {
  return dispatch => {
    const data = {
      ...payload
  }
     
    let cb = {
      success: res => {
        if (res.status && res.code === 200) {
          let registerBClubUserDetails = {
            ...res
        }
          dispatch(
            callActionForSaveBirthDayClubData({
              checkAlertStatus:true,
              page_data: { ...res },registerBClubUserDetails: { ...registerBClubUserDetails }
            })
          );
         
        } else {
          let registerBClubUserDetails = {
            ...res
        }
        dispatch(
          callActionForSaveBirthDayClubData({
            checkAlertStatus:true,page_data: { ...res },registerBClubUserDetails: { ...registerBClubUserDetails }
          })
        );
         
         
        }
      },
      error: err => {
        //console.log(err);
      }
    };

    API.setBirthdayClubData(data, cb);
  };
};
