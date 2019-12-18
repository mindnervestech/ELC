import * as actionTypes from "./actionTypes";
import { API } from "../../api/api";

import { loadingSpinner, loadingSpinnerForProduct } from './globals';


export const CallActionDeliveryPolicyData=payload=>{
  return{
    type:actionTypes.DELIVERY_POLICY_DATA,
    payload:payload
  }
}




export const getDeliveyPolicyAPIData =() =>{
  return (dispatch, getState) => {
  const data = {
   
    storeId: getState().global.currentStore
  };
 
  dispatch(loadingSpinner({ loading: true }));
  let cb = {
    success: res => {
  
      if (res) {
      
        dispatch(CallActionDeliveryPolicyData({ deliverypolicydata: { ...res } }));
        dispatch(loadingSpinner({ loading: false }));
       
      } else {
        //console.log(res.message);
        dispatch(loadingSpinner({ loading: false }));
      }
    },

    error: err => {
      dispatch(loadingSpinner({ loading: false }));
    }
  };
  API.getDeliveryPolicyData(data, cb);
};
};



export const CallActionForPrivacyPolicyData=payload=>{
  return{
    type:actionTypes.PRIVACY_POLICY_DATA,
    payload:payload
  }
}

export const CallActionCharityData=payload=>{
  return{
    type:actionTypes.CHARITY_DATA,
    payload:payload
  }
}




export const getCharityAPIData =() =>{
  return (dispatch, getState) => {
  const data = {
   
    storeId: getState().global.currentStore
  };
 
  dispatch(loadingSpinner({ loading: true }));
  let cb = {
    success: res => {
     // console.log("API Data for privacy policy Page",res)
      if (res) {
        dispatch(CallActionCharityData({ charity: { ...res } }));
        dispatch(loadingSpinner({ loading: false }));
       
      } else {
        //console.log(res.message);
        dispatch(loadingSpinner({ loading: false }));
      }
    },

    error: err => {
      dispatch(loadingSpinner({ loading: false }));
    }
  };
  API.getCharityData(data, cb);
};
};


export const getPrivacyPolicyAPIData =() =>{
  return (dispatch, getState) => {
  const data = {
   
    storeId: getState().global.currentStore
  };
 
  dispatch(loadingSpinner({ loading: true }));
  let cb = {
    success: res => {
     // console.log("API Data for privacy policy Page",res)
      if (res) {
        dispatch(CallActionForPrivacyPolicyData({ privacyPolicy: { ...res } }));
        dispatch(loadingSpinner({ loading: false }));
        
      } else {
        //console.log(res.message);
        dispatch(loadingSpinner({ loading: false }));
      }
    },

    error: err => {
      dispatch(loadingSpinner({ loading: false }));
    }
  };
  API.getPrivacyPolicyData(data, cb);
};
};


export const CallActionForFaqData = payload => {
  return {
    type: actionTypes.GET_FAQ_DATA,
    payload: payload
  };
};

export const getFaqPageData = () => {
  return (dispatch, getState) => {
    const data = {
      //storeId: getState().global.currentStore
      storeId: getState().global.currentStore
    };
    dispatch(loadingSpinner({ loading: true }));
    let cb = {
      success: res => {
        if (res.status && res.code === 200) {
          dispatch(CallActionForFaqData({ faq: { ...res } }));
          dispatch(loadingSpinner({ loading: false }));
        } else {
          //console.log(res.message);
          dispatch(loadingSpinner({ loading: false }));
        }
      },

      error: err => {
        dispatch(loadingSpinner({ loading: false }));
      }
    };
    API.getFaqPageData(data, cb);
  };
};

//////////////////////GET HELP PAGE DATA/////////////////////

export const CallActionForhelpData = payload => {
  return {
    type: actionTypes.GET_HELP_DATA,
    payload: payload
  };
};



export const getHelpFAQPageData = () => {
  return (dispatch, getState) => {
    const data = {
      //storeId: getState().global.currentStore
      storeId: getState().global.currentStore
    };

   

dispatch(loadingSpinner({ loading: true }));
let cb = {
  success: res => {
   
    if ((res.status && res.code === 200)|| res.content) {
      dispatch(CallActionForhelpData({ help: { ...res } }));
      dispatch(loadingSpinner({ loading: false }));
      
    } else {
      //console.log(res.message);
      dispatch(loadingSpinner({ loading: false }));
    }
    dispatch(loadingSpinner({ loading: false }));
  },
  error: err => {
    dispatch(loadingSpinner({ loading: false }));
  }
}; API.getHelpFAQPageData(data, cb);
  };
};

