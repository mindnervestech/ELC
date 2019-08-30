import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Container, Row, Col, Button } from 'reactstrap';

import percentage from '../../../assets/images/product-details/percentage.png';
import save from '../../../assets/images/product-details/save.png';
import logo1 from '../../../assets/images/you_may_also_like_1.png'
import placeholder from '../../../assets/images/placeholder.png'

import home from '../../../assets/images/social/Hero.png';
import { th } from 'date-fns/esm/locale';
import StarRatings from 'react-star-ratings';
import SideManu from './SideManu';

var _ = require('lodash');

let productListData = {}
let productList = {}
let pagenationCount = 8


class ProductListData extends Component {
	constructor(props) {
		super(props);
		productListData = this.props.list.product_data
		productList = this.props.list.product_data
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
		if (count % pagenationCount == 0) {
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
		};
	}

	handler(id) {
		productList = id
		this._closeSlider()
		let count = 0
		for (var element in productList) {
			count++
		}
		let totalPages = 1
		if (count % pagenationCount == 0) {
			totalPages = count / pagenationCount
		} else {
			totalPages = Math.floor(count / pagenationCount) + 1
		}
		this.setState({ totalPages: totalPages, pageNumber: 1 })
		this.state.check = true
		this.pagenation(1, pagenationCount)
	}

	componentWillMount() {

	}

	pagenation = (start, end) => {
		this.state.list1 = {}
		for (var element in productList) {
			if (element >= start && element <= end) {
				this.state.list1[element] = productList[element]
			}
		}
		this.setState({ list1: this.state.list1 })
	}



