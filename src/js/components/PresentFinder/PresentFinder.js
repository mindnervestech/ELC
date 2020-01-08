import React, { Component } from 'react'
import './PresentFinder.css';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../redux/actions/index';
 class PresentFinder extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sortByShowOption: false,
		}
	}

	showSortByOption = () => {

		if (this.state.sortByShowOption) {
			this.setState({ sortByShowOption: false })
		} else {
			this.setState({ sortByShowOption: true })
		}

	}
	render() {
		let store_locale=this.props.globals.store_locale
		return (
			<>
				<Row>
					<Col xs={1} lg={4} md={2}>
				
					</Col>
					<Col xs={10} lg={4} md={8} className="mobile-width-class" >
					<div style={{margin:10}} className="padding-right-ar">  
            <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
              <span className="titleHover" style={{fontSize:15}}><FormattedMessage id="Checkout.Home" defaultMessage="Home"/></span><span>&nbsp;\&nbsp;&nbsp;</span>
            </Link>	
            <span  style={{fontSize:15, fontWeight: 'bold'}}><FormattedMessage id="presentfinder" defaultMessage="Present Finder"/></span>
          </div>
						<div>
							<div>
								<h1 className="present_finder_header">Present Finder</h1>
							</div>
							<div>
								<div>
									<h2 className="present_finder_age_header">Age</h2>
								</div>
								<div>
									<div style={{position:'relative', marginBottom:30}}>
										<div className={this.state.sortByShowOption ? "sortBySelectedText open present-finder-h" : "sortBySelectedText present-finder-h"} onClick={() => this.showSortByOption()}>
											<span>{this.state.sortByText != "" ? this.state.sortByText : <span>Text</span>}</span>
											<i className="icon-down sortBySelectedTextIcon" ></i>
										</div>
										<div >
											<div className="sortByOption" style={this.state.sortByShowOption ? { display: 'block',overflow:'scroll' } : { display: 'none' }}>

												<div className="sortByOptionText" >
													<span>{''}</span>
												</div>

												<div className="sortByOptionText" >
													<span>0-3 months</span>
												</div>
												<div className="sortByOptionText" >
													<span>3-6 months</span>
												</div>
												<div className="sortByOptionText" >
													<span>6-12 months</span>
												</div>
												<div className="sortByOptionText" >
													<span>1-2 years</span>
												</div>
												<div className="sortByOptionText" >
													<span>2-3 years</span>
												</div>
												<div className="sortByOptionText" >
													<span>3-4 years</span>
												</div>
												<div className="sortByOptionText" >
													<span>4+ years</span>
												</div>
											</div>
										</div>
									</div>
									<div>
										<h2 className="present_finder_age_header"><FormattedMessage id="budget" defaultMessage="Budget"/>:</h2>
									</div>
									<div>
										<ul>
											<li>
												<div className="checkbox">
													<label className="control-label " forName="">
														<input id="present_finder2_gender2_0" type="checkbox" name="budget" value="£0 - £14.99" />
														<span></span>
													</label>
													<label className="lable-class" forName="present_finder2_gender2_0">£0 - £14.99</label><br />
												</div>


											</li>
											<li>
												<div className="checkbox">
													<label className="control-label " forName="">
														<input id="present_finder2_gender2_1" type="checkbox" name="budget" value="£15 - £29.99" />
														<span></span>
													</label>
													<label className="lable-class" forName="present_finder2_gender2_1">£15 - £29.99</label><br />
												</div>
											</li>
											<li>
												<div className="checkbox">
													<label className="control-label " forName="">
														<input id="present_finder2_gender2_2" type="checkbox" name="budget" value="£30 - £44.99" />
														<span></span>
													</label><label className="lable-class" forName="present_finder2_gender2_2">£30 - £44.99</label><br />
												</div>
											</li>
											<li>
												<div className="checkbox">
													<label className="control-label " forName="">
														<input id="present_finder2_gender2_3" type="checkbox" name="budget" value="£45 - £59.99" />
														<span></span>
													</label>

													<label className="lable-class" forName="present_finder2_gender2_3">£45 - £59.99</label><br />
												</div>

											</li>
											<li>
												<div className="checkbox">
													<label className="control-label " forName="">
														<input id="present_finder2_gender2_4" type="checkbox" name="budget" value="£60 - £74.99" />
														<span></span>
													</label>
													<label className="lable-class" forName="present_finder2_gender2_4">£60 - £74.99</label><br />
												</div>
											</li>
											<li>
												<div className="checkbox">
													<label className="control-label" forName="">
														<input id="present_finder2_gender2_5" type="checkbox" name="budget" value="£75+" />
														<span></span>
													</label>
													<label className="lable-class" forName="present_finder2_gender2_5">£75+</label><br />
												</div>
											</li>
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
			</>
		)
	}
}


const mapStateToProps = state => {
	return {
	
		globals:state.global
 	}
}


export default connect(mapStateToProps)(PresentFinder);