//////////////////////GET CAREERS PAGE DATA/////////////////////
export const CallActionForCareersData = payload => {
  return {
    type: actionTypes.GET_CAREERS_DATA,
    payload: payload
  };
};

export const getCareersPageData = () => {
  return (dispatch, getState) => {
    const data = {
      storeId: getState().global.currentStore
    };

    let cb = {
      success: res => {
        dispatch(CallActionForCareersData({ careers: { ...res } }));
      },
      error: err => {}
    };
    API.getCareersPageData(data, cb);
  };
};

//////////////////////GET AFFILIATE PAGE DATA/////////////////////
export const CallActionForAffiliateData = payload => {
  return {
    type: actionTypes.GET_AFFILIATE_DATA,
    payload: payload
  };
};

export const getAffiliatePageData = () => {
  return (dispatch, getState) => {
    const data = {
      storeId: getState().global.currentStore
    };

    let cb = {
      success: res => {
        dispatch(CallActionForAffiliateData({ affiliate: { ...res } }));
      },
      error: err => {}
    };
    API.getAffiliatePageData(data, cb);
  };
};

//////////////////////GET ABOUTUS PAGE DATA/////////////////////
export const CallActionForAboutUsData = payload => {
  return {
    type: actionTypes.GET_ABOUTUS_DATA,
    payload: payload
  };
};

export const getAboutUsPageData = () => {
  return (dispatch, getState) => {
    const data = {
      storeId: getState().global.currentStore
    };
    dispatch(loadingSpinner({ loading: true }));
    let cb = {
      success: res => {
        if ((res.status && res.code === 200)|| res.content) {
          dispatch(CallActionForAboutUsData({ aboutUs: { ...res } }));
          dispatch(loadingSpinner({ loading: false }));
          
        } else {
          //console.log(res.message);
          dispatch(loadingSpinner({ loading: false }));
        }
        dispatch(loadingSpinner({ loading: false }));
      },
      error: err => {
        dispatch(loadingSpinner({ loading: false }));
      }
    };
    API.getAboutUsPageData(data, cb);
  };
};

//////////////////////GET ABOUTUS PAGE DATA/////////////////////
export const CallActionForFranchisingData = payload => {
  return {
    type: actionTypes.GET_FRANCHISING_DATA,
    payload: payload
  };
};

export const getFranchisingPageData = () => {
  return (dispatch, getState) => {
    const data = {
      storeId: getState().global.currentStore
    };

    let cb = {
      success: res => {
        dispatch(CallActionForFranchisingData({ franchising: { ...res } }));
      },
      error: err => {}
    };
    API.getFranchisingPageData(data, cb);
  };
};

//////////////////////GET ABOUTUS PAGE DATA/////////////////////
export const CallActionForBusinessData = payload => {
  return {
    type: actionTypes.GET_BUSINESS_DATA,
    payload: payload
  };
};

export const getBusinessPageData = () => {
  return (dispatch, getState) => {
    const data = {
      storeId: getState().global.currentStore
    };
    dispatch(loadingSpinner({ loading: true }));

    let cb = {
      success: res => {
        dispatch(CallActionForBusinessData({ business: { ...res } }));
      },
      error: err => {}
    };
    API.getBusinessPageData(data, cb);
  };
};

//////////////////////GET CORPORATE_RESPONSIBILITY PAGE DATA/////////////////////
export const CallActionForCorporateResponsibilityData = payload => {
  return {
    type: actionTypes.GET_CORPORATE_RESPONSIBILITY_DATA,
    payload: payload
  };
};

export const getCorporateResponsibilityPageData = () => {
  return (dispatch, getState) => {
    const data = {
      storeId: getState().global.currentStore
    };

    let cb = {
      success: res => {
        dispatch(
          CallActionForCorporateResponsibilityData({
            corporateResponsibility: { ...res }
          })
        );
      },
      error: err => {}
    };
    API.getCorporateResponsibilityPageData(data, cb);
  };
};

//////////////////////GET TERMS OF USE PAGE DATA/////////////////////
export const CallActionForTermsOfUseData = payload => {
  return {
    type: actionTypes.GET_TERMS_OF_USE_DATA,
    payload: payload
  };
};

