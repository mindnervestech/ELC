import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Row, Col } from 'reactstrap';
// import placeholder from '../../../assets/images/placeholder.png'
import parse from 'html-react-parser';
import SideManu from './SideManu';
import AddToBasketModal from '../Product/product-details/product-info/add-to-basket-modal';
import Modal from 'react-responsive-modal';
import AddToCartModal from '../Product/product-details/product-info/product-basic';
import { initializeF, trackF } from '../utility/facebookPixel';
import { live } from '../../api/globals';
import $ from 'jquery'
import { productClickEvent, ProductListEvent, ProductSearchEvent, checkoutEvent } from '../../components/utility/googleTagManager'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
var _ = require('lodash');
let productListForGTM = {}
let productListData = {}
let productList = {}
let pagenationCount = 36
let start = 1
let end = 5
let pageChecked = false;
let changeFilterData = false
let showPopupIndex = -1
let basketPopupFlag = false;
let url_key = '';
let addToCartModal = false;
let cartModelFlag = false;
let showMoreLessFlag = false;

class ProductListData extends Component {
	constructor(props) {
		super(props);
		changeFilterData = false
		productListData = this.props.list.product_data
		productList = this.props.list.product_data
		let totalPages = 1
		let count = 0
		let pageNumber = 1
		let start = 1 * pageNumber
		let end = pagenationCount * pageNumber
		let list1 = {}
		showPopupIndex = -1
		for (var element in productList) {
			if (element >= start && element <= end) {
				list1[element] = productList[element]
			}
			count = count + 1
		}
		if (count % pagenationCount === 0) {
			totalPages = count / pagenationCount
		} else {
			totalPages = Math.floor(count / pagenationCount) + 1
		}
		this.handler = this.handler.bind(this);
		this.state = {
			totalPages: totalPages,
			pageNumber: 1,
			list1: list1,
			start: 1,
			end: pagenationCount,
			check: true,
			showFilterOnMobile: false,
			sortByText: "",
			sortByShowOption: false,
			basketPopupFlag: false,
			addToCartModal: false,
			cartModelFlag: false,
			url_key: '',
			sortByOptionValue: '',
			showMoreLessFlag: false,

		};
	}

	onCloseCartModal = () => {
		addToCartModal = false;
		this.setState({ addToCartModal: false, cartModelFlag: false })
		basketPopupFlag = false;
	}

	onCloseAddCartModal = () => {
		this.setState({ basketPopupFlag: false })
		basketPopupFlag = false;
	}
	productOnClickEvent = (item, index) => {
		productClickEvent(item, index, this.props.listForGTM)

	}
	componentDidUpdate(prevProps, prevState) {
		if(this.state.list1){
		if (this.state.pageNumber !== prevState.pageNumber ) {
			if (this.props.listForGTM === 'Search Results') {
				ProductSearchEvent(this.state.list1)
			} else if (this.props.listForGTM === 'List Results') {
				ProductListEvent(this.state.list1)
			} else {
			}
			
		}}
		
		if (prevProps.addToCardLoader !== this.props.addToCardLoader && this.props.item_added.item_added && this.props.item_added.add_cart_open_popUp && (!this.state.cartModelFlag || !cartModelFlag)) {
			if (!this.props.item_added.add_cart_error) {
				this.onCloseAddCartModal();
				this.setState({
					addToCartModal: true,
					cartModelFlag: true
				})
				addToCartModal = true;
				cartModelFlag = true;
			}
		}
	}

	openAddTOBasketModal = (url) => {
		this.setState({
			basketPopupFlag: true,
			url_key: url_key
		})
		basketPopupFlag = true;
		url_key = url;
	}

	changeThePagenationData() {
		let totalPages = 1
		let count = 0
		let pageNumber = 1
		let start = 1 * pageNumber
		let end = pagenationCount * pageNumber
		let list1 = {}
		for (var element in productList) {
			if (element >= start && element <= end) {
				list1[element] = productList[element]
			}
			count = count + 1
		}
		if (count % pagenationCount === 0) {
			totalPages = count / pagenationCount
		} else {
			totalPages = Math.floor(count / pagenationCount) + 1
		}
		this.state = {
			totalPages: totalPages,
			pageNumber: 1,
			list1: list1,
			start: 1,
			end: pagenationCount,
			check: true,
			showFilterOnMobile: false,
			sortByText: "",
			sortByShowOption: false,
			basketPopupFlag: false,
			addToCartModal: false,
			cartModelFlag: false,
			url_key: '',
			sortByOptionValue: '',
		};
	}

