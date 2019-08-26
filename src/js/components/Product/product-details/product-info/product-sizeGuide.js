import React, { Component } from "react";
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import StarRatings from 'react-star-ratings';
import favoriteImg from '../../../../../assets/images/header/favorite.svg';
import checked from '../../../../../assets/images/other/checked.png';
import thumbUp from '../../../../../assets/images/social/Fill 1.svg';
import thumbDown from '../../../../../assets/images/social/Fill 1 Copy 4.svg';
import facebook from '../../../../../assets/images/social/facebook.png';
import twitter from '../../../../../assets/images/social/twitter.png';

import {
	FacebookShareButton,
	TwitterShareButton,
  } from 'react-share';

import { MDBProgress } from 'mdbreact';
var self;
class SizeGuide extends Component {

    constructor(props) {
        super(props);
        self =this;
		this.state = {
            rating: 1,
		};
	}

    onClickTab = (selectedId) => {
        const tab = ['sizefit', 'bras', 'panty', 'nightwear', 'slippers'];
        for(let i=0; i< tab.length; i++){
            if(document.getElementById(tab[i]).classList.contains("apex-rds-selected")){
                document.getElementById(tab[i]).classList.remove("apex-rds-selected");;
                document.getElementById(`${tab[i]}-body`).style.display = "none";
            }
        }
        document.getElementById(selectedId).classList.add("apex-rds-selected");
        document.getElementById(`${selectedId}-body`).style.display = "block";
    }

    changeRating( newRating, name ){
        self.setState({rating: newRating});
    }

