import React, { Component, useState } from 'react';
import ZeroItem from './Instagram';
import Slider from "react-slick";
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { FormattedMessage } from 'react-intl';
import placeholder from '../../../assets/images/placeholder.png'
import ProductSlider from '../Product/product-details/Product-slider'
import { Link, Redirect } from 'react-router-dom';

class HomePageComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let payload = {
            currentStore: this.props.globals.currentStore
        }
        this.props.getYouMayAlsoLikeData(payload)
    }

    render() {
        const homeData = this.props.home_page_data.data;
        const store_locale = this.props.store_locale;

        const settings3 = {
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            vertical: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        }

        return (
            <>
                <div className="t-Body">
                    <div className="t-Body-main" style={{ marginTop: '0px !important' }}>
                        <div className="t-Body-title" id="t_Body_title" style={{ 'top': '294px' }}></div>
                        <div className="t-Body-content" id="t_Body_content">
                            <div className="t-Body-contentInner">
                                <div style={{ padding: "0px 0px" }} className="divShowOnWeb webBanner">
                                    <Slider {...settings3} id="webBanner">
                                        {homeData && homeData.banners.map((item, index) => (
                                            <Link to={`/` + store_locale + `/products` + item.BLOCK_URL + ``}>
                                                <div>
                                                    <img src={item.BLOCK_BANNER} className="banner-image-hight" />
                                                </div>
                                            </Link>
                                        ))}
                                    </Slider>
                                </div>
                                <div style={{ padding: "0px 0px" }} className="divShowOnMobile">
                                    <Slider {...settings3}>
                                        {homeData && homeData.banners.map((item, index) => (
                                            <Link to={`/` + store_locale + `/products` + item.BLOCK_URL + ``}>
                                                <div>
                                                    <img src={item.BLOCK_MOBILE_BANNER} className="banner-image-hight" />
                                                </div>
                                            </Link>
                                        ))}
                                    </Slider>
                                </div>
                                <div className="contener">
                                    <div className="row">
                                        <div className="col col-12 apex-col-auto homeBlock">
                                            <div id="R36275003485418909" className="homePage">
                                                <section className="trendingBlock">
                                                    <div className="wrap">
                                                        <ul className="product-list">
                                                            {homeData && homeData.blocks.map((item, index) => (
                                                                <li key={index}>
                                                                    <div>
                                                                        <Link to={`/` + store_locale + `/products/ ` + item.BLOCK_URL + ``}>
                                                                            <a href={''} target="_blank">
                                                                                <img src={item.BLOCK_BANNER != null ? item.BLOCK_BANNER : placeholder} />
                                                                            </a>
                                                                            <div className="cardDetail">
                                                                                <span className="cardDetailText">{item.TITLE}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                    <ProductSlider similar_product={this.props.YouMayAlsoLike} store_locale={this.props.store_locale}></ProductSlider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
        wishLoader: state.wishList.wishLoader,
        YouMayAlsoLike: state.productDetails.YouMayAlsoLike
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getYouMayAlsoLikeData: (payload) => dispatch(actions.getYouMayAlsoLikeData(payload)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageComponent);