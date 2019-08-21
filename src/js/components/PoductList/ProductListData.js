import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Container, Row, Col, Button } from 'reactstrap';

import percentage from '../../../assets/images/product-details/percentage.png';
import save from '../../../assets/images/product-details/save.png';
import logo1 from '../../../assets/images/you_may_also_like_1.png'

import home from '../../../assets/images/social/Hero.png';
import { th } from 'date-fns/esm/locale';
import StarRatings from 'react-star-ratings';

class ProductListData extends Component {
	constructor(props) {
		super(props);

	}

	componentWillMount() {
	}

	filter = (value) => {
		console.log(value)
	}

	render() {
		const { list } = this.props;
		console.log(list)
		return (
			<div className="homePage">
				<div className="start3">
					<div>
						<span className="blackTitle">Dolls</span>
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
											<option value="best seller">best seller</option>
											<option value="best seller">best seller</option>
											<option value="best seller">best seller</option>
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
												<button className="prevButton" style={{ width: "80%" }}>Prev</button>
											</Col>
											<Col xs="4">
												<span>Page 1 of 1</span>
											</Col>
											<Col xs="4">
												<button className="nextButton" style={{ width: "80%" }}>Next</button>
											</Col>
										</Row>
									</Col>
								</Row>
							</Col>
						</Row>
						<div className="divShowOnMobile">
							<Row>
								<Col xs="4">
									<button className="prevButton" style={{ width: "80%" }}>Prev</button>
								</Col>
								<Col xs="4">
									<span>Page 1 of 1</span>
								</Col>
								<Col xs="4">
									<button className="nextButton" style={{ width: "80%" }}>Next</button>
								</Col>
							</Row>
						</div>
					</div>
				</div>
				<div className="start">
					<ul className="products">
						{Object.keys(list).map((keyName) =>
							<li>
								<div className="alsoLikeCard">
									<span className="percentage-text" style={{ display: 'none' }}>30</span>
									<span className="save-text">{keyName}%</span>
									<img src={save} className="save" />
									<img src={list[keyName].json.imageUrl.primaryimage[0]} className="cardImage" />
									<img src={percentage} className="percentage" style={{ display: 'none' }} />
									<div style={{ marginTop: 10 }}>
										<label className="text-color">{list[keyName].json.name}</label>
									</div>
									<div>
										<span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>AED {list[keyName].price}.00</span><span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>AED 14.50</span>
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
										<span> {list[keyName].json.collection_desc} </span>
									</div>
									<div>
										<button className="alsoLikeCardButton CardButton">Add to Basket</button>
									</div>
									<div style={{ paddingTop: 10 }}>
										<i className="icon-heart"></i>
										<span>Add to Wishlist</span>
									</div>
								</div>
							</li>
						)}
						<li>
							<div className="alsoLikeCard">
								<span className="percentage-text" style={{ display: 'none' }}>30</span>
								<span className="save-text">5</span>
								<img src={save} className="save" />
								<img src={logo1} className="cardImage" />
								<img src={percentage} className="percentage" style={{ display: 'none' }} />
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
									<button className="alsoLikeCardButton CardButton">Add to Basket</button>
								</div>
								<div style={{ paddingTop: 10 }}>
									<i className="icon-heart"></i>
									<span style={{ paddingLeft: 7 }}>Add to Wishlist</span>
								</div>
							</div>
						</li>
						<li>
							<div className="alsoLikeCard">
								<span className="percentage-text" style={{ display: 'none' }}>30</span>
								<span className="save-text">5</span>
								<img src={save} className="save" />
								<img src={logo1} className="cardImage" />
								<img src={percentage} className="percentage" style={{ display: 'none' }} />
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
									<button className="alsoLikeCardButton CardButton">Add to Basket</button>
								</div>
								<div style={{ paddingTop: 10 }}>
									<i className="icon-heart"></i>
									<span style={{ paddingLeft: 7 }}>Add to Wishlist</span>
								</div>
							</div>
						</li>
						<li>
							<div className="alsoLikeCard">
								<span className="percentage-text" style={{ display: 'none' }}>30</span>
								<span className="save-text">5</span>
								<img src={save} className="save" />
								<img src={logo1} className="cardImage" />
								<img src={percentage} className="percentage" style={{ display: 'none' }} />
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
									<button className="alsoLikeCardButton CardButton">Add to Basket</button>
								</div>
								<div style={{ paddingTop: 10 }}>
									<i className="icon-heart"></i>
									<span style={{ paddingLeft: 7 }}>Add to Wishlist</span>
								</div>
							</div>
						</li>
						<li>
							<div className="alsoLikeCard">
								<span className="percentage-text" style={{ display: 'none' }}>30</span>
								<span className="save-text">5</span>
								<img src={save} className="save" />
								<img src={logo1} className="cardImage" />
								<img src={percentage} className="percentage" style={{ display: 'none' }} />
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
									<button className="alsoLikeCardButton CardButton">Add to Basket</button>
								</div>
								<div style={{ paddingTop: 10 }}>
									<i className="icon-heart"></i>
									<span style={{ paddingLeft: 7 }}>Add to Wishlist</span>
								</div>
							</div>
						</li>

					</ul>
				</div>
				<div className="start2">
					<Row>
						<Col xs="2"></Col>
						<Col xs="8">
							<Row>
								<Col xs="4">
									<button className="prevButton">Prev</button>
								</Col>
								<Col xs="4">
									<span>Page 1 of 1</span>
								</Col>
								<Col xs="4">
									<button className="nextButton">Next</button>
								</Col>
							</Row>
						</Col>
						<Col xs="2"></Col>
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
