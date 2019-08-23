import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
//import "../../../../node_modules/slick-carousel/slick/slick.css"; 
//import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
//import 'slick-carousel/slick/slick-theme.css';
//import 'slick-carousel/slick/slick.css';
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile
} from "react-device-detect";
import { FormattedMessage } from 'react-intl';

import Carousel from 'nuka-carousel';

class RenderSlider extends Component {

  componentDidUpdate() {
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 0);
}

  sliderDetails = (product, index) => {
    return (
      <div key={`sider_product_${index}`} style={{width: '150px'}}>
        <div className="h-hidden-mobile">
          <div className="item">
            <Link to={`/${this.props.store_name}/products-details/${product.url_key}`}>
              <a herf={`/${this.props.store_name}/products-details/${product.url_key}`} className="scrollerProduct product-link">
                  <div className="img-holder ">
                    <img src={product.productImageUrl[0]} style={{backgroundColor: 'red'}}  title={product.name}/>
                    <span className="badge rightbottom green-online" />
                  </div>
              </a>
            </Link>  
            <Link to={`/${this.props.store_name}/products-details/${product.url_key}`}>
              <h2 style={{padding: '0px', margin: '0px'}}>
                <a herf={`/${this.props.store_name}/products-details/${product.url_key}`} className="scrollerProduct product-link">
                  <span className="title" style={{fontSize: '1.4rem', lineHeight: '2rem'}}>{product.name}</span>
                </a>
                <a herf={`/${this.props.store_name}/products-details/${product.url_key}`} className="scrollerProduct product-link">
                  <span className="title" style={{color: 'rgb(245, 153, 186)', fontSize: '1.4rem', lineHeight: '2rem'}}>{product.description}</span>
                </a>
              </h2>
            </Link>  
            <strong id="products-price-11" className="price">
              <span id="products-price-current-10" content="SAR 49" style={{display: 'none'}}>SAR 49</span>
              <span id="products-price-current-10" content="SAR 49" style={{display: 'block'}}>
                <span style={{fontWeight: 'normal'}}>{/*<del>SAR 49</del>*/}&nbsp;
                  <span>
                    <b>{this.props.currency} {product.price}</b>
                  </span>
                </span>
              </span>
            </strong>
            {product.buymore_savemore.status != 0 && (<p className="offer" style={{textAlign: 'center', display: 'block'}}><strong>Buy More,Save More</strong></p>)}
          </div>
      </div>
      <div className="slider  h-hidden-desktop" style={{width: '42vw', marginRight: '10px'}}>
          <div className="item">
            <Link to={`/${this.props.store_name}/products-details/${product.url_key}`}>
              <a herf={`/${this.props.store_name}/products-details/${product.url_key}`}>
                  <div className="img-holder ">
                    <img src={product.productImageUrl[0]} style={{backgroundColor: 'red'}}  title={product.name}/>
                    <span className="badge rightbottom green-online" />
                  </div>
              </a>
            </Link>  
            <Link to={`/${this.props.store_name}/products-details/${product.url_key}`}>
              <h2 style={{padding: '0px', margin: '0px'}}>
                <a herf={`/${this.props.store_name}/products-details/${product.url_key}`} >
                  <span className="title" style={{fontSize: '1.4rem', lineHeight: '2rem'}}>{product.name}</span>
                </a>
                <a herf={`/${this.props.store_name}/products-details/${product.url_key}`}>
                  <span className="title" style={{color: 'rgb(245, 153, 186)', fontSize: '1.4rem', lineHeight: '2rem'}}>{product.description}</span>
                </a>
              </h2>
            </Link>  
            <strong id="products-price-11" className="price">
              <span id="products-price-current-10" content="SAR 49" style={{display: 'none'}}>SAR 49</span>
              <span id="products-price-current-10" content="SAR 49" style={{display: 'block'}}>
                <span style={{fontWeight: 'normal'}}>{/*<del>SAR 49</del>*/}&nbsp;
                  <span>
                    <b>{this.props.currency} {product.price}</b>
                  </span>
                </span>
              </span>
            </strong>
            {product.buymore_savemore.status != 0 && (<p className="offer" style={{textAlign: 'center', display: 'block'}}><strong>Buy More,Save More</strong></p>)}
          </div>
      </div>
    </div>
    )
  }



    render() {
          const { similar_product } = this.props;
          let settings ={}
          if(isMobile){

            settings = {
              speed: 500,
              slidesToShow: 2,
              slidesToScroll: 1,
              variableWidth: true,
              autoplay: true,
              rtl:true,
              autoplaySpeed: 3000,
              cssEase: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)'
            };

          } else {
           settings = {
              speed: 500,
              variableWidth: true,
              slidesToScroll: 6,
              infinite: true,
              autoplay: true,
              rtl:true,
              autoplaySpeed: 3000,
            };
        }
        
        return(
            <div>
              {/*<Slider {...settings}>
                  {similar_product.map((product, index) => this.sliderDetails(product, index)) }  
                 </Slider>*/}
                 
              {similar_product && (
                  <>
                    <div className="h-hidden-mobile">
                      <Carousel
                        slidesToShow={4}
                        wrapAround={true}
                        autoplay={true}
                        disableAnimation={true}
                        cellSpacing={20}
                        width="100%"
                        cellAlign="left"
                      >
                        {similar_product.map((product, index) => {
                          return (
                            <div>
                              <div className="item">
                                <Link to={`/${this.props.store_name}/products-details/${product.url_key}`}>
                                  <a herf={`/${this.props.store_name}/products-details/${product.url_key}`} className="scrollerProduct product-link">
                                      <div className="img-holder ">
                                        <img src={product.productImageUrl[0]}   title={product.name}/>
                                        <span className="badge rightbottom green-online" />
                                      </div>
                                  </a>
                                </Link>  
                                <Link to={`/${this.props.store_name}/products-details/${product.url_key}`}>
                                  <h2 style={{padding: '0px', margin: '0px'}}>
                                    <a herf={`/${this.props.store_name}/products-details/${product.url_key}`} className="scrollerProduct product-link">
                                      <span className="title" style={{fontSize: '1.4rem', lineHeight: '2rem'}}>{product.name}</span>
                                    </a>
                                    <a herf={`/${this.props.store_name}/products-details/${product.url_key}`} className="scrollerProduct product-link">
                                      <span className="title" style={{color: 'rgb(245, 153, 186)', fontSize: '1.4rem', lineHeight: '2rem'}}>{product.description}</span>
                                    </a>
                                  </h2>
                                </Link>  
                                <strong id="products-price-11" className="price">
                                  <span id="products-price-current-10" content="SAR 49" style={{display: 'none'}}>SAR 49</span>
                                  <span id="products-price-current-10" content="SAR 49" style={{display: 'block'}}>
                                    <span style={{fontWeight: 'normal'}}>{/*<del>SAR 49</del>*/}&nbsp;
                                      <span>
                                        <b>{this.props.currency} {product.price}</b>
                                      </span>
                                    </span>
                                  </span>
                                </strong>
                                {product.buymore_savemore.status != 0 && (<p className="offer" style={{textAlign: 'center', display: 'block'}}><strong><FormattedMessage id="BuyMore.Slider.Message" defaultMessage="Buy More, Save More" /> </strong></p>)}
                              </div>
                            </div>  
                          )})
                        }
                      </Carousel>
                    </div>
                    <div className="h-hidden-desktop">
                    <Carousel
                        slidesToShow={2}
                        wrapAround={true}
                        autoplay={true}
                        disableAnimation={true}
                        cellSpacing={10}
                        width="100%"
                        cellAlign="left"
                      >
                        {similar_product.map((product, index) => {
                          return (
                            <div>
                              <div className="item">
                                <Link to={`/${this.props.store_name}/products-details/${product.url_key}`}>
                                  <a herf={`/${this.props.store_name}/products-details/${product.url_key}`} className="scrollerProduct product-link">
                                      <div className="img-holder ">
                                        <img src={product.productImageUrl[0]} title={product.name}/>
                                        <span className="badge rightbottom green-online" />
                                      </div>
                                  </a>
                                </Link>  
                                <Link to={`/${this.props.store_name}/products-details/${product.url_key}`}>
                                  <h2 style={{padding: '0px', margin: '0px'}}>
                                    <a herf={`/${this.props.store_name}/products-details/${product.url_key}`} className="scrollerProduct product-link">
                                      <span className="title" style={{fontSize: '1.4rem', lineHeight: '2rem'}}>{product.name}</span>
                                    </a>
                                    <a herf={`/${this.props.store_name}/products-details/${product.url_key}`} className="scrollerProduct product-link">
                                      <span className="title" style={{color: 'rgb(245, 153, 186)', fontSize: '1.4rem', lineHeight: '2rem'}}>{product.description}</span>
                                    </a>
                                  </h2>
                                </Link>  
                                <strong id="products-price-11" className="price">
                                  <span id="products-price-current-10" content="SAR 49" style={{display: 'none'}}>SAR 49</span>
                                  <span id="products-price-current-10" content="SAR 49" style={{display: 'block'}}>
                                    <span style={{fontWeight: 'normal'}}>{/*<del>SAR 49</del>*/}&nbsp;
                                      <span>
                                        <b>{this.props.currency} {product.price}</b>
                                      </span>
                                    </span>
                                  </span>
                                </strong>
                                {product.buymore_savemore.status != 0 && (<p className="offer" style={{textAlign: 'center', display: 'block'}}><strong><FormattedMessage id="BuyMore.Slider.Message" defaultMessage="Buy More, Save More" /></strong></p>)}
                              </div>
                            </div>  
                          )})
                        }
                      </Carousel>
                    </div>
                  </>      
                )}
            </div>
        );
    }
    
}

export default RenderSlider;