// import React, { Component } from 'react';
// import ReadMoreAndLess from 'react-read-more-less';
// import parse from 'html-react-parser';
// import { FormattedMessage } from 'react-intl';

// class ProductBasic extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             readMoreText: "Read More",
//             readLessText: "Read Less"
//         }
//     }

//     componentDidMount() {
//         const currentStore = this.props.currentStore;
//         let readMoreText = "Read More";
//         let readLessText = "Read Less";
//         if(currentStore === 1 || currentStore === 3 || currentStore === 5){
//             readMoreText = "قراءة المزيد";
//             readLessText = "أقرأ أقل";
//         }
//         this.setState({ readMoreText,  readLessText})
//     }

//     _checkOfferPrice = (item, itemOfferPrice) => {
//         // console.log('item.price',item.price);
//         // console.log('itemOfferPrice',itemOfferPrice);

//         if ( parseInt(item.price) !== parseInt(itemOfferPrice) ) {
//             return(
//                 <del>{item.currency} {item.price}</del>
//             );
//         }
//     }

//     _renderProductDetails = (item) => {
//         const { readMoreText, readLessText} = this.state;
//         return (
//             <section id="prddetail">
//                 <p className="heading">{item.style_desc}</p>
//                 <p className="prdhead" /><p className="prdhead">{item.collection_desc}</p><p />
//                 <p className="prdcode"><FormattedMessage id="product.sku" defaultMessage="Sku" /><strong>{item.sku}</strong></p>
//                 {item.description && (<ReadMoreAndLess
//                     className="read-more-content"
//                     charLimit={200}
//                     readMoreText={this.state.readMoreText}
//                     readLessText={this.state.readLessText}
//                 >
//                     {parse(item.description)}
//                 </ReadMoreAndLess>)}
//                 {
//                     item.offers ? (item.offers.data && item.offers.data['1'] ? 
//                         <>
//                             {/* <del>{item.currency} {item.price}</del> */}

//                             { this._checkOfferPrice(item, item.offers.data['1']) }

//                             <p className="d-price" style={{ fontSize: '2.4rem', margin: '0 0 1.2rem' }}>
//                                 {item.currency} {item.offers.data['1']}
//                             </p>
//                         </>	
//                     : <p style={{ fontSize: '2.4rem', margin: '0 0 1.2rem' }}>{item.currency} {item.price}</p>)
//                     : <p style={{ fontSize: '2.4rem', margin: '0 0 1.2rem' }}>{item.currency} {item.price}</p>
//                 }

//             </section>
//         )
//     }
//     render() {
//         const { productbasic } = this.props;
//         if (productbasic) {
//             return ( this._renderProductDetails(productbasic));
//         }
//         else {
//             return false;
//         }

//     }
// }
// export default ProductBasic;

import React, { Component } from 'react';
import * as actions from '../../../../redux/actions/index';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import logo1 from '../../../../../assets/images/you_may_also_like_1.png';

class ProductBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidUpdate(prevProps, prevState) {

    }

    checkOut(type){
        // if(type === 'CheckOut'){
        //    // this.props.history.push(`/${this.props.globals.store_locale}/new-check-out`);
        //    this.props.history.push(`/${this.props.globals.store_locale}/cart`);
        // }else{
           this.props.onCloseCartModal();
        // }
     }

    render() {
        console.log("this.props", this.props);
        return (

            <div className="col" style={{ padding: 25 }}>
                <div>
                    <span>
                        <i className="fa fa-check cbox-icon-success right-icon-fa">
                            <span>added to your basket </span>
                        </i>
                    </span>
                </div>
                <div className="row padding-model">
                    <div className="button-model" onClick={() => this.checkOut('shopping')}>
                        <button className="contunue-shopping-btn"><FormattedMessage id="Cart.ContinueShopping.Title" defaultMessage="Continue Shopping" /></button>
                    </div>

                    <div className="button-model">
                        <Link to={`/${this.props.globals.store_locale}/cart`}>
                            <button className="alsoLikeCardButton"><FormattedMessage id="Cart.CheckOut.Title" defaultMessage="Check out" /></button>
                        </Link>
                    </div>
                </div>
                <div className="row cart_modeal">
                    <h2 />
                </div>

                <div className="col padding-model">
                    <div className="button-model on-mobile">
                        <span className="related-title">Related Products</span>
                    </div>

                    <div className="row related-item">
                        <div style={{width:'20%'}}>
                            {/* <Link to={`/${store_locale}/products-details/${list[keyName].json.url_key}`}> */}
                                <img className="related-item-img"  src={logo1} />
                            {/* </Link> */}
                        </div>
                        <div className="col" style={{width:'55%', marginLeft: '15px'}}>
                            <div className="related-title">
                                {/* <Link to={`/${store_locale}/products-details/${list[keyName].json.url_key}`}> */}
                                <span>Early Learning Centre Bouncy Palace</span>
                                {/* </Link> */}
                            </div>
                            <div className="related-title">
                                <span>£34.99 </span>
                                <span className="special_price">£49.99</span>
                            </div>
                        </div>

                        <div className="alsoLikeCard add-cart" style={{width:'30%', marginLeft: '15px'}}>
                            <div className="homePage">
                                <button  onClick={this.addToCart} className="alsoLikeCardButton" style={{ marginTop: 0, width:'100%' }}>
                                    <FormattedMessage id="Product.Detail.addToBasket" defaultMessage="Add to basket" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        globals: state.global,
        productDetails: state.productDetails,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetSize: payload => dispatch(actions.getSize(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductBasic);
