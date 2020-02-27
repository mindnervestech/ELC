import cookie from 'react-cookies'
export const live = true;

//server ['uat','dev','live']
export let active_server = 'dev';
if(window.location.href.includes('elcjsuat')){
    active_server = 'uat';
} else if(window.location.href.includes('elctoys.com')){
    active_server = 'live';
}

export const ROOT_URL = {
    dev: 'https://elcm2.iksulalive.com/', // 'http://nayomidev.iksulalive.com/',
    uat: 'https://elcm2uat.iksulalive.com/',
    live: 'https://cms.elctoys.com/'

};

export const WEB_URL_ALL = {
    dev: `http://elcm2.iksulalive.com/`,
    uat: `https://elcm2uat.iksulalive.com/`,
    live: 'https://www.elctoys.com/'
}

export const PAY_FORT_URL_ALL = {
    dev: `https://sbcheckout.payfort.com/FortAPI/paymentPage`,
    uat: `https://sbcheckout.payfort.com/FortAPI/paymentPage`,
    live: 'https://checkout.payfort.com/FortAPI/paymentPage'
}



let store_locale=cookie.load('store_locale');
let replace_store_locale = '';
if(store_locale){
    replace_store_locale=store_locale.replace("-","_")
}else{
    replace_store_locale='uae_en';
}

export const WEB_URL = WEB_URL_ALL[active_server];


export const PAY_FORT_URL = PAY_FORT_URL_ALL[active_server];
export const API_URL = ROOT_URL[active_server];
export const CLONE_BASE_URL = `${ROOT_URL[active_server]}rest/V1/app/`;

export const BASE_URL = `${ROOT_URL[active_server]}index.php/rest/V1/app/`;
export const BASE_URL_PRODUCT_REVIEW= `${ROOT_URL[active_server]}index.php/rest/V1/`
export const TOKEN_URL = `${ROOT_URL[active_server]}index.php/rest/V1/integration/admin`;
export const COUNTRY_URL = `${ROOT_URL[active_server]}index.php/rest/V1/directory/`;
export const CART_URL = `${ROOT_URL[active_server]}index.php/rest/${replace_store_locale}/V1/carts/mine/`; 
export const GUEST_CART_URL = `${ROOT_URL[active_server]}index.php/rest/${replace_store_locale}/V1/`; 
export const STATIC_PAGES_URL = `${ROOT_URL[active_server]}index.php/rest/V1/cmsPageIdentifier/`;

export const API_TOKEN = "exn50dak2a5iahy02hawo5il0y6j25ct" //"q7fhtd4w5ysvzbsg8v86ydf6epnyhf2m"
export const IP_INFO_TOKEN = "69e46a82457d45"
export const GEO_IP_INFO_TOKEN='604fcf895967a7'






