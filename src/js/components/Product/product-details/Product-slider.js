import React, { Component } from 'react';
import RenderSlider from '../slider';
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick";
import { Link, Redirect } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner2';

import logo1 from '../../../../assets/images/you_may_also_like_1.png'
import logo2 from '../../../../assets/images/you_may_also_like_2.png'
import logo3 from '../../../../assets/images/you_may_also_like_3.png'
import logo4 from '../../../../assets/images/you_may_also_like_4.png'


class ProductSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spnner: true
        }
    }

    render() {
        const {store_name, currency, similar_product} = this.props
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
        if(similar_product != undefined){
            this.state.spnner = false
        }
        return (
            <div className="row">
                {this.state.spnner ? <Spinner /> : 
                <div className="col col-12 apex-col-auto rowPadding">
                    <div style={{paddingTop: 15, backgroundColor: '#fff'}} className="t-Region containers  t-Region--noBorder t-Region--hiddenOverflow margin-bottom-lg reduse-width" id="R35743384497996348" aria-live="polite">
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
                        <div className="row you-may-like-title">
                            <h2 />
                            <label>
                                <FormattedMessage id="Product.Detail.youMayAlsoLike" defaultMessage="You may also like" />
                                
                            </label>
                            <h2/>
                        </div>
                        <div className="row">
                            <div className="col col-12 apex-col-auto homeBlock">
                                <div id="R36275003485418909" className="homePage">
                                    <section className="trendingBlock2 data">
                                        <div className="wrap">
                                            <div className="trendingList">
                                                <Slider {...settings3}>
                                                {similar_product && similar_product.map((item, index) => (
                                                <Link to={`/${store_name}/products-details/${item.url_key}`}>
                                                    <div className="alsoLikeCard">
                                                        <img src={item.productImageUrl[0]} />
                                                        <div className="marginTop25">
                                                            <label className="text-color">{item.name}</label>
                                                        </div>
                                                        <div>
                                                            <span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>{currency} &nbsp;{item.price}</span>
                                                            {/* <span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>{currency} &nbsp;{item.price}</span> */}
                                                        </div>
                                                        {/* <div>
                                                            <button className="alsoLikeCardButton">add to basket</button>
                                                        </div> */}
                                                    </div>
                                                    </Link>
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

export default ProductSlider;