import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Container, Row, Col, Button, Form, FormGroup } from 'reactstrap';

var _ = require('lodash');

class CardPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardType: false,
            nameOnCard: false,
            cardNumber: false,
            month: false,
            year: false,
            verificationNumber: false,
            title: false,
            firstName: false,
            lastName: false,
            number: false,
            address: false,
            country: false,
            addressLine1: false,
            addressLine2: false,
            state: false,
            city: false,
            postCode: false,
        };
    }

    cardPaymentSubmit = () => {
        this.setState({ cardType: true })
    }

    add = (event) => {
        console.log(event.charCode)
        if (event.charCode >= 48 && event.charCode <= 57) {
            console.log("true")
            return true;
        } else {
            return false;
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.first_name.value)
        console.log(e.target.month.value)
        if(e.target.first_name.value == ""){
            this.setState({ firstName: true })
        }
        if(e.target.last_name.value == ""){
            this.setState({ lastName: true })
        }
        if(e.target.card_type.value == ""){
            this.setState({ cardType: true })
        }
        if(e.target.card_name.value == ""){
            this.setState({ nameOnCard: true })
        }
        if(e.target.card_number.value == ""){
            this.setState({ CardNumber: true })
        }
        if(e.target.month.value == "Month"){
            this.setState({ month: true })
        }
        if(e.target.year.value == "Year"){
            this.setState({ year: true })
        }
        if(e.target.verification_number.value == ""){
            this.setState({ verificationNumber: true })
        }
        if(e.target.title.value == "Please Select"){
            this.setState({ title: true })
        }
        if(e.target.number.value == ""){
            this.setState({ number: true })
        }
        if(e.target.address.value == ""){
            this.setState({ address: true })
        }
        if(e.target.country.value == "Please Select"){
            this.setState({ country: true })
        }
        if(e.target.address_line_1.value == ""){
            this.setState({ addressLine1: true })
        }
        if(e.target.address_line_2.value == ""){
            this.setState({ addressLine2: true })
        }
        if(e.target.city.value == ""){
            this.setState({ city: true })
        }
        if(e.target.state.value == ""){
            this.setState({ state: true })
        }
        if(e.target.post_code.value == ""){
            this.setState({ postCode: true })
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onFormSubmit}>
                    <FormGroup>
                        <div>
                            <span className="blackTitle1">Card Type</span>
                        </div>
                        <div>
                            <input name="card_type" className={this.state.cardType ? "input-field error" : "input-field"}></input>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1">Name on Card</span>
                        </div>
                        <div>
                            <input name="card_name" className={this.state.nameOnCard ? "input-field error" : "input-field"}></input>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1">Card Number</span>
                        </div>
                        <div>
                            <input name="card_number" className={this.state.CardNumber ? "input-field error" : "input-field"}></input>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1">Expiry Date*</span>
                        </div>
                        <div>
                            <select name="month" placeholder="Month" className={this.state.month ? "select-field error" : "select-field"} style={{ marginRight: "2%" }}>
                                <option selected disabled>Month</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="2">3</option>
                                <option value="2">4</option>
                                <option value="2">5</option>
                                <option value="2">6</option>
                                <option value="2">7</option>
                                <option value="2">8</option>
                                <option value="2">9</option>
                                <option value="2">10</option>
                                <option value="12">12</option>
                            </select>
                            <select name="year" className={this.state.year ? "select-field error" : "select-field"}>
                                <option selected disabled>Year</option>
                                <option value="2011">2019</option>
                                <option value="2012">2020</option>
                                <option value="2013">2021</option>
                            </select>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1">Card Verification Number</span>
                        </div>
                        <div>
                            <input name="verification_number" className={this.state.verificationNumber ? "input-field error" : "input-field"}></input>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1">Billing Address</span>
                        </div>
                        <div>
                            <input type="checkbox" defaultChecked style={{ marginRight: 10, height: 15, width: 15 }}></input>
                            <span>Use my Delivery Address</span>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1">Title</span>
                        </div>
                        <div>
                            <select name="title" className={this.state.title ? "select-field error" : "select-field"} style={{ width: "100%", marginRight: 0 }}>
                                <option selected disabled>Please Select</option>
                                <option value="2011">value1</option>
                                <option value="2012">value2</option>
                                <option value="2013">value3</option>
                            </select>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1">First Name</span>
                        </div>
                        <div>
                            <input name="first_name" className={this.state.firstName ? "input-field error" : "input-field"}></input>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1">Last Name</span>
                        </div>
                        <div>
                            <input name="last_name" className={this.state.lastName ? "input-field error" : "input-field"}></input>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1">Phone number</span>
                        </div>
                        <div>
                            <input name="number" className={this.state.number ? "input-field error" : "input-field"}></input>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1">Address Finder</span>
                        </div>
                        <div>
                            <input name="address" className={this.state.address ? "input-field error" : "input-field"}></input>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1">Country</span>
                        </div>
                        <div>
                            <select name="country" className={this.state.country ? "select-field error" : "select-field"} style={{ width: "100%", marginRight: 0 }}>
                                <option selected disabled>Please Select</option>
                                <option value="2011">value1</option>
                                <option value="2012">value2</option>
                                <option value="2013">value3</option>
                            </select>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1">Address Line 1</span>
                        </div>
                        <div>
                            <input name="address_line_1" className={this.state.addressLine1 ? "input-field error" : "input-field"}></input>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1">Address Line 2 (Optional)</span>
                        </div>
                        <div>
                            <input name="address_line_2" className={this.state.addressLine2 ? "input-field error" : "input-field"}></input>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1">City</span>
                        </div>
                        <div>
                            <input name="city" className={this.state.city ? "input-field error" : "input-field"}></input>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1">State/ Province</span>
                        </div>
                        <div>
                            <input name="state" className={this.state.state ? "input-field error" : "input-field"}></input>
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1">Post Code</span>
                        </div>
                        <div>
                            <input name="post_code" className={this.state.postCode ? "input-field error" : "input-field"}></input>
                        </div>
                        <div style={{ marginTop: 30 }}>
                            <span>By Placing Order, you agree to the Elc</span><span style={{ color: '#0D943F', borderBottom: "solid 1px" }}> Terms & Conditions</span>
                        </div>
                    </FormGroup>
                    <div style={{ height: 80 }}>
                            <Button className="button" type="submit">Confirm and Place Order</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default CardPayment;