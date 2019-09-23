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
  console.log("Payload",payload)
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
     dispatch(loadingSpinner({ loading: true }))
    let cb = {
      success: res => {
        if (res.status && res.code === 200) {
          let registerBClubUserDetails = {
            ...res
        }
          dispatch(
            callActionForSaveBirthDayClubData({
              page_data: { ...res },registerBClubUserDetails: { ...registerBClubUserDetails }
            })
          );
          dispatch(loadingSpinner({ loading: false }));
        } else {
          let registerBClubUserDetails = {
            ...res
        }
        callActionForSaveBirthDayClubData({
            page_data: { ...res },registerBClubUserDetails: { ...registerBClubUserDetails }
          })
          dispatch(loadingSpinner({ loading: false }));
        }
      },
      error: err => {
        //console.log(err);
      }
    };

    API.setBirthdayClubData(data, cb);
  };
};
