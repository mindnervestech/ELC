import React, { Component } from 'react';
import RenderSlider from '../slider';
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick";

import logo1 from '../../../../assets/images/you_may_also_like_1.png'
import logo2 from '../../../../assets/images/you_may_also_like_2.png'
import logo3 from '../../../../assets/images/you_may_also_like_3.png'
import logo4 from '../../../../assets/images/you_may_also_like_4.png'


class ProductSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const settings3 = {
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
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
                        slidesToShow: 3,
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
        return (
            <div className="row">
                <div className="col col-12 apex-col-auto">
                    <div className="t-Region containers  t-Region--noBorder t-Region--hiddenOverflow margin-bottom-lg" id="R35743384497996348" aria-live="polite">
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
                                You may also like
                            </label>
                            <h2/>
                        </div>
                        <div className="row data">
                            <div className="col col-12 apex-col-auto homeBlock">
                                <div id="R36275003485418909" className="homePage">
                                    <section className="trendingBlock2" style={{padding: '0px 90px'}}>
                                        <div className="wrap">
                                            <div className="trendingList">
                                                <Slider {...settings3}>

                                                    <div className="alsoLikeCard">
                                                        <img src={logo1} />
                                                        <div style={{ marginTop: 25 }}>
                                                            <span className="text-color">Twist and Turn Activity House</span>
                                                        </div>
                                                        <div style={{ marginTop: 10 }}>
                                                            <span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>£12.00</span><span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>£14.50</span>
                                                        </div>
                                                        <div>
                                                            <button className="alsoLikeCardButton">add to basket</button>
                                                        </div>
                                                    </div>

                                                    <div className="alsoLikeCard">
                                                        <img src={logo2} />
                                                        <div style={{ marginTop: 25 }}>
                                                            <span className="text-color">Twist and Turn Activity House</span>
                                                        </div>
                                                        <div style={{ marginTop: 10 }}>
                                                            <span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>£12.00</span><span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>£14.50</span>
                                                        </div>
                                                        <div>
                                                            <button className="alsoLikeCardButton">add to basket</button>
                                                        </div>
                                                    </div>

                                                    <div className="alsoLikeCard">
                                                        <img src={logo3} />
                                                        <div style={{ marginTop: 25 }}>
                                                            <span className="text-color">Twist and Turn Activity House</span>
                                                        </div>
                                                        <div style={{ marginTop: 10 }}>
                                                            <span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>£12.00</span><span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>£14.50</span>
                                                        </div>
                                                        <div>
                                                            <button className="alsoLikeCardButton">add to basket</button>
                                                        </div>
                                                    </div>

                                                    <div className="alsoLikeCard">
                                                        <img src={logo4} />
                                                        <div style={{ marginTop: 25 }}>
                                                            <span className="text-color">Twist and Turn Activity House</span>
                                                        </div>
                                                        <div style={{ marginTop: 10 }}>
                                                            <span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>£12.00</span><span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>£14.50</span>
                                                        </div>
                                                        <div>
                                                            <button className="alsoLikeCardButton">add to basket</button>
                                                        </div>
                                                    </div>

                                                    <div className="alsoLikeCard">
                                                        <img src={logo2} />
                                                        <div style={{ marginTop: 25 }}>
                                                            <span className="text-color">Twist and Turn Activity House</span>
                                                        </div>
                                                        <div style={{ marginTop: 10 }}>
                                                            <span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>£12.00</span><span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>£14.50</span>
                                                        </div>
                                                        <div>
                                                            <button className="alsoLikeCardButton">add to basket</button>
                                                        </div>
                                                    </div>
                                                </Slider>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductSlider;