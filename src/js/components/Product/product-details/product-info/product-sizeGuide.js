import React, { Component } from "react";
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';
import checked from '../../../../../assets/images/other/checked.png';
import thumbUp from '../../../../../assets/images/social/Fill 1.svg';
import thumbDown from '../../../../../assets/images/social/Fill 1 Copy 4.svg';
import facebook from '../../../../../assets/images/social/facebook.png';
import twitter from '../../../../../assets/images/social/twitter.png';
import $ from 'jquery';
import { FormattedMessage } from 'react-intl'

import {
    FacebookShareButton,
    TwitterShareButton,
} from 'react-share';

import { MDBProgress } from 'mdbreact';
var self;

let ArrayOfAge = [' ', '0-17 months', '18-35months', '3-4 years', '5-7 years', '8 and over'];
class SizeGuide extends Component {

    constructor(props) {
        super(props);
        self = this;
        this.state = {
            rating: 1,
            checkboxStatus: true,
            fields: {
                ratingValue: 1,
                reviewTitle: '',
                review: '',
                email: '',
                name: '',
                ageofchild: '',


            },

            reviewImage: {},
            errors: {},
            divEmailShow: true,
        };
    }

    onChangeHandler = event => {
        console.log(event.target.files[0])
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
            errors["reviewTitle"] = <FormattedMessage id="Signup.validation.firstName.empty" defaultMessage="Review Title is empty" />;
        }

        if (!fields["review"]) {
            formIsValid = false;
            errors["review"] = <FormattedMessage id="Signup.validation.lastName.empty" defaultMessage="Review is empty" />;
        }