    render() {
        // const {productSizeChart} = this.props;
        return (
            <div>
                <div>
                    {/* <div className="t-TabsRegion t-TabsRegion-mod--simple apex-tabs-region apex-tabs-region js-apex-region">
                        <div className="apex-rds-container">
                            <ul className="apex-rds a-Tabs" style={{paddingTop: 10, paddingBottom: 10, backgroundColor: "#fafafa"}}>
                                <li 
                                    id="sizefit" 
                                    className="apex-rds-item apex-rds-first apex-rds-selected" 
                                    style={{paddingLeft: 8, paddingRight: 8, cursor: 'pointer'}}
                                    onClick={(e)=>this.onClickTab('sizefit')}
                                >
                                    <FormattedMessage id="Product.Details.SizeFit" defaultMessage="Size & Fit" />
                                </li>
                                <li 
                                    id="bras" 
                                    className="apex-rds-item apex-rds-first" 
                                    style={{paddingLeft:8, paddingRight: 8, cursor: 'pointer'}}
                                    onClick={(e)=>this.onClickTab('bras')}
                                >
                                    <FormattedMessage id="Product.Details.Bras" defaultMessage="Bras" />
                                </li>
                                <li 
                                    id="panty" 
                                    className="apex-rds-item apex-rds-first" 
                                    style={{paddingLeft:8, paddingRight:8, cursor: 'pointer'}}
                                    onClick={(e)=>this.onClickTab('panty')}
                                >
                                    <FormattedMessage id="Product.Details.Panty" defaultMessage="Panty" />
                                </li>
                                <li 
                                    id="nightwear" 
                                    className="apex-rds-item apex-rds-first" 
                                    style={{paddingLeft:8, paddingRight:8, cursor: 'pointer'}}
                                    onClick={(e)=>this.onClickTab('nightwear')}
                                >
                                    <FormattedMessage id="Product.Details.Nightwear" defaultMessage="Nightwear" />
                                </li>
                                <li 
                                    id="slippers" 
                                    className="apex-rds-item apex-rds-first" 
                                    style={{paddingLeft:8, paddingRight:8, cursor: 'pointer'}}
                                    onClick={(e)=>this.onClickTab('slippers')}
                                >
                                    <FormattedMessage id="Product.Details.Slippers" defaultMessage="Slippers" />
                                </li>
                            </ul>    
                        </div>
                    </div>
                    <div>
                        <div id="sizefit-body" className="a-Tabs-panel apex-rds-element-selected" >
                            <img src={productSizeChart.main} />
                        </div>
                        <div id="bras-body" className="a-Tabs-panel" style={{display: 'none'}}>
                            <img src={productSizeChart.bra} />
                        </div>
                        <div id="panty-body" className="a-Tabs-panel" style={{display: 'none'}}>
                            <img src={productSizeChart.panty} />
                        </div>
                        <div id="nightwear-body" className="a-Tabs-panel" style={{display: 'none'}}>
                            <img src={productSizeChart.nightwear} />
                        </div>
                        <div id="slippers-body" className="a-Tabs-panel" style={{display: 'none'}}>
                            <img src={productSizeChart.slippers} />
                        </div> 
                    </div> 
                 */}


                    <div className="col col-12 apex-col-auto">
						<div className="row you-may-like-title remove-padding">
							<h2 className="review-text" style={{width:'40%'}} />
							<label className="review-text">
                                Reviews
                            </label>
							<h2 className="review-text" style={{width:'40%'}}/>
						</div>
                        <div className="product-review">
                            <div className="row detail-info review-row-margin">
                                <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor='#FAD961'
                                    changeRating={this.changeRating}
                                    numberOfStars={5}
                                    name='rating'
                                    starHoverColor='#0D943F'
                                    starDimension='40px'
                                    starSpacing='2px'
                                />
                                <div className="remove-rating" style={{marginTop:'14px'}}>
                                <span style={{color: '#0D943F',marginBottom: '2.5rem',width: '100%',fontWeight: '700',margin: '50px'}}>
                                    {this.state.rating}&nbsp;/&nbsp;5 &nbsp; Votes</span>
                                </div>
                                <div style={{marginLeft:'auto'}}>
                                    <button className="wite_a_review">Write a Review</button>
                                </div>
                            </div>
                            <div className="review-star">
                                <span>5 Star </span><MDBProgress style={{width: '50%'}} value={70} className="my-2" color="success" height="5px"/>
                                <span>4 Star </span><MDBProgress value={55} className="my-2" color="success" height="5px"/>
                                <span>3 Star </span><MDBProgress value={78} className="my-2" color="warning" height="5px"/>
                                <span>2 Star </span><MDBProgress value={30} className="my-2" color="warning" height="5px"/>
                                <span>1 Star </span><MDBProgress value={10} className="my-2" color="danger" height="5px"/>
                            </div>
                        </div>
                        <div className="product-review" style={{paddingTop: '3rem'}}>
                            <div style={{marginBottom: '3rem'}}>
                                <button className="most_recent">most recent</button>
                            </div>

                            <div className="row detail-info" style={{marginBottom:'0px'}}>
                                <div className="row rating-review">
                                    <StarRatings
                                        rating={5}
                                        starRatedColor='#FAD961'
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension='40px'
                                        starSpacing='2px'
                                    />
                                    
                                    <div style={{marginTop:'14px'}}>
                                        <span style={{marginBottom: '2.5rem',margin: '45px', fontSize: '1.3rem', lineHeight: '2.4rem'}}>
                                            30 July 2019</span>
                                    </div>
                                </div>
                                <div className="review-username" style={{fontSize: '1.2rem', lineHeight: '2.4rem'}}>
                                    <p style={{marginBottom:'0px'}}>Username</p>
                                    <p style={{color: '#0D943F', marginBottom:'0px'}}>Top 1000 Contributor</p>
                                    <p style={{marginBottom:'0px'}}>Age of child: 8 and over</p>
                                </div>
                            </div>
                            <div className="review_title">
                                <span>Lorem Ipsum Dolor</span>
                            </div>
                            <div className="reviw-text" style={{fontSize: '1.2rem', lineHeight: '2.4rem', marginBottom: '1.5rem'}}>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </p>
                            </div>
                            <div style={{fontSize: '1.2rem', lineHeight: '2.4rem', width:'75%', marginBottom: '1.5rem'}}>
                                <img style={{height: '13px',width: '13px'}} src={checked} />
                                <span style={{fontFamily: "VAG Rounded ELC Bold",color: '#0D943F',fontWeight: '700'}}>&nbsp;Yes, I recommend this product.</span>
                            </div>
                            <div className="row detail-info" style={{marginLeft:'0px'}}>
                                <p>Share this review : &nbsp;&nbsp;</p>
                                <FacebookShareButton
                                    url={'http://nayomijsuat.iksulalive.com/en'}
                                    quote={'ELC'}
                                    className="Demo__some-network__share-button">
                                    <img style={{height: '25px',width: '25px'}} src={facebook} />
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={'http://nayomijsuat.iksulalive.com/en'}
                                    title={'ELC'}
                                    className="Demo__some-network__share-button">
                                    <img style={{height: '25px',width: '25px',marginLeft:'25px'}} src={twitter} />
                                </TwitterShareButton>
                                
                                
                                <div style={{marginLeft:'auto', fontSize: '1.2rem', lineHeight: '2.4rem'}}>
                                    <img style={{height: '25px',width: '25px'}} src={thumbUp} />&nbsp; 0
                                    <img style={{height: '25px',width: '25px',marginLeft:'40px', opacity: '0.5'}} src={thumbDown} />
                                    &nbsp; 0
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>                      
        )
    }
}

const mapStateToProps = state => {
	return {
        globals: state.global,
        productSizeChart: state.productDetails.sizeChart
	};
};

export default connect(mapStateToProps)(SizeGuide);