export const getTermOfUsePageData = () => {
  return (dispatch, getState) => {
    const data = {
      storeId: getState().global.currentStore
    };

    let cb = {
      success: res => {
        dispatch(CallActionForTermsOfUseData({ termOfUse: { ...res } }));
      },
      error: err => {}
    };
    API.getTermOfUsePageData(data, cb);
  };
};

//////////////////////GET TERMS OF USE PAGE DATA/////////////////////
export const CallActionForCookiePolicyData = payload => {
  return {
    type: actionTypes.GET_COOKIE_POLICY_DATA,
    payload: payload
  };
};

export const getCookiePolicyPageData = () => {
  return (dispatch, getState) => {
    const data = {
      storeId: getState().global.currentStore
    };

    let cb = {
      success: res => {
        dispatch(CallActionForCookiePolicyData({ cookiePolicy: { ...res } }));
      },
      error: err => {}
    };
    API.getCookiePolicyPageData(data, cb);
  };
};

//////////////////////GET TERMS OF USE PAGE DATA/////////////////////
export const CallActionForCorporateInformationData = payload => {
  return {
    type: actionTypes.GET_CORPORATE_INFORMATION_DATA,
    payload: payload
  };
};

export const getCorporateInformationPageData = () => {
  return (dispatch, getState) => {
    const data = {
      storeId: getState().global.currentStore
    };

    let cb = {
      success: res => {
        dispatch(
          CallActionForCorporateInformationData({
            corporateInformation: { ...res }
          })
        );
      },
      error: err => {}
    };
    API.getCorporateInformationPageData(data, cb);
  };
};

//////////////////////GET TERMS AND CONDITIONS PAGE DATA/////////////////////
export const CallActionForTermConditionsData = payload => {
  return {
    type: actionTypes.GET_TERMS_AND_CONDITIONS_DATA,
    payload: payload
  };
};





export const getTermConditionsPageData = () => {
  return (dispatch, getState) => {
    const data = {
      storeId: getState().global.currentStore
    };

    dispatch(loadingSpinner({ loading: true }));
    let cb = {
      success: res => {
        if ((res.status && res.code === 200) || res.content) {
          dispatch(CallActionForTermConditionsData({ termConditions: { ...res } }))
          dispatch(loadingSpinner({ loading: false }));
          
        } else {
          //console.log(res.message);
          dispatch(loadingSpinner({ loading: false }));
        }
        dispatch(loadingSpinner({ loading: false }));
      },
      error: err => {
        dispatch(loadingSpinner({ loading: false }));
      }
    };
    API.getTermConditionsPageData(data, cb);
  };
};

//////////////////////GET RETURN AND EXCHANGES PAGE DATA/////////////////////
export const CallActionForReturnPolicyData = payload => {
  return {
    type: actionTypes.GET_RETURN_AND_EXCHANGES_DATA,
    payload: payload
  };
};





export const getReturnPolicyPageData = () => {
  return (dispatch, getState) => {
    const data = {
      storeId: getState().global.currentStore
    };

    
    dispatch(loadingSpinner({ loading: true }));
    let cb = {
      success: res => {
       
        if (res.status && res.code === 200) {
          dispatch(CallActionForReturnPolicyData({ returnPolicy: { ...res } }));
          dispatch(loadingSpinner({ loading: false }));
          
        } else {
          //console.log(res.message);
          dispatch(loadingSpinner({ loading: false }));
        }
        dispatch(loadingSpinner({ loading: false }));
      },
      error: err => {
        dispatch(loadingSpinner({ loading: false }));
      }
    };
    API.getReturnPolicyPageData(data, cb);
  };
};

//////////////////////GET PROMOTION TERMS AND CONDITION PAGE DATA/////////////////////
export const CallActionForPromotionTermsAndConditionData = payload => {
  return {
    type: actionTypes.GET_PROMOTION_TERMS_AND_CONDITION_DATA,
    payload: payload
  };
};

export const getPromotionTermsAndCondtionPageData = () => {
  return (dispatch, getState) => {
    const data = {
      storeId: getState().global.currentStore
    };

    let cb = {
      success: res => {
        dispatch(
          CallActionForPromotionTermsAndConditionData({
            promotionTermsCondition: { ...res }
          })
        );
      },
      error: err => {}
    };
    API.getPromotionTermsAndCondtionPageData(data, cb);
  };
};