	handler(id,mobilePopupClose) {
		if(mobilePopupClose){
			this.state.showFilterOnMobile = false
		}
		changeFilterData = true
		productList = id;
		start = 1
		end = 5
		let count = 0
		let checkFirstValue = true
		let firstValue = 0
		for (var element in productList) {
			if (checkFirstValue) {
				checkFirstValue = false
				firstValue = element
			}
			count++
		}
		if (this.state.sortByText !== "") {
			this.filter(this.state.sortByOptionValue, this.state.sortByText)
		}
		let totalPages = 1
		if (count % pagenationCount === 0) {
			totalPages = count / pagenationCount
		} else {
			totalPages = Math.floor(count / pagenationCount) + 1
		}
		if (productList.length === 0) {
			this.setState({ totalPages: totalPages, pageNumber: 0 })
		} else {
			this.setState({ totalPages: totalPages, pageNumber: 1 })
		}
		if (firstValue === 0 || firstValue === '0') {
			this.state.check = false
			this.pagenation(0, pagenationCount - 1)
		} else {
			this.state.check = true
			this.pagenation(1, pagenationCount)
		}
	}

	componentWillMount() {
		start = 1
		end = 5
		pageChecked=false
		
		//this.setState({list1:{}})

	}
	

	componentDidMount() {
		if (this.props.guest_user.temp_quote_id == null) {
			this.props.onGetGuestCartId();
		}	
			setTimeout(() => {
			if(this.state.list1){
			if (this.props.listForGTM === 'Search Results') {
				ProductSearchEvent(this.state.list1)
			} else if (this.props.listForGTM === 'List Results') {
				ProductListEvent(this.state.list1)
			} else {
			}
			}	
		}, 3000);
			
		
		//this.forceUpdate()
	}

	pagenation = (start, end) => {
		changeFilterData = true
		this.state.list1 = {}
		for (var element in productList) {
			if (element >= start && element <= end) {
				this.state.list1[element] = productList[element]
			}
		}
		this.setState({ list1: this.state.list1 })
	}



	prevButton = () => {
		
		window.scrollTo(0,300)
		changeFilterData = true
		if (this.state.pageNumber !== 1 && this.state.pageNumber !== 0) {
			this.setState({ pageNumber: this.state.pageNumber - 1 })
			if (this.state.totalPages <= 5) {

			} else {
				let startChange = start - 1
				let endChange = end - 1
				if (startChange >= 1) {
					start = startChange
					end = endChange
				}
			}
			setTimeout(() => {
				if (this.state.check) {
					let value = pagenationCount * (this.state.pageNumber - 1) + 1
					this.pagenation(value, value + pagenationCount - 1)
				} else {
					let value = pagenationCount * (this.state.pageNumber - 1)
					this.pagenation(value, value + pagenationCount - 1)
				}
			}, 500);
		}
	}

	nextButton = () => {
		// document.getElementById('prevButton').scrollIntoView({
		// 	behavior: 'smooth'
		//   });
		window.scrollTo(0,300)
		changeFilterData = true
		if (this.state.pageNumber !== this.state.totalPages) {
			this.setState({ pageNumber: this.state.pageNumber + 1 })
			if (this.state.check) {
				let value = pagenationCount * this.state.pageNumber + 1
				this.pagenation(value, value + pagenationCount - 1)
			} else {
				let value = pagenationCount * this.state.pageNumber
				this.pagenation(value, value + pagenationCount - 1)
			}
			if (this.state.totalPages <= 5) {

			} else {
				let startChange = start + 1
				let endChange = end + 1
				if (endChange <= this.state.totalPages) {
					start = startChange
					end = endChange
				}
			}
		}
	}

	ApplyPagenation = (value) => {
		// document.getElementById('prevButton').scrollIntoView({
		// 	behavior: 'smooth'
		//   });
		window.scrollTo(0,300)
		changeFilterData = true
		this.setState({ pageNumber: value });
		if (this.state.check) {
			let _value = (pagenationCount * value)
			let value2 = (pagenationCount * (value - 1)) + 1
			this.pagenation(value2, _value)
		} else {
			let _value = pagenationCount * value
			let value2 = pagenationCount * (value - 1)
			this.pagenation(value2, _value)
		}
	}


	filter = (value, text) => {
		changeFilterData = true
		this.state.sortByText = text
		this.state.sortByOptionValue = value
		this.setState({ sortByShowOption: false })
		if (value === "price_desc") {
			const sortData = _.values(productList).sort((a, b) => b.price - a.price);
			productList = sortData
			this.state.pageNumber = 1
			this.state.check = false
			this.pagenation(0, pagenationCount - 1)
		} else if (value === 'price_asc') {
			const sortData = _.values(productList).sort((a, b) => a.price - b.price);
			productList = sortData
			this.state.pageNumber = 1
			this.state.check = false
			this.pagenation(0, pagenationCount - 1)
		} else if (value === 'relevance') {
			productList = productListData
			this.state.check = true
			this.pagenation(1, pagenationCount)
		} else if (value === 'a-z') {
			const myData = _.values(productList).sort((a, b) => a.json.name.localeCompare(b.json.name));
			productList = myData
			this.state.check = false
			this.state.pageNumber = 1
			this.pagenation(0, pagenationCount - 1)
		} else if (value === 'z-a') {
			const myData = _.values(productList).sort((a, b) => b.json.name.localeCompare(a.json.name));
			productList = myData
			this.state.check = false
			this.state.pageNumber = 1
			this.pagenation(0, pagenationCount - 1)
		}
	}

