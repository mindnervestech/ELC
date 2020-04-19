import React, { Component } from 'react';
import RenderSlider from '../slider';
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick";
import { Link, Redirect } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner2';
import * as actions from '../../../redux/actions/index';
import { connect } from 'react-redux';
import AddToBasketModal from '../product-details/product-info/add-to-basket-modal';
import Modal from 'react-responsive-modal';
import AddToCartModal from '../product-details/product-info/product-basic';

class ProductSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spnner: true,
            basketPopupFlag: false,
            url_key: '',
            addToCartModal: false,
            cartModelFlag: false,
        }
    }

    openAddTOBasketModal = (url_key) => {
        this.setState({
            basketPopupFlag: true,
            url_key: url_key
        })
    }

    onCloseCartModal = () => {
        this.setState({ addToCartModal: false, cartModelFlag: false })
    }

    onCloseAddCartModal = () => {
        this.setState({ basketPopupFlag: false })
        setTimeout(() => {
            if (window.location.href.includes('products-details')) {
                let data = {
                    customerid: typeof this.props.customer_details.customer_id !== 'undefined' ? parseInt(this.props.customer_details.customer_id) : " ",
                    store: this.props.globals.currentStore,
                    url_key: '',
                };
                let url = window.location.href.split('/');
                data.url_key = url[url.length - 1];
                this.props.onGetProductDetails(data);
            }
        }, 500);
    }

    componentDidUpdate(prevProps) {

        if (prevProps.addToCardLoader !== this.props.addToCardLoader &&
            this.props.item_added.item_added && this.props.item_added.add_cart_open_popUp &&
            (!this.state.cartModelFlag)) {
            if (!this.props.item_added.add_cart_error) {
                this.onCloseAddCartModal();
                this.setState({
                    addToCartModal: true,
                    cartModelFlag: true
                })
            }
        }
    }

    showDiscountPriceOnSlider = (offerData, originalPrice, currency) => {
        if (Object.keys(offerData).length === 1) {
            for (let value in offerData) {
                if (value === '1') {
                    return (
                        <div>
                            <span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>{currency}&nbsp;{offerData[value]}</span>
                            <span style={{ color: "#b3b3b3", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>{currency}&nbsp;{originalPrice}.00</span>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>{currency}&nbsp;{originalPrice}.00</span>
                        </div>
                    );
                }
            }
        } else {
            return (
               
                <div>
                    <span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>{currency}&nbsp;{originalPrice}.00</span>
                </div>
            );
        }

    }

    checkBuyAndMoreOnSlider(offer, index) {
		if (Object.keys(offer).length == 1) {
			for (let value in offer) {
				if (value === '1') {
					return (
						// <div>
						// 	<button onClick={() => this.openShowAndMorePopup(index)} className="bayMoreAndSaveMore"><FormattedMessage id="BuyMoreBtn.Message2" defaultMessage="Sale" /></button>
						// </div>
						<div>
						<button  className="bayMoreAndSaveMore"><FormattedMessage id="BuyMoreBtn.Message2" defaultMessage="Sale" /></button>
					</div>
					);
				} else {
					return (
						// <div>
						// 	<button onClick={() => this.openShowAndMorePopup(index)} className="bayMoreAndSaveMore"><FormattedMessage id="BuyMoreBtn.Message" defaultMessage="Buy More, Save More!" /></button>
						// </div>
						<div>
						<button  className="bayMoreAndSaveMore"><FormattedMessage id="BuyMoreBtn.Message" defaultMessage="Buy More, Save More!" /></button>
					</div>
					);
				}
			}
		} else {
			return (
				// <div>
				// 	<button onClick={() => this.openShowAndMorePopup(index)} className="bayMoreAndSaveMore"><FormattedMessage id="BuyMoreBtn.Message" defaultMessage="Buy More, Save More!" /></button>
				// </div>
				<div>
					<button  className="bayMoreAndSaveMore"><FormattedMessage id="BuyMoreBtn.Message" defaultMessage="Buy More, Save More!" /></button>
				</div>
			);
		}
	}


    render() {
        const { store_locale, store_name, currency, similar_product } = this.props;
        const settings3 = {
            autoplay: true,
            autoplaySpeed: 5000,
            dots: false,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            speed: 500,
            vertical: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                }
            ]
        }
        if (similar_product != undefined) {
            this.state.spnner = false
        }
        // if(this.state.addToCartModal && this.props.cart_details.similar_products && document.getElementsByClassName("styles_modal__gNwvD")[0]){
        // 	document.getElementsByClassName("styles_modal__gNwvD")[0].style.cssText="height: auto !important; width:450px !important"
        // }

        return (
            <div className="row">
                {this.state.basketPopupFlag && this.props.productData ? <div>
                    <Modal modalId="add_to_basket" open={this.state.basketPopupFlag} onClose={this.onCloseAddCartModal}>
                        <AddToBasketModal url_key={this.state.url_key} onCloseAddCartModal={this.onCloseAddCartModal} />
                    </Modal>
                </div> : ''}
                {this.state.addToCartModal && this.props.cart_details.similar_products ? <div>
                    <Modal modalId="addToCartPopupID" open={this.state.addToCartModal} onClose={this.onCloseCartModal}>
                        <AddToCartModal onCloseCartModal={this.onCloseCartModal} />
                    </Modal>
                </div> : ''}
                {this.state.spnner ? <Spinner /> :
                    <div className="col col-12 apex-col-auto rowPadding">
                        <div style={{ paddingTop: 15, backgroundColor: '#fff' }} className="t-Region containers  t-Region--noBorder t-Region--hiddenOverflow margin-bottom-lg reduse-width" id="R35743384497996348" aria-live="polite">
                            {/* <div className="t-Region-header">
                            <div className="t-Region-headerItems t-Region-headerItems--title">
                                <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                <h5 className="t-Region-title" id="R35743384497996348_heading"><FormattedMessage id="PDP.YMAL" defaultMessage="You may also love" /></h5>
                            </div>
                            <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                        </div>
                        <div className="t-Region-bodyWrap">
                            <div className="t-Region-body">
                                <div class="owl-carousel">
                                    <RenderSlider currency={this.props.currency} store_name={this.props.store_name} similar_product={this.props.similar_product}></RenderSlider>
                                </div>
                                <div id="report_35743384497996348_catch">
                                    <div className="carousel-wrap">
                                    
                                        <div id="R35743384497996348_owl" className="owl-carousel owl-loaded owl-drag">
                                            <div className="owl-stage-outer">
                                                <div className="owl-stage" style={{ width: '3534px' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     */}

                            {!window.location.pathname.includes('products-details') ?
                                <div className="row bestsellers">
                                    <h2 />
                                    <label>
                                        <FormattedMessage id="Product.Detail.youMayAlsoLike" defaultMessage="Bestsellers" />
                                    </label>
                                    <h2 />
                                </div> :
                                <div className="row you-may-like-title">
                                    <h2 />
                                    <label>
                                        <FormattedMessage id="Cart.YouMayAlsoLove.Title" defaultMessage="You may also like" />
                                    </label>
                                    <h2 />
                                </div>}
                            <div className="row">
                                <div className="col col-12 apex-col-auto homeBlock">
                                    <div id="R36275003485418909" className="homePage">
                                        <section className="trendingBlock2 data">
                                            <div className="wrap">
                                                <div className="trendingList">
                                                    <Slider {...settings3}>
                                                        {similar_product && similar_product.map((item, index) => (

                                                            <div className="alsoLikeCard">
                                                                <Link to={`/${store_name ? store_name : store_locale}/products-details/${item.url_key}`}>
                                                                    <div className="ProductSilderImageHight">
                                                                        <img src={item.productImageUrl[0]} />
                                                                    </div>
                                                                    <div className="marginTop25">
                                                                        {/* <label className="text-color">{item.name}</label> */}
                                                                        {item.name.length > 45?
                                                                            <label className="text-color">{item.name.substring(0, 30) + "..."}</label> :
                                                                            <label className="text-color">{item.name}</label>
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        {item && item.offers && item.offers.status === 1 ?
                                                                            this.showDiscountPriceOnSlider(item.offers.data, item.price,item.currency) :
                                                                            <span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>{item.currency ? item.currency : currency} &nbsp;{item.price}</span>}
                                                                        {/* <span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>{currency} &nbsp;{item.price}</span> */}
                                                                    </div>
                                                                </Link>
                                                                <div>
                                                                    <button style={{marginBottom:10,width:'100%'}} className="alsoLikeCardButton" onClick={() => this.openAddTOBasketModal(item.url_key)}>
                                                                        <FormattedMessage id="Product.Detail.addToBasket" defaultMessage="Add to basket" />
                                                                    </button>
                                                                </div>
                                                                <div>
                                                                    {item && item.offers && item.offers.status===1 && this.checkBuyAndMoreOnSlider(item.offers.data, index)}
                                                                </div>
                                                            </div>

                                                        ))}
                                                    </Slider>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}


const mapStateToProps = state => {

    return {
        globals: state.global,
        // menu: state.menu.menuNavData,
        productData: state.productDetails.productData,
        productDetailLoader: state.productDetails.productDetailLoader,
        customer_details: state.login.customer_details,
        addToCardLoader: state.productDetails.addToCardLoader,
        cart_details: state.myCart,
        user_details: state.login,
        guest_user: state.guest_user,
        item_added: state.item_added,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // onClearProductDetails: payload => dispatch(actions.clearProductDetails(payload)),
        onGetProductDetails: payload => dispatch(actions.getProductDetails(payload)),
        // getSizeChart: payload => dispatch(actions.getSizeChart(payload)),
        OngetMyCart: (quoteId) => dispatch(actions.getMyCart(quoteId)),
        // onGetGuestCartId: () => dispatch(actions.getGuestCartId()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductSlider);
// export default ProductSlider;