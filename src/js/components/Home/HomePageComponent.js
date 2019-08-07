import React, { Component, useState } from 'react';
import flower from '../../../assets/images/Home/homepage-flower.png';
import ZeroItem from './Instagram';
import InstagramItems from './Instagram';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import { Parallax, Background } from 'react-parallax';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import logo1 from '../../../assets/images/you_may_also_like_1.png'
import logo2 from '../../../assets/images/you_may_also_like_2.png'
import logo3 from '../../../assets/images/you_may_also_like_3.png'
import logo4 from '../../../assets/images/you_may_also_like_4.png'
import home from '../../../assets/images/social/Hero.png';
import { Link, Redirect } from 'react-router-dom';

class HomePageComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //console.log('this.props',this.props);
        // const instagramFeed = (this.props.home_page_data.instagram.length <= 0) ? <ZeroItem /> : <InstagramItems instagramItems={this.props.home_page_data.instagram.image_data} />
        let InstaTitle1 = '', InstaTitle2 = ''
        // if (this.props.home_page_data.instagram.title) {
        //     InstaTitle1 = this.props.home_page_data.instagram.title.split('@')[0] + '@'
        //     InstaTitle2 = this.props.home_page_data.instagram.title.split('@')[1]
        // }

        const settings = {
            dots: false,
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
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

        const settings3 = {
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            infinite: true,
            slidesToShow: 3,
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
            <>
<div className="t-Body">
    <div className="t-Body-main" style={{ marginTop: '0px !important' }}>
        <div className="t-Body-title" id="t_Body_title" style={{ 'top': '294px' }}></div>
        <div className="t-Body-content" id="t_Body_content">
            {/* <div id="t_Body_content_offset" style={{ 'height': '1px' }}></div> <span id="APEX_SUCCESS_MESSAGE" data-template-id="33770911730796245_S" className="apex-page-success u-hidden"></span><span id="APEX_ERROR_MESSAGE" data-template-id="33770911730796245_E" className="apex-page-error u-hidden"></span> */}
            <div className="t-Body-contentInner hideInMobile">
                <div className="contener">
                    <div>
                        <Carousel showStatus={false}
                        showThumbs={false}
                        infiniteLoop={true}
                        autoPlay={true}
                        interval={5000}>
                            <div>
                                <img src={home} />
                            </div>
                            <div>
                                <img src={'https://s3.invisionapp-cdn.com/storage.invisionapp.com/screens/files/366754627.png?x-amz-meta-iv=5&response-cache-control=max-age%3D2419200&x-amz-meta-ck=9ab058c4fbddc2e4fa75442b99e6b787&AWSAccessKeyId=AKIAJFUMDU3L6GTLUDYA&Expires=1567296000&Signature=6EFT8zmUZn9Z3doPrsIWxPo0u5c%3D'} />
                            </div>
                            <div>
                                <img src={home} />
                            </div>
                        </Carousel>
                    </div>

                    {/* <div className="row">
                        <div className="col col-12 apex-col-auto">
                            <div id="pref_popup_parent"></div>
                        </div>
                    </div> */}
                    {/* <div className="row">
                        <div className="col col-12 apex-col-auto homeBlock">
                            <div id="R33787481922169811" className="homePage">
                                <input type="hidden" id="P1_PAGE_TITLE" name="P1_PAGE_TITLE" value="Online Shopping in Saudi for Lingerie, Bras, Panties &amp; Nightwear at Nayomi" />
                                <input type="hidden" id="P1_PAGE_DESC" name="P1_PAGE_DESC" value="Shop lingerie online at best prices in Saudi on Nayomi. Choose from wide range of bras, panties, nightwear, shapewear &amp; loungewear for women. ✓ Free Delivery* ✓ Click &amp; Collect ✓ Cash on Delivery" />
                                <input type="hidden" id="P1_PAGE_KEYWORDS" name="P1_PAGE_KEYWORDS" value="online shopping,lingerie,bra,sexy lingerie,online shop,womens underwear,ladies underwear,womens lingerie" />
                                <section className="elegance">
                                    <div className="sectionBlocks observer animate">
                                        <figure>
                                            <img className="block1_banner1 hideInMobile" src={this.props.home_page_data.Block1.BLOCK1_BANNER1} />
                                        </figure>
                                        <div className="contentBox">
                                            <h2 data-center="transform:translateY(0%);" data-top-bottom="transform:translateY(-20%);" className="skrollable skrollable-between" style={{ transform: 'translateY(-7.44898%)' }}><span /><span /></h2>
                                            <div data-center="transform:translateY(0%);" data-top-bottom="transform:translateY(-80%);" className="skrollable skrollable-between" style={{ transform: 'translateY(-18.6802%)' }}> <a href={this.props.home_page_data.Block1.BLOCK1_URL1} className="arrowLink">
                                            <FormattedMessage id="Shop.Collection.Msg" defaultMessage="Shop Collection" />
                                            </a>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="row">
                        <div className="col col-12 apex-col-auto homeBlock">
                            <div id="R33787503821169812" className="homePage">
                                <section className="romanceGift">
                                    <div className="sectionBlocks romance observer animate skrollable skrollable-before">
                                        <div className="Block1Section1">
                                            <Parallax strength={380}>
                                                <div className="Section2Height">
                                                    <div className="contentBox skrollable skrollable-before">
                                                        <h2>
                                                            {this.props.home_page_data.Block2.BLOCK2_TITLE1.split(" ").length >= 2 &&(
                                                                <>
                                                                    <span>{this.props.home_page_data.Block2.BLOCK2_TITLE1.split(" ")[0] == ""  ? this.props.home_page_data.Block2.BLOCK2_TITLE1.split(" ")[1] : this.props.home_page_data.Block2.BLOCK2_TITLE1.split(" ")[0]}</span>
                                                                    <span>{this.props.home_page_data.Block2.BLOCK2_TITLE1.split(" ")[0] == ""  ? this.props.home_page_data.Block2.BLOCK2_TITLE1.split(" ")[2] : this.props.home_page_data.Block2.BLOCK2_TITLE1.split(" ")[1]}</span>
                                                                </>    
                                                            )}
                                                            {this.props.home_page_data.Block2.BLOCK2_TITLE1.split(" ").length < 2 && (
                                                              <span>{this.props.home_page_data.Block2.BLOCK2_TITLE1}</span>  
                                                            )}
                                                        </h2>
                                                        <a href={this.props.home_page_data.Block2.BLOCK2_URL1} className="arrowLink">
                                                            <FormattedMessage id="Shop.Collection.Msg" defaultMessage="Shop Collection" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <Background>
                                                    <img className="block2_banner1 hideInMobile" src={this.props.home_page_data.Block2.BLOCK2_BANNER1}/>
                                                    
                                                </Background>
                                            </Parallax>
                                        </div>
                                    </div>
                                    <div className="sectionBlocks gifting observer animate skrollable skrollable-before">
                                        <div className="Block1Section2">
                                            <Parallax strength={380}>
                                                <div className="Section2Height">
                                                    <div className="contentBox skrollable skrollable-before">
                                                        <h2>
                                                            {this.props.home_page_data.Block2.BLOCK2_TITLE2.split(" ").length >= 2 &&(
                                                                <>
                                                                    <span>{this.props.home_page_data.Block2.BLOCK2_TITLE2.split(" ")[0] == ""  ? this.props.home_page_data.Block2.BLOCK2_TITLE2.split(" ")[1] : this.props.home_page_data.Block2.BLOCK2_TITLE2.split(" ")[0]}</span>
                                                                    <span>{this.props.home_page_data.Block2.BLOCK2_TITLE2.split(" ")[0] == ""  ? this.props.home_page_data.Block2.BLOCK2_TITLE2.split(" ")[2] : this.props.home_page_data.Block2.BLOCK2_TITLE2.split(" ")[1]}</span>
                                                                </>    
                                                            )}
                                                            {this.props.home_page_data.Block2.BLOCK2_TITLE2.split(" ").length < 2 && (
                                                              <span>{this.props.home_page_data.Block2.BLOCK2_TITLE2}</span>  
                                                            )}
                                                        </h2>
                                                        <a href={this.props.home_page_data.Block2.BLOCK2_URL2} className="arrowLink">
                                                            <FormattedMessage id="Shop.Collection.Msg" defaultMessage="Shop Collection" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <Background>
                                                    <img className="block2_banner2 hideInMobile" src={this.props.home_page_data.Block2.BLOCK2_BANNER2} />
                                                    
                                                </Background>
                                            </Parallax>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="row">
                        <div className="col col-12 apex-col-auto homeBlock">
                            <div id="R33787634367169813" className="homePage">
                                <section className="braPanty">
                                    <div className="wrap">
                                        <div className="sectionBlocks bras observer animate">
                                            <div className="Block2Section1">
                                                <Parallax strength={380}>
                                                    <div className="SectionHeightBra">
                                                        <div className="textBox skrollable skrollable-before">
                                                            <h6>{this.props.home_page_data.Block3.BLOCK3_TITLE1}</h6>
                                                            <a href={this.props.home_page_data.Block3.BLOCK3_URL1} className="arrowLink">
                                                                <FormattedMessage id="Shop.Collection.Msg" defaultMessage="Shop Collection" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <Background>
                                                        <img className="block3_banner1 hideInMobile" src={this.props.home_page_data.Block3.BLOCK3_BANNER1} />
                                                        
                                                        <img className="asset1 Flower" src={this.props.home_page_data.Block3.BLOCK3_FLOWER_BANNER} />
                                                    </Background>
                                                </Parallax>
                                            </div>
                                        </div>
                                        <div className="sectionBlocks panties observer animate">
                                            <div className="Block2Section2">
                                                <Parallax strength={380}>
                                                    <div className="SectionHeight">
                                                        <div className="textBox skrollable skrollable-before">
                                                            <h6>{this.props.home_page_data.Block3.BLOCK3_TITLE2}</h6>
                                                            <a href={this.props.home_page_data.Block3.BLOCK3_URL2} className="arrowLink">
                                                                <FormattedMessage id="Shop.Collection.Msg" defaultMessage="Shop Collection" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <Background>
                                                        <img className="asset2 hideInMobile" src={this.props.home_page_data.Block3.BLOCK3_BANNER2} alt="" />
                                                        
                                                    </Background>
                                                </Parallax>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="row">
                        <div className="col col-12 apex-col-auto homeBlock">
                            <div id="R33787769572169814" className="homePage">
                                <section className="adore">
                                    <div className="sectionBlocks animate">
                                        <div className="Block3Section">
                                            <Parallax strength={380}>
                                                <div className="SectionLastBlockHeight">
                                                    <div className="contentBox observer adoreBlock skrollable skrollable-before" data-bottom-top="transform:translateY(15%) translateX(-50%);" data-top-bottom="transform:translateY(-15%) translateX(-50%);" style={{ 'transform': 'translateY(15%) translateX(-50%)' }}>
                                                        <h6>
                                                            {this.props.home_page_data.Block4.BLOCK4_TITLE.split(" ").length >= 2 &&(
                                                                <>
                                                                    <span>{this.props.home_page_data.Block4.BLOCK4_TITLE.split(" ")[0] == ""  ? this.props.home_page_data.Block4.BLOCK4_TITLE.split(" ")[1] : this.props.home_page_data.Block4.BLOCK4_TITLE.split(" ")[0]}</span>
                                                                    <span>{this.props.home_page_data.Block4.BLOCK4_TITLE.split(" ")[0] == ""  ? this.props.home_page_data.Block4.BLOCK4_TITLE.split(" ")[2] : this.props.home_page_data.Block4.BLOCK4_TITLE.split(" ")[1]}</span>
                                                                </>    
                                                            )}
                                                            {this.props.home_page_data.Block4.BLOCK4_TITLE.split(" ").length < 2 && (
                                                              <span>{this.props.home_page_data.Block4.BLOCK4_TITLE}</span>  
                                                            )}
                                                        </h6>
                                                        <a href={this.props.home_page_data.Block4.BLOCK4_URL} className="arrowLink">
                                                            <FormattedMessage id="Shop.Collection.Msg" defaultMessage="Shop Collection" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <Background>
                                                    <img className="block4_banner1 hideInMobile" src={this.props.home_page_data.Block4.BLOCK4_BANNER1} />
                                                   
                                                    <img className="imgAsset" src={this.props.home_page_data.Block4.BLOCK4_BANNER2} />
                                                </Background>
                                            </Parallax>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col col-12 apex-col-auto homeBlock">
                            <div id="R36275003485418909" className="homePage">
                                <section className="trendingBlock">
                                    <div className="wrap">
                                        <div className="trendingList">
                                            <Slider {...settings}>
                                                <div>
                                                
                                                    <Link to={`/saudi-en/products-details/blue-bike`}>
                                                        {/* <figure> */}
                                                            <a href={''} target="_blank">
                                                                <img src={logo1} />
                                                            </a>
                                                            <div className="cardDetail">
                                                                    <span className="cardDetailText">500</span>
                                                            </div>
                                                        {/* </figure> */}
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link to={`/saudi-en/products-details/blue-bike`}>
                                                        {/* <figure> */}
                                                            <a href={''} target="_blank">
                                                                <img src={logo2} />
                                                            </a>
                                                            <div className="cardDetail">
                                                                    <span className="cardDetailText">500</span>
                                                            </div>
                                                        {/* </figure> */}
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link to={`/saudi-en/products-details/blue-bike`}>
                                                        {/* <figure> */}
                                                            <a href={''} target="_blank">
                                                                <img src={logo3} />
                                                            </a>
                                                            <div className="cardDetail">
                                                                    <span className="cardDetailText">500</span>
                                                            </div>
                                                        {/* </figure> */}
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link to={`/saudi-en/products-details/blue-bike`}>
                                                        {/* <figure> */}
                                                            <a href={''} target="_blank">
                                                                <img src={logo4} />
                                                            </a>
                                                            <div className="cardDetail">
                                                                    <span className="cardDetailText">500</span>
                                                            </div>
                                                        {/* </figure> */}
                                                    </Link>
                                                </div></Slider>
                                        </div>
                                    </div>
                                </section>
                                </div>
                        </div>
                    </div>

                    <div className="likeText">
                        <label>you may also like</label>
                    </div>
                    <div className="row data">
                        <div className="col col-12 apex-col-auto homeBlock">
                            <div id="R36275003485418909" className="homePage">
                                <section className="trendingBlock2">
                                    <div className="wrap">
                                        <div className="trendingList">
                                            <Slider {...settings3}>
                                                
                                                        <div className="alsoLikeCard">
                                                        <img src={logo1} />
                                                            <div style={{marginTop:10}}>
                                                                <label className="text-color">Twist and Turn Activity House</label>
                                                            </div>
                                                            <div>
                                                                <span style={{fontSize:14, color:"#0D943F", fontWeight: "bold"}}>£12.00</span><span style={{color:"gray",textDecorationLine: 'line-through', fontSize:14, marginLeft: 10}}>£14.50</span>
                                                            </div>
                                                            <div>
                                                                <button className="alsoLikeCardButton">add to basket</button>
                                                            </div>
                                                        </div>

                                                        <div className="alsoLikeCard">
                                                        <img src={logo2} />
                                                            <div style={{marginTop:10}}>
                                                                <label className="text-color">Twist and Turn Activity House</label>
                                                            </div>
                                                            <div>
                                                                <span style={{fontSize:14, color:"#0D943F", fontWeight: "bold"}}>£12.00</span><span style={{color:"gray",textDecorationLine: 'line-through', fontSize:14, marginLeft: 10}}>£14.50</span>
                                                            </div>
                                                            <div>
                                                                <button className="alsoLikeCardButton">add to basket</button>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="alsoLikeCard">
                                                        <img src={logo3} />
                                                            <div style={{marginTop:10}}>
                                                                <label className="text-color">Twist and Turn Activity House</label>
                                                            </div>
                                                            <div>
                                                                <span style={{fontSize:14, color:"#0D943F", fontWeight: "bold"}}>£12.00</span><span style={{color:"gray",textDecorationLine: 'line-through', fontSize:14, marginLeft: 10}}>£14.50</span>
                                                            </div>
                                                            <div>
                                                                <button className="alsoLikeCardButton">add to basket</button>
                                                            </div>
                                                        </div>

                                                        <div className="alsoLikeCard">
                                                        <img src={logo4} />
                                                            <div style={{marginTop:10}}>
                                                                <label className="text-color">Twist and Turn Activity House</label>
                                                            </div>
                                                            <div>
                                                                <span style={{fontSize:14, color:"#0D943F", fontWeight: "bold"}}>£12.00</span><span style={{color:"gray",textDecorationLine: 'line-through', fontSize:14, marginLeft: 10}}>£14.50</span>
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
            {/* <div className="t-Body-contentInner hideInDesktop">
                <div className="container">
                    <div className="row">
                        <div className="col col-12 apex-col-auto">
                            <div id="pref_popup_parent"></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-12 apex-col-auto">
                            <div id="R33787481922169811" className="homePage">
                                <section className="elegance">
                                    <div className="sectionBlocks observer animate">
                                        <figure>
                                            <img className="block1_mobileBanner1" src={this.props.home_page_data.Block1.BLOCK1_MOBILE_BANNER1} />
                                        </figure>
                                        <div className="contentBox">
                                            <h2 data-center="transform:translateY(0%);" data-top-bottom="transform:translateY(-20%);" className="skrollable skrollable-between" style={{ transform: 'translateY(-7.44898%)' }}><span /><span /></h2>
                                            <div data-center="transform:translateY(0%);" data-top-bottom="transform:translateY(-80%);" className="skrollable skrollable-between" style={{ transform: 'translateY(-18.6802%)' }}> 
                                            <a href={this.props.home_page_data.Block1.BLOCK1_URL1} className="arrowLink">
                                            <FormattedMessage id="Shop.Collection.Msg" defaultMessage="Shop Collection" />
                                            </a>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-12 apex-col-auto">
                            <div id="R33787503821169812" className="homePage">
                                <section className="romanceGift">
                                    <div className="sectionBlocks romance observer animate skrollable skrollable-before" data-bottom-top="transform:translateY(8%);" data-top-bottom="transform:translateY(-8%);" style={{ 'transform': 'translateY(8%)' }}>
                                        <figure>
                                            <img className="block1_mobileBanner1 hideInDesktop" src={this.props.home_page_data.Block2.BLOCK2_MOBILE_BANNER1} />
                                        </figure>
                                        <div className="contentBox skrollable skrollable-before" data-bottom-top="transform:translateY(15%);" data-top-bottom="transform:translateY(-15%);" style={{ 'transform': 'translate(22%,-50%)' }}>
                                            <h2>
                                            {this.props.home_page_data.Block2.BLOCK2_TITLE1.split(" ").length >= 2 &&(
                                            <>
                                            <span>{this.props.home_page_data.Block2.BLOCK2_TITLE1.split(" ")[0] == ""  ? this.props.home_page_data.Block2.BLOCK2_TITLE1.split(" ")[1] : this.props.home_page_data.Block2.BLOCK2_TITLE1.split(" ")[0]}</span>
                                            <span>{this.props.home_page_data.Block2.BLOCK2_TITLE1.split(" ")[0] == ""  ? this.props.home_page_data.Block2.BLOCK2_TITLE1.split(" ")[2] : this.props.home_page_data.Block2.BLOCK2_TITLE1.split(" ")[1]}</span>
                                             </>    
                                            )}
                                            {this.props.home_page_data.Block2.BLOCK2_TITLE1.split(" ").length < 2 && (
                                            <span>{this.props.home_page_data.Block2.BLOCK2_TITLE1}</span>  
                                             )}
                                            </h2>
                                            <a href={this.props.home_page_data.Block2.BLOCK2_URL1} className="arrowLink">
                                            <FormattedMessage id="Shop.Collection.Msg" defaultMessage="Shop Collection" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="sectionBlocks gifting observer animate skrollable skrollable-before" data-bottom-top="transform:translateY(15%);" data-top-bottom="transform:translateY(-15%);" style={{ 'marginTop': '15%' }}>
                                        <figure>
                                            <img className="block2_mobileBanner1 hideInDesktop" src={this.props.home_page_data.Block2.BLOCK2_MOBILE_BANNER2} />
                                        </figure>
                                        <div className="contentBox skrollable skrollable-before" data-bottom-top="transform:translateY(15%);" data-top-bottom="transform:translateY(-15%);" style={{ 'transform': 'translate(60%,-40%)' }}>
                                            <h2>                                                            {this.props.home_page_data.Block2.BLOCK2_TITLE2.split(" ").length >= 2 &&(
                                                <>
                                                 <span>{this.props.home_page_data.Block2.BLOCK2_TITLE2.split(" ")[0] == ""  ? this.props.home_page_data.Block2.BLOCK2_TITLE2.split(" ")[1] : this.props.home_page_data.Block2.BLOCK2_TITLE2.split(" ")[0]}</span>
                                                 <span>{this.props.home_page_data.Block2.BLOCK2_TITLE2.split(" ")[0] == ""  ? this.props.home_page_data.Block2.BLOCK2_TITLE2.split(" ")[2] : this.props.home_page_data.Block2.BLOCK2_TITLE2.split(" ")[1]}</span>
                                                </>    
                                                 )}
                                                  {this.props.home_page_data.Block2.BLOCK2_TITLE2.split(" ").length < 2 && (
                                                   <span>{this.props.home_page_data.Block2.BLOCK2_TITLE2}</span>  
                                                )}
                                            </h2>
                                            <a href={this.props.home_page_data.Block2.BLOCK2_URL2} className="arrowLink"><FormattedMessage id="Shop.Collection.Msg" defaultMessage="Shop Collection" /></a>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-12 apex-col-auto">
                            <div id="R33787634367169813" className="homePage">
                                <section className="braPanty">
                                    <div className="wrap">
                                        <div className="sectionBlocks bras observer animate skrollable skrollable-before" data-bottom-top="transform:translateY(10%);" data-top-bottom="transform:translateY(-10%);" style={{ 'transform': 'translateY(10%)' }}>
                                            <figure>
                                                <img className="block3_mobileBanner1 hideInDesktop" src={this.props.home_page_data.Block3.BLOCK3_MOBILE_BANNER1} />
                                                <img className="asset1" src={flower} alt="" />
                                            </figure>
                                            <div className="textBox skrollable skrollable-before" data-bottom-top="transform:translateY(40%);" data-top-bottom="transform:translateY(-40%);" style={{ 'transform': 'translateY(25%)' }}>
                                                <h6>{this.props.home_page_data.Block3.BLOCK3_TITLE1}</h6>
                                                <a href={this.props.home_page_data.Block3.BLOCK3_URL1} className="arrowLink"><FormattedMessage id="Shop.Collection.Msg" defaultMessage="Shop Collection" /></a>
                                            </div>
                                        </div>
                                        <div className="sectionBlocks panties observer animate skrollable skrollable-before" data-bottom-top="transform:translateY(16%);" data-top-bottom="transform:translateY(-16%);" style={{ 'marginTop': '30%' }}>
                                            <figure>
                                                <img className="asset2 hideInDesktop" src={this.props.home_page_data.Block3.BLOCK3_MOBILE_BANNER2} alt="" />
                                            </figure>
                                            <div className="textBox skrollable skrollable-before" data-bottom-top="transform:translateY(-20%);" data-top-bottom="transform:translateY(20%);" style={{ 'transform': 'translateY(26%)' }}>
                                                <h6>{this.props.home_page_data.Block3.BLOCK3_TITLE2}</h6>
                                                <a href={this.props.home_page_data.Block3.BLOCK3_URL2} className="arrowLink"><FormattedMessage id="Shop.Collection.Msg" defaultMessage="Shop Collection" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-12 apex-col-auto">
                            <div id="R33787769572169814" className="homePage">
                                <section className="adore">
                                    <div className="sectionBlocks animate" style={{ 'transform': 'translateY(0%)' }}>
                                        <figure>
                                            <img className="block4_mobileBanner1 hideInDesktop" src={this.props.home_page_data.Block4.BLOCK4_MOBILE_BANNER1} />
                                            <img className="imgAsset" src={this.props.home_page_data.Block4.BLOCK4_BANNER2} />
                                        </figure>
                                        <div className="contentBox observer adoreBlock skrollable skrollable-before" data-bottom-top="transform:translateY(15%) translateX(-50%);" data-top-bottom="transform:translateY(-15%) translateX(-50%);" style={{ 'transform': 'translateY(15%) translateX(-50%)' }}>
                                            <h6>
                                                 {this.props.home_page_data.Block4.BLOCK4_TITLE.split(" ").length >= 2 &&(
                                                    <>
                                                    <span>{this.props.home_page_data.Block4.BLOCK4_TITLE.split(" ")[0] == ""  ? this.props.home_page_data.Block4.BLOCK4_TITLE.split(" ")[1] : this.props.home_page_data.Block4.BLOCK4_TITLE.split(" ")[0]}</span>
                                                    <span>{this.props.home_page_data.Block4.BLOCK4_TITLE.split(" ")[0] == ""  ? this.props.home_page_data.Block4.BLOCK4_TITLE.split(" ")[2] : this.props.home_page_data.Block4.BLOCK4_TITLE.split(" ")[1]}</span>
                                                    </>    
                                                    )}
                                                    {this.props.home_page_data.Block4.BLOCK4_TITLE.split(" ").length < 2 && (
                                                    <span>{this.props.home_page_data.Block4.BLOCK4_TITLE}</span>  
                                                    )}
                                            </h6>
                                            <a href={this.props.home_page_data.Block4.BLOCK4_URL} className="arrowLink"><FormattedMessage id="Shop.Collection.Msg" defaultMessage="Shop Collection" /></a>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-12 apex-col-auto homeBlock">
                            <div id="R36275003485418909" className="homePage">
                                <section className="trendingBlock">
                                    <div className="wrap">
                                        <h6>
                                        <a href="https://www.instagram.com/nayomimena/" target="_blank"><i
                                        className="icon-instagram"></i><span>{InstaTitle1}</span><span className="PinkText">{InstaTitle2}</span></a></h6>
                                        <div className="trendingList">
                                            <Slider {...settings}>{ this.props.home_page_data.instagram.image_data && this.props.home_page_data.instagram.image_data.map((item, index) => (
                                                <div>
                                                    <figure key={index}>
                                                        <a href={item.a_link} target="_blank">
                                                            <img src={item.image} />
                                                        </a>
                                                    </figure>
                                                </div>)) }</Slider>
                                        </div>
                                    </div>
                                </section></div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    </div>
</div>
            </>
        );
    }
}
export default HomePageComponent;