import React, { Component } from 'react';
import './WishList.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { FormattedMessage } from 'react-intl';
import Spinner from '../Spinner/Spinner';
import StarRatings from 'react-star-ratings';
import AddToBasketModal from '../Product/product-details/product-info/add-to-basket-modal';
import Modal from 'react-responsive-modal';
import AddToCartModal from '../Product/product-details/product-info/product-basic';
import { Helmet } from 'react-helmet';

let basketPopupFlag = false;
let addToCartModal = false
let cartModelFlag = false;
let url_key = '';
let showPopupIndex = -1
let currencyCountry = ''
class WishList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            goToProduct: false,
            url_key: null,
            showAlert: false,
            wishlist_message: '',
            ischeckremove: true,
            basketPopupFlag: false,
            addToCartModal: false,
            cartModelFlag: false,
            url_key: '',
        }
    }

    componentDidMount() {
        this.props.onGetWishListItem({ customerid: this.props.user_details.customer_id, store_id: this.props.globals.currentStore })
    }

    componentWillMount() {
        if (this.props.guest_user.temp_quote_id == null) {
            this.props.onGetGuestCartId();
        }
    }

    openAddTOBasketModal = (url) => {
        this.setState({
            basketPopupFlag: true,
            url_key: url_key
        })
        url_key = url;
        basketPopupFlag = true;
    }

    onCloseCartModal = () => {
        addToCartModal = false;
        cartModelFlag = false;
        this.setState({ addToCartModal: false, cartModelFlag: false })
    }

    onCloseAddCartModal = () => {
        this.setState({ basketPopupFlag: false })
        basketPopupFlag = false;
        setTimeout(() => {
            // if (this.props.isUserLoggedIn) {
            //     this.props.OngetMyCart({
            //         quote_id: this.props.user_details.quote_id,
            //         store_id: this.props.globals.currentStore
            //     })
            // } else {
            //     this.props.OngetMyCart({
            //         quote_id: this.props.guest_user.new_quote_id,
            //         store_id: this.props.globals.currentStore
            //     })

            // }
        }, 500);
    }

    componentWillReceiveProps(nextProps){
        
        // if (nextProps.removeWishListDetailPDP.remove_wishlist_success!=undefined && nextProps.removeWishListDetailPDP.remove_wishlist_success=="") {
        //     console.log("come here wishlist page")
        //     if (this.state.ischeckremove) {
        //         this.setState({ wishlist_message: nextProps.removeWishListDetailPDP.remove_wishlist_success, showAlert: true, ischeckremove: false });

        //         setTimeout(() => {
        //             this.closeAlert();
        //         }, 5000);
        //     }
        // }
    }

    componentDidUpdate(prevProps) {

        

        if (prevProps.addToCardLoader !== this.props.addToCardLoader && this.props.item_added.item_added && this.props.item_added.add_cart_open_popUp && (!this.state.cartModelFlag || !cartModelFlag)) {
            if (!this.props.item_added.add_cart_error) {
                this.onCloseAddCartModal();
                this.setState({
                    addToCartModal: true,
                    cartModelFlag: true
                })
                addToCartModal = true;
                cartModelFlag = true;
            }
        }
    }

    wishlistToggle = (index, wishlist_id) => {
        this.props.onRemoveProductFromWishList({ index: index, wishlist_id: wishlist_id })
        this.props.onGetWishListItem({ customerid: this.props.user_details.customer_id, store_id: this.props.globals.currentStore })

        // if (this.props.removeWishListDetail.remove_wishlist_success!=undefined) {

        //     if (this.state.ischeckremove) {
        //         this.setState({ wishlist_message: this.props.removeWishListDetail.remove_wishlist_success, showAlert: true, ischeckremove: false });

        //         setTimeout(() => {
        //             this.closeAlert();
        //         }, 5000);
        //     }

        // }
    }

    logOut = () => {
        this.props.onLogoutUser();
    }

    closeAlert = () => {
        this.setState({ showAlert: false });
    }

    gotoProductDetail = (item) => {
        const store_locale = this.props.globals.store_locale;
        const data = {
            customerid: typeof this.props.user_details.customer_id !== 'undefined' ? parseInt(this.props.user_details.customer_id) : " ",
            store: this.props.globals.currentStore,
            url_key: item.url_key,
        };

        this.props.onGetProductDetails(data);
        this.props.getSizeChart({
            store_id: this.props.globals.currentStore,
        });

        this.setState({
            goToProduct: true,
            url_key: item.url_key
        });
    }

    checkBuyAndMore(offer, index) {
        if (Object.keys(offer).length == 1) {
            for (let value in offer) {
                if (value == '1') {
                    return (
                        <div>
                            <button onClick={() => this.openShowAndMorePopup(index)} className="bayMoreAndSaveMore"><FormattedMessage id="BuyMoreBtn.Message2" defaultMessage="Sale" /></button>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <button onClick={() => this.openShowAndMorePopup(index)} className="bayMoreAndSaveMore"><FormattedMessage id="BuyMoreBtn.Message" defaultMessage="Buy More, Save More!" /></button>
                        </div>
                    );
                }
            }
        } else {
            return (
                <div>
                    <button onClick={() => this.openShowAndMorePopup(index)} className="bayMoreAndSaveMore"><FormattedMessage id="BuyMoreBtn.Message" defaultMessage="Buy More, Save More!" /></button>
                </div>
            );
        }
    }

    closeBuyAndMore(index) {
        showPopupIndex = -1
        this.setState({ changeFilterData: true })
    }

    openShowAndMorePopup(index) {
        showPopupIndex = index
        this.setState({ changeFilterData: true })
    }

    showMessageOnBuyAndMorePopup(offer, currency) {
        if (Object.keys(offer).length == 1) {
            for (let value in offer) {
                if (value == '1') {
                    return (
                        <div className="buyAndMorePopupText">
                            <FormattedMessage id="BuyMoreBtn.Message2" defaultMessage="Sale" />
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <div className="buyAndMorePopupText">
                                <FormattedMessage id="BuyMoreBtn.Message" defaultMessage="Buy More, Save More!" />
                            </div>
                            <div className="buyAndMoreOffer">
                                <span>{value}&nbsp;<FormattedMessage id="For.Text" defaultMessage="For" />&nbsp;{currencyCountry}&nbsp;{offer[value]}</span>
                            </div>
                        </div>
                    );
                }
            }
        } else {
            let showOffer = []
            let count = 0
            for (let value in offer) {
                if (count < 2) {
                    showOffer.push(value)
                    showOffer.push(offer[value])
                }
                count++
            }
            count = 0
            return (
                <div>
                    <div className="buyAndMorePopupText">
                        <FormattedMessage id="BuyMoreBtn.Message" defaultMessage="Buy More, Save More!" />
                    </div>
                    <div>
                        <div className="buyAndMoreOffer">
                            <span>{showOffer[0]}&nbsp;<FormattedMessage id="For.Text" defaultMessage="For" />&nbsp;{currency}&nbsp;{showOffer[1]}</span>
                        </div>
                        <div className="buyAndMoreOffer">
                            <span>{showOffer[2]}&nbsp;<FormattedMessage id="For.Text" defaultMessage="For" />&nbsp;{currency}&nbsp;{showOffer[3]}</span>
                        </div>
                    </div>
                </div>
            );
        }
    }

    showDiscountPrise(offerData, orignalPrise, currency) {
        if (Object.keys(offerData).length == 1) {
            for (let value in offerData) {
                if (value == '1') {
                    return (
                        <div>
                            <span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>{currency}&nbsp;{offerData[value]}</span>
                            <span style={{ color: "#b3b3b3", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>{currency}&nbsp;{orignalPrise}.00</span>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>{currency}&nbsp;{orignalPrise}.00</span>
                        </div>
                    );
                }
            }
        } else {
            return (
                <div>
                    <span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>{currency}&nbsp;{orignalPrise}.00</span>
                </div>
            );
        }
    }

    render() {
        const language = localStorage.getItem('templang');
        const store_locale = this.props.globals.store_locale;

        if (this.props.globals.country == 'UAE') {
            currencyCountry = 'AED'
        } else {
            currencyCountry = 'SAR'
        }
        let title = "Your account | ELC UAE Online store";
        let description = "Shop online for baby toys, dolls houses, wooden toys and more at ELC. Choose from big brands including LeapFrog, VTech, Smart Trike and more.";
        let keywords = "ELC, Early Learning Center, Early Learning Centre, Toys, Baby Toys, Wooden Toys, Educational Toys";
        if (language == 'ar') {
            title = "حسابك |  متجر مركز التعليم المبكر على الإنترنت في السعودية";
            description = "تسوّق ألعاب الرضّع ومنازل الدمى والألعاب الخشبية وغيرها الكثير على الإنترنت من مركز التعليم المبكر. اختر من العلامات التجارية الكبيرة بمن فيها ليب فروع وفي تيك وسمارت تريك وغيرها.";
            keywords = "إي إل سي، مركز التعليم المبكر، مركز التعليم المبكر، ألعاب، ألعاب رضّع، ألعاب خشبية، ألعاب تعليمية";
        }

        let meta_tag = <><Helmet>
            <meta name="tital" content={title} />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
        </Helmet></>;

        let respo_message = null;
        if (this.state.showAlert) {
            respo_message = <span id="APEX_SUCCESS_MESSAGE" data-template-id="126769709897686936_S" className="apex-page-success u-visible"><div className="t-Body-alert">
                <div className="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">
                    <div className="t-Alert-wrap">
                        <div className="t-Alert-icon">
                            <span className="t-Icon" />
                        </div>
                        <div className="t-Alert-content">
                            <div className="t-Alert-header">
                                <h2 className="t-Alert-title">{this.state.wishlist_message}</h2>
                            </div>
                        </div>
                        <div className="t-Alert-buttons">
                            <button className="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="Close Notification" onClick={this.closeAlert} ><span className="t-Icon icon-close" /></button>
                        </div>
                    </div>
                </div>
            </div></span>;
        }

        if (!(this.props.isUserLoggedIn)) {
            return <Redirect to={{
                pathname: `/${store_locale}/sign-in-register`,
            }} />;
        }

        return (
            <>
            {this.props.spinnerProduct ? <Spinner /> :
            <div className="t-Body-contentInner homePage">
                {meta_tag}
                {basketPopupFlag ?
                    <div>
                        <Modal modalId="add_to_basket" open={basketPopupFlag} onClose={this.onCloseAddCartModal}>
                            <AddToBasketModal url_key={url_key} onCloseAddCartModal={this.onCloseAddCartModal} />
                        </Modal>
                    </div> : ''}
                {addToCartModal && this.props.cart_details.similar_products && !window.location.href.includes('products-details') ?
                    <div>
                        <Modal modalId="addToCartPopupID" open={addToCartModal} onClose={this.onCloseCartModal}>
                            <AddToCartModal onCloseCartModal={this.onCloseCartModal} />
                        </Modal>
                    </div> : ''}
                <div className="padding-right-ar padding-breadcrumb">
                    <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                        <span className="titleHover" style={{ fontSize: 15 }}><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></span>
                        {this.props.globals.language === 'en' ?
                            <span>&nbsp;\&nbsp;&nbsp;</span> :
                            <span>&nbsp;/&nbsp;&nbsp;</span>
                        }
                    </Link>
                    <span style={{ fontSize: 15, fontWeight: 'bold' }}><FormattedMessage id="profile.Wishlist.Title" defaultMessage="Wishlist" /></span>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col col-12 apex-col-auto">
                            <div className="t-ButtonRegion t-Form--floatLeft containers t-ButtonRegion--noPadding t-ButtonRegion--noUI apex-tabs-region js-apex-region" id="R28512406002220865">
                                <div className="t-ButtonRegion-wrap">
                                    <div className="t-ButtonRegion-col t-ButtonRegion-col--left"><div className="t-ButtonRegion-buttons" /></div>
                                    <div className="t-ButtonRegion-col t-ButtonRegion-col--content">
                                        <h2 className="t-ButtonRegion-title" id="R28512406002220865_heading">Region Display Selector</h2>
                                        <div className="apex-rds-container"><div className="apex-rds-slider"><div className="apex-rds-hover left" style={{ display: 'none' }}><a> <span className="a-Icon icon-left-chevron" /> </a></div><div className="apex-rds-hover right" style={{ display: 'none' }}><a> <span className="a-Icon icon-right-chevron" /> </a></div></div><ul id="28512406002220865_RDS" className="apex-rds a-Tabs" role="tablist" style={{ whiteSpace: 'nowrap', overflowX: 'hidden' }}><li className="apex-rds-item apex-rds-first apex-rds-before" role="presentation" id="R28333887549179555_tab">
                                            <Link
                                                to={{
                                                    pathname: `/${store_locale}/profile`,
                                                    state: { ...this.state }
                                                }} role="tab" aria-controls="R28333887549179555" aria-selected="false" tabIndex={-1}><span><FormattedMessage id="profile.Account.Title" defaultMessage="Account" /></span></Link>
                                        </li><li className="" role="presentation" id="R28337577127179591_tab">
                                                <Link to={{
                                                    pathname: `/${store_locale}/order-history`,
                                                }} role="tab" aria-controls="R28337577127179591" aria-selected="true">
                                                    <span className="FormattedMessage"><FormattedMessage id="profile.OrderHistory.Title" defaultMessage="Order History" /></span>
                                                </Link></li>
                                            <li className="apex-rds-item apex-rds-last apex-rds-selected" role="presentation" id="USERWISHLIST_tab">
                                                <Link to={{
                                                    pathname: `/${store_locale}/wish-list`,
                                                }} role="tab" aria-controls="USERWISHLIST" aria-selected="false" tabIndex={-1}>
                                                    <span className="FormattedMessage"><FormattedMessage id="profile.Wishlist.Title" defaultMessage="Wishlist" /></span></Link>
                                            </li>
                                            <button onClick={this.logOut} className="t-Button t-Button--hot t-Button--gapTop divShowOnMobile floatRight" type="button" id="B28512592134220867"><span className="t-Button-label"><FormattedMessage id="header.SignOut" defaultMessage="Sign Out" /></span></button>
                                        </ul></div>
                                        <div className="t-ButtonRegion-buttons" />
                                    </div>
                                    <div className="t-ButtonRegion-col t-ButtonRegion-col--right"><div className="t-ButtonRegion-buttons"><button onClick={this.logOut} className="t-Button t-Button--hot t-Button--gapTop divShowOnWeb" type="button" id="B28512592134220867"><span className="t-Button-label"><FormattedMessage id="header.SignOut" defaultMessage="Sign Out" /></span></button></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.props.products.length > 0 ?
                        <ul className="products wishlist-products">
                            {this.props.products.map((index, item) =>
                                (
                                    <li key={index}>
                                        <div className="alsoLikeCard">
                                            <div className="ProductSilderImageHight">
                                                {/* <span className="percentage-text">30</span>
                                                <span className="save-text" style={{ display: 'none' }}>5</span>
                                                <img src={save} className="save" style={{ display: 'none' }}/> */}
                                                <Link to={`/${store_locale}/products-details/${this.props.products[item].url_key}`}>

                                                    <img src={this.props.products[item].image[0]} className="cardImage" style={{ height: 'auto' }} /></Link>
                                                {/* <img src={percentage} className="percentage"/> */}
                                            </div>
                                            <Link to={`/${store_locale}/products-details/${this.props.products[item].url_key}`}>
                                                <div style={{ marginTop: 10, height: 45, overflow: 'hidden' }}>
                                                    <label className="text-color">{this.props.products[item].name}</label>
                                                </div></Link>
                                            <div>
                                                {this.props.products[item].offers && this.props.products[item].offers.status == 1 ?
                                                    this.showDiscountPrise(this.props.products[item].offers.data, this.props.products[item].price, "AED")
                                                    : <Link to={`/${store_locale}/products-details/${this.props.products[item].url_key}`}><div>
                                                        <span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>{currencyCountry}&nbsp;&nbsp;{this.props.products[item].price}</span>
                                                    </div></Link>
                                                }
                                            </div>
                                            {/* <div style={{ paddingTop: 10 }}>
                                                <StarRatings
                                                    rating={3}
                                                    starRatedColor='#FAD961'
                                                    changeRating={this.changeRating}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starHoverColor='#0D943F'
                                                    starDimension='15px'
                                                    starSpacing='0px'
                                                /> 
                                                <span style={{ marginLeft: 5 }}>3 - 10 years</span>
                                                </div> */}
                                            <div>
                                                <button style={{ width: '100%' }} className="alsoLikeCardButton" onClick={() => this.openAddTOBasketModal(this.props.products[item].url_key)}>
                                                    <FormattedMessage id="Product.Detail.addToBasket" defaultMessage="Add to basket" />
                                                </button>
                                            </div>
                                            <div style={{ paddingTop: 10 }}>
                                                <span onClick={() => this.wishlistToggle(index, this.props.products[item].wishlist_id)}>
                                                    <i className="icon-heart">
                                                        <span style={{ paddingLeft: 7, cursor: 'pointer', fontFamily: 'VAG Rounded ELC Light' }} ><FormattedMessage id="PageTitle.remove-wishlist" defaultMessage="Remove from Wishlist" /></span></i></span>
                                            </div>
                                        </div>
                                        <div style={{ padding: "0px 10px" }}>
                                            {this.props.products[item].offers && this.props.products[item].offers.status == 1 &&
                                                this.checkBuyAndMore(this.props.products[item].offers.data, item)
                                            }
                                        </div>
                                        <div className="buyAndSaveMorePopup" style={showPopupIndex == item ? { display: 'block' } : { display: 'none' }}>
                                            <i className="close fa fa-times" aria-hidden="true" onClick={() => this.closeBuyAndMore(item)} />
                                            <div style={{ marginTop: 40 }}>
                                                <i className="icon-cart basket iconBasket" />
                                            </div>
                                            <div style={{ padding: '0px 10px' }}>
                                                {this.props.products[item].offers && this.props.products[item].offers.status == 1 &&
                                                    this.showMessageOnBuyAndMorePopup(this.props.products[item].offers.data, 'AED')
                                                }
                                            </div>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                        : <div style={{ marginBottom: 50, marginTop: 15, textAlign: 'start' }}><span style={{ fontSize: "24px", padding: "20px 0px" }}><FormattedMessage id="PageTitle.Wishlist.Empty" defaultMessage="Wishlist is empty" /></span></div>}
                </div>
            </div>}
        </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.login.isUserLoggedIn,
        user_details: state.login.customer_details,
        products: state.wishList.products,
        orderHistory: state.orders.orders_history,
        globals: state.global,
        removeWishListDetailPDP: state.productDetails.productWishDetail,
        wishLoader: state.wishList.wishLoader,
        cart_details: state.myCart,
        guest_user: state.guest_user,
        addToCardLoader: state.productDetails.addToCardLoader,
        item_added: state.item_added,
        spinnerProduct: state.spinner.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutUser: () => dispatch(actions.logoutUser()),
        onGetWishListItem: (payload) => dispatch(actions.getWishlist(payload)),
        onGetProductDetails: payload => dispatch(actions.getProductDetails(payload)),
        // getSizeChart: payload => dispatch(actions.getSizeChart(payload)),
        OngetMyCart: (quoteId) => dispatch(actions.getMyCart(quoteId)),
        onRemoveProductFromWishList: (payload) => dispatch(actions.removeWishList(payload)),
        onGetGuestCartId: () => dispatch(actions.getGuestCartId()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);