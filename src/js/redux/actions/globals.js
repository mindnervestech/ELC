import * as actionType from './actionTypes';
import { API } from '../../api/api';


/////////////////////////////////GET STORE ID////////////////////////////////////

const callActionGetStoreIds = (payload) => {

    return {
        type: actionType.GET_STORE_ID,
        payload: payload
    };
}

const callActionStoreRegion = (payload) => {
    return {
        type: actionType.STORE_REGION,
        payload: payload
    }
}

const callActionStoreLocale = (payload) => {
    return {
        type: actionType.STORE_LOCALE,
        payload: payload
    }
}

const callActionChangeStore = (payload) => {
    return {
        type: actionType.STORE_LOCALE,
        payload: payload
    }
}

export const storeRegion = (payload) => {
    return dispatch => {
        const data = { payload }
    }
}

export const storeLocale = (payload) => {
    return dispatch => {
        const data = { payload }
    }
}

export const changeStore = (payload) => {
    return dispatch => {
        const data = { payload }
    }
}

export const getStoreIds = (payload = {}) => {

    // return (dispatch) => {
    //     const data = {
    //        ...payload,
    //     }


    //     let cb = {
    //         success: (res) => {
    //             if(res.status === true && res.code === 200){
    //                 dispatch(callActionGetStoreIds({allStores : res.data}))

    //             }else{

    //                 dispatch(callActionGetStoreIds({allStores : res.data}))
    //             }
    //         },
    //         error: (err) => {
    //             console.log(err);
    //         }
    //     }

    //     API.getStoreId(data, cb)

    // }
    return {
        type: actionType.GET_STORE_ID,
        payload: payload
    };

}

////////////////////////////////// Loading ////////////////////////////////////////

export const loadingSpinner = (payload) => {

    return {
        type: actionType.LOADING_SPINNER,
        payload: payload
    };
}

////////////////////////////////// Loading ////////////////////////////////////////

////////////////////////////////// Loading product ////////////////////////////////////////

export const loadingSpinnerForProduct = (payload) => {

    return {
        type: actionType.LOADING_SPINNER_PRODUCT,
        payload: payload
    };
}

////////////////////////////////// Loading ////////////////////////////////////////



const callActionForGetHomePageData = (payload) => {

    return {
        type: actionType.GET_HOME_PAGE_DATA,
        payload: payload
    };
}

export const getHomePageData = (payload = {}) => {

    return (dispatch) => {
        const data = {
            ...payload,
        }

        if (!navigator.onLine) {
            // console.log('restore From LocalStorage');
            const home_page_data_res = JSON.parse(localStorage.getItem('HomePageData'));
            if (home_page_data_res) {
                dispatch(callActionForGetHomePageData({ home_page_data: home_page_data_res }))
            }
        }
        
        // dispatch(loadingSpinner({ loading: true }))
        let cb = {
            success: (res) => {
                // console.log(res);
                localStorage.setItem('HomePageData', JSON.stringify(res));

                if (res.status === true && res.code === 200) {
                    dispatch(callActionForGetHomePageData({ home_page_data: res }))

                } else {


                }
                dispatch(loadingSpinner({ loading: false }))
            },
            error: (err) => {
                //console.log(err);
                dispatch(loadingSpinner({ loading: false }))
            }
        }

        API.getHomePageData(data, cb)

    }

}

const callActionForChangeStore = (payload) => {

    return {
        type: actionType.CHANGE_STORE,
        payload: payload
    };
}

export const setChangeStore = (payload = {}) => {

    //console.log("PAYLOAD:", payload);
    var lang, cntry, str_lc;

    switch (parseInt(payload.store_id)) {
        case 1:
            lang = 'ar';
            cntry = 'KSA';
            str_lc = 'saudi-ar';
            break;
        case 2:
            lang = 'en';
            cntry = 'KSA';
            str_lc = 'saudi-en';
            break;
        case 3:
            lang = 'ar';
            cntry = 'UAE';
            str_lc = 'uae-ar';
            break;
        case 4:
            lang = 'en';
            cntry = 'UAE';
            str_lc = 'uae-en';
            break;
        case 5:
            lang = 'ar';
            cntry = 'International';
            str_lc = 'ar';
            break;
        case 6:
            lang = 'en';
            cntry = 'International';
            str_lc = 'en';
            break;
        default:
            lang = 'ar';
            cntry = 'KSA';
            str_lc = 'saudi-ar';
    }

    return (dispatch) => {

        let newStoreState = {
            currentStore: payload.store_id,
            language: lang,
            country: cntry,
            store_locale: str_lc,
        }
       // console.log('Before dispatch newStoreState', newStoreState);
        dispatch(callActionForChangeStore({ ...newStoreState }))
        // dispatch(callActionForChangeStore({ ...newState, globalStoreDetails: {globalStoreDetails} }))
    }

}

/////////////////////////////////GET GET IP INFO////////////////////////////////////

const callActionGetIpInfo = (payload) => {
    //console.log(payload);
    return {
        type: actionType.GET_IP_INFO,
        payload: payload
    };
}

export const getIpInfo = () => {

    return (dispatch) => {
        const data = {}
        let cb = {
            success: (res) => {
                dispatch(callActionGetIpInfo({ ipInfo: { ...res } }))
            },
            error: (err) => {
                //console.log(err);
            }
        }

        API.getIpInfo(data, cb)

    }

}