import TagManager from 'react-gtm-module';

export const initializeGTM = () => {
    TagManager.initialize({
        gtmId: 'GTM-NC6Z64G'
    });
};

export const dataLayerGTM = (payload) => {
    TagManager.dataLayer({
        page_url: window.location.pathname + window.location.search 
    })
};

export const initializeGTMWithEvent = (event) => {
  window.dataLayer = window.dataLayer || [] ;
  window.dataLayer.push(event);
};