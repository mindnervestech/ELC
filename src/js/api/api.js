import axios from 'axios';
import { buildHeader, ipInfoHeader } from './helpers';
import { live, BASE_URL, TOKEN_URL, COUNTRY_URL, CART_URL, GUEST_CART_URL, STATIC_PAGES_URL } from './globals';


//App API's

const GET_TOKEN = { type: 'POST', url: TOKEN_URL + '/token/' };
const GET_MY_CART_API = { type: 'POST', url: BASE_URL + 'mycart/' };
const UPDATE_CART = { type: 'POST', url: BASE_URL + 'updatecart/' };
const DELETE_CART = { type: 'POST', url: BASE_URL + 'deletecart/' };
const GET_SHIPPING_TYPE = { type: 'POST', url: BASE_URL + 'getdelivery/' };
const SET_SHIPPING_TYPE = { type: 'POST', url: BASE_URL + 'setdelivery/' };
const GET_PAYMENT_DETAILS_CHECKOUT = { type: 'POST', url: BASE_URL + 'getpayment/' };
const SET_PAYMENT_DETAILS_CHECKOUT = { type: 'POST', url: BASE_URL + 'setPayment/' };
const GET_ORDER_CONFIRMATION_DETAILS = { type: 'POST', url: BASE_URL + 'orderconfirmation/' };
const PLACE_ORDER = { type: 'POST', url: BASE_URL + 'placeorder/' };
const LOGIN_USER = { type: 'POST', url: BASE_URL + 'login/' };
const REGISTER_SAVE_U = { type: 'POST', url: BASE_URL + 'register/' };
const FORGOT_PASS = { type: 'POST', url: BASE_URL + 'forgotpassword/' };
const CHANGE_PASS = { type: 'POST', url: BASE_URL + 'changepassword/' };
const GET_ADDRESS_BOOK = { type: 'POST', url: BASE_URL + 'addressbook/' };
const ADD_NEW_ADDRESS = { type: 'POST', url: BASE_URL + 'addaddress/' };
const EDIT_ADDRESS = { type: 'POST', url: BASE_URL + 'addaddress/' };
const DELETE_ADDRESS = { type: 'POST', url: BASE_URL + 'deleteaddress/' };
const GET_COUNTRY_LIST = { type: 'GET', url: COUNTRY_URL + 'countries/' };
const GET_STORE_ID = { type: 'POST', url: BASE_URL + 'storeinfo/' };
const GET_STORE_LIST = { type: 'POST', url: BASE_URL + 'storelocator/' };
const GET_MENU_NAVIGATION = { type: 'POST', url: BASE_URL + 'menu/' };
const GET_PRODUCT_DETAILS = { type: 'POST', url: BASE_URL + 'productbyid/' };
const ADD_TO_CART = { type: 'POST', url: CART_URL + 'items/' };
const GUEST_ADD_TO_CART = { type: 'POST', url: GUEST_CART_URL + 'guest-carts/' };

const GET_PRODUCT_LIST = { type: 'POST', url: BASE_URL + 'productlisting/' };
//const GET_PRODUCT_SEARCH_LIST = { type: 'POST', url: BASE_URL + 'searchresult/' };

const ADD_TO_WISHLIST = { type: 'POST', url: BASE_URL + 'addtowishlist/' };
const GET_ORDER_HISTORY = { type: 'POST', url: BASE_URL + 'orderhistory/' };
const GET_ORDER_DETAILS_IN_PROFILE = { type: 'POST', url: BASE_URL + 'orderview/' };
const GET_WISHLIST_ITEM = { type: 'POST', url: BASE_URL + 'wishlistitems/' };
const REMOVE_FROM_WISHLIST = { type: 'POST', url: BASE_URL + 'removewishlistitem/' };
const GET_GUEST_CART_ID = { type: 'POST', url: GUEST_CART_URL + 'guest-carts/' };
//const GET_GUEST_CART = { dynamic: true, type: 'POST', url: GUEST_CART_URL + 'guest-carts/', urlData: '/items' };
const GET_HOME_PAGE_DATA = { type: 'POST', url: BASE_URL + 'home/' };