        if (!(fields["review"].length > 50)) {
            formIsValid = false;
            errors["review"] = <FormattedMessage id="Signup.validation.lastName.empty" defaultMessage="Review text should be at least 50 characters." />;
        }

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = <FormattedMessage id="Signup.validation.lastName.empty" defaultMessage="Your name  is empty" />;
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z]+$/) && fields["firstName"].length > 0) {
                formIsValid = false;
                errors["name"] = <FormattedMessage id="Signup.validation.firstName.onlyletters" defaultMessage="Please enter only letters" />;
            }
        }

        if (!fields["ageofchild"]) {
            formIsValid = false;
            errors["ageofchild"] = <FormattedMessage id="Signup.validation.lastName.empty" defaultMessage="Age is empty" />;
        }


        //Email
        if (typeof fields["email"] !==undefined) {
              console.log("In Validation",this.state.fields['email'])
            if (fields["email"].length === 0) {
                formIsValid = false;
                errors["email"] = <FormattedMessage id="Signup.validation.email.empty" defaultMessage="Please enter email" />;
            }

            if (fields["email"].length > 0) {
                let lastAtPos = fields["email"].lastIndexOf('@');
                let lastDotPos = fields["email"].lastIndexOf('.');
                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2 && !fields["email"].includes(' '))) {
                    formIsValid = false;
                    errors["email"] = <FormattedMessage id="Signup.validation.email.invalid" defaultMessage="Please enter email in valid format" />;
                }
            }
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

    submitReview=()=>{

    }


    showHideDiveWriteReivew = (str) => {
        if (str === 'show') {
            document.getElementById("review-show-hide-div").style.display = "block";
        }

    }

    divHideShowCheckBox = () => {
        console.log("Called function")

        if (this.state.checkboxStatus == false) {
            //this.state.subscribe_to_newsletter = 1;
            this.setState({ checkboxStatus: true, divEmailShow: true })
           
        }
        else {
            //this.state.subscribe_to_newsletter = 0;
            this.setState({ checkboxStatus: false, divEmailShow: false })
            
        }
    }

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
        var regex = /[0-9]|\./;
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

    render() {
        let ratingValueInString = ''
        if (this.state.rating == 1) {
            ratingValueInString = <FormattedMessage id="poor" defaultMessage="Poor" />
        } else if (this.state.rating == 2) {
            ratingValueInString = <FormattedMessage id="fair" defaultMessage="Fair" />
        } else if (this.state.rating == 3) {
            ratingValueInString = <FormattedMessage id="average" defaultMessage="Average" />
        } else if (this.state.rating == 4) {
            ratingValueInString = <FormattedMessage id="good" defaultMessage="Good" />
        } else {
            ratingValueInString = <FormattedMessage id="excellent" defaultMessage="Excellent" />
        }
        const errorsObj = this.state.errors;

        let reviewTitle = <div className="form-group">

            <input onChange={this.handleChange.bind(this, 'reviewTitle')} type="text" style={{ height: '10%' }} className="form-control input-review-title" />
            <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                <FormattedMessage id="review.bestpurchaseever" defaultMessage="Example: Best Purchase Ever" /></small>

        </div>

        let reviewText = <div className="form-group">

            <textarea onChange={this.handleChange.bind(this, 'review')} value={this.state.fields['review']} row="100" col="50" className="input-review-title" />
            <small id="emailHelp" className="  textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                <FormattedMessage id="review.ifyouwritetext" defaultMessage="If you write review text, it should be at least 50 characters" /></small><br /><br />
        </div>

        let reviewImageFile = <div className="file-loading">
            <input className="input-group-lg" id="input-b6" name="input-b6[]" data-allowed-file-extensions='["png", "jpeg","jpg"]' type="file" multiple />
            <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                <FormattedMessage id="review.twoimagesonlytext" defaultMessage="(2 Images only max. 5 Mb per max)" /></small><br /><br />
        </div>

        let emailInputField = <div id="emailCheckBox">
            <h3 className="header-write-review-product-rating">Email<span style={{ color: 'red', fontSize: 12 }}>*</span></h3>
            <div id="emailCheckBox" className="form-group">

                <input type="email" onChange={this.handleChange.bind(this, 'email')} value={this.state.fields['email']} style={{ height: '10%' }} className="form-control input-review-title" />
                <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                    <FormattedMessage id="review.emailnotifytext" defaultMessage="We will ONLY use your email to notify you in regards to your submission." /></small>
            </div></div>

        let nameInputField = <div className="form-group">

            <input type="text" onChange={this.handleChange.bind(this, 'name')} value={this.state.fields['name']} style={{ height: '10%' }} className="form-control input-review-title" />
            <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                <FormattedMessage id="review.displaynametext" defaultMessage="This will be used as your display name." /></small>
        </div>
        let ageInputField = <div className="form-group">

            <select name="contextdatavalue_Age" style={{ width: 200, height: 40, borderRadius: 4 }} className="form-control select-ageofchild">
                {ArrayOfAge.map((item, index) =>

                    <option style={{textAlign:'start'}} onChange={this.handleChange.bind(this, item)} key={index} value={item}>{item}</option>
                )
                }


            </select>

        </div>
        if ('ageofchild' in errorsObj) {
            ageInputField = <div className="form-group">

                <select name="contextdatavalue_Age" style={{ width: 200, height: 40, borderRadius: 4 }} className="form-control select-ageofchild">
                    <select name="contextdatavalue_Age" style={{ width: 200, height: 40, borderRadius: 4 }} className="form-control select-ageofchild">
                        {ArrayOfAge.map((item, index) =>

                            <option onChange={this.handleChange.bind(this, item)} key={index} value={item}>{item}</option>
                        )
                        }


                    </select>


                </select>
                <span>{errorsObj['ageofchild']}</span>
            </div>
        }

        if ('name' in errorsObj) {
            nameInputField = <div className="form-group">

                <input type="text" onChange={this.handleChange.bind(this, 'name')} value={this.state.fields['name']} style={{ height: '10%' }} className="form-control input-review-title" />
                <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                    <FormattedMessage id="review.displaynametext" defaultMessage="This will be used as your display name." /></small>
            </div>
        }

        if ('email' in emailInputField) {
            emailInputField = <div id="emailCheckBox"><h3 className="header-write-review-product-rating">Email<span style={{ color: 'red', fontSize: 12 }}>*</span></h3>
                <div className="form-group">

                    <input type="email" onChange={this.handleChange.bind(this, 'email')} value={this.state.fields['email']} style={{ height: '10%' }} className="form-control input-review-title" />
                    <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                        <FormattedMessage id="review.emailnotifytext" defaultMessage="We will ONLY use your email to notify you in regards to your submission." /></small>
                    <span>{errorsObj['email']}</span>
                </div></div>

        }

        if ('reviewImage' in errorsObj) {
            reviewImageFile = <div className="file-loading">
                <input type="file" className="input-group-lg" id="input-b6" name="input-b6[]" data-allowed-file-extensions='["png", "jpeg","jpg"]' type="file" multiple />
                <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                    <FormattedMessage id="review.twoimagesonlytext" defaultMessage="(2 Images only max. 5 Mb per max)" /></small>
                <span>{errorsObj['reviewImage']}</span>
                <br /><br />
            </div>
        }


        if ('reviewTitle' in errorsObj) {
            reviewTitle = <div className="form-group">

                <input onChange={this.handleChange.bind(this, "reviewTitle")} value={this.state.fields["reviewTitle"]} type="text" style={{ height: '10%' }} className="form-control input-review-title" />
                <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                    <FormattedMessage id="review.bestpurchaseever" defaultMessage="Example: Best Purchase Ever" /></small>
                <span> {errorsObj['reviewTitle']}</span>
            </div>
        }

        if ('review' in errorsObj) {
            reviewText = <div className="form-group">

                <textarea onChange={this.handleChange.bind(this, 'review')} value={this.state.review} row="100" col="50" className="input-review-title" />
                <small id="emailHelp" className="  textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                    <FormattedMessage id="review.ifyouwritetext" defaultMessage="If you write review text, it should be at least 50 characters" /></small>
                <span>{errorsObj['review']}</span>
                <br /><br />
            </div>

        }







        // const {productSizeChart} = this.props;
        return (<>
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
                            <h2 className="review-text" style={{ width: '37%%' }} />
                            <label className="review-text">
                                Reviews
                            </label>
                            <h2 className="review-text" style={{ width: '40%' }} />
                        </div>

                        <div id="product_review" className="product-review">
                            <form>
                                <div id="review-show-hide-div" style={{ display: 'none' }}>
                                    <h2 className="header-write-review-product-rationgs"><FormattedMessage id="product_review" defaultMessage="Product Review" /> <span style={{ color: 'red', fontSize: 12 }}>*(required) </span></h2>
                                    <h3 className="header-write-review-product-rating"><FormattedMessage id="rating" defaultMessage="Rating" /> <span style={{ color: 'red', fontSize: 12 }}>* </span> <StarRatings
                                        rating={this.state.rating}
                                        starRatedColor='#FAD961'
                                        changeRating={this.changeRating}
                                        numberOfStars={5}
                                        name='rating'
                                        starHoverColor='#0D943F'
                                        starDimension='35px'
                                        starSpacing='2px'
                                    /><span className="ratingValueInString">{ratingValueInString}</span>
                                    </h3>
                                    {/* <span style={{ color: 'red' }}>Add ratings for this product</span> */}
                                    <br />
                                    <h3 className="header-write-review-product-rating"><FormattedMessage id="ReviewTitle" defaultMessage="Review Title" /><span style={{ color: 'red', fontSize: 12 }}>*</span></h3>
                                    {/* <div class="form-group">

                                        <input type="text" style={{ height: '10%' }} className="form-control input-review-title" />
                                        <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                                            Example: Best Purchase Ever</small>
                                    </div> */}
                                    <div>  {reviewTitle}</div>

                                    <h3 className="header-write-review-product-rating"><FormattedMessage id="Review" defaultMessage="Review Title" /><span style={{ color: 'red', fontSize: 12 }}>*</span></h3>
                                    <div>{reviewText}</div>
                                    {/* <div class="form-group">

                                        <textarea row="100" col="50" className="input-review-title" />
                                        <small id="emailHelp" className="  textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                                            If you write review text, it should be at least 50 characters.</small><br /><br />
                                    </div> */}

                                    <div className="form-group" style={{textAlign:'start'}}>
                                        <h3 className="header-write-review-product-rating"><FormattedMessage id="review.picturespeak" defaultMessage="Pictures speak a thousand words: add an image" /></h3>
                                        {reviewImageFile}
                                        {/* <div className="file-loading">
                                            <input className="input-group-lg" id="input-b6" name="input-b6[]" data-allowed-file-extensions='["png", "jpeg","jpg"]' type="file" multiple />
                                            <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                                                (2 Images only max. 5 Mb per max)</small><br /><br />
                                        </div> */}
                                    </div>

                                    <div className="form-group" style={{textAlign:'start'}} >
                                        <div style={{ display: 'inline-flex' }}>
                                            <input type="checkbox" checked={this.state.checkboxStatus ? "checked" : ""} value={this.state.checkboxStatus} id="checkBoxStatus" onChange={()=>this.divHideShowCheckBox()} /> &nbsp;&nbsp;
                                        <h3 className="header-write-review-product-rating"> <FormattedMessage id="review.plasesendmeemailtext" defaultMessage="Please send me an email when my review is posted." /></h3>
                                        </div>


                                    </div>

                                    {/* <div id="emailCheckBox" class="form-group">

                                        <input type="email" style={{ height: '10%' }} className="form-control input-review-title" />
                                        <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                                            We will ONLY use your email to notify you in regards to your submission.</small>
                                    </div> */}
                                    {this.state.divEmailShow ? <div>
                                        {emailInputField}
                                    </div> : ''}
                                    <br />

                                    <h3 className="header-write-review-product-rating"><FormattedMessage id="ContactUs.Name" defaultMessage="Your Name" /></h3>
                                    {/* <div class="form-group">

                                        <input type="text" style={{ height: '10%' }} className="form-control input-review-title" />
                                        <small id="emailHelp" className=" textAlignStart smaill-title-best-purchase-ever form-text text-muted">
                                            This will be used as your display name.</small>
                                    </div> */}
                                    <div>{nameInputField}</div>
                                    <br />

                                    <h3 className="header-write-review-product-rating"><FormattedMessage id="review.ageofchild" defaultMessage="Age Of Child" /></h3>
                                    {/* <div class="form-group">

                                        <input type="text" onKeyPress={this.validate} onChange={this.handleChange.bind(this,'ageofchild')} value={this.state.fields['ageofchild']} style={{ height: '10%', width: '25%' }} className="form-control input-review-title" />

                                    </div> */}
                                    <div>
                                        {ageInputField}
                                    </div>
                                    <br />

                                    <div style={{ marginLeft: 'auto', display: 'flex' }}>

                                        <button className="write-review-submit" onClick={(e)=>this.signUpSubmit(e)}><FormattedMessage id="Submit.Text" defaultMessage="Submit" /></button>
                                        <a href="#" target="_blank" className="terms-condition-review-link" title="Terms &amp; Conditions">Terms &amp; Conditions</a>
                                        <a href="#" target="_blank" className="terms-condition-review-link" title="Terms &amp; Conditions">Review Guidelines</a>
                                    </div>

                                </div>
                            </form>



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
                                <div className="remove-rating" style={{ marginTop: '14px' }}>
                                    <span style={{ color: '#0D943F', marginBottom: '2.5rem', width: '100%', fontWeight: '700', margin: '50px' }}>
                                        {this.state.rating}&nbsp;Out Of 5 &nbsp; </span>
                                </div>
                                <div style={{ marginLeft: 'auto' }}>
                                    <button onClick={() => this.showHideDiveWriteReivew('show')} id="write_a_review" className="wite_a_review"><FormattedMessage id="write_review" defaultMessage="Write a review"></FormattedMessage></button>
                                </div>
                            </div>
                            <div className="review-star">
                                <span>5 Star </span><MDBProgress style={{ width: '50%' }} value={70} className="my-2" color="success" height="5px" />
                                <span>4 Star </span><MDBProgress value={55} className="my-2" color="success" height="5px" />
                                <span>3 Star </span><MDBProgress value={78} className="my-2" color="warning" height="5px" />
                                <span>2 Star </span><MDBProgress value={30} className="my-2" color="warning" height="5px" />
                                <span>1 Star </span><MDBProgress value={10} className="my-2" color="danger" height="5px" />
                            </div>

                            <div className="product-review" style={{ paddingTop: '3rem' }}>
                                {/* <div className="recent-button" style={{ marginBottom: '3rem' }}>
                                    <button className="most_recent">most recent</button>
                                </div> */}

                                <div className="row detail-info" style={{ marginBottom: '0px' }}>
                                    <div className="row rating-review">
                                        <StarRatings
                                            rating={5}
                                            starRatedColor='#FAD961'
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension='40px'
                                            starSpacing='2px'
                                        />

                                        <div style={{ marginTop: '14px' }}>
                                            <span className="rating-date">
                                                30 July 2019</span>
                                        </div>
                                    </div>
                                    <div className="review-username" style={{ fontSize: '1.2rem', lineHeight: '2.4rem' }}>
                                        <p style={{ marginBottom: '0px' }}>Username</p>
                                        {/* <p style={{ color: '#0D943F', marginBottom: '0px' }}>Top 1000 Contributor</p> */}
                                        <p style={{ marginBottom: '0px' }}><FormattedMessage id="review.ageofchild" defaultMessage="Age Of Child" />: 8 and over</p>
                                    </div>
                                </div>
                                <div className="review_title">
                                    <span>Lorem Ipsum Dolor</span>
                                </div>
                                <div className="reviw-text" style={{ fontSize: '1.2rem', lineHeight: '2.4rem', marginBottom: '1.5rem' }}>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </p>
                                </div>
                                {/* <div className="recommend">
                                    <img style={{ height: '13px', width: '13px' }} src={checked} alt="" />
                                    <span style={{ fontFamily: "VAG Rounded ELC Bold", color: '#0D943F', fontWeight: '700' }}>&nbsp;Yes, I recommend this product.</span>
                                </div> */}
                                <div className="row detail-info" style={{ marginLeft: '0px' }}>
                                    <p>Share this review : &nbsp;&nbsp;</p>
                                    <FacebookShareButton
                                        url={'http://nayomijsuat.iksulalive.com/en'}
                                        quote={'ELC'}
                                        className="Demo__some-network__share-button">
                                        <img className="share-icon-fb" style={{ height: '25px', width: '25px' }} alt="" src={facebook} />
                                    </FacebookShareButton>
                                    <TwitterShareButton
                                        url={'http://nayomijsuat.iksulalive.com/en'}
                                        title={'ELC'}
                                        className="Demo__some-network__share-button">
                                        <img className="share-icon-twitter" src={twitter} alt="" />
                                    </TwitterShareButton>

                                    <div className="like-icon" style={{ fontSize: '1.2rem', lineHeight: '2.4rem' }}>
                                        <img className="thumb-up" src={thumbUp} />&nbsp; 0
                                    <img className="thumb-down" src={thumbDown} alt="" />
                                        &nbsp; 0
                                </div>
                                </div>
                            </div>
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
        productSizeChart: state.productDetails.sizeChart
    };
};

export default connect(mapStateToProps)(SizeGuide);