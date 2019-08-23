import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

class Product extends Component {
  constructor(props) {
    super(props);
    //console.log('component called', props);
  }

  render() {
    const { value, store_locale } = this.props;
    return (<li itemScope itemType="http://schema.org/Product" data-item-count={66} data-item-increment={66} data-lazy>
      <div className="overlay">
        <div className="promo">
          <i className="icon-cart basket" />
          <p className="desc"><FormattedMessage id="BUYMORESAVEMORE" defaultMessage="BUY MORE SAVE MORE" /></p>
          <p className="textone">BUY 2 <br /> <FormattedMessage id="For.Text" defaultMessage="For" /> <span>SAR 139</span></p>
          <p className="texttwo">BUY 3 <br /> <FormattedMessage id="For.Text" defaultMessage="For" /> <span>SAR 149</span></p>
          <p className="link" itemProp="offers" itemScope itemType="http://schema.org/Offer"><strong itemProp="description"><FormattedMessage id="BUYMORESAVEMORE" defaultMessage="BUY MORE SAVE MORE" /></strong></p>
        </div><a href="javascript:void(0)" className="closebtnOverlay" onClick={console.log('close nav')}>×</a></div>
      <div className="product-card-wrapper" role="link" tabIndex={0}>
        <button type="button" className="naylove" onClick={this.props.clicked}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 50 50" style={{ enableBackground: 'new 0 0 50 50' }} xmlSpace="preserve" width="32px" height="32px" className="naylove-icon active" ><g transform="matrix(0.94148 0 0 0.94148 1.46299 1.46299)"><path d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543  c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503  c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z" className="naylove" /></g> </svg>
        </button>
        <a id="MBCD_212400241_0" itemProp="url" className="ssf3" tabIndex={-1} onClick={this.props.productDetail} style={{cursor: 'pointer'}}>
          {/*<Link to={'/' + store_locale + '/products-details/' + value.url_key}>*/}
            <span>
              <em />
              <img src={this.props.value.image[0]} alt="Racerback Long Line Sport Bra" className="ftr" role="presentation" />
            </span>
            <aside className>
              <div itemProp="name">
                <h3 className="fab-body">{this.props.value.type}</h3>
                <h4 className="fab-body">{this.props.value.name}</h4>
              </div>
              <p className="price fab-strong">SAR {this.props.value.price}</p>
              <p className="offer" itemProp="offers" itemScope itemType="http://schema.org/Offer"><strong itemProp="description"><FormattedMessage id="BUYMORESAVEMORE" defaultMessage="BUY MORE SAVE MORE" /></strong></p>
            </aside>
          {/*</Link>*/}
        </a>  
      </div>
    </li>);
  }

}

export default withRouter(Product);