const GET_FAQ_DATA = { type: 'GET', url: STATIC_PAGES_URL + 'faq/storeId', dynamic: true };

const GET_PLACE_ORDER = { type: 'POST', url: BASE_URL + 'placeorder/' }
const GET_SUMMARY_DATA = { type: 'POST', url: BASE_URL + 'OrderSummary/' }
const VIP_REGISTER_U = { type: 'POST', url: BASE_URL + 'amirahclub/' }

const GET_IP_INFO = { type: 'GET', url: 'http://ipinfo.io/json' }
const REMOVE_OUT_OF_STOCK = { type: 'POST', url: BASE_URL + 'removemultiple/' }

const GET_DISCOVER_CMS_PAGE = { type: 'GET', url: STATIC_PAGES_URL }

const SET_ORDER_JSON = { type: 'POST', url: BASE_URL + 'OrderJson' }
const GET_CONTACT_US_DATA = { type: 'POST', url: BASE_URL + 'contactus' }
const SAVE_CONTACT_US_DATA = { type: 'POST', url: BASE_URL + 'setContactUsData' }

const GET_SIZE_CHART = { type: 'POST', url: BASE_URL + 'sizechart' }

const RESET_PASSWORD ={ type: 'POST', url: BASE_URL + 'resetpassword'}
const GET_CAREERS_PAGE = { type: 'GET', url: STATIC_PAGES_URL }
const GET_AFFILIATE_DATA = { type: 'GET', url: STATIC_PAGES_URL + 'affiliates/storeId', dynamic: true };
const GET_ABOUTUS_DATA = { type: 'GET', url: STATIC_PAGES_URL + 'about-us/storeId', dynamic: true };
const GET_FRANCHISING_DATA = { type: 'GET', url: STATIC_PAGES_URL + 'elc-franchising/storeId', dynamic: true };
const GET_BUSINESS_DATA = { type: 'GET', url: STATIC_PAGES_URL + 'elc-for-business/storeId', dynamic: true };
const GET_CORPORATE_RESPONSIBILITY_DATA = { type: 'GET', url: STATIC_PAGES_URL + 'corporate-responsibility/storeId', dynamic: true };
const GET_TERMS_OF_USE_DATA = { type: 'GET', url: STATIC_PAGES_URL + 'terms-of-use/storeId', dynamic: true };
const GET_COOKIE_POLICY__DATA = { type: 'GET', url: STATIC_PAGES_URL + 'cookie-policy/storeId', dynamic: true };
const GET_CORPORATE_INFORMATION_DATA = { type: 'GET', url: STATIC_PAGES_URL + 'delivery-information/storeId', dynamic: true };
const GET_TERMS_AND_CONDITIONS_DATA = { type: 'GET', url: STATIC_PAGES_URL + 'terms-and-condition/storeId', dynamic: true };
const GET_HELP_DATA = { type: 'GET', url: STATIC_PAGES_URL + 'help-and-faqs/storeId', dynamic: true };
const GET_RETURN_AND_EXCHANGES_DATA = { type: 'GET', url: STATIC_PAGES_URL + 'return-and-exchanges/storeId', dynamic: true };
const GET_PROMOTION_TERMS_AND_CONDITION_DATA = { type: 'GET', url: STATIC_PAGES_URL + 'promotion-terms-and-condition/storeId', dynamic: true };

