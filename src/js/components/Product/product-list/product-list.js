import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import ProductListData from '../../PoductList/ProductListData';

class ProductData extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			selectedProduct: ''
		};
	}

	componentWillMount() {
		if (this.props.productDetails) {
			this.props.onClearProductDetails(this.props.productDetails);
		}
	}

	handleClick(el) {
		this.setState({ selectedProduct: el });
		//console.log('The link was clicked.', el);
		//document.getElementById(el).style.display = 'block';
	}

	hidepromopopup(el) {
		document.getElementById(el).style.display = 'none';
	}

	handleProductClick = item => {
		const data = {
			customerid: 2,
			store: 1,
			url_key: item.url_key,
		};
		this.props.onGetProductDetails(data);
	};

    _checkOfferPrice = (item, itemOfferPrice) => {
        // console.log('item.price itemOfferPrice',item.price.price, itemOfferPrice);

        if ( parseInt(item.price.price) !== parseInt(itemOfferPrice) ) {
            return(
					<span style={{fontWeight:"normal"}}>
						<del>{item.currency} {item.price.price}</del>
						&nbsp;
					</span>            
			);
        }
    }

	_renderProducts = (item, index) => {
		let count = 0;
		// console.log('product details 123', item.imageurl);
		// console.log('product details item', item.buymore_savemore);
		// console.log('product details item status', item.buymore_savemore.status);

		return (
			<li
				key={'product-' + index}
				itemScope
				itemType="http://schema.org/Product"
				data-item-count={66}
				data-item-increment={66}
				data-lazy
			>
				<div className="overlay prm-popwindow-uq" id={'MB_212400241_' + index} style={{ display: this.state.selectedProduct === 'MB_212400241_' + index ? 'block' : 'none' }}>
					<div className="promo">
						<i className="icon-cart basket" />
						{/*<p className="desc">
							<FormattedMessage id="BuyMore.ProductList.Message" defaultMessage="Buy More! Save More!" />
						</p>*/}
						<p className="desc">
							<FormattedMessage id="BuyMore.Message" defaultMessage="Buy More!" />
							<br /> <FormattedMessage id="SaveMore.Message" defaultMessage="Save More" />
						</p>
						{item.buymore_savemore && item.buymore_savemore.data &&  (
							
							Object.keys(item.buymore_savemore.data).map(function (key, index) {
								if(parseInt(key) !== 1 && count < 2){
									count++;
									return (
										<p className={count === 1 ? "textone" : "texttwo"}> {key} <FormattedMessage id="For.Text" defaultMessage="For" /> {item.currency} {item.buymore_savemore.data[key]}</p>
									)
								} else {
									return null;
								}
							})
						)}
<p className="link" itemProp="offers" itemScope itemType="http://schema.org/Offer">
							<Link to={`/${this.props.globals.store_locale}/offers`}>
								<a>
									<strong itemProp="description">
										<FormattedMessage id="DiscoverMore.Message" defaultMessage="Discover More" />
									</strong>
								</a>
													</Link>
						</p>
					</div>
					<a
						href="javascript:void(0);"
						name="212400241_0"
						className="closebtnOverlay"
						onClick={e => {
							this.hidepromopopup('MB_212400241_' + index);
						}}
					>
						×
					</a>
				</div>

				<div className="product-card-wrapper" role="link" tabIndex={0}>
					<a id="MBCD_212400241_0" itemProp="url" className="ssf3" tabIndex={-1}>
						<Link to={'/' + this.props.globals.store_locale + '/products-details/' + item.url_key}>
							<span>
								<em />

								<img
									src={item.imageurl[0]}
									alt="Racerback Long Line Sport Bra"
									className="ftr"
									role="presentation"
								/>
							</span>
						</Link>
						<aside className="product-listing">
							<Link to={'/' + this.props.globals.store_locale + '/products-details/' + item.url_key}>
								<div className="plp-product-details" itemProp="name">
									<h2 style={{ padding: '2px', margin: '0px' }}>
										<p
											className="product fab-body"
											style={{
												fontFamily: '"Noto Sans KR", Helvetica, Arial, sans-serif',
												fontSize: '14px',
												color: '#000',
											}}
										>
											{item.productname}
										</p>
										<p
											className="product fab-body"
											style={{
												color: '#f599ba',
												fontWeight: 'lighter',
												fontSize: '13px',
												fontFamily: '"Noto Sans KR", Helvetica, Arial, sans-serif',
											}}
										>
											{item.after_name}
										</p>
									</h2>
								</div>
							</Link>
							<p className="price fab-strong">
							   {
								   item.buymore_savemore ? ( item.buymore_savemore.data && item.buymore_savemore.data['1'] ? 
										<>
											{/* <span style={{fontWeight:"normal"}}>
												<del>{item.currency} {item.price.price}</del>
												&nbsp;
											</span> */}

											{ this._checkOfferPrice(item, item.buymore_savemore.data['1']) }

											<span className="d-price">
												{item.currency}<span className="price"> {item.buymore_savemore.data['1']}</span>
											</span>
										</>	
									: <>{item.currency}<span className="price"> {item.price.price}</span> </>)
									:<>{item.currency}<span className="price"> {item.price.price}</span> </>
							   }
							</p>

							{
								item.buymore_savemore && parseInt(item.buymore_savemore.status) === 1 && (

									<p
										className="offer"
										onClick={e => {
											this.handleClick('MB_212400241_' + index);
										}}
										itemProp="offers"
										itemScope
										itemType="http://schema.org/Offer"
									>
										<strong itemProp="description">
											<FormattedMessage id="BuyMoreBtn.Message" defaultMessage="Buy More" />
										</strong>
									</p>
								)}


						</aside>
					</a>
				</div>
			</li>
		);
	};

	render() {
		const { Data, loading1 } = this.props;
		//console.log('rendering', this.props.redirect);
		return (
			<div id="PROD" className="prdcontainers">
				{Object.keys(Data).length > 0 && (
					<ul
						className="products  grid-4-column"
						style={{
							touchAction: 'pan-y',
							userSelect: 'none',
							WebkitUserDrag: 'none',
							WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

						}}
					>
						<ProductListData list={Data} />
						{/* {Data.map(this._renderProducts)} */}
					</ul>)}
				{ Data.length === 0 && !loading1 && (<p style={{ fontSize: '22px', letterSpacing: '0.04em', fontWeight: 500, padding: '20px 16px 10px' }}><FormattedMessage id="NoData.Text" defaultMessage="No Data available." />{loading1}</p>)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	// console.log('pdpstate', state);

	return {
		globals: state.global,
		menu: state.menu.menuNavData,
		productDetails: state.productDetails.productData,
		redirect: state.productDetails.redirect,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onClearProductDetails: payload => dispatch(actions.clearProductDetails(payload)),
		onGetProductDetails: payload => dispatch(actions.getProductDetails(payload))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductData);
