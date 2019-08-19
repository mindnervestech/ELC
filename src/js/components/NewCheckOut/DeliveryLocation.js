import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Container, Row, Col, Button, Form, FormGroup } from 'reactstrap';

var _ = require('lodash');

class DeliveryLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        if (e.target.first_name.value == "") {
            this.setState({ firstName: true })
        }
        if (e.target.last_name.value == "") {
            this.setState({ lastName: true })
        }
        if (e.target.title.value == "Please Select") {
            this.setState({ title: true })
        }
        if (e.target.number.value == "") {
            this.setState({ number: true })
        }
        if (e.target.address.value == "") {
            this.setState({ address: true })
        }
        if (e.target.country.value == "Please Select") {
            this.setState({ country: true })
        }
        if (e.target.address_line_1.value == "") {
            this.setState({ addressLine1: true })
        }
        if (e.target.address_line_2.value == "") {
            this.setState({ addressLine2: true })
        }
        if (e.target.city.value == "") {
            this.setState({ city: true })
        }
        if (e.target.state.value == "") {
            this.setState({ state: true })
        }
        if (e.target.post_code.value == "") {
            this.setState({ postCode: true })
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onFormSubmit}>
                    <FormGroup>
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
                        <div style={{paddingTop: 30}}>
                            <Row>
                                <Col xs="1">
                                    <input type="checkbox" style={{ marginRight: 10, height: 20, width: 20 }}></input>
                                </Col>
                                <Col xs="11">
                                    <span>I'd like to reveive emails from ELC about special offers, new toys and voucher codes.</span>
                                </Col>
                            </Row>
                        </div>
                        <div style={{paddingTop: 15}}>
                            <Row>
                            <Col xs="1">
                            <span style={{ fontSize: 60, position: 'absolute', top: -15 }}>.</span>
                            </Col>
                            <Col xs="11" style={{padding: 0}}>
                            <span>You can ask us to stop any time and we will never sell your data to other companies for marketing purposes</span>
                            </Col>
                            </Row>
                            <Row style={{paddingTop: 15}}>
                            <Col xs="1">
                            <span style={{ fontSize: 60, position: 'absolute', top: -15 }}>.</span>
                            </Col>
                            <Col xs="11" style={{padding: 0}}>
                            <span>We always try to send emails that are relevant to you based on products you have shown an interest in.</span>
                            </Col>
                            </Row>
                        </div>
                    </FormGroup>
                    <div style={{ height: 80 }}>
                        <Button className="button" type="submit" style={{ padding: '10px 50px' }}>Next</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default DeliveryLocation;