	_callFilters = () => {
		changeFilterData = true
		this.setState({ showFilterOnMobile: true })
	};

	_closeSlider = () => {
		this.setState({ showFilterOnMobile: false })
	};

	getAge = (age) => {
		for (let data in age) {
			return age[data]
		}
	}

	showSortByOption = () => {
		changeFilterData = true
		if (this.state.pageNumber !== 0) {
			if (this.state.sortByShowOption) {
				this.setState({ sortByShowOption: false })
			} else {
				this.setState({ sortByShowOption: true })
			}
		}
	}

	openShowAndMorePopup(index) {
		showPopupIndex = index
		this.setState({ changeFilterData: true })
	}

	closeBuyAndMore(index) {
		showPopupIndex = -1
		this.setState({ changeFilterData: true })
	}

	checkBuyAndMore(offer, index) {
		if (Object.keys(offer).length == 1) {
			for (let value in offer) {
				if (value === '1') {
					return (
						// <div>
						// 	<button onClick={() => this.openShowAndMorePopup(index)} className="bayMoreAndSaveMore"><FormattedMessage id="BuyMoreBtn.Message2" defaultMessage="Sale" /></button>
						// </div>
						<div>
						<button className="bayMoreAndSaveMore"><FormattedMessage id="BuyMoreBtn.Message2" defaultMessage="Sale" /></button>
					</div>
					);
				} else {
					return (
						// <div>
						// 	<button onClick={() => this.openShowAndMorePopup(index)} className="bayMoreAndSaveMore"><FormattedMessage id="BuyMoreBtn.Message" defaultMessage="Buy More, Save More!" /></button>
						// </div>
						<div>
						<button  className="bayMoreAndSaveMore"><FormattedMessage id="BuyMoreBtn.Message" defaultMessage="Buy More, Save More!" /></button>
					</div>
					);
				}
			}
		} else {
			return (
				// <div>
				// 	<button onClick={() => this.openShowAndMorePopup(index)} className="bayMoreAndSaveMore"><FormattedMessage id="BuyMoreBtn.Message" defaultMessage="Buy More, Save More!" /></button>
				// </div>
				<div>
				<button className="bayMoreAndSaveMore"><FormattedMessage id="BuyMoreBtn.Message" defaultMessage="Buy More, Save More!" /></button>
			</div>
			);
		}
	}

