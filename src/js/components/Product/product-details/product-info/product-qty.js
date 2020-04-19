import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/index';
import { FormattedMessage } from 'react-intl';
import { trackF, initializeF } from '../../../utility/facebookPixel';
import { live } from '../../../../api/globals';
import { Link, Redirect } from 'react-router-dom';
import Popup from 'react-popup';

const wait = require('../../../../../assets/images/wait.gif');

class ProductQty extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultQty: 0,
		};
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.productTotalQty !== prevProps.productTotalQty) {
			if (this.props.productTotalQty > 0) {
				this.setState({ defaultQty: 1 })
			} else {
				this.setState({ defaultQty: 0 })
			}
		}
	}

	decrement = totalQty => {


		let currQty = this.state.defaultQty;
		let decrementedQty = currQty - 1;
		if ((totalQty > 0) && (decrementedQty > 0)) {
			if (currQty <= 0) {
			} else {
				this.setState({ defaultQty: currQty - 1 });
			}
		}

	};


	increment = totalQty => {
		let currQty = this.state.defaultQty;
		//console.log('increment', totalQty);
		if (currQty >= totalQty) {
			let popupMessage = null;
			let currentStore = this.props.globals.currentStore;
			if(currentStore == 1 || currentStore == 3 || currentStore == 5){
			popupMessage = Popup.register({
				title: 'محزر',
				content: `الحد الأقصى لكمية الطلب من هذا المنتج هي ${parseInt(totalQty)} يرجى تغيير الكمية المحددة لتكون ضمن هذا العدد. لطلب كمية أكثر من ${parseInt(totalQty)} يرجى اللاتصال بنا.`,
				buttons: {
					right: [{
					text: 'حسنا',
					action: function(){
						Popup.close();
					}
					}]
				}
			});
			Popup.queue(popupMessage);
			} else {
			popupMessage = Popup.register({
				title: 'Alert',
				content: `This product has a maximum orderable quantity of ${parseInt(totalQty)} Please update your selected quantity to be within this limit.To order quantity more than ${parseInt(totalQty)} please contact us.`,
				buttons: {
					right: [{
					text: 'OK',
					action: function(){
						Popup.close();
					}
					}
				]
				}
			});
			Popup.queue(popupMessage);
			}
		} else {
			this.setState({ defaultQty: currQty + 1 });
		}
	};

	handleClick = data => {

		// console.log('handleClick',data);
		// console.log('this.props.productTotalQty',this.props.productTotalQty);
		// console.log('this.state.defaultQty',this.state.defaultQty);

		// If Qty is Zero, do not add to Cart
		if (this.state.defaultQty <= 0) {
			return false;
		}

		//check user is loged in or not

		//console.log('isuserlogedin', this.props.login.isUserLoggedIn);

		if (this.props.login.isUserLoggedIn) {
			let configurable_item_options = data.configurable_item_options;
			const cart_item = {
				quote_id: this.props.customer_details.quote_id,
				product_type: data.productData.type,
				sku: data.productData.sku,
				qty: this.state.defaultQty,
				product_option: {
					extension_attributes: {
						configurable_item_options,
					},
				},
			};

			const myCart = {
				quote_id: this.props.customer_details.quote_id,
				store_id: this.props.globals.currentStore,
			};

			//console.log('addtocart', JSON.stringify(cart_item));
			this.props.onAddToCart(cart_item, myCart);
			if(live) {
				trackF('AddtoCard', cart_item);
			}
		} else {
			//console.log('welcome Guest');
			let configurable_item_options = data.configurable_item_options;
			const cart_item = {
				quote_id: this.props.guestUser.temp_quote_id,
				product_type: data.productData.type,
				sku: data.productData.sku,
				qty: this.state.defaultQty,
				product_option: {
					extension_attributes: {
						configurable_item_options,
					},
				},
			};

			const myCart = {
				quote_id: this.props.guestUser.temp_quote_id,
				store_id: this.props.globals.currentStore,
			};
			this.props.onGuestAddToCart(cart_item, myCart);
			if(live) {
				trackF('AddtoCard', cart_item);
			}
		}
	};

	_renderProductQtyAndStackStatus = item => {
		// console.log('exclude_international', this.props.productDetails.exclude_international)
		return (
			<div className="container">
				<Popup />
				<div className="row">
					<div className="col col-5 ">
						<div
							className="t-Form-fieldContainer rel-col  apex-item-wrapper apex-item-wrapper--number-field"
							id="P3_QTY_CONTAINER"
						>
							<div className="t-Form-labelContainer col col-1">
								<label htmlFor="P3_QTY" id="P3_QTY_LABEL" className="t-Form-label">
									<FormattedMessage id="PDP.Qty" defaultMessage="Qty" />
								</label>
							</div>

							<div className="t-Form-inputContainer col col-4">
								<div className="t-Form-itemWrapper">
									<span className="t-Form-itemText t-Form-itemText--pre">
										<i
											className="icon min"
											onClick={e => this.decrement(this.props.productTotalQty)}
										>
											-
										</i>
									</span>

									<input
										type="text"
										id="P3_QTY"
										name="P3_QTY"
										className="number_field apex-item-text qty"
										style={{ width: '50px' }}
										value={this.state.defaultQty}
										disabled="disabled"
									/>

									<span className="t-Form-itemText t-Form-itemText--post">
										<i
											className="icon max"
											onClick={e => this.increment(this.props.productTotalQty)}
										>
											+
										</i>
									</span>
								</div>
								<span
									id="P3_QTY_error_placeholder"
									className="a-Form-error"
									data-template-id="33609747879469734_ET"
								/>
							</div>
						</div>
					</div>

					<div className="col col-6 ">
						<div
							className="t-Form-fieldContainer rel-col stockalert apex-item-wrapper apex-item-wrapper--display-only "
							id="P3_STOCK_CONTAINER"
						>
							<div className="t-Form-labelContainer col col-0">
								<label htmlFor="P3_STOCK" id="P3_STOCK_LABEL" className="t-Form-label">
									Stock
								</label>
							</div>
							<div className="t-Form-inputContainer col col-6">
								<div className="t-Form-itemWrapper">
									<span id="P3_STOCK" className="display_only apex-item-display-only" style={{}}>
										<FormattedMessage id="PDP.InStock" defaultMessage="In Stock" />
									</span>
								</div>
								<span
									id="P3_STOCK_error_placeholder"
									className="a-Form-error"
									data-template-id="33609747879469734_ET"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					{this.props.addToCardLoader && (<div className="col col-6">
						{
							this.props.productDetails.exclude_international.toLowerCase() === 'no' &&
							<button
								onClick={e => this.handleClick(this.props.productAddToCart)}
								className="t-Button t-Button--hot t-Button--stretch t-Button--gapTop h-hidden-mobile"
								type="button"
								id="ADDTC"
								disabled={true}
							>	
								<img src={wait} style={{ width: 25, height: 25, marginTop: -4 }} />
								<span className="t-Button-label"><FormattedMessage id="PDP.ADT" defaultMessage="Add to Cart" /></span>
							</button>
						}
					</div>)}
					{!this.props.addToCardLoader && (<div className="col col-6">
						{
							this.props.productDetails.exclude_international.toLowerCase() === 'no' &&
							<button
								onClick={e => this.handleClick(this.props.productAddToCart)}
								className="t-Button t-Button--hot t-Button--stretch t-Button--gapTop h-hidden-mobile"
								type="button"
								id="ADDTC"
							>
								<span className="t-Button-label"><FormattedMessage id="PDP.ADT" defaultMessage="Add to Cart" /></span>
							</button>
						}
					</div>)} 
				</div>
				{this.props.productDetails.exclude_international.toLowerCase() === 'no' &&
					<div class="t-Region h-hidden-desktop hide-buttons  t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--scrollBody margin-top-none margin-bottom-none margin-left-none margin-right-none add-to-bag-mobile" id="R122004230792317754">
						<div class="t-Region-bodyWrap">
							<div class="t-Region-buttons t-Region-buttons--top">
								<div class="t-Region-buttons-left"></div>
								<div class="t-Region-buttons-right"></div>
							</div>
							<div class="t-Region-body">
								<div class="float-add-bag new-float-add-bag">
									
								{!this.props.addToCardLoader && (<div class="float-nav tBor">
									<Link to={`/${this.props.globals.store_locale}/cart`}>
											<div class="new-wish">
												<div>
													<span>{this.props.cart_details.cart_count}</span>
													<i class="icon-cart"></i>
												</div>
											</div>
									</Link>	
										<a href="javascript:void(0)" id="addtb" onClick={e => this.handleClick(this.props.productAddToCart)} class="float-addbag-btn">
											<FormattedMessage id="PDP.ATB" defaultMessage="ADD TO BAG" />
										</a>
									</div>)}
									{this.props.addToCardLoader && (<div class="float-nav tBor">
									 <Link to={`/${this.props.globals.store_locale}/cart`}>
											<div class="new-wish">
												<div>
													<span>{this.props.cart_details.cart_count}</span>
													<i class="icon-cart"></i>
												</div>
											</div>
									 </Link>	
										<a href="javascript:void(0)" id="addtb"  class="float-addbag-btn">
											<img src={wait} style={{ width: 35, height: 35, marginTop: 8 }} />
											<FormattedMessage id="PDP.ATB" defaultMessage="ADD TO BAG" />
										</a>
									</div>)}
								</div>
							</div>
						</div>
					</div>}

			</div>
		);
	};

	render() {
		const { productQtyAndStackStatus } = this.props;

		if (productQtyAndStackStatus.simpleproducts) {
			return this._renderProductQtyAndStackStatus();
		} else {
			return false;
		}
	}
}

const mapStateToProps = state => {
	//console.log('loginDetails', state.login.customer_details);

	return {
		globals: state.global,
		menu: state.menu.menuNavData,
		productAddToCart: state.productDetails,
		productDetails: state.productDetails.productData,
		productTotalQty: state.productDetails.totalQty,
		customer_details: state.login.customer_details,
		login: state.login,
		guestUser: state.guest_user,
		addToCardLoader: state.productDetails.addToCardLoader,
		cart_details: state.myCart,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetProductDetails: payload => dispatch(actions.getProductDetails(payload)),
		onAddToCart: (payload, myCart) => dispatch(actions.addToCart(payload, myCart)),
		onGuestAddToCart: (payload, myCart) => dispatch(actions.guestAddToCart(payload, myCart)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductQty);
