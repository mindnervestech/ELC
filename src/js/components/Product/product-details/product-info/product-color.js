import React, { Component } from 'react';
import * as actions from '../../../../redux/actions/index';
import { connect } from 'react-redux';
import Slider from "react-slick";

let selectColorOnFirst = true;
class ProductColor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			simpleproducts: [],
		};
		selectColorOnFirst = true;
	}

	componentDidUpdate(prevProps, prevState) {
		const { productColor } = this.props;
		
	}

	handleChange = item => {
		const data = {
			option: [
				{
					option_id: item.option_id,
					option_value: item.option_value,
				},
			],
			selectedColor: item.text,
			selectedVal: true,
		};
		//console.log('itemas', data);
		this.props.onGetColor(data);
	};

	_getUnique = (arr, comp) => {
		const unique = arr
			.map(e => e[comp])
			// store the keys of the unique objects
			.map((e, i, final) => final.indexOf(e) === i && i)
			// eliminate the dead keys & store unique objects
			.filter(e => arr[e])
			.map(e => arr[e]);
		return unique;
	};

	render() {
		const { productColor } = this.props;

			const settings3 = {
				autoplay: true,
				autoplaySpeed: 6000,
				dots: false,
				infinite: true,
				slidesToShow: 4,
				slidesToScroll: 1,
				speed: 600,
				vertical: false,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						}
					}
				]
			}

			return (
				<section id="color" data-name="color" data-selector-wrapper className="recently-view-section" style={{background: '#EEF8F2'}}>
					
					<div className="col col-12 apex-col-auto">
						<div className="row you-may-like-title padd-left-remove" style={{background: '#EEF8F2'}}>
							<h2 style={{borderBottom: '2px solid #0D943F'}}/>
							<label style={{color: '#0D943F'}}>
								Recently viewed
                            </label>
							<h2 style={{borderBottom: '2px solid #0D943F'}}/>
						</div>
						<div className="row data" id="recently-view">
							<div className="col col-12 apex-col-auto homeBlock">
								<div id="R36275003485418909" className="homePage">
									<section className="trendingBlock2 recently-view" style={{background: '#EEF8F2' }}>
										<div className="wrap">
											<div className="trendingList">
												<Slider {...settings3}>

													<div className="alsoLikeCard1" >
														{/* <img src={logo1} /> */}
														<div style={{ marginTop: 20 }}>
															<span className="text-color">Twist and Turn Activity House</span>
														</div>
														<div style={{ marginTop: 10 }}>
															<span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>£12.00</span><span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>£14.50</span>
														</div>
														<div>
															<button className="alsoLikeCardButton">add to basket</button>
														</div>
													</div>

													<div className="alsoLikeCard1">
														{/* <img src={logo2} /> */}
														<div style={{ marginTop: 20 }}>
															<span className="text-color">Twist and Turn Activity House</span>
														</div>
														<div style={{ marginTop: 10 }}>
															<span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>£12.00</span><span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>£14.50</span>
														</div>
														<div>
															<button className="alsoLikeCardButton">add to basket</button>
														</div>
													</div>

													<div className="alsoLikeCard1">
														{/* <img src={logo3} /> */}
														<div style={{ marginTop: 20 }}>
															<span className="text-color">Twist and Turn Activity House</span>
														</div>
														<div style={{ marginTop: 10 }}>
															<span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>£12.00</span><span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>£14.50</span>
														</div>
														<div>
															<button className="alsoLikeCardButton">add to basket</button>
														</div>
													</div>

													<div className="alsoLikeCard1">
														{/* <img src={logo4} /> */}
														<div style={{ marginTop: 20 }}>
															<span className="text-color">Twist and Turn Activity House</span>
														</div>
														<div style={{ marginTop: 10 }}>
															<span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>£12.00</span><span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>£14.50</span>
														</div>
														<div>
															<button className="alsoLikeCardButton">add to basket</button>
														</div>
													</div>

													<div className="alsoLikeCard1">
														{/* <img src={logo2} /> */}
														<div style={{ marginTop: 20 }}>
															<span className="text-color">Twist and Turn Activity House</span>
														</div>
														<div style={{ marginTop: 10 }}>
															<span style={{ fontSize: 14, color: "#0D943F", fontWeight: "bold" }}>£12.00</span><span style={{ color: "gray", textDecorationLine: 'line-through', fontSize: 14, marginLeft: 10 }}>£14.50</span>
														</div>
														<div>
															<button className="alsoLikeCardButton">add to basket</button>
														</div>
													</div>
												</Slider>
											</div>
										</div>
									</section>
								</div>
							</div>
						</div>
					</div>
				</section>
			);
		// } else {
		// 	return false;
		// }
	}
}

const mapStateToProps = state => {
	//console.log('color', state.productDetails.productColor);

	return {
		globals: state.global,
		productDetails: state.productDetails.productColor,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetColor: payload => dispatch(actions.getColor(payload)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductColor);
