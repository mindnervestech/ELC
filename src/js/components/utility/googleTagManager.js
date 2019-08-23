import TagManager from 'react-gtm-module';

export const initializeGTM = () => {
    TagManager.initialize({
        gtmId: 'GTM-MSV9DZV'
    });
};

export const dataLayerGTM = (payload) => {
    TagManager.dataLayer({
        page_url: window.location.pathname + window.location.search 
    })
};