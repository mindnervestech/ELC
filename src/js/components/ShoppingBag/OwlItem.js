import React, { Component } from 'react';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import Carousel from 'nuka-carousel';

class OwlItem extends Component {

    componentDidUpdate() {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 0);
    }

   render() {

      const settings = {
         speed: 500,
         slidesToShow: 2,
         slidesToScroll: 2,
         variableWidth: true,
         autoplay: true,
         autoplaySpeed: 3000,

      };

      const product_list = this.props.product;
      //console.log('product_list : ', product_list);

      let listOfProduct = null;
      if (product_list.length > 0) {
         listOfProduct = product_list.map((item, index) => {
            let buyMore = null
            const buyMoreData = item.buymore_savemore;
            if (buyMoreData.status === 1) {
               buyMore = <p className="offer" style={{ textAlign: 'center', display: 'block' }}>
                  <strong itemProp="description"><FormattedMessage id="BuyMoreBtn.Message" defaultMessage="Buy More Save More" /></strong>
               </p>

            }

            //console.log('buyMoreData : ', buyMoreData);
            return <div  key={index}>
                  <div className="item">
                     <a href={`products-details/${item.url_key}`} className="scrollerProduct product-link">
                        <div className="img-holder ">
                        <img src={item.productImageUrl[0]} data-mask=".mask" alt="Glamour Bikini" title="Glamour Bikini" /><span className="badge leftbottom green-online" style={{ backgroundColor: 'red' }} /><span className="badge rightbottom green-online" /></div>
                     </a>
                     <h2 style={{ padding: '0px', margin: '0px' }}><a href={`products-details/${item.url_key}`} className="scrollerProduct product-link">
                     <span className="title" style={{ fontSize: '1.4rem', lineHeight: '2rem' }}>{item.name}</span>
                     </a><a href={`products-details/${item.url_key}`} className="scrollerProduct product-link">
                     <span className="title" style={{ color: 'rgb(245, 153, 186)', fontSize: '1.4rem', lineHeight: '2rem' }}>{item.description}</span></a></h2><strong id="products-price-11" className="price"><span id="products-price-current-10" content="SAR 49" style={{ display: 'none' }}>{item.currency}  {item.price}</span><span id="products-price-current-10" content="SAR 49" style={{ display: 'block' }}><span style={{ fontWeight: 'normal' }}><del>{item.currency} {item.price}</del>&nbsp;<span><b>{item.currency} {item.price}</b></span></span></span></strong>{buyMore}
                  </div>
            </div>
         })
      }

      return (
         <div style={{width: "100%"}}>

            {/*<Slider {...settings}>

               {listOfProduct}
               {listOfProduct}

            </Slider>*/}
            {listOfProduct && (<Carousel
                slidesToShow={2}
                wrapAround={true}
                autoplay={true}
                disableAnimation={true}
                cellSpacing={20}
                cellAlign="left"
            >
                {listOfProduct}
                {listOfProduct}
            </Carousel>)}    
         </div>
      );
   }

}

export default OwlItem;