	prevButton = () => {
		if (this.state.pageNumber != 1) {
			this.setState({ pageNumber: this.state.pageNumber - 1 })
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
		if (this.state.pageNumber != this.state.totalPages) {
			this.setState({ pageNumber: this.state.pageNumber + 1 })
			if (this.state.check) {
				let value = pagenationCount * this.state.pageNumber + 1
				this.pagenation(value, value + pagenationCount - 1)
			} else {
				let value = pagenationCount * this.state.pageNumber
				this.pagenation(value, value + pagenationCount - 1)
			}
		}
	}


	filter = (value) => {
		if (value.target.value == "price_desc") {
			const sortData = _.values(productList).sort((a, b) => b.price - a.price);
			productList = sortData
			this.state.pageNumber = 1
			this.state.check = false
			this.pagenation(0, pagenationCount - 1)
		} else if (value.target.value == 'price_asc') {
			const sortData = _.values(productList).sort((a, b) => a.price - b.price);
			productList = sortData
			this.state.pageNumber = 1
			this.state.check = false
			this.pagenation(0, pagenationCount - 1)
		} else {
			productList = productListData
			this.state.check = true
			this.pagenation(1, pagenationCount)
		}
	}

	viewAll = () => {
		productList = productListData
		let count = 0
		for (var element in productList) {
			count++
		}
		let totalPages = 1
		if (count % pagenationCount == 0) {
			totalPages = count / pagenationCount
		} else {
			totalPages = Math.floor(count / pagenationCount) + 1
		}
		this.setState({ totalPages: totalPages, pageNumber: 1 })
		this.state.check = true
		this.pagenation(1, pagenationCount)
	}

	_callFilters = () => {
		this.setState({ showFilterOnMobile: true })
	};

	_closeSlider = () => {
		this.setState({ showFilterOnMobile: false })
	};

	render() {
		const list = this.state.list1
		const store_locale = this.props.globals.store_locale
		return (
			<Row>
				<Col xs="3" lg="3" md="3" className="divShowOnWeb">
					<SideManu action={this.handler}></SideManu>
				</Col>
				<Col xs="12" lg="9" md="9" style={{ padding: 0 }}>
					<div className="divShowOnMobile" style={{ width: '100%', position: 'absolute', top: '-2%' }}>
						<div
							id="R29005156978427060"
							className="t-BreadcrumbRegion h-hidden-desktop t-BreadcrumbRegion--showBreadcrumb t-BreadcrumbRegion--useBreadcrumbTitle"
						>
							<div className="t-BreadcrumbRegion-body">
								<div className="t-BreadcrumbRegion-breadcrumb">
									<ul className="mobile-filter" style={{ borderBottom: 'solid 1px #b1b1b1', borderTop: 'solid 1px #b1b1b1' }}>
										<li id="cd-cart-trigger" onClick={this._callFilters} style={{ borderRight: 'solid 1px #b1b1b1' }}>
											<FormattedMessage id="Product.Listing.FilterBy" defaultMessage="Filter by" />
										</li>
										<li>
											<div><FormattedMessage id="Product.Listing.SortBy" defaultMessage="Sort by" /></div>
										</li>
									</ul>
								</div>
							</div>
							<div className="t-BreadcrumbRegion-buttons" />
						</div>
						<div className="sortDroupDownOnMobile">
							<select placeholder={'Filter'} onChange={this.filter} style={{ height: 50, width: '100%', color: 'transparent', backgroundColor: 'transparent', border: 'none' }}>
								<FormattedMessage id="Product.Listing.Relevance" defaultMessage="Relevance">
									{(message) =>
										<option value="relevance">{message}</option>
									}
								</FormattedMessage>
								<FormattedMessage id="Product.Listing.PriceHTL" defaultMessage="Price (High to Low)">
									{(message) =>
										<option value="price_desc">{message}</option>
									}
								</FormattedMessage>
								<FormattedMessage id="Product.Listing.PriceLTH" defaultMessage="Price (Low to High)">
									{(message) =>
										<option value="price_asc">{message}</option>
									}
								</FormattedMessage>
							</select>
						</div>

						<div className="row">
							<div className="col col-12 apex-col-auto">
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
												<span className="t-Button-label">Done</span>
											</button>
											<span className="js-maximizeButtonContainer" />
										</div>
									</div>
									<div className="t-Region-bodyWrap">
										<div className="t-Region-buttons t-Region-buttons--top">
											<div className="t-Region-buttons-left" />
											<div className="t-Region-buttons-right" />
										</div>
										<SideManu action={this.handler}></SideManu>
										<div className="t-Region-buttons t-Region-buttons--bottom">
											<div className="t-Region-buttons-left" />
											<div className="t-Region-buttons-right" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="homePage">
						<div className="start3">
							<div>
								<span className="blackTitle">{this.props.list.category_name}</span>
							</div>
							<div style={{ height: 22 }}>
								<span>{this.props.list.category_description}</span>
							</div>
							<div style={{ paddingTop: 25 }}>
								<Row className="divShowOnWeb">
									<Col xs="5">
										<Row>
											<Col xs="3">
												<span className="blackTitle"><FormattedMessage id="Product.Listing.SortBy" defaultMessage="Sort by" /></span>
											</Col>
											<Col xs="6" style={{ padding: 0 }}>
												<select placeholder={'Filter'} onChange={this.filter}>
													<FormattedMessage id="Product.Listing.Relevance" defaultMessage="Relevance">
														{(message) =>
															<option value="relevance">{message}</option>
														}
													</FormattedMessage>
													<FormattedMessage id="Product.Listing.PriceHTL" defaultMessage="Price (High to Low)">
														{(message) =>
															<option value="price_desc">{message}</option>
														}
													</FormattedMessage>
													<FormattedMessage id="Product.Listing.PriceLTH" defaultMessage="Price (Low to High)">
														{(message) =>
															<option value="price_asc">{message}</option>
														}
													</FormattedMessage>
												</select>
											</Col>
											<Col xs="3">
												<span className="viewAll" onClick={() => this.viewAll()}><FormattedMessage id="profile.ViewAll.Title" defaultMessage="View all" /></span>
											</Col>
										</Row>
									</Col>
									<Col xs="7">
										<Row>
											<Col xs="2"></Col>
											<Col xs="10">
												<Row>
													<Col xs="4">
														<button onClick={this.prevButton} className={this.state.pageNumber == 1 ? "prevButton" : "nextButton"} style={{ width: "80%" }}>Prev</button>
													</Col>
													<Col xs="4">
														<span>Page {this.state.pageNumber} of {this.state.totalPages}</span>
													</Col>
													<Col xs="4">
														<button onClick={this.nextButton} className={this.state.totalPages == this.state.pageNumber ? "prevButton" : "nextButton"} style={{ width: "80%" }}>Next</button>
													</Col>
												</Row>
											</Col>
										</Row>
									</Col>
								</Row>
								<div className="divShowOnMobile">
									<Row>
										<Col xs="4">
											<button onClick={this.prevButton} className={this.state.pageNumber == 1 ? "prevButton" : "nextButton"} style={{ width: "80%" }}>Prev</button>
										</Col>
										<Col xs="4">
											<span>Page {this.state.pageNumber} of {this.state.totalPages}</span>
										</Col>
										<Col xs="4">
											<button onClick={this.nextButton} className={this.state.totalPages == this.state.pageNumber ? "prevButton" : "nextButton"} style={{ width: "80%" }}>Next</button>
										</Col>
									</Row>
								</div>
							</div>
						</div>
						<div className="start">
							<ul className="products">
								{Object.keys(list).map((keyName, index) =>
									<Link to={`/${store_locale}/products-details/${list[keyName].json.url_key}`}>
										<li key={index}>
											<div className="alsoLikeCard">
												{/* <span className="percentage-text" style={{ display: 'none' }}>30</span>
									<span className="save-text">5</span>
									<img src={save} className="save" /> */}
												<img src={(list[keyName].json.imageUrl) ? list[keyName].json.imageUrl.primaryimage : placeholder} className="cardImage" />
												{/* <img src={percentage} className="percentage" style={{ display: 'none' }} /> */}
												<div style={{ marginTop: 10 }}>
													<label className="text-color">{list[keyName].json.name}</label>
												</div>
												<div>
													<span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>{list[keyName].currency} {list[keyName].price}.00</span>
													{/* <span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>AED 14.50</span> */}
												</div>
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
										<span> {list[keyName].json.filtersdata.age[7]}</span>
									</div>
												{/* <div>
										<button className="alsoLikeCardButton CardButton">Add to Basket</button>
									</div>
									<div style={{ paddingTop: 10 }}>
										<i className="icon-heart"></i>
										<span>Add to Wishlist</span>
									</div> */}
											</div>
										</li>
									</Link>
								)}
							</ul>
						</div>
						<div className="start2 divShowOnWeb">
							<Row>
								<Col xs="2"></Col>
								<Col xs="8">
									<Row>
										<Col xs="4">
											<button onClick={this.prevButton} className={this.state.pageNumber == 1 ? "prevButton" : "nextButton"}>Prev</button>
										</Col>
										<Col xs="4">
											<span>Page {this.state.pageNumber} of {this.state.totalPages}</span>
										</Col>
										<Col xs="4">
											<button onClick={this.nextButton} className={this.state.totalPages == this.state.pageNumber ? "prevButton" : "nextButton"}>Next</button>
										</Col>
									</Row>
								</Col>
								<Col xs="2"></Col>
							</Row>
						</div>
						<div className="divShowOnMobile" style={{ padding: '18px 10px', textAlign: 'center' }}>
							<Row>
								<Col xs="4">
									<button onClick={this.prevButton} className={this.state.pageNumber == 1 ? "prevButton" : "nextButton"} style={{ width: "80%" }}>Prev</button>
								</Col>
								<Col xs="4">
									<span>Page {this.state.pageNumber} of {this.state.totalPages}</span>
								</Col>
								<Col xs="4">
									<button onClick={this.nextButton} className={this.state.totalPages == this.state.pageNumber ? "prevButton" : "nextButton"} style={{ width: "80%" }}>Next</button>
								</Col>
							</Row>
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
		menu: state.menu.menuNavData
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onGetMenuNav: (payload) => dispatch(actions.getMenuNav(payload)),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductListData));
