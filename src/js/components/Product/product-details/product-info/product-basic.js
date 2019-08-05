import React, { Component } from 'react';
import ReadMoreAndLess from 'react-read-more-less';
import parse from 'html-react-parser';
import { FormattedMessage } from 'react-intl';

class ProductBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readMoreText: "Read More",
            readLessText: "Read Less"
        }
    }

    componentDidMount() {
        const currentStore = this.props.currentStore;
        let readMoreText = "Read More";
        let readLessText = "Read Less";
        if(currentStore == 1 || currentStore == 3 || currentStore == 5){
            readMoreText = "قراءة المزيد";
            readLessText = "أقرأ أقل";
        }
        this.setState({ readMoreText,  readLessText})
    }

    _checkOfferPrice = (item, itemOfferPrice) => {
        // console.log('item.price',item.price);
        // console.log('itemOfferPrice',itemOfferPrice);

        if ( parseInt(item.price) !== parseInt(itemOfferPrice) ) {
            return(
                <del>{item.currency} {item.price}</del>
            );
        }
    }

    _renderProductDetails = (item) => {
        const { readMoreText, readLessText} = this.state;
        return (
            <section id="prddetail">
                <p className="heading">{item.style_desc}</p>
                <p className="prdhead" /><p className="prdhead">{item.collection_desc}</p><p />
                <p className="prdcode"><FormattedMessage id="product.sku" defaultMessage="Sku" /><strong>{item.sku}</strong></p>
                {item.description && (<ReadMoreAndLess
                    className="read-more-content"
                    charLimit={200}
                    readMoreText={this.state.readMoreText}
                    readLessText={this.state.readLessText}
                >
                    {parse(item.description)}
                </ReadMoreAndLess>)}
                {
                    item.offers ? (item.offers.data && item.offers.data['1'] ? 
                        <>
                            {/* <del>{item.currency} {item.price}</del> */}

                            { this._checkOfferPrice(item, item.offers.data['1']) }
                         
                            <p className="d-price" style={{ fontSize: '2.4rem', margin: '0 0 1.2rem' }}>
                                {item.currency} {item.offers.data['1']}
                            </p>
                        </>	
                    : <p style={{ fontSize: '2.4rem', margin: '0 0 1.2rem' }}>{item.currency} {item.price}</p>)
                    : <p style={{ fontSize: '2.4rem', margin: '0 0 1.2rem' }}>{item.currency} {item.price}</p>
                }
                
            </section>
        )
    }
    render() {
        const { productbasic } = this.props;
        if (productbasic) {
            return ( this._renderProductDetails(productbasic));
        }
        else {
            return false;
        }
        
    }
}
export default ProductBasic;