import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    faq: {},
    help: {},
    careers:{},
    aboutUs :{},
    privacyPolicy:{},
    affiliate: {},
    charity:{},
    deliverypolicydata:{},
    franchising: {},
    business: {},
    corporateResponsibility: {},
    termOfUse: {},
    cookiePolicy: {},
    corporateInformation: {},
    termConditions: {},
    returnPolicy: {},
    promotionTermsCondition: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.DELIVERY_POLICY_DATA:
            return updateObject(state,action.payload)

        case actionType.CHARITY_DATA:
        return updateObject(state,action.payload)
        
        case actionType.PRIVACY_POLICY_DATA:
            return updateObject(state,action.payload)

        case actionType.GET_FAQ_DATA:
            return updateObject(state, action.payload)
        case actionType.GET_HELP_DATA:
            return updateObject(state, action.payload)
        case actionType.GET_CAREERS_DATA:
            return updateObject(state, action.payload)
        case actionType.GET_AFFILIATE_DATA:
            return updateObject(state, action.payload)
        case actionType.GET_ABOUTUS_DATA:
            return updateObject(state, action.payload)
        case actionType.GET_FRANCHISING_DATA:
            return updateObject(state, action.payload)
        case actionType.GET_BUSINESS_DATA:
            return updateObject(state, action.payload)
        case actionType.GET_CORPORATE_RESPONSIBILITY_DATA:
            return updateObject(state, action.payload)
        case actionType.GET_TERMS_OF_USE_DATA:
            return updateObject(state, action.payload)
        case actionType.GET_COOKIE_POLICY_DATA:
            return updateObject(state, action.payload)
        case actionType.GET_CORPORATE_INFORMATION_DATA:
            return updateObject(state, action.payload)
        case actionType.GET_TERMS_AND_CONDITIONS_DATA:
            return updateObject(state, action.payload)
        case actionType.GET_RETURN_AND_EXCHANGES_DATA:
            return updateObject(state, action.payload)
        case actionType.GET_PROMOTION_TERMS_AND_CONDITION_DATA:
            return updateObject(state, action.payload)
        default:
            return state;
    }

}

export default reducer