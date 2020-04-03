// import TagManager from 'react-gtm-module';

// export const initializeGTM = () => {
//     TagManager.initialize({
//         gtmId: 'GTM-5HWCVSJ'//for uat
//     });
// };

// export const dataLayerGTM = (payload) => {
//     TagManager.dataLayer({
//         page_url: window.location.pathname + window.location.search 
//     })
// };

// export const initializeGTMWithEvent = (event) => {
//   window.dataLayer = window.dataLayer || [] ;
//   window.dataLayer.push(event);
// };

import TagManager from 'react-gtm-module';
//import { GTM_ID } from '../../api/globals';
let active_server = 'dev';
if(window.location.href.includes('elcjsuat')){
    active_server = 'uat';
} else if(window.location.href.includes('elctoys.com')){
    active_server = 'live';
}
let GTM_ID;
if(active_server==='uat'){
    GTM_ID='GTM-5HWCVSJ'
}
if(active_server==='live'){
    GTM_ID='GTM-NC6Z64G'
}
export const initializeGTM = () => {
    TagManager.initialize({
        gtmId:GTM_ID
    });
};

export const dataLayerGTM = (payload) => {
    TagManager.dataLayer({
        page_url: window.location.pathname + window.location.search
    })
};

export const initializeGTMWithEvent = (event) => {
    /*TagManager.initialize({
      gtmId: GTM_ID,
      events: event
    });*/
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
};

export const ProductSearchEvent = (product_data) => {
    
    let impressionsData = [];
    let currencyCode = '';
    if (product_data &&  Object.keys(product_data)) {
        Object.keys(product_data).map((key, index) => {
            let item = product_data[key];
            currencyCode = item.currency;
            impressionsData.push({
                name: item && item.json && item.json.name,
                id: item && item.json && item.json.sku,
                price: item && item.json && item.json.offers ? (item.json.offers.data && item.json.offers.data['1'] ? item.json.offers.data && item.json.offers.data['1'] : item.price) : item.price,
                category: item && item.json && item.json.category_names,
                brand: 'Google',
                list: 'Search Results',
                position: index + 1
            })
        });
    }
 
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'eec.impressions',
        ecommerce: {
            currencyCode: currencyCode,
            impressions: impressionsData
        }
    });
}

export const ProductListEvent = (product_data) => {
    let impressionsData = [];
    let currencyCode = '';
    if (product_data) {
        Object.keys(product_data).map((key, index) => {
            let item = product_data[key];
            currencyCode = item.currency;
            impressionsData.push({
                name: item && item.json && item.json.name,
                id: item && item.json && item.json.sku,
                price: item && item.json && item.json.offers ? (item.json.offers.data && item.json.offers.data['1'] ? item.json.offers.data && item.json.offers.data['1'] : item.price) : item.price,
                category: item && item.json && item.json.category_names,
                brand: 'Google',
                list: 'List Results',
                position: index + 1
            })
        });

    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'eec.impressions',
        ecommerce: {
            currencyCode: currencyCode,
            impressions: impressionsData
        }
    });
}

export const productClickEvent = (data, index, isComeFrom) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'productClick',
        ecommerce: {
            click: {
                actionField: {
                    list: isComeFrom
                },
                products: [{
                    name: data && data.json && data.json.name,
                    id: data && data.json && data.json.sku,
                    price:data && data.json && data.json.offers ? (data.json.offers.data && data.json.offers.data['1'] ? data.json.offers.data && data.json.offers.data['1'] : data.price) : data.price,
                    brand: 'Google',
                    category: data.json.category_names,
                    position: index + 1
                }]
            }
        },
        // eventCallback: function () {
        //     document.location = (window.location.pathname + window.location.search)
        // }
    });
}

export const productDetailsEvent = (data) => {
    if (data !== undefined) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event:'eec.detail',
            ecommerce: {
                detail: {
                    products: [{
                        name: data.name,
                        id: data.sku,
                        price: data && data && data.offers ? (data.offers.data && data.offers.data['1'] ? data.offers.data && data.offers.data['1'] : data.price) : data.price,
                        brand: 'Google',
                        category: data.category_names,
                    }]
                }
            }
        })
    }
}

export const AddToCartEvent = (data, qty) => {
    window.dataLayer = window.dataLayer || [];
    let products = [{
        name: data.name,
        id: data.sku,
        price: data && data && data.offers ? (data.offers.data && data.offers.data['1'] ? data.offers.data && data.offers.data['1'] : data.price) : data.price,
        brand: 'Google',
        category: data.category_names,
        quantity: qty
    }]
    window.dataLayer.push({
        event: 'addToCart',
        ecommerce: {
            currencyCode: data.currency,
            add: {
                products: products
            }
        }
    })
}

export const RemoveProductCart = (data) => {
    window.dataLayer = window.dataLayer || [];
    let products = [{
        name: data.name,
        id: data.sku,
        price: data.special_price && data.price!==data.special_price ? data.special_price:data.price,
        brand: 'Google',
        category: data.category_names,
        quantity:data.qty

    }]
    window.dataLayer.push({
        event: 'removeFromCart',
        ecommerce: {
            remove: {
                products: products
            }
        }
    });
}

export const checkoutEvent = (data, setpCountForGTM) => {
    window.dataLayer = window.dataLayer || [];
    let products = []
    if (data && data.products && Object.keys(data.products).length > 0) {
        Object.keys(data.products).map((key, index) => {
            let item = data.products[key];
            products.push({
                name: item && item.name,
                id: item && item.sku,
                price: item && item.special_price && item.price!==item.special_price ?item.special_price:item.price,
                category: item && item.category_names,
                brand: 'Google',
                quantity: item && item.qty
            })
        })
    }

    window.dataLayer.push({
        event: 'checkout',
        ecommerce: {
            checkout: {
                actionField: {
                    step: setpCountForGTM
                },
                products: products
            }
        }
    });
}

export const purchaseEvent = (product_data,order_summary,order_number) => {
    let actionField={}
    let productData=[]
    if(product_data.length > 0 && order_summary!==undefined && order_number!==undefined){
        actionField={
            id:order_number && order_number,
            affiliation:'Online Store',
            revenue:order_summary.total && order_summary.total,
            currency:order_summary.currency && order_summary.currency,
            tax:order_summary.vat && order_summary.vat,
            shipping:order_summary.shipping && order_summary.shipping,
            coupon:""
        }
        for(let i=0;i<product_data.length;i++){
            productData.push(product_data[i])
        }
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event:'ecc.purchase',
            ecommerce: {
                purchase: {
                    actionField:actionField,
                    products: productData
                }
            }
        })

    }
   
} 
