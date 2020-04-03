import React, { Component } from 'react';
import ShoppingBagItem from './ShoppingBagItem';
import OutOfStock from './OutOfStock';
import EmptyShoppingBag from './EmptyShoppingBag';
import ReactDOM from 'react-dom';
import Alert from './AlertMsg';
import AlertBox from '../Common/AlertBox/AlertBox';
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import * as utility from '../utility/utility';
import { FormattedMessage, injectIntl } from 'react-intl';
import './ShoppingBag.css';
import './owl.carousel.min.css';
import './owl.css';
import OwlItem from './OwlItem';
import { array } from 'prop-types';
import Spinner from '../Spinner/Spinner2';
import SpinnerOne from '../Spinner/Spinner';
import { trackF, initializeF } from '../utility/facebookPixel';
import { live } from '../../api/globals';
import Popup from 'react-popup';
import { Helmet } from 'react-helmet';
class ShoppingBag extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.myIntl = props.intl;
        this.state = {
            redirectToDeliveryDetails: false,
            alertBoxDetails: {
                status: false,
                message: '',
            }
        }

    }

    componentDidMount = () => {

        let obj = this.props.user_details.customer_details;
        if (!(utility.emptyObj(obj))) {
            if (!(this.props.cart_details.is_cart_details_rec)) {
                this.props.OngetMyCart({
                    quote_id: this.props.user_details.customer_details.quote_id,
                    store_id: this.props.globals.currentStore
                })
            }
        }
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.globals.currentStore !== this.props.globals.currentStore) {

            // console.log('quote_id',this.props.user_details.customer_details.quote_id);
            // console.log('store_id',this.props.globals.currentStore);

            if (this.props.user_details.isUserLoggedIn) {
                this.props.OngetMyCart({
                    quote_id: this.props.user_details.customer_details.quote_id,
                    store_id: this.props.globals.currentStore
                })
            } else {
                this.props.OngetMyCart({
                    quote_id: this.props.guest_user.new_quote_id,
                    store_id: this.props.globals.currentStore
                })

            }
        }
    }

    increase = (index, qty, item) => {
        //console.log({ index: index, type: 'inc', qty: qty });
        if (item.is_in_stock) {
            if (parseInt(item.is_in_stock.stock) <= item.qty) {
                let popupMessage = null;
                let currentStore = this.props.globals.currentStore;
                if (currentStore == 1 || currentStore == 3 || currentStore == 5) {
                    popupMessage = Popup.register({
                        title: 'محزر',
                        content: `الحد الأقصى لكمية الطلب من هذا المنتج هي ${item.is_in_stock.stock} يرجى تغيير الكمية المحددة لتكون ضمن هذا العدد. لطلب كمية أكثر من ${item.is_in_stock.stock} يرجى اللاتصال بنا.`,
                        buttons: {
                            right: [{
                                text: 'حسنا',
                                action: function () {
                                    Popup.close();
                                }
                            }]
                        }
                    });
                    Popup.queue(popupMessage);
                } else {
                    popupMessage = Popup.register({
                        title: 'Alert',
                        content: `This product has a maximum orderable quantity of ${item.is_in_stock.stock} Please update your selected quantity to be within this limit.To order quantity more than ${item.is_in_stock.stock} please contact us.`,
                        buttons: {
                            right: [{
                                text: 'OK',
                                action: function () {
                                    Popup.close();
                                }
                            }
                            ]
                        }
                    });
                    Popup.queue(popupMessage);
                }

                //Popup.alert(`This product has a maximum orderable quantity of ${item.is_in_stock.stock} Please update your selected quantity to be within this limit.To order quantity more than ${item.is_in_stock.stock} please contact us.`);
                return;
            }
        }
        this.props.OnChangeQty({ index: index, type: 'inc', qty: qty })

    }

    decrease = (index, qty) => {
        //console.log({ index: index, type: 'dec', qty: qty });
        this.props.OnChangeQty({ index: index, type: 'dec', qty: qty })
    }

    remove = (index) => {

        this.props.OnremoveProduct({ index: index })
    }

    redirectToDeliveryDetails = () => {
        //console.log('redirectToDeliveryDetails');
        let obj = this.props.user_details.customer_details;
        if (!(utility.emptyObj(obj))) {
            if (this.props.cart_details.products.length > 0) {
                this.setState({
                    redirectToDeliveryDetails: true
                })
            } else {
                this.setState({
                    ...this.state,
                    alertBoxDetails: {
                        status: true,
                        message: this.myIntl.formatMessage({ id: 'Cart.AddProductInCart' }),
                    }
                })
                //alert(this.myIntl.formatMessage({ id: 'Cart.AddProductInCart' }));

            }
        } else {
            this.props.onStartGuestCheckout();
            this.props.history.push({
                pathname: '/' + this.props.globals.store_locale + '/checkout-login',
                state: { isGuest: true }
            })
        }
    }

    gotoProductDetail = item => {

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

        this.props.history.push(`/${store_locale}/products-details/${item.url_key}`);
    }


    continueShopping = () => {
        //console.log('hi')
        // this.props.history.push('/');
        this.props.history.push('/' + this.props.globals.store_locale);
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    isOutOfStock = (value) => {
        // console.log('isOutOfStock :',value.is_in_stock.status)
        return (!value.is_in_stock.status);
    }

    closeErrorBox = () => {
        this.setState({
            ...this.state,
            alertBoxDetails: {
                status: false,
                message: ''
            }
        })
        console.log('Close alert Box Parent');
    }

    closedAlertScroll = () => {
        const tesNode = ReactDOM.findDOMNode(this.myRef.current)
        tesNode.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    render() {

        const language = localStorage.getItem('templang');

        if (this.state.redirectToDeliveryDetails) {
            // if (live) {
            //     trackF('InitiateCheckout');
            // }
            return <Redirect to={`/${this.props.globals.store_locale}/delivery-details`} />
        }

        let title = "Your cart | ELC UAE Online store";
        let description = "Shop online for baby toys, dolls houses, wooden toys and more at ELC. Choose from big brands including LeapFrog, VTech, Smart Trike and more.";
        let keywords = "ELC, Early Learning Center, Early Learning Centre, Toys, Baby Toys, Wooden Toys, Educational Toys";
        if (language == 'ar') {
            title = "عربة تسوقك |  متجر مركز التعليم المبكر على الإنترنت في السعودية";
            description = "تسوّق ألعاب الرضّع ومنازل الدمى والألعاب الخشبية وغيرها الكثير على الإنترنت من مركز التعليم المبكر. اختر من العلامات التجارية الكبيرة بمن فيها ليب فروع وفي تيك وسمارت تريك وغيرها.";
            keywords = "إي إل سي، مركز التعليم المبكر، مركز التعليم المبكر، ألعاب، ألعاب رضّع، ألعاب خشبية، ألعاب تعليمية"; 
        }

		let meta_tag  = <><Helmet>
            <meta name="tital" content={title} />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
        </Helmet></>;
        
        const itemList = this.props.cart_details.products;
        const quote_id = this.props.cart_details.quote_id;
        let shoppingItem = null;
        let outOfStock = null;
        let outOfStockAlert = null;
        let isDiableButton = false;


        let checkOutOfStock = itemList.filter((this.isOutOfStock));
        if (checkOutOfStock.length > 0) {
            isDiableButton = true;
            outOfStock = <OutOfStock product={checkOutOfStock} quote_id={quote_id} />;
            outOfStockAlert = <Alert closedScroll={this.closedAlertScroll} />
        }
        var demo = true
        if (itemList.length > 0 || demo) {
            shoppingItem = itemList.map((item, index) => {
                // if (item.is_in_stock.status) {
                //   return <ShoppingBagItem
                //     key={index}
                //     product={item}
                //     inc={() => this.increase(index, item.qty, item)}
                //     dec={() => this.decrease(index, item.qty)}
                //     remove={() => this.remove(index)}
                //     gotoProductDetail={() => this.gotoProductDetail(item)}
                //     store_locale={this.props.globals.store_locale} />
                // } else {
                //   return null;
                // }

            })
            return <ShoppingBagItem cart_details={this.props.cart_details}
            />;

        } else if (itemList.length == 0) {
            if (this.props.cartLoader) {
                return <Spinner />
            } else {
                return <EmptyShoppingBag />
            }
        }

        let similar_products = null;
        const similar_products_list = this.props.cart_details.similar_products;

        if (similar_products_list && similar_products_list.length > 0) {
            similar_products = <OwlItem product={similar_products_list} />;

        }

        let alertBox = null;

        if (this.state.alertBoxDetails.status) {
            alertBox = <AlertBox
                message={this.state.alertBoxDetails.message}
                alertBoxStatus={this.state.alertBoxDetails.status}
                closeBox={this.closeErrorBox} />
        }


        return (
            <>
                <SpinnerOne>
                    {outOfStockAlert}
                    {alertBox}
                    <div className="Cart t-Body-contentInner">
                        {meta_tag}
                        <Popup />
                        <div className="container">
                            {this.props.updateLoader && <Spinner />}
                            {!this.props.updateLoader && (
                                <>
                                    <div className="row">

                                        <div className="col col-12 apex-col-auto">
                                            <div className="t-Region containers  t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow margin-bottom-none" id="R34424287007836337">
                                                <div className="t-Region-header">
                                                    <div className="t-Region-headerItems t-Region-headerItems--title">
                                                        <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                        <h2 className="t-Region-title" id="R34424287007836337_heading">Basket Main</h2>
                                                    </div>
                                                    <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                </div>
                                                <div className="t-Region-bodyWrap">
                                                    <div className="t-Region-buttons t-Region-buttons--top">
                                                        <div className="t-Region-buttons-left" />
                                                        <div className="t-Region-buttons-right" />
                                                    </div>
                                                    <div className="t-Region-body">
                                                        <input type="hidden" id="P5_PAGE_TITLE" name="P5_PAGE_TITLE" defaultValue="Cart Nayomi" /><input type="hidden" data-for="P5_PAGE_TITLE" defaultValue="Vn1FsR1IVOWk5oJIMvB6CGxbIQlMcM6k9oZAeoO9Tw5M7I3COiPZLZSHEePUUsmj7QDT2TKA95GPO5jxobkqDg" /><input type="hidden" id="P5_PAGE_DESC" name="P5_PAGE_DESC" defaultValue="Cart- Shop your favorite Nayomi products easy with Nayomi Cart" /><input type="hidden" data-for="P5_PAGE_DESC" defaultValue="E1qhHOFtXiAq3IjiaOgky1FhDHsTAK1b5uR3h-jTfE2vZHPcaDHLn-9uODzQvBr9BUXrTfeIkEgs5dj-P3BLUQ" />
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col col-8 ">
                                                                    <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow margin-bottom-lg" id="PRDBASKET" aria-live="polite">
                                                                        <div className="t-Region-header">
                                                                            <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                                <h2 className="t-Region-title" id="PRDBASKET_heading"><FormattedMessage id="delivery-details.ShoppingBag.Title" defaultMessage="Shopping Bag" /></h2>
                                                                            </div>
                                                                            <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                        </div>
                                                                        <div className="t-Region-bodyWrap">
                                                                            <div className="t-Region-buttons t-Region-buttons--top">
                                                                                <div className="t-Region-buttons-left" />
                                                                                <div className="t-Region-buttons-right" />
                                                                            </div>
                                                                            <div className="t-Region-body">
                                                                                <div id="report_226902533466451275_catch"><div className="t-Report t-Report--stretch t-Report--staticRowColors t-Report--rowHighlightOff t-Report--horizontalBorders" id="report_PRDBASKET" data-region-id="PRDBASKET">
                                                                                    <div className="t-Report-wrap">
                                                                                        <table className="t-Report-pagination" role="presentation"><tbody><tr><td /></tr></tbody></table>
                                                                                        <div className="t-Report-tableWrap">
                                                                                            <table className="t-Report-report" summary="BASKET">
                                                                                                <tbody>


                                                                                                    {shoppingItem}


                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                        <div className="t-Report-links" />
                                                                                        <table className="t-Report-pagination t-Report-pagination--bottom" role="presentation" />
                                                                                    </div>
                                                                                </div></div>
                                                                            </div>
                                                                            <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                                <div className="t-Region-buttons-left" />
                                                                                <div className="t-Region-buttons-right" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div><div className="col col-4 apex-col-auto">
                                                                    <div className="t-Region subtotal  t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow" id="R34424406661836338">
                                                                        <div className="t-Region-header">
                                                                            <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                                <h2 className="t-Region-title" id="R34424406661836338_heading"><FormattedMessage id="Cart.Subtotal.Title" defaultMessage="Subtotal" /></h2>
                                                                            </div>
                                                                            <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                        </div>
                                                                        <div className="t-Region-bodyWrap">
                                                                            <div className="t-Region-buttons t-Region-buttons--top">
                                                                                <div className="t-Region-buttons-left" />
                                                                                <div className="t-Region-buttons-right" />
                                                                            </div>
                                                                            <div className="t-Region-body">
                                                                                <div className="container">
                                                                                    <div className="row">
                                                                                        <div className="col col-12 apex-col-auto">
                                                                                            <div id="total" aria-live="polite">
                                                                                                <div id="report_226904536612451295_catch"><div className="t-Report t-Report--stretch t-Report--staticRowColors t-Report--noBorders t-Report--rowHighlightOff" id="report_total" data-region-id="total">
                                                                                                    <div className="t-Report-wrap">
                                                                                                        <table className="t-Report-pagination" role="presentation"><tbody><tr><td /></tr></tbody></table>
                                                                                                        <div className="t-Report-tableWrap">
                                                                                                            <table className="t-Report-report" summary="Cart Summary">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td className="t-Report-cell" headers="TYPE">
                                                                                                                            <h4 className="p_summary"><FormattedMessage id="Cart.Subtotal.Title" defaultMessage="Subtotal" /></h4>
                                                                                                                        </td><td className="t-Report-cell" align="right" headers="PRICE">
                                                                                                                            <span style={{}}>
                                                                                                                                <h4 className="p_summary">
                                                                                                                                    <span>{this.props.cart_details.currency}&nbsp;</span>
                                                                                                                                    {this.props.cart_details.subtotal_with_discount}&nbsp;
                                                                  {
                                                                                                                                        (parseInt(this.props.cart_details.subtotal_with_discount) !== parseInt(this.props.cart_details.subtotal)) ?

                                                                                                                                            <del style={{ fontSize: 'small' }}>{this.props.cart_details.subtotal}</del>
                                                                                                                                            : ''
                                                                                                                                    }

                                                                                                                                </h4>
                                                                                                                            </span>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </div>
                                                                                                        <div className="t-Report-links" />
                                                                                                        <table className="t-Report-pagination t-Report-pagination--bottom" role="presentation" />
                                                                                                    </div>
                                                                                                </div></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div><div className="row">
                                                                                        <div className="col col-12 apex-col-auto">
                                                                                            <div id="R34424515495836339" style={{ borderBottom: '1px solid grey' }} className="">
                                                                                                <p style={{ fontSize: '11px' }}>
                                                                                                    <FormattedMessage id="Cart.Content" defaultMessage="Content" />
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div><div className="row">
                                                                                        <div className="col col-12 apex-col-auto">
                                                                                            <div id="R34424718669836341" className="h-hidden-mobile">
                                                                                                <button onClick={this.redirectToDeliveryDetails} className="t-Button t-Button--hot t-Button--stretch t-Button--gapTop" type="button" id="B34424672498836340" disabled={isDiableButton}><span className="t-Button-label"><FormattedMessage id="Cart.CheckOut.Title" defaultMessage="CheckOut" /></span></button>
                                                                                                <center><FormattedMessage id="Cart.Or.Title" defaultMessage="OR" /></center>

                                                                                                <button onClick={this.continueShopping} className="t-Button js-ignoreChange t-Button--stretch t-Button--gapTop" type="button" id="P0_CONTINUE_SHOP"><span className="t-Button-label"><FormattedMessage id="Cart.ContinueShopping.Title" defaultMessage="Continue Shopping" /></span></button>
                                                                                            </div>


                                                                                            <div className="t-Region containers  t-Region--noBorder t-Region--hiddenOverflow margin-top-lg margin-bottom-lg" id="R47844864984579986" aria-live="polite">

                                                                                                <div className="t-Region-header">
                                                                                                    <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                                        <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                                                        <h2 className="t-Region-title" id="R47844864984579986_heading"><FormattedMessage id="Cart.YouMayAlsoLove.Title" defaultMessage="You May Also Love" /></h2>
                                                                                                    </div>
                                                                                                    <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                                                </div>
                                                                                                <div className="t-Region-bodyWrap">
                                                                                                    <div className="t-Region-buttons t-Region-buttons--top">
                                                                                                        <div className="t-Region-buttons-left" />
                                                                                                        <div className="t-Region-buttons-right" />
                                                                                                    </div>
                                                                                                    <div className="t-Region-body">
                                                                                                        <div class="owl-carousel">
                                                                                                            {similar_products}
                                                                                                        </div>
                                                                                                        <div id="report_47844864984579986_catch">
                                                                                                            <div className="carousel-wrap">
                                                                                                                {/*<h1 className="owl-heading" id="R47844864984579986_heading">#TITLE#</h1>*/}
                                                                                                                <div>
                                                                                                                    <div className="owl-stage-outer">
                                                                                                                        <div>







                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div className="owl-dots disabled" /></div></div></div>
                                                                                                    </div>
                                                                                                    <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                                                        <div className="t-Region-buttons-left" />
                                                                                                        <div className="t-Region-buttons-right" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                                <div className="t-Region-buttons-left" />
                                                                                <div className="t-Region-buttons-right" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="t-Region-buttons t-Region-buttons--bottom">
                                                        <div className="t-Region-buttons-left" />
                                                        <div className="t-Region-buttons-right" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col col-12 apex-col-auto">
                                            <div className="t-ButtonRegion t-Form--floatLeft hidden-desktop hide-buttons t-ButtonRegion--stickToBottom t-ButtonRegion--noPadding t-ButtonRegion--noUI t-Form--noPadding t-Form--xlarge t-Form--stretchInputs margin-top-none margin-bottom-none margin-left-none margin-right-none is-anchored" id="mobile-buttons" style={{ bottom: '0px' }}>
                                                <div className="t-ButtonRegion-wrap">
                                                    <div className="t-ButtonRegion-col t-ButtonRegion-col--left"><div className="t-ButtonRegion-buttons" /></div>
                                                    <div className="t-ButtonRegion-col t-ButtonRegion-col--content">
                                                        <h2 className="t-ButtonRegion-title" id="mobile-buttons_heading">Mobile Button</h2>
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col col-2 ">
                                                                    <button onClick={this.handleBack} className="t-Button t-Button--noLabel t-Button--icon js-ignoreChange t-Button--large t-Button--pillStart t-Button--stretch t-Button--padLeft t-Button--padRight t-Button--padTop t-Button--padBottom" type="button" id="B29006043800427069" title="Continue Shopping" aria-label="Continue Shopping"><span className="t-Icon fa fa-angle-left" aria-hidden="true" /></button>
                                                                </div><div className="col col-10 ">
                                                                    <button onClick={this.redirectToDeliveryDetails} className="t-Button t-Button--hot t-Button--large t-Button--pillEnd t-Button--stretch t-Button--padLeft t-Button--padRight t-Button--padTop t-Button--padBottom" type="button" id="B29005885182427068" disabled={isDiableButton}><span className="t-Button-label" ><FormattedMessage id="Cart.CheckOut.Title" defaultMessage="CheckOut" /></span></button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="t-ButtonRegion-buttons" />
                                                    </div>
                                                    <div className="t-ButtonRegion-col t-ButtonRegion-col--right"><div className="t-ButtonRegion-buttons" /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col col-12 apex-col-auto" ref={this.myRef}>
                                            {outOfStock}
                                        </div>
                                    </div>
                                </>)}
                        </div>
                    </div>
                </SpinnerOne>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        cart_details: state.myCart,
        user_details: state.login,
        guest_user: state.guest_user,
        change_pass: state.login.changePasswordDetails,
        addressBook: state.address.addressBook,
        countryList: state.address.countryList,
        addressResp: state.address.addressResp,
        isAddBookRec: state.address.isAddBookRec,
        globals: state.global,
        cartLoader: state.myCart.loader,
        updateLoader: state.myCart.update_loader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStartGuestCheckout: () => dispatch(actions.startGuestCheckout()),
        OngetMyCart: (quoteId) => dispatch(actions.getMyCart(quoteId)),
        OnChangeQty: (quoteId) => dispatch(actions.changeQty(quoteId)),
        onGetProductDetails: payload => dispatch(actions.getProductDetails(payload)),
        getSizeChart: payload => dispatch(actions.getSizeChart(payload)),
        OnremoveProduct: (quoteId) => dispatch(actions.removeProduct(quoteId)),
        onGetStoreIds: () => dispatch(actions.getStoreIds()),
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(ShoppingBag)));