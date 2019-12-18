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
export const callActionForGetBirthdayClubData = (payload) => {
  return {
    type: actionType.GET_BIRTHDAY_CLUB_DATA,
    payload: payload
  }
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
              checkAlertStatus: true,
              page_data: { ...res }, registerBClubUserDetails: { ...registerBClubUserDetails }
            })
          );

        } else {
          let registerBClubUserDetails = {
            ...res
          }
          dispatch(
            callActionForSaveBirthDayClubData({
              checkAlertStatus: true, page_data: { ...res }, registerBClubUserDetails: { ...registerBClubUserDetails }
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



export const getBirthDayClubInfo = payload => {
  return dispatch => {
    const data = {
      ...payload
    }
    dispatch(loadingSpinner({ loading: true }));
    let cb = {
      success: res => {
        if (res.status && res.code === 200) {
         
          dispatch(loadingSpinner({ loading: false }));
          dispatch(
            callActionForGetBirthdayClubData({
              birthdayclub_page_data: { ...res }
            })
          );

        } else {

          // data={
          //   0:{name:'Akshay',dob:'12/7/2002',gender:'M'},
          //   1:{name:'Suraj',dob:'12/03/2001',gender:'M'}
          // }
          
          dispatch(
            callActionForGetBirthdayClubData({
              birthdayclub_page_data: { ...data }
            })
          );
          dispatch(loadingSpinner({ loading: false }));
        }
      },
      error: err => {
        dispatch(loadingSpinner({ loading: false }));
       let data={
          0:{name:'Akshay',dob:'12/7/2002',gender:'M'},
          1:{name:'Suraj',dob:'12/03/2001',gender:'M'}
        }
        
        dispatch(
          callActionForGetBirthdayClubData({
            birthdayclub_page_data: { ...data }
          })
        );
      }
    };

    API.getBirthdayClubData(data, cb);
  };
};
