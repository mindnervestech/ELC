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

var _ = require('lodash');

let productList = {} 
let pagenationCount = 8


class ProductListData extends Component {
	constructor(props) {
		super(props);
		productList = this.props.list.product_data
		let totalPages = 1
		let count = 0
		let pageNumber = 1
		let start = 1 * pageNumber
		let end = pagenationCount * pageNumber
		let list1 = {}
		for(var element in productList){
			if(element >= start && element <= end ){
				list1[element] = productList[element]
			}
			count = count + 1
		}
		if(count % pagenationCount == 0){
			totalPages = count / pagenationCount
		}else{
			totalPages = (count / pagenationCount) + 1
		}
		
		this.state = {
			totalPages : totalPages,
			pageNumber : 1,
			list1 : list1,
			start: 1,
			end: pagenationCount,
		};
	}

	componentWillMount() {
		
	}

	getSortBy = (value) => {
		// sortbyv = value;
		// if (data == null) {
		// 	if (value == "price_desc") {
		// 		const sortData = _.values(this.props.filterProductList).sort((a, b) => b.price - a.price);
		// 		//consoleconsole.log("sortData",sortData)
		// 		this.props.saveFilterData(sortData);
		// 	} else if (value == 'price_asc') {
		// 		const sortData = _.values(this.props.filterProductList).sort((a, b) => a.price - b.price);
		// 		this.props.saveFilterData(sortData);
		// 	} else {
		// 		const data = this.multiPropsFilter(newFilter);
		// 		this.props.saveFilterData(data);
		// 	}
		// } else {
		// 	if (value == "price_desc") {
		// 		const sortData = _.values(productList).sort((a, b) => b.price - a.price);
		// 		this.setState({list1: sortData});
		// 	} else if (value == 'price_asc') {
		// 		const sortData = _.values(productList).sort((a, b) => a.price - b.price);
		// 		this.setState({list1: sortData});
		// 	} else {
		// 		//const data = this.multiPropsFilter(newFilter);
		// 		this.props.saveFilterData(productList);
		// 	}
		// }

		if (value == "price_desc") {
			const sortData = _.values(productList).sort((a, b) => b.price - a.price);
			this.setState({list1: sortData});
		} else if (value == 'price_asc') {
			const sortData = _.values(productList).sort((a, b) => a.price - b.price);
			this.setState({list1: sortData});
		} else {
			//this.props.saveFilterData(productList);
		}
	}

	pagenation = (start , end) => {
		this.state.list1 = {}
		for(var element in productList){
			if(element >= start && element <= end ){
				this.state.list1[element] = productList[element]
			}
		}
		this.setState({list1: this.state.list1})
	}

	prevButton = () => {
		if(this.state.pageNumber != 1){
			this.setState({pageNumber: this.state.pageNumber - 1})
			setTimeout(() => {
				console.log(this.state.pageNumber)
				let value = pagenationCount * (this.state.pageNumber - 1) + 1
				this.pagenation(value , value + pagenationCount - 1)
			}, 500);
		}
	}

	nextButton = () => {
		if(this.state.pageNumber != this.state.totalPages){
			this.setState({pageNumber: this.state.pageNumber + 1})
			let value = pagenationCount * this.state.pageNumber + 1
			this.pagenation(value , value + pagenationCount -1)
		}
	}

	filter = (value) => {
		
	}

	render() {
		const list  = this.state.list1
		
		return (
			<div className="homePage">
				<div className="start3">
					<div>
						<span className="blackTitle">{this.props.list.category_name}</span>
					</div>
					<div>
						<span>Let your imagination run free with dolls and the endless role playing options they provide </span>
					</div>
					<div style={{ paddingTop: 25 }}>
						<Row className="divShowOnWeb">
							<Col xs="5">
								<Row>
									<Col xs="3">
										<span className="blackTitle">Sort by</span>
									</Col>
									<Col xs="6" style={{ padding: 0 }}>
										<select placeholder={'Filter'} onChange={this.filter}>
											{/* <option value="best seller" onClick={(e) => this.getSortBy('relevance')}>Relevance</option>
											<option value="best seller" onClick={(e) => this.getSortBy('price_desc')}>Price (High to Low)</option>
											<option value="best seller" onClick={(e) => this.getSortBy('price_asc')}>Price (Low to High)</option> */}

											<option value="best seller">Relevance</option>
											<option value="best seller">Price (High to Low)</option>
											<option value="best seller">Price (Low to High)</option>
										</select>
									</Col>
									<Col xs="3">
										<span className="viewAll">View all</span>
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
						{Object.keys(list).map((keyName,index) =>
							<li key={index}>
								<div className="alsoLikeCard">
									{/* <span className="percentage-text" style={{ display: 'none' }}>30</span>
									<span className="save-text">5</span>
									<img src={save} className="save" /> */}
									<img src={list[keyName].json.imageUrl.primaryimage != "" ? list[keyName].json.imageUrl.primaryimage : placeholder} className="cardImage" />
									{/* <img src={percentage} className="percentage" style={{ display: 'none' }} /> */}
									<div style={{ marginTop: 10 }}>
										<label className="text-color">{list[keyName].json.name}</label>
									</div>
									<div>
										<span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>{list[keyName].currency } {list[keyName].price}.00</span><span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>AED 14.50</span>
									</div>
									{/* <div style={{ paddingTop: 10 }}>
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
										<span> 3 - 10 year </span>
									</div> */}
									{/* <div>
										<button className="alsoLikeCardButton CardButton">Add to Basket</button>
									</div>
									<div style={{ paddingTop: 10 }}>
										<i className="icon-heart"></i>
										<span>Add to Wishlist</span>
									</div> */}
								</div>
							</li>
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
				<div className="divShowOnMobile" style={{ padding: '18px 10px', textAlign: 'center'}}>
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
