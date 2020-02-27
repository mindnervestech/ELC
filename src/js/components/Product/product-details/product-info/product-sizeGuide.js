import React, { Component } from "react";
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';
import checked from '../../../../../assets/images/other/checked.png';
import thumbUp from '../../../../../assets/images/social/Fill 1.svg';
import thumbDown from '../../../../../assets/images/social/Fill 1 Copy 4.svg';
import facebook from '../../../../../assets/images/social/facebook.png';
import twitter from '../../../../../assets/images/social/twitter.png';
import * as actions from '../../../../redux/actions/index'
import queryString from 'query-string';
import $ from 'jquery';
import Spinner from '../../../Spinner/Spinner';
import { FormattedMessage } from 'react-intl'

import {
    FacebookShareButton,
    TwitterShareButton,
} from 'react-share';

import { MDBProgress } from 'mdbreact';

const wait = require('../../../../../assets/images/wait.gif');
var self;
let averageReview;
let totalCount = 0;
var lengthOfObject=0;

let ArrayOfAge = [' ', '0-17 months', '18-35months', '3-4 years', '5-7 years', '8 and over'];
class SizeGuide extends Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            rating: 1,
            checkboxStatus: true,
            resFlag: false,
            fields: {
                ratingValue: 1,
                reviewTitle: '',
                review: '',
                email: '',
                name: '',
                ageofchild: '',
                isCloseAlertCalled: false
            },
            showAlert: false,
            reviewImage: {},
            errors: {},
            divEmailShow: true,
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.productInfoReview.id !== this.props.productInfoReview.id) {
            if (this.props.productInfoReview.sku !== 0) {
                const data = {
                    sku: this.props.productInfoReview.sku
                }
                this.props.onGetProductReviewBySKu(data)
            }
        }
    }

    clearProductReviewField=()=>{
        this.setState({
            ...this.state,
            fields: {
                reviewTitle: '',
                review: '',
                name: '',
        
            },
            rating:1
        })
    }
    componentWillReceiveProps(nextProps) {
        let total=0;
        nextProps.productReview && nextProps.productReview.product_review_by_sku_response && nextProps.productReview.product_review_by_sku_response && Object.keys(nextProps.productReview.product_review_by_sku_response).length > 0 && Object.values(nextProps.productReview.product_review_by_sku_response).map((item, index) => {
            return (
                item.ratings !== undefined && item.ratings[0] && item.ratings[0].value !== undefined ? total = total + item.ratings[0].value : 1
            )
        })
        lengthOfObject = nextProps.productReview && nextProps.productReview.product_review_by_sku_response && nextProps.productReview.product_review_by_sku_response && Object.keys(nextProps.productReview.product_review_by_sku_response).length;
         
        if (total && lengthOfObject) {
            averageReview = Math.round(total / lengthOfObject)
        }

        if (nextProps.productReview.post_product_review_response !== undefined) {
            this.clearProductReviewField();
            this.setState({ showAlert: true, resFlag: false })
            setTimeout(() => {
                this.closeAlert()
            }, 1000);
        }



    }
    handleChange = (field, e) => {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    handleValidation = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        //Name
        if (!fields["reviewTitle"]) {
            formIsValid = false;
            errors["reviewTitle"] = <FormattedMessage id="reviewtitle.empty" defaultMessage="Review Title is empty" />;
        }

        if (!fields['review']) {
            formIsValid = false;
            errors["review"] = <FormattedMessage id="reviewtext.empty" defaultMessage="Review is empty" />;
        }
        if (fields['review'] !== undefined) {
            if (fields['review'].length < 50) {
                formIsValid = false;
                errors["review"] = <FormattedMessage id="reviewtextlength.empty" defaultMessage="Review  should be at least 50 characters" />;
            }

        }

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = <FormattedMessage id="yourname.empty" defaultMessage="Your name  is empty" />;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }
    signUpSubmit = (e) => {
        e.preventDefault();
        if (this.handleValidation()) {
            this.submitReview();
        }
    }

    submitReview = () => {
        this.setState({ resFlag: true })
        let ratingValueInString = ''
        if (this.state.rating == 1) {
            ratingValueInString = "Poor"
        } else if (this.state.rating == 2) {
            ratingValueInString = "Fair"
        } else if (this.state.rating == 3) {
            ratingValueInString = "Average"
        } else if (this.state.rating == 4) {
            ratingValueInString = "Good"
        } else {
            ratingValueInString = "Excellent"
        }
        const data = {
            review: {
                title: this.state.fields['reviewTitle'],
                detail: this.state.fields['review'],
                nickname: this.state.fields['name'],
                ratings: [
                    {
                        rating_name: 'Quality',
                        value: this.state.rating
                    }
                ],
                review_entity: "product",
                review_status: 2,
                entity_pk_value: this.props.productInfoReview.id
            }
        }

        this.props.onPostProductReview(data)
    }
    showHideDiveWriteReivew = (str) => {
        if (str === 'show') {
            document.getElementById("review-show-hide-div").style.display = "block";
        }
    }
    // divHideShowCheckBox = () => {
    //     if (this.state.checkboxStatus == false) {
    //         //this.state.subscribe_to_newsletter = 1;
    //         this.setState({ checkboxStatus: true, divEmailShow: true })
    //     }
    //     else {
    //         //this.state.subscribe_to_newsletter = 0;
    //         this.setState({ checkboxStatus: false, divEmailShow: false })
    //     }
    // }
    validate = (event) => {
        var theEvent = event || window.event;

        // Handle paste
        if (theEvent.type === 'paste') {
            key = event.clipboardData.getData('text/plain');
        } else {
            // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[a-zA-Z ]+$|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    onClickTab = (selectedId) => {
        const tab = ['sizefit', 'bras', 'panty', 'nightwear', 'slippers'];
        for (let i = 0; i < tab.length; i++) {
            if (document.getElementById(tab[i]).classList.contains("apex-rds-selected")) {
                document.getElementById(tab[i]).classList.remove("apex-rds-selected");;
                document.getElementById(`${tab[i]}-body`).style.display = "none";
            }
        }
        document.getElementById(selectedId).classList.add("apex-rds-selected");
        document.getElementById(`${selectedId}-body`).style.display = "block";
    }

    changeRating(newRating, name) {
        self.setState({ rating: newRating });
    }
    closeAlert = () => {
        this.setState({ showAlert: false, isCloseAlertCalled: true });
        if (document.getElementById("review-show-hide-div")) {
            document.getElementById("review-show-hide-div").style.display = "none";
        }
        // this.props.OnClearProductReviewResponse();

    }

    render() {
        let respo_message = null;
        if (this.state.showAlert) {
            respo_message = <span id="APEX_SUCCESS_MESSAGE" data-template-id="126769709897686936_S" className="apex-page-success u-visible"><div className="t-Body-alert">
                <div className="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">
                    <div className="t-Alert-wrap">
                        <div className="t-Alert-icon">
                            <span className="t-Icon" />
                        </div>
                        <div className="t-Alert-content">
                            <div className="t-Alert-header">
                                <h2 className="t-Alert-title"><FormattedMessage id="product-review-submitted.text" defaultMessage="Product review submitted sucessfully"/></h2>
                            </div>
                        </div>
                        <div className="t-Alert-buttons">
                            <button className="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="Close Notification" onClick={() => this.closeAlert()}><span className="t-Icon icon-close" /></button>
                        </div>
                    </div>
                </div>
            </div></span>;
        }

        let ratingValueInString = ''
        if (this.state.rating === 1) {
            ratingValueInString = <FormattedMessage id="poor" defaultMessage="Poor" />
        } else if (this.state.rating === 2) {
            ratingValueInString = <FormattedMessage id="fair" defaultMessage="Fair" />
        } else if (this.state.rating === 3) {
            ratingValueInString = <FormattedMessage id="average" defaultMessage="Average" />
        } else if (this.state.rating === 4) {
            ratingValueInString = <FormattedMessage id="good" defaultMessage="Good" />
        } else {
            ratingValueInString = <FormattedMessage id="excellent" defaultMessage="Excellent" />
        }
        const errorsObj = this.state.errors;

        let reviewTitle = <div className="form-group">
            <input onChange={this.handleChange.bind(this, 'reviewTitle')} value={this.state.fields['reviewTitle']} type="text" style={{ height: '10%' }} className="form-control input-review-title" />
            <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                <FormattedMessage id="review.bestpurchaseever" defaultMessage="Example: Best Purchase Ever" /></small>

        </div>

        let reviewText = <div className="form-group">

            <textarea onChange={this.handleChange.bind(this, 'review')} value={this.state.fields['review']} row="100" col="50" className="input-review-title" />
            <small id="emailHelp" className="  textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                <FormattedMessage id="review.ifyouwritetext" defaultMessage="If you write review text, it should be at least 50 characters" /></small><br /><br />
        </div>


        let nameInputField = <div className="form-group">

            <input type="text" onChange={this.handleChange.bind(this, 'name')} onKeyPress={this.validate} value={this.state.fields['name']} style={{ height: '10%' }} className="form-control input-review-title" />
            <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                <FormattedMessage id="review.displaynametext" defaultMessage="This will be used as your display name." /></small>
        </div>

        if ('name' in errorsObj) {
            nameInputField = <div className="form-group">

                <input type="text" onChange={this.handleChange.bind(this, 'name')} value={this.state.fields['name']} style={{ height: '10%' }} className="form-control input-review-title" />
                <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                    <FormattedMessage id="review.displaynametext" defaultMessage="This will be used as your display name." /></small>
                <span className="span-error-productReview" style={{ color: 'red', paddingTop: 10 }}> {errorsObj['name']}</span>
            </div>
        }
        if ('reviewTitle' in errorsObj) {
            reviewTitle = <div className="form-group">

                <input onChange={this.handleChange.bind(this, "reviewTitle")} value={this.state.fields["reviewTitle"]} type="text" style={{ height: '10%' }} className="form-control input-review-title" />
                <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                    <FormattedMessage id="review.bestpurchaseever" defaultMessage="Example: Best Purchase Ever" /></small>
                <span className="span-error-productReview" style={{ color: 'red', paddingTop: 10 }}> {errorsObj['reviewTitle']}</span>
            </div>
        }

        if ('review' in errorsObj) {
            reviewText = <div className="form-group">

                <textarea onChange={this.handleChange.bind(this, 'review')} value={this.state.fields['review']} row="100" col="50" className="input-review-title" />
                <small id="emailHelp" className="  textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                    <FormattedMessage id="review.ifyouwritetext" defaultMessage="If you write review text, it should be at least 50 characters" /></small>
                <span className="span-error-productReview" style={{ color: 'red', paddingTop: 10 }}>{errorsObj['review']}</span>
                <br /><br />
            </div>
        }
        return (<>
            <div>
                {respo_message}
                <div>
                    <div className="col col-12 apex-col-auto">
                        <div className="row you-may-like-title remove-padding">
                            <h2 className="review-text" style={{ width: '37%%' }} />
                            <label className="review-text">
                                <FormattedMessage id="reviews.text" defaultMessage="Reviwes" />
                            </label>
                            <h2 className="review-text" style={{ width: '40%' }} />
                        </div>

                        <div id="product_review" className="product-review">
                            <form>
                                <div id="review-show-hide-div" style={{ display: 'none' }}>
                                    <h2 className="header-write-review-product-rationgs"><FormattedMessage id="product_review" defaultMessage="Product Review" /> <span style={{ color: 'red', fontSize: 12 }}>*(<FormattedMessage id="required.text" defaultMessage="required"/>) </span></h2>
                                    <h3 className="header-write-review-product-rating"><FormattedMessage id="rating" defaultMessage="Rating" /> <span style={{ color: 'red', fontSize: 12 }}>* </span>
                                        <StarRatings
                                            rating={this.state.rating}
                                            starRatedColor='#FAD961'
                                            changeRating={this.changeRating}
                                            numberOfStars={5}
                                            name='rating'
                                            starHoverColor='#0D943F'
                                            starDimension='35px'
                                            starSpacing='2px'
                                        />
                                        <span className="ratingValueInString">{ratingValueInString}</span>
                                    </h3>
                                    {/* <span style={{ color: 'red' }}>Add ratings for this product</span> */}
                                    <br />
                                    <h3 className="header-write-review-product-rating"><FormattedMessage id="ReviewTitle" defaultMessage="Review Title" /><span style={{ color: 'red', fontSize: 12, paddingBottom: 10 }}>*</span></h3>
                                    {/* <div class="form-group">

                                        <input type="text" style={{ height: '10%' }} className="form-control input-review-title" />
                                        <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                                            Example: Best Purchase Ever</small>
                                    </div> */}
                                    <div>  {reviewTitle}</div>

                                    <h3 className="header-write-review-product-rating" style={{ paddingTop: 24 }}><FormattedMessage id="Review" defaultMessage="Review" /><span style={{ color: 'red', fontSize: 12, paddingBottom: 10, paddingTop: 24 }}>*</span></h3>
                                    <div>{reviewText}</div>

                                    <h3 className="header-write-review-product-rating"><FormattedMessage id="ContactUs.Name" defaultMessage="Your Name" /></h3>

                                    <div>{nameInputField}</div>
                                    <br />
                                    <br />
                                    <div style={{ marginLeft: 'auto', display: 'flex' }}>
                                        {this.state.resFlag ?
                                            <button style={{ height: 45 }} className="write-review-submit" type="button" disabled="disabled">
                                                <img src={wait} style={{ width: 25, height: 20, marginTop: -4 }} alt="" />
                                                <span className="t-Button-label"><FormattedMessage id="PleaseWait" defaultMessage="Please wait......." /></span>
                                            </button> :
                                            <button className="write-review-submit" onClick={(e) => this.signUpSubmit(e)}><FormattedMessage id="Submit.Text" defaultMessage="Submit" /></button>
                                        }
                                        {/* <a href="#" target="_blank" className="terms-condition-review-link" title="Terms &amp; Conditions">Terms &amp; Conditions</a>
                                        <a href="#" target="_blank" className="terms-condition-review-link" title="Terms &amp; Conditions">Review Guidelines</a> */}
                                    </div>

                                </div>
                            </form>
                            <div className="row detail-info review-row-margin">

                                <div>
                                    <StarRatings
                                        rating={averageReview!==undefined ? averageReview:1}
                                        disabled="disabled"
                                        starRatedColor='#FAD961'
                                        numberOfStars={5}
                                        name='rating'
                                        starHoverColor='#0D943F'
                                        starDimension='40px'
                                        starSpacing='2px'
                                    /></div>
                                <div className="remove-rating" style={{ marginTop: '14px' }}>
                                    <span style={{ color: '#0D943F', marginBottom: '2.5rem', width: '100%', fontWeight: '700', margin: '50px' }}>
                                        {averageReview !== undefined ? averageReview : 1}&nbsp; <FormattedMessage id="outof.text" defaultMessage="Out Of"/> 5 &nbsp; </span>
                                </div>
                                <div style={{ marginLeft: 'auto' }}>
                                    <button onClick={() => this.showHideDiveWriteReivew('show')} id="write_a_review" className="wite_a_review"><FormattedMessage id="write_review" defaultMessage="Write a review"></FormattedMessage></button>
                                </div>
                            </div>
                            {this.props.productReview && this.props.productReview.product_review_by_sku_response && this.props.productReview.product_review_by_sku_response && Object.keys(this.props.productReview.product_review_by_sku_response).length > 0 && Object.values(this.props.productReview.product_review_by_sku_response).map((item, index) => (
                                <div key={index}>
                                    <div className="product-review" style={{ paddingTop: '3rem' }}>
                                        <div className="row detail-info" style={{ marginBottom: '0px' }}>
                                            <div className="row rating-review">
                                                <StarRatings
                                                    disabled="disabled"
                                                    rating={ item.ratings !== undefined && item.ratings[0] && item.ratings[0].value !== undefined ? item.ratings[0].value : 0}
                                                    starRatedColor='#FAD961'
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension='40px'
                                                    starSpacing='2px'
                                                />
                                                <div style={{ marginTop: '14px' }}>
                                                  
                                                </div>
                                            </div>
                                            <div className="review-username" style={{ fontSize: '1.2rem', lineHeight: '2.4rem' }}>
                                            </div>
                                        </div>
                                        <div className="review_title" style={{marginTop:10}}>
                                            <span>{item.nickname}</span>
                                        </div>
                                        <div className="review-description" style={{ fontSize: '1.2rem', lineHeight: '2.4rem', marginBottom: '1.5rem' }}>
                                            <p>
                                                {item.detail}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </>
        )
    }
}

const mapStateToProps = state => {
    return {
        globals: state.global,
        spinnerProduct: state.spinner,
        productSizeChart: state.productDetails.sizeChart,
        productReview: state.productReview
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onPostProductReview: payload => dispatch(actions.postReview(payload)),
        onGetProductReviewBySKu: payload => dispatch(actions.getProductReviewBySKU(payload))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SizeGuide);