export const API = {
	getToken: (data, cb) => request(data, cb, GET_TOKEN),
	getMyCartApi: (data, cb) => request(data, cb, GET_MY_CART_API),
	updateCart: (data, cb) => request(data, cb, UPDATE_CART),
	deleteCart: (data, cb) => request(data, cb, DELETE_CART),
	getShippingType: (data, cb) => request(data, cb, GET_SHIPPING_TYPE),
	setdelivery: (data, cb) => request(data, cb, SET_SHIPPING_TYPE),
	getPaymentDetails: (data, cb) => request(data, cb, GET_PAYMENT_DETAILS_CHECKOUT),
	setPaymentDetails: (data, cb) => request(data, cb, SET_PAYMENT_DETAILS_CHECKOUT),
	getOrderDetails: (data, cb) => request(data, cb, GET_ORDER_CONFIRMATION_DETAILS),
	placeOrder: (data, cb) => request(data, cb, PLACE_ORDER),
	loginUser: (data, cb) => request(data, cb, LOGIN_USER),
	registerSave: (data, cb) => request(data, cb, REGISTER_SAVE_U),
	forgotPassword: (data, cb) => request(data, cb, FORGOT_PASS),
	changePassword: (data, cb) => request(data, cb, CHANGE_PASS),
	getAddressBook: (data, cb) => request(data, cb, GET_ADDRESS_BOOK),
	addNewAddress: (data, cb) => request(data, cb, ADD_NEW_ADDRESS),
	getCountryList: (data, cb) => request(data, cb, GET_COUNTRY_LIST),
	editAddress: (data, cb) => request(data, cb, EDIT_ADDRESS),
	deleteAddress: (data, cb) => request(data, cb, DELETE_ADDRESS),
	getStoreId: (data, cb) => request(data, cb, GET_STORE_ID),
	getStoreList: (data, cb) => request(data, cb, GET_STORE_LIST),
	getMenuNav: (data, cb) => request(data, cb, GET_MENU_NAVIGATION),
	getProductDetails: (data, cb) => request(data, cb, GET_PRODUCT_DETAILS),
	getOrderHistory: (data, cb) => request(data, cb, GET_ORDER_HISTORY),
	getOrderDetailsInProfile: (data, cb) => request(data, cb, GET_ORDER_DETAILS_IN_PROFILE),
	getWishList: (data, cb) => request(data, cb, GET_WISHLIST_ITEM),
	removeWishList: (data, cb) => request(data, cb, REMOVE_FROM_WISHLIST),
	addToCart: (data, cb) => request(data, cb, ADD_TO_CART),
	guestAddToCart: (data, cb, quote_id) => {
		let GUEST_ADD_TO_CART_LINK = GUEST_ADD_TO_CART.url + '' + quote_id + '/items';
		// request(data, cb, GUEST_ADD_TO_CART_LINK);
		request(data, cb, { type: 'POST', url: GUEST_ADD_TO_CART_LINK });
	},

	getProductList: (data, cb) => request(data, cb, GET_PRODUCT_LIST),
	getProductSearchList: (data, cb) => {
        let GET_PRODUCT_LIST_BY_SEARCH = `${BASE_URL}searchresult/?q=${data.q}&storeid=6`;
        request({}, cb, { type: 'GET', url: GET_PRODUCT_LIST_BY_SEARCH });
    },
	//getProductSearchList: (data, cb) => request(data, cb, GET_PRODUCT_SEARCH_LIST),
	addToWishlist: (data, cb) => request(data, cb, ADD_TO_WISHLIST),
	getGuestCartId: (data, cb) => request(data, cb, GET_GUEST_CART_ID),
	//getGuestCart: (data, cb) => request(data, cb, GET_GUEST_CART),
	getHomePageData: (data, cb) => request(data, cb, GET_HOME_PAGE_DATA),

	getFaqPageData: (data, cb) => request(data, cb, GET_FAQ_DATA),
	getHelpFAQPageData: (data, cb) => request(data, cb, GET_HELP_DATA),
	vipRegisterUser: (data, cb) => request(data, cb, VIP_REGISTER_U),
	getPlaceOrder: (data, cb) => request(data, cb, GET_PLACE_ORDER),
	getOrderSummary: (data, cb) => request(data, cb, GET_SUMMARY_DATA),
	getIpInfo: (data, cb) => request(data, cb, GET_IP_INFO),
	removeOutOfStock: (data, cb) => request(data, cb, REMOVE_OUT_OF_STOCK),
	getCMSPage: (data, cb, identifier, store_id) => {
		let GET_DISCOVER_CMS_PAGE_LINK = `${GET_DISCOVER_CMS_PAGE.url}${identifier}/storeId/${store_id}`
		// request(data, cb, GUEST_ADD_TO_CART_LINK);
		request(data, cb, { type: 'GET', url: GET_DISCOVER_CMS_PAGE_LINK });
	},
	getCareersPageData: (data, cb, identifier, store_id) => {
		let GET_CAREERS_PAGE_LINK = `${GET_CAREERS_PAGE.url}careers/storeId/1`
		request(data, cb, { type: 'GET', url: GET_CAREERS_PAGE_LINK });
	},
	getAffiliatePageData: (data, cb) => request(data, cb, GET_AFFILIATE_DATA),
	getAboutUsPageData: (data, cb) => request(data, cb, GET_ABOUTUS_DATA),
	getFranchisingPageData: (data, cb) => request(data, cb, GET_FRANCHISING_DATA),
	getBusinessPageData: (data, cb) => request(data, cb, GET_BUSINESS_DATA),
	getCorporateResponsibilityPageData: (data, cb) => request(data, cb, GET_CORPORATE_RESPONSIBILITY_DATA),
	getTermOfUsePageData: (data, cb) => request(data, cb, GET_TERMS_OF_USE_DATA),
	getCookiePolicyPageData: (data, cb) => request(data, cb, GET_COOKIE_POLICY__DATA),
	getCorporateInformationPageData: (data, cb) => request(data, cb, GET_CORPORATE_INFORMATION_DATA),
	getTermConditionsPageData: (data, cb) => request(data, cb, GET_TERMS_AND_CONDITIONS_DATA),
	getReturnPolicyPageData: (data, cb) => request(data, cb, GET_RETURN_AND_EXCHANGES_DATA),
	getPromotionTermsAndCondtionPageData: (data, cb) => request(data, cb, GET_PROMOTION_TERMS_AND_CONDITION_DATA),
	setOrderJson: (data, cb) => request(data, cb, SET_ORDER_JSON),
	getContactUsData: (data, cb) => request(data, cb, GET_CONTACT_US_DATA),
	saveContactUsData: (data, cb) => request(data, cb, SAVE_CONTACT_US_DATA),

	getSizeChart: (data, cb) => request(data, cb, GET_SIZE_CHART),
	resetPassword: (data, cb) => request(data, cb, RESET_PASSWORD)
};

