import React, { Component } from 'react'
import './PresentFinder.css';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../redux/actions/index';
import Spinner from '../Spinner/Spinner';
import { store } from '../../redux/store/store'
import { getPresentFinderData } from '../../redux/actions/getAndSetPresentfinder';
let checkBoxSelection = [];

let priceArray = ['£0 - £14.99', '£15 - £29.99', '£30 - £44.99', '£45 - £59.99', '£60 - £74.99', '£75+']
let present_finder_age_array = {};

class PresentFinder extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sortByShowOption: false,
			showCheckBoxSelected: false,
			sortByText: '',
			age:0,
			priceTo:0,
			priceFrom:0,

		}


	}
	componentDidMount() {
		let storeid = this.props.globals.currentStore && this.props.globals.currentStore;
		let data = { storeid: storeid }

		this.props.OnGetPresentFinderData(data)
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.present_finder_age_data.present_finder_data) {
			present_finder_age_array = nextProps.present_finder_age_data.present_finder_data
		}

	}

	setPriceRange = (item, index) => {

		for (let i = 0; i < priceArray.length; i++) {
			if (i === index) {

				if (checkBoxSelection[index] === true) {
					checkBoxSelection[index] = false;
				} else {
					checkBoxSelection[index] = true;
				}
			}
		}
		this.forceUpdate();
	}

	// showDataOnMonthSelection = () => {
	// 	this.setState({ sortByShowOption: true })
	// }

	showSortByOption = () => {

		if (this.state.sortByShowOption) {
			this.setState({ sortByShowOption: false })
		} else {
			this.setState({ sortByShowOption: true })
		}
		// this.forceUpdate();
	}
	showSelectedMonths = (value) => {
		let present_finder_age=store.getState().presentfinder.present_finder_data
		let id=0
		Object.entries(present_finder_age).map((item,index)=>{
			if(item[1]===value){ 
                id=item[0];
            }
		})
		this.state.sortByText =value;
		this.setState({ sortByShowOption: false })
		this.forceUpdate()
	}


	_renderPresentFinderInfo = () => {

	}
	render() {
		let store_locale = this.props.globals.store_locale

		let _renderAgeArray = present_finder_age_array && Object.values(present_finder_age_array).map((item, index) => (
			<div style={{ cursor: 'pointer' }} className="sortByOptionText" >
				<span onClick={() => this.showSelectedMonths(item)}>{item}</span>
			</div>
		));


		let _renderPriceArray = priceArray.map((item, index) => (

			<li>
				<div className="checkbox">
					<div style={{ position: 'relative' }}>
						<div onClick={() => this.setPriceRange(item, index)} className={(checkBoxSelection[index] ? "likeAInputSelected" : "likeAInputNotSelected")}>
							<div class="likeAInput"></div></div>
						<div class="likeAInputName"><label className="lable-class" forName="present_finder2_gender2_0">{item}</label></div></div>
					<br />
				</div>
			</li>

		));
		return (
			<Spinner>
				<Row>
					<Col xs={1} lg={4} md={2}>
						<div style={{ margin: 10 }} className="padding-right-ar">
							<Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
								<span className="titleHover" style={{ fontSize: 15 }}><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></span><span>&nbsp;\&nbsp;&nbsp;</span>
							</Link>
							<span style={{ fontSize: 15, fontWeight: 'bold' }}><FormattedMessage id="presentfinder" defaultMessage="Present Finder" /></span>
						</div>
					</Col>
					<Col xs={10} lg={4} md={8} className="mobile-width-class" >

						<div style={{ margin: 10 }}>
							<div>
								<h1 className="present_finder_header">Present Finder</h1>
							</div>
							<div>
								<div>
									<h2 className="present_finder_age_header">Age</h2>
								</div>
								<div>
									<div style={{ position: 'relative', cursor: 'pointer', marginBottom: 30 }}>
										<div className={this.state.sortByShowOption ? "sortBySelectedText open present-finder-h" : "sortBySelectedText present-finder-h"} onClick={() => this.showSortByOption()}>
											<span>{this.state.sortByText != "" ? this.state.sortByText : <span>Please Select...</span>}</span>
											<i className="icon-down sortBySelectedTextIcon" ></i>
										</div>
										<div >
											<div className="sortByOption" style={this.state.sortByShowOption ? { display: 'block', overflow: 'scroll' } : { display: 'none' }}>
												{_renderAgeArray}
												{/* <div className="sortByOptionText" >
													<span></span>
												</div>


												<div style={{ cursor: 'pointer' }} className="sortByOptionText" >
													<span onClick={() => this.showSelectedMonths('0-3 months', '0-3 months')}>3-6 months</span>
												</div>
												<div style={{ cursor: 'pointer' }} className="sortByOptionText" >
													<span onClick={() => this.showSelectedMonths('0-3 months', '0-3 months')}>6-12 months</span>
												</div>
												<div style={{ cursor: 'pointer' }} className="sortByOptionText" >
													<span onClick={() => this.showSelectedMonths('0-3 months', '0-3 months')}>1-2 years</span>
												</div>
												<div style={{ cursor: 'pointer' }} className="sortByOptionText" >
													<span onClick={() => this.showSelectedMonths('0-3 months', '0-3 months')}>2-3 years</span>
												</div>
												<div style={{ cursor: 'pointer' }} className="sortByOptionText" >
													<span onClick={() => this.showSelectedMonths('0-3 months', '0-3 months')}>3-4 years</span>
												</div>
												<div style={{ cursor: 'pointer' }} className="sortByOptionText" >
													<span onClick={() => this.showSelectedMonths('0-3 months', '0-3 months')}>4+ years</span>
												</div> */}
											</div>
										</div>
									</div>
									<div>
										<h2 className="present_finder_age_header"><FormattedMessage id="budget" defaultMessage="Budget" />:</h2>
									</div>
									<div>
										<ul>
											{_renderPriceArray}
											{/* <li>
												<div className="checkbox">
													<div style={{ position: 'relative' }}>
														<div onClick={() => this.getCheckedCheckboxesFor('check-1')} className={(checkBoxSelection[0] ? "likeAInputSelected" : "likeAInputNotSelected")}>
															<div class="likeAInput"></div></div>
														<div class="likeAInputName"><label className="lable-class" forName="present_finder2_gender2_0">£0 - £14.99</label></div></div>
													<br />
												</div>
											</li>

											<li>
												<div className="checkbox">
													<div style={{ position: 'relative' }}>
														<div onClick={() => this.getCheckedCheckboxesFor('check-2')} className={(checkBoxSelection[1] ? "likeAInputSelected" : "likeAInputNotSelected")}>
															<div class="likeAInput"></div></div>
														<div class="likeAInputName"><label className="lable-class" forName="present_finder2_gender2_2">£30 - £44.99</label></div></div>
													<br />
												</div>
											</li>

											<li>
												<div className="checkbox">
													<div style={{ position: 'relative' }}>
														<div onClick={() => this.getCheckedCheckboxesFor('check-3')} className={(checkBoxSelection[2] ? "likeAInputSelected" : "likeAInputNotSelected")}>
															<div class="likeAInput"></div></div>
														<div class="likeAInputName"><label className="lable-class" forName="present_finder2_gender2_3">£45 - £59.99</label></div></div>
													<br />
												</div>
											</li>
											<li>
												<div className="checkbox">
													<div style={{ position: 'relative' }}>
														<div onClick={() => this.getCheckedCheckboxesFor('check-4')} className={(checkBoxSelection[3] ? "likeAInputSelected" : "likeAInputNotSelected")}>
															<div class="likeAInput"></div></div>
														<div class="likeAInputName"><label className="lable-class" forName="present_finder2_gender2_4">£60 - £74.99</label></div></div>
													<br />
												</div>
											</li>
											<li>
												<div className="checkbox">
													<div style={{ position: 'relative' }}>
														<div onClick={() => this.getCheckedCheckboxesFor('check-5')} className={(checkBoxSelection[4]? "likeAInputSelected" : "likeAInputNotSelected")}>
															<div class="likeAInput"></div></div>
														<div class="likeAInputName"><label className="lable-class" forName="present_finder2_gender2_1">£15 - £29.99</label></div></div>
													<br />
												</div>
											</li>
											<li>
												<div className="checkbox">
													<div style={{ position: 'relative' }}>
														<div onClick={() => this.getCheckedCheckboxesFor('check-6')} className={(checkBoxSelection[5] ? "likeAInputSelected" : "likeAInputNotSelected")}>
															<div class="likeAInput"></div></div>
														<div class="likeAInputName"><label className="lable-class" forName="present_finder2_gender2_5">£75+</label></div></div>
													<br />
												</div>
											</li> */}

										</ul>
									</div>
									<div>
										<div className="borderLine"></div>
										<div class="multi_holder button_holder results">
											<p><span>0</span>&nbsp;results found</p>
											<button className="findPresentButton">Find Presents</button>
										</div>

									</div>
								</div>
							</div>
						</div>
					</Col>
					<Col xs={1} lg={4} md={2}></Col>
				</Row>
			</Spinner>

		)
	}
}


const mapStateToProps = state => {
	return {
		globals: state.global,
		present_finder_age_data: state.presentfinder
	}
}
const mapDispatchToProps = dispatch => {
	return {
		OnGetPresentFinderData: payload => dispatch(actions.getPresentFinderData(payload))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(PresentFinder);