	showDiscountPrise(offerData, orignalPrise, currency) {
		if (Object.keys(offerData).length === 1) {
			for (let value in offerData) {
				if (value === '1') {
					return (
						<div>
							<span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>{currency}&nbsp;{offerData[value]}</span>
							<span style={{ color: "#b3b3b3", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>{currency}&nbsp;{orignalPrise}.00</span>
						</div>
					);
				} else {
					return (
						<div>
							<span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>{currency}&nbsp;{orignalPrise}.00</span>
						</div>
					);
				}
			}
		} else {
			return (
				<div>
					<span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>{currency}&nbsp;{orignalPrise}.00</span>
				</div>
			);
		}
	}

	showMessageOnBuyAndMorePopup(offer, currency) {
		if (Object.keys(offer).length === 1) {
			for (let value in offer) {
				if (value === '1') {
					return (
						<div className="buyAndMorePopupText">
							<FormattedMessage id="BuyMoreBtn.Message2" defaultMessage="Sale" />
						</div>
					);
				} else {
					return (
						<div>
							<div className="buyAndMorePopupText">
								<FormattedMessage id="BuyMoreBtn.Message" defaultMessage="Buy More, Save More!" />
							</div>
							<div className="buyAndMoreOffer">
								<span>{value}&nbsp;<FormattedMessage id="For.Text" defaultMessage="For" />&nbsp;{currency}&nbsp;{offer[value]}</span>
							</div>
						</div>
					);
				}
			}
		} else {
			let showOffer = []
			let count = 0
			for (let value in offer) {
				if (count < 2) {
					showOffer.push(value)
					showOffer.push(offer[value])
				}
				count++
			}
			count = 0
			return (
				<div>
					<div className="buyAndMorePopupText">
						<FormattedMessage id="BuyMoreBtn.Message" defaultMessage="Buy More, Save More!" />
					</div>
					<div>
						<div className="buyAndMoreOffer">
							<span>{showOffer[0]}&nbsp;<FormattedMessage id="For.Text" defaultMessage="For" />&nbsp;{currency}&nbsp;{showOffer[1]}</span>
						</div>
						<div className="buyAndMoreOffer">
							<span>{showOffer[2]}&nbsp;<FormattedMessage id="For.Text" defaultMessage="For" />&nbsp;{currency}&nbsp;{showOffer[3]}</span>
						</div>
					</div>
				</div>
			);
		}
	}

	filterOptionPopup = () => {
		this.setState({ showFilterOnMobile: false })
	}

	// showMoreLess = () => {
	// 	showMoreLessFlag = !showMoreLessFlag;
	//     this.setState({ showMoreLessFlag: !this.state.showMoreLessFlag });
	// }

	render() {
		let pathname = this.props.location.pathname.split('/');
	
		// }
		let list = this.state.list1
		const store_locale = this.props.globals.store_locale
		if (changeFilterData === false) {
			productListData = this.props.list.product_data
			productList = this.props.list.product_data
			this.changeThePagenationData()
			for (var element in productList) {
				if (element >= 1 && element <= 36) {
					this.state.list1[element] = productList[element]
				}
			}
			list = this.state.list1
			productListForGTM = this.state.list1;
		}
		var description = '';
		var desText = '';
		var decLength = '';
		if (this.props.list.category_description2) {
			description = parse(this.props.list.category_description2);
			desText = description.props.children;
			decLength = description.props.children.length;
		}

		return (
			<Row className="PLPRowMargin">
				<Col xs="3" lg="3" md="3" className="divShowOnWeb">
					<SideManu action={this.handler}></SideManu>
				</Col>
				<Col xs="12" lg="9" md="9" style={{ padding: 0 }}>
					<div className="divShowOnMobile" style={{ width: '100%' }}>
						<div className="divShowOnMobile" style={{ padding: "0px 25px", lineHeight: '1.45' }}>
							<div style={{ display: 'inline-block', width: '50%', position: 'relative' }}>
								<div className={this.state.sortByShowOption ? "sortBySelectedText open" : "sortBySelectedText"} onClick={() => this.showSortByOption()}>
									<span>{this.state.sortByText !== "" ? this.state.sortByText : <FormattedMessage id="Product.Listing.Relevance" defaultMessage="Relevance"></FormattedMessage>}</span>
									<i className="icon-down sortBySelectedTextIcon" ></i>
								</div>
								<div>
									<div className="sortByOption" style={this.state.sortByShowOption ? { display: 'block' } : { display: 'none' }}>
										<FormattedMessage id="Product.Listing.Relevance" defaultMessage="Relevance">
											{(message) =>
												<div className="sortByOptionText" onClick={() => this.filter("relevance", message)}>
													<span>{message}</span>
												</div>
											}
										</FormattedMessage>
										<FormattedMessage id="NameAtoZ" defaultMessage="Name (A-Z)">
											{(message2) =>
												<div className="sortByOptionText" onClick={() => this.filter("a-z", message2)}>
													<span><FormattedMessage id="NameAtoZ" defaultMessage="Name (A-Z)" /></span>
												</div>
											}
										</FormattedMessage>
										<FormattedMessage id="NameZtoA" defaultMessage="Name (Z-A)">
											{(message3) =>
												<div className="sortByOptionText" onClick={() => this.filter("z-a", message3)}>
													<span><FormattedMessage id="NameZtoA" defaultMessage="Name (Z-A)" /></span>
												</div>
											}
										</FormattedMessage>
										<FormattedMessage id="PriceLowtoHigh" defaultMessage="Price (lowest first)">
											{(message4) =>
												<div className="sortByOptionText" onClick={() => this.filter("price_asc", message4)}>
													<span><FormattedMessage id="PriceLowtoHigh" defaultMessage="Price (lowest first)" /></span>
												</div>
											}
										</FormattedMessage>
										<FormattedMessage id="PriceHightoLow" defaultMessage="Price (highest first)">
											{(message5) =>
												<div className="sortByOptionText" onClick={() => this.filter("price_desc", message5)}>
													<span><FormattedMessage id="PriceHightoLow" defaultMessage="Price (highest first)" /></span>
												</div>
											}
										</FormattedMessage>
									</div>
								</div>
							</div>
							<div style={{ display: 'inline-block', width: '50%', textAlign: 'center' }}>
								<button className="mobileFilterByButton" onClick={this._callFilters}>
									<i class="fa fa-list-ul threeLineIcon" aria-hidden="true"></i>
									<FormattedMessage id="Product.Refine" defaultMessage="Refine" />
								</button>
							</div>
						</div>
						<div className="row">
							{/* <div className="col col-12 apex-col-auto">
								<div className="t-Region h-hidden-desktop  t-Region--noPadding t-Region--scrollBody"
									id="cd-cart" style={this.state.showFilterOnMobile ? { right: 0 } : { right: '-100%' }}>
									<div className="t-Region-header">
										<div className="t-Region-headerItems t-Region-headerItems--title">
											<span className="t-Region-headerIcon">
												<span className="t-Icon " aria-hidden="true" />
											</span>
											<h5 className="t-Region-title" id="cd-cart_heading">
												<FormattedMessage id="Product.Listing.Filter" defaultMessage="Filters" />
												
											</h5>
										</div>
										<div className="t-Region-headerItems t-Region-headerItems--buttons">
											<button
												onClick={this._closeSlider}
												className="t-Button t-Button--hot "
												type="button"
												id="B29004859664427057"
											>
												<span className="t-Button-label"><FormattedMessage id="done" defaultMessage="Done" /></span>
											</button>
											<span className="js-maximizeButtonContainer" />
										</div>
									</div>
									<div className="t-Region-bodyWrap">
										<div className="t-Region-buttons t-Region-buttons--top">
											<div className="t-Region-buttons-left" />
											<div className="t-Region-buttons-right" />
										</div>
										<div style={{ padding: "0px 15px" }}>
											<SideManu action={this.handler}></SideManu>
										</div>
										<div className="t-Region-buttons t-Region-buttons--bottom">
											<div className="t-Region-buttons-left" />
											<div className="t-Region-buttons-right" />
										</div>
									</div>
								</div>
							</div> */}
							<Modal modalId="mobileFilterManu" open={this.state.showFilterOnMobile} onClose={this.filterOptionPopup}>
								<div>
									<div>
										<h5 className="mobileFilterManuPopupHeading">
											<FormattedMessage id="Product.Listing.FilterPopupTitle" defaultMessage="Select Refinements" />
										</h5>
									</div>
									<div style={{ marginTop: 20 }}>
										<SideManu action={this.handler}></SideManu>
									</div>
								</div>
							</Modal>
						</div>
					</div>
					<div className="homePage">
						<div className="start3">
							<div className="divShowOnWeb">
								<img src={this.props.list.category_Image ? this.props.list.category_Image : ''} className="banner_PLP_img" alt="" />
								{/* <img src="https://d2elnqqmhxhwlt.cloudfront.net/pub/media/banners/default/HeroBanners1_Desktop_EN_1.jpg" alt=""/> */}
							</div>
							{this.props.list.category_description2 ?
								<div className="text-align-rtl" style={{ marginTop: 30 }}>
								{/* <div
									className="staticPagesText"
									dangerouslySetInnerHTML={{ __html: this.props.list.category_description2 }}
								/> */}
								
								{/* {!showMoreLessFlag && decLength >= 150 ?
								<div className="staticPagesText">
									<span>{desText.substring(0, 150)}...
										<span className="showLessMore" onClick={() => this.showMoreLess()}>
											<FormattedMessage id="ReadMore.Text" defaultMessage="Read More"/>
										</span>
									</span>
								</div>
								: <span />}
								{showMoreLessFlag ?
									<span>{desText}...
										<span className="showLessMore" onClick={() => this.showMoreLess()}>
											<FormattedMessage id="ReadLess.Text" defaultMessage="Read Less"/>
										</span>
									</span>
								 : <span />} */}
								 {/* {decLength < 150 ? */}
								<span>{desText} </span>
									{/* </span> : <span />} */}
							</div> : ''}
							<div className="productCategaryNamePadding">
								<span className="PLPCategaryName">{this.props.list.category_name}</span>
							</div>
							{/* <div style={{ height: 32 }}>
								<span>{this.props.list.category_description}</span>
							</div> */}


							<div style={{ paddingTop: 29 }}>
								<Row className="divShowOnWeb">
									<Col xs="4" lg="4" md="5">
										<Row>
											<Col xs="4">
												<span className="blackTitle"><FormattedMessage id="Product.Listing.SortBy" defaultMessage="Sort by" /></span>
											</Col>
											<Col xs="8" style={{ padding: 0 }}>
												<div className={this.state.sortByShowOption ? "sortBySelectedText open" : "sortBySelectedText"} onClick={() => this.showSortByOption()}>
													<span>{this.state.sortByText !== "" ? this.state.sortByText : <FormattedMessage id="Product.Listing.Relevance" defaultMessage="Relevance"></FormattedMessage>}</span>
													<i className="icon-down sortBySelectedTextIcon" ></i>
												</div>
												<div>
													<div className="sortByOption" style={this.state.sortByShowOption ? { display: 'block' } : { display: 'none' }}>
														<FormattedMessage id="Product.Listing.Relevance" defaultMessage="Relevance">
															{(message) =>
																<div className="sortByOptionText" onClick={() => this.filter("relevance", message)}>
																	<span>{message}</span>
																</div>
															}
														</FormattedMessage>
														<FormattedMessage id="NameAtoZ" defaultMessage="Name (A-Z)">
															{(message2) =>
																<div className="sortByOptionText" onClick={() => this.filter("a-z", message2)}>
																	<span><FormattedMessage id="NameAtoZ" defaultMessage="Name (A-Z)" /></span>
																</div>
															}
														</FormattedMessage>
														<FormattedMessage id="NameZtoA" defaultMessage="Name (Z-A)">
															{(message3) =>
																<div className="sortByOptionText" onClick={() => this.filter("z-a", message3)}>
																	<span><FormattedMessage id="NameZtoA" defaultMessage="Name (Z-A)" /></span>
																</div>
															}
														</FormattedMessage>
														<FormattedMessage id="PriceLowtoHigh" defaultMessage="Price (lowest first)">
															{(message4) =>
																<div className="sortByOptionText" onClick={() => this.filter("price_asc", message4)}>
																	<span><FormattedMessage id="PriceLowtoHigh" defaultMessage="Price (lowest first)" /></span>
																</div>
															}
														</FormattedMessage>
														<FormattedMessage id="PriceHightoLow" defaultMessage="Price (highest first)">
															{(message5) =>
																<div className="sortByOptionText" onClick={() => this.filter("price_desc", message5)}>
																	<span><FormattedMessage id="PriceHightoLow" defaultMessage="Price (highest first)" /></span>
																</div>
															}
														</FormattedMessage>
													</div>
												</div>
											</Col>
										</Row>
									</Col>
									<Col xs="8" lg="8" md="7">
										<Row>
											<Col xs="5" lg="5" md="3"></Col>
											<Col xs="7" lg="7" md="9">
												<ul class="pagenation">
													<li className="PagenationLeftArrow" onClick={this.prevButton} style={this.state.pageNumber === 1 ? { opacity: "0.5" } : { opacity: 1 }}></li>
													<li className="number" onClick={() => this.ApplyPagenation(start)}><span className={this.state.pageNumber === start ? "selectedNumber" : ""}>{start}</span></li>
													{start + 1 <= this.state.totalPages ?
														<li className="number" onClick={() => this.ApplyPagenation(start + 1)}><span className={this.state.pageNumber === start + 1 ? "selectedNumber" : ""}>{start + 1}</span></li>
														: null}
													{start + 2 <= this.state.totalPages ?
														<li className="number" onClick={() => this.ApplyPagenation(start + 2)}><span className={this.state.pageNumber === start + 2 ? "selectedNumber" : ""}>{start + 2}</span></li>
														: null}
													{start + 3 <= this.state.totalPages ?
														<li className="number" onClick={() => this.ApplyPagenation(start + 3)}><span className={this.state.pageNumber === start + 3 ? "selectedNumber" : ""}>{start + 3}</span></li>
														: null}
													{start + 4 <= this.state.totalPages ?
														<li className="number" onClick={() => this.ApplyPagenation(end)}><span className={this.state.pageNumber === end ? "selectedNumber" : ""}>{end}</span></li>
														: null}
													<li className="PagenationRightArrow" onClick={this.nextButton} style={this.state.pageNumber === this.state.totalPages ? { opacity: "0.5" } : { opacity: 1 }}></li>
												</ul>
											</Col>
										</Row>
									</Col>
								</Row>
								<div className="divShowOnMobile pagenation">
									<ul class="">
										<li className="PagenationLeftArrow" id="iphone5Pagenation" onClick={this.prevButton} style={this.state.pageNumber === 1 ? { opacity: "0.5" } : { opacity: 1 }}></li>
										<li className="number" onClick={() => this.ApplyPagenation(start)}><span className={this.state.pageNumber === start ? "selectedNumber" : ""}>{start}</span></li>
										{start + 1 <= this.state.totalPages ?
											<li className="number" onClick={() => this.ApplyPagenation(start + 1)}><span className={this.state.pageNumber === start + 1 ? "selectedNumber" : ""}>{start + 1}</span></li>
											: null}
										{start + 2 <= this.state.totalPages ?
											<li className="number" onClick={() => this.ApplyPagenation(start + 2)}><span className={this.state.pageNumber === start + 2 ? "selectedNumber" : ""}>{start + 2}</span></li>
											: null}
										{start + 3 <= this.state.totalPages ?
											<li className="number" onClick={() => this.ApplyPagenation(start + 3)}><span className={this.state.pageNumber === start + 3 ? "selectedNumber" : ""}>{start + 3}</span></li>
											: null}
										{start + 4 <= this.state.totalPages ?
											<li className="number" onClick={() => this.ApplyPagenation(end)}><span className={this.state.pageNumber === end ? "selectedNumber" : ""}>{end}</span></li>
											: null}
										<li className="PagenationRightArrow" id="iphone5Pagenation" onClick={this.nextButton} style={this.state.pageNumber === this.state.totalPages ? { opacity: "0.5" } : { opacity: 1 }}></li>
									</ul>
								</div>
							</div>
						</div>
						{basketPopupFlag ? <div>
							<Modal modalId="add_to_basket" open={basketPopupFlag} onClose={this.onCloseAddCartModal}>
								<AddToBasketModal url_key={url_key} onCloseAddCartModal={this.onCloseAddCartModal} />
							</Modal>
						</div> : ''}
						{addToCartModal && this.props.cart_details.similar_products && !window.location.href.includes('products-details') ? <div>
							<Modal modalId="addToCartPopupID" open={addToCartModal} onClose={this.onCloseCartModal}>
								<AddToCartModal onCloseCartModal={this.onCloseCartModal} />
							</Modal>
						</div> : ''}
						{Object.keys(productList).length > 0 ?
							<div className="start">
								<ul className="products">
									{Object.keys(list).map((keyName, index) =>
										<li key={index} style={{ position: 'relative' }}>
											<Link to={`/${store_locale}/products-details/${list[keyName].json.url_key}`}>
												<div onClick={() => { this.productOnClickEvent(list[keyName], index) }} className="alsoLikeCard" style={{ height: list[keyName].json.imageUrl ? 'auto' : 307 }}>
													<div className="ProductSilderImageHight">
													{/* <span className="percentage-text" style={{ display: 'none' }}>30</span>
									<span className="save-text">5</span>
									<img src={save} className="save" /> */}
														<LazyLoadImage

															src={(list[keyName].json.imageUrl) ? list[keyName].json.imageUrl.primaryimage : ''}// use normal <img> attributes as props
															effect="blur" className="cardImage" alt="">
														</LazyLoadImage>
														{/* <img src={percentage} className="percentage" style={{ display: 'none' }} /> */}
													</div>
													<div style={{ height: list[keyName].json.imageUrl ? 50 : 195, marginTop: 30, overflow: 'hidden' }}>
													{ list[keyName].json.name.length > 45 ?
                                                         <label className="text-color">{list[keyName].json.name.substring(0,45)+"...."}</label>:
                                                         <label className="text-color">{list[keyName].json.name}</label>
                                                     }
													</div>
													{list[keyName].json.offers && list[keyName].json.offers.status === 1 ?
														this.showDiscountPrise(list[keyName].json.offers.data, list[keyName].price, list[keyName].currency)
														: <div>
															<span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>{list[keyName].currency} {list[keyName].price}.00</span>
															{/* <span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>AED 14.50</span> */}
														</div>}
													<div style={{ paddingTop: 10 }}>
														{/* <StarRatings
											rating={3}
											starRatedColor='#FAD961'
											changeRating={this.changeRating}
											numberOfStars={5}
											name='rating'
											starHoverColor='#0D943F'
											starDimension='15px'
											starSpacing='0px'
										/> */}
														<span> {this.getAge(list[keyName].json.filtersdata ? list[keyName].json.filtersdata.age : "")}</span>
													</div>

													{/* <div>
										<button className="alsoLikeCardButton CardButton">Add to Basket</button>
									</div>
									<div style={{ paddingTop: 10 }}>
										<i className="icon-heart"></i>
										<span>Add to Wishlist</span>
									</div> */}
												</div>
											</Link>
											<div>
												<button disabled={!list[keyName].json.url_key} className="alsoLikeCardButton" onClick={() => this.openAddTOBasketModal(list[keyName].json.url_key)} style={{ width: '100%', borderRadius: '4px', marginBottom: '10px' }}>
													<FormattedMessage id="Product.Detail.addToBasket" defaultMessage="Add to basket" />
												</button>
											</div>
											<div>
												{list[keyName].json.offers && list[keyName].json.offers.status === 1 &&
													this.checkBuyAndMore(list[keyName].json.offers.data, keyName)
												}
											</div>
											<div className="buyAndSaveMorePopup" style={showPopupIndex === keyName ? { display: 'block' } : { display: 'none' }}>
												<i className="close fa fa-times" aria-hidden="true" onClick={() => this.closeBuyAndMore(keyName)} />
												<div style={{ marginTop: 40 }}>
													<i className="icon-cart basket iconBasket" />
												</div>
												<div style={{ padding: '0px 10px' }}>
													{list[keyName].json.offers && list[keyName].json.offers.status === 1 &&
														this.showMessageOnBuyAndMorePopup(list[keyName].json.offers.data, list[keyName].currency)
													}
												</div>
											</div>
										</li>
									)}
								</ul>
							</div>
							: <div><p style={{ fontSize: '22px', letterSpacing: '0.04em', fontWeight: 500, padding: '70px 25px 10px' }}><FormattedMessage id="NoData.Text" defaultMessage="No Data available." /></p></div>}
						{Object.keys(list).length > 0 ?
							<div className="start2 divShowOnWeb">
								<Row>
									<Col xs="3"></Col>
									<Col xs="6">
										<ul class="pagenation">
											<li className="PagenationLeftArrow" onClick={this.prevButton} style={this.state.pageNumber === 1 ? { opacity: "0.5" } : { opacity: 1 }}></li>
											<li className="number" onClick={() => this.ApplyPagenation(start)}><span className={this.state.pageNumber === start ? "selectedNumber" : ""}>{start}</span></li>
											{start + 1 <= this.state.totalPages ?
												<li className="number" onClick={() => this.ApplyPagenation(start + 1)}><span className={this.state.pageNumber === start + 1 ? "selectedNumber" : ""}>{start + 1}</span></li>
												: null}
											{start + 2 <= this.state.totalPages ?
												<li className="number" onClick={() => this.ApplyPagenation(start + 2)}><span className={this.state.pageNumber === start + 2 ? "selectedNumber" : ""}>{start + 2}</span></li>
												: null}
											{start + 3 <= this.state.totalPages ?
												<li className="number" onClick={() => this.ApplyPagenation(start + 3)}><span className={this.state.pageNumber === start + 3 ? "selectedNumber" : ""}>{start + 3}</span></li>
												: null}
											{start + 4 <= this.state.totalPages ?
												<li className="number" onClick={() => this.ApplyPagenation(end)}><span className={this.state.pageNumber === end ? "selectedNumber" : ""}>{end}</span></li>
												: null}
											<li className="PagenationRightArrow" onClick={this.nextButton} style={this.state.pageNumber === this.state.totalPages ? { opacity: "0.5" } : { opacity: 1 }}></li>
										</ul>
									</Col>
									<Col xs="3"></Col>
								</Row>
							</div>
							: ""}
						<div className="divShowOnMobile pagenation" style={{ padding: '10px 20px' }}>
							<ul class="">
								<li className="PagenationLeftArrow" id="iphone5Pagenation" onClick={this.prevButton} style={this.state.pageNumber === 1 ? { opacity: "0.5" } : { opacity: 1 }}></li>
								<li className="number" onClick={() => this.ApplyPagenation(start)}><span className={this.state.pageNumber === start ? "selectedNumber" : ""}>{start}</span></li>
								{start + 1 <= this.state.totalPages ?
									<li className="number" onClick={() => this.ApplyPagenation(start + 1)}><span className={this.state.pageNumber === start + 1 ? "selectedNumber" : ""}>{start + 1}</span></li>
									: null}
								{start + 2 <= this.state.totalPages ?
									<li className="number" onClick={() => this.ApplyPagenation(start + 2)}><span className={this.state.pageNumber === start + 2 ? "selectedNumber" : ""}>{start + 2}</span></li>
									: null}
								{start + 3 <= this.state.totalPages ?
									<li className="number" onClick={() => this.ApplyPagenation(start + 3)}><span className={this.state.pageNumber === start + 3 ? "selectedNumber" : ""}>{start + 3}</span></li>
									: null}
								{start + 4 <= this.state.totalPages ?
									<li className="number" onClick={() => this.ApplyPagenation(end)}><span className={this.state.pageNumber === end ? "selectedNumber" : ""}>{end}</span></li>
									: null}
								<li className="PagenationRightArrow" id="iphone5Pagenation" onClick={this.nextButton} style={this.state.pageNumber === this.state.totalPages ? { opacity: "0.5" } : { opacity: 1 }}></li>
							</ul>
						</div>
					</div>
				</Col>
			</Row>
		);
	}
}

const mapStateToProps = state => {
	return {
		globals: state.global,
		menu: state.menu.menuNavData,
		productDetails: state.productDetails.productData,
		user_details: state.login,
		cart_details: state.myCart,
		addToCardLoader: state.productDetails.addToCardLoader,
		guest_user: state.guest_user,
		item_added: state.item_added,
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onGetMenuNav: (payload) => dispatch(actions.getMenuNav(payload)),
		OngetMyCart: (quoteId) => dispatch(actions.getMyCart(quoteId)),
		onGetGuestCartId: () => dispatch(actions.getGuestCartId()),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductListData));
