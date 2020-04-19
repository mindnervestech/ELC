export {clearShippingDetails, clearOrderSummaryDetails,getMyCart, changeQty, removeProduct, callActionForClearVocherDetails, clearCartItem, setOrderSummary, removeAllOutOfStockProduct, redirectToPayment, redirectToDelivery, redirectToCart,applyVoucode, removeVoucode, getMyCartAfterVoucher} from './getMyCart';

export {
	getAddressFromShippingDetails,
	AddNewAddressAndRedirectToCheckout,
	AddOldAddressAndRedirectToCheckout,
	clickAndCollect,
} from './shippingAddressSet';

export { getPaymentDetails, setPaymentDetails } from './getAndSetPayment';

export { getOrderDetails, placeOrder } from './getAndSetOrder';

export {setBirthDayClubData,clearBirthdayClubRegisterError} from './getAndSetBirthdayclub';

export {
	loginUser,
	registerUser,
	forgotPassword,
	logoutUser,
	changePassword,
	clearChangePass,
	clearForgotPass,
	clearRegisterError,
	resetFlag,
	resetPassword
} from './loginAndMyAccount';

export { getUserAddress,clearAddressResponse ,addNewAddress, deleteAddress, editAddress, getCountryList, getStoreList } from './userAddress';

export { getOrderHistory, viewOrderDetails, clearState, orderJson } from './ordersHistoryAndDetails';

export { getWishlist, removeWishList } from './wishList';

export { getStoreIds,saveStoreInfo, loadingSpinner, storeRegion, setChangeStore, getHomePageData, getTimeStamp,getIpInfo } from './globals';

export { getMenuNav } from './getMenuNav';

export { setXmasPageData,clearXmasResponse} from './setXmas';

export {
	getProductDetails,
	getColor,
	getSize,
	getBandSize,
	getCupSize,
	addToCart,
	guestAddToCart,
	clearProductDetails,
  clearProductWishDetail,
	getProductList,
	getProductSearchList,
	addToWishlist,
	getPlaceOrder,
	getSizeChart,
	getYouMayAlsoLikeData,
} from './getProductDetails';


export {

	getAutoSuggestionProductSearchList
} from './getAutoSugesstionProduct'
export { getGuestCartId, getGuestCart, startGuestCheckout } from './guestUser';

export {
	  getDeliveyPolicyAPIData,
	    getCharityAPIData,
		getFaqPageData,
		getPrivacyPolicyAPIData,
		getHelpFAQPageData,
		getCareersPageData,
		getAffiliatePageData,
		getAboutUsPageData,
		getFranchisingPageData,
		getBusinessPageData,
		getCorporateResponsibilityPageData,
		getTermOfUsePageData,
		getCookiePolicyPageData,
		getCorporateInformationPageData,
		getTermConditionsPageData,
		getReturnPolicyPageData,
		getReturnPolicyData,
		getPromotionTermsAndCondtionPageData
} from './getStaticPagesData';

export { vipRegisterUser } from './vipRegister';

export { getCMSPage } from './getCMS';

export { getContactUsData, saveContactUsData, clearContactUsResponse } from './getAndSetContactUs'
