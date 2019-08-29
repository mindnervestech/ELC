import React, { Component } from 'react';
import './WishList.css';
import Product from './Product';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Spinner from '../Spinner/Spinner2';
import { FormattedMessage } from 'react-intl';
import { Container, Row, Col, Button } from 'reactstrap';

import percentage from '../../../assets/images/product-details/percentage.png';
import save from '../../../assets/images/product-details/save.png';
import logo1 from '../../../assets/images/you_may_also_like_1.png'
import StarRatings from 'react-star-ratings';

class WishList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      goToProduct: false,
      url_key: null
    }
  }

  componentDidMount() {
    this.props.onGetWishListItem({ customerid: this.props.user_details.customer_id, store_id:2})
  }

  wishlistToggle = (index, wishlist_id) => {
    this.props.onRemoveProductFromWishList({ index: index, wishlist_id: wishlist_id })
  }



  logOut = () => {
    this.props.onLogoutUser();
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


  render() {

    const store_locale = this.props.globals.store_locale;

    // if (this.state.goToProduct) {
    //   return <Redirect to={{
    //     pathname: `/${store_locale}/products-details/${this.state.url_key}`,
    //   }} />
    // }

    if (!(this.props.isUserLoggedIn)) {
      return <Redirect to={{
        pathname: `/${store_locale}/login`,
      }} />;
    }

    const productList = this.props.products.map((item, index) => {
      return (<Product
        value={item}
        key={index}
        store_locale={store_locale}
        productDetail={() => this.gotoProductDetail(item)}
        clicked={() => this.wishlistToggle(index, item.wishlist_id)} />)
    })

    return (
      <div className="t-Body-contentInner homePage">
        <div className="wishlist">
          {/* <div>
            <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
              <span className="titleHover">Home</span>
            </Link>
            <span>  > Wishlist</span>
          </div>
          <div className="wishlist-title">
            <label>
              My WishList
            </label>
          </div> */}
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
                        <span className="FormattedMessage"><FormattedMessage id="profile.Wishlist.Title" defaultMessage="Wishlist" /></span></Link></li></ul></div>
                    <div className="t-ButtonRegion-buttons" />
                  </div>
                  <div className="t-ButtonRegion-col t-ButtonRegion-col--right"><div className="t-ButtonRegion-buttons"><button onClick={this.logOut} className="t-Button t-Button--hot t-Button--gapTop" type="button" id="B28512592134220867"><span className="t-Button-label"><FormattedMessage id="header.logoutName" defaultMessage="Logout" /></span></button></div></div>
                </div>
              </div>
            </div>
          </div>
          <ul className="products wishlist-products">
            <li>
              <div className="alsoLikeCard">
                <span className="percentage-text">30</span>
                <span className="save-text" style={{ display: 'none' }}>5</span>
                <img src={save} className="save" style={{ display: 'none' }}/>
                <img src={logo1} className="cardImage" style={{ height: 'auto' }} />
                <img src={percentage} className="percentage"/>
                <div style={{ marginTop: 10 }}>
                  <label className="text-color">Twist and Turn Activity House</label>
                </div>
                <div>
                  <span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>AED 12.00</span><span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>AED 14.50</span>
                </div>
                <div style={{ paddingTop: 10 }}>
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
                </div>
                <div>
                  <button className="alsoLikeCardButton"><FormattedMessage id="Product.Detail.addToBasket" defaultMessage="Add to basket" /></button>
                </div>
                <div style={{ paddingTop: 10 }}>
                  <i className="icon-heart"></i>
                  <span style={{ paddingLeft: 7 }}>Remove from Wishlist</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="container">
         
          
          <div className="row">

          </div>

          <div className="row">

          </div><div className="row">
            <div className="col col-12 apex-col-auto">
              <div className="t-ContentBlock containers t-ContentBlock--h3 margin-top-lg a-Tabs-panel apex-rds-after apex-rds-element-selected" id="USERWISHLIST" role="tabpanel" aria-labelledby="USERWISHLIST_tab" aria-live="polite" aria-hidden="false" style={{}}>
                <div className="t-ContentBlock-header"><h1 className="t-ContentBlock-title"><FormattedMessage id="profile.Wishlist.Title" defaultMessage="Wishlist" /></h1></div>
                <div className="t-ContentBlock-body"><div id="report_28511608561220857_catch"><ul className="t-Cards t-Cards--basic t-Cards--4cols t-Cards--animColorFill products" id="USERWISHLIST_cards" data-region-id="USERWISHLIST" style={{ touchAction: 'pan-y', userSelect: 'none', WebkitUserDrag: 'none', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}>


                  {this.props.wishLoader ? <Spinner /> : productList ? productList : null}


                </ul>
                  <table className="t-Report-pagination" role="presentation" /></div></div>
                <div className="t-ContentBlock-buttons" />
              </div>
            </div>
          </div>
        </div>
      </div>
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
    wishLoader: state.wishList.wishLoader
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogoutUser: () => dispatch(actions.logoutUser()),
    onGetWishListItem: (payload) => dispatch(actions.getWishlist(payload)),
    onGetProductDetails: payload => dispatch(actions.getProductDetails(payload)),
    getSizeChart: payload => dispatch(actions.getSizeChart(payload)),
    onRemoveProductFromWishList: (payload) => dispatch(actions.removeWishList(payload)),
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