function getRequestData(data) {
	let formBody = [];
	let encodedKey;
	let encodedValue;
	for (let property in data) {
		encodedKey = property;
		encodedValue = data[property];
		formBody.push(encodedKey + '=' + encodedValue);
	}
	return formBody.join('&');
}

async function request(requestData, cb, featureURL, secureRequest = buildHeader(), urlData = '') {

	const url = featureURL.dynamic ? featureURL.url + '/' + requestData.storeId : featureURL.url;

	// Fix for Guest Add to Cart
	// let api_url = featureURL.dynamic ? featureURL.url + '/' + requestData.storeId : featureURL.url;
	// if ((featureURL.dynamic === undefined) && (featureURL.url === undefined)) {
	// 	 api_url = featureURL;
	// }
	// const url = api_url;

	if (url === 'http://ipinfo.io/json') {
		secureRequest = ipInfoHeader();
	}

	if (!live) {
		console.groupCollapsed('API REQUEST');
		console.log({ featureURL });
		console.log({ secureRequest });
		console.log({ requestData });
		console.log({ url });
		console.groupEnd();
	}

	try {
		let response;

		if (featureURL.type == 'GET') {
			response = await axios.get(url, {
				headers: secureRequest,
				params: requestData,
			});
		} else if ('POST|PATCH|PUT'.includes(featureURL.type)) {
			response = await axios[featureURL.type.toLocaleLowerCase()](url, requestData, {
				headers: secureRequest,
			});
		} else if ('DELETE'.includes(featureURL.type)) {
			response = await axios.create({ headers: secureRequest }).delete(url);
		}
		if (!live) {
			console.groupCollapsed('API RESPONSE');
			console.log({ response });
			console.groupEnd();
		}
		if (cb.complete) cb.complete();

		if (response.status === 200) {
			cb.success(response.data);
		} else {
			cb.error(response.data);
		}
	} catch (error) {
		//    if(!live){console.log({error})}else{null};
		//console.log({error});
		if (cb.complete) cb.complete();
		if (error.response) {
			cb.error(error.response.data);
		} else {
			cb.error(error);
		}
	}
}

function logout() {
	setTimeout(() => { }, 300);
}
