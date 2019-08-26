import * as actionType from "./actionTypes";
import { API } from "../../api/api";
import { loadingSpinner } from "./globals";

const callActionForSaveBirthDayClubData = payload => {
  return {
    type: actionType.SAVE_BIRTHDAY_CLUB_DATA,
    payload: payload
  };
};

export const setBirthDayClubData = payload => {
  return dispatch => {
    const data = {
      storeId: payload.storeId
    };
     dispatch(loadingSpinner({ loading: true }))
    let cb = {
      success: res => {
        if (res.status && res.code === 200) {
          dispatch(
            callActionForSaveBirthDayClubData({
              page_data: { ...res }
            })
          );
          dispatch(loadingSpinner({ loading: false }));
        } else {
          //console.log(res.message);
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
