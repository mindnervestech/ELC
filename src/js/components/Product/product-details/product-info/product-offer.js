import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class ProductOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    _renderOffer = (item,currency) => {
        const [qty,price] = item;
        return (
            <>
                <p style={{ display: 'inline-block' }}> {qty} <FormattedMessage id="For.Text" defaultMessage="For" /> {currency} {price} | </p>
                
            </>
        );
    }

    render() {
        const { productOffer } = this.props;
        const currency = productOffer.currency;

        //console.log('In ProductOffer', this.props);
        //console.log('In ProductOffer currency', currency);
        //console.log('In ProductOffer status', productOffer.offers);

        //console.log('In ProductOffer status', productOffer.offers);

        let product_offers;

        if (productOffer.offers) {
            //let product_offers_status =  productOffer.offers.status;
            //console.log('In ProductOffer status', productOffer.offers.status);
            if (productOffer.offers.status === 1) {
                // Convert JSON to array
                product_offers =  Object.entries(productOffer.offers.data);
                //console.log('product_offers',product_offers);
            }
        }

        if (product_offers) {
            if(parseInt(product_offers[0][0]) == 1){
                product_offers.splice(0,1); 
            }
            if (this.props.showBeginItems > 0 && product_offers.length != 0) {
                let showNum = this.props.showBeginItems;
                return(
                    <section id="offer">
                    <h6><FormattedMessage id="BUYMORESAVEMORE" defaultMessage="BUY MORE SAVE MORE" /> </h6>
                    {
                        product_offers.slice(0,showNum).map((item) => this._renderOffer(item,currency))
                    }
                     </section>
                )
            } else {
                return null;
            }
                // } else {
                //     let showNum = this.props.showRemainingItems;
                //     return(
                //         <section id="offer">
                //         <br />
                //         {
                //             product_offers.slice(showNum,).map((item) => this._renderOffer(item,currency))
                //         }
                //          </section>
                //     )
                // }
        }
        else {
            return false;
        }
    }
}

export default ProductOffer;