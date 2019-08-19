import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Collapsible from 'react-collapsible';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import logo1 from '../../../assets/images/you_may_also_like_1.png'
import payPalImg from '../../../assets/images/social/paypal.svg';
import masterCardImg from '../../../assets/images/social/masterCard.svg';
import CardPayment from './CardPayment'
import CardGift from './CardGift'
import DeliverySpeed from './DeliverySpeed'
import DeliveryLocation from './DeliveryLocation'

var _ = require('lodash');

class CheckOut extends Component {
	constructor(props) {
        super(props);
        this.state = {

        };
	}

	componentDidMount() {
		
    }

	render() {
		return (
			<div>
                <ul className="check-out">
                <li className="spasing-width"></li>
					<li>
                        <div>
                            <Collapsible trigger="1. Delivery Location" >
                                <DeliveryLocation></DeliveryLocation>
                            </Collapsible>
                        </div>
                        <div style={{marginTop: 10}}>
                            <Collapsible trigger="2. Delivery Speed" >
                                <DeliverySpeed></DeliverySpeed>
                            </Collapsible>
                        </div>
                        <div style={{marginTop: 10}} className="payment">
                            <Collapsible trigger="3. Payment" >
                                <div className="cardPayment">
                                    <Collapsible trigger="Card Payment" >
                                        <CardPayment/>
                                    </Collapsible>
                                </div>
                                <div>
                                    <div style={{padding: '15px 15px', borderBottom: 'solid 1px #b1b1b1'}}>
                                        <img src={payPalImg} className="paymentImage"></img>
                                        <span style={{marginLeft: '10%'}}>Pay with a Paypal account</span>
                                    </div>
                                    <div style={{padding: '15px 15px',borderBottom: 'solid 1px #b1b1b1'}}>
                                        <img src={masterCardImg} className="paymentImage"></img>
                                        <span style={{marginLeft: '10%'}}>Pay with a Amazon Pay account</span>
                                    </div>
                                </div>
                                <div className="cardPayment">
                                    <Collapsible trigger="Gift Card" >
                                        <CardGift></CardGift>
                                    </Collapsible>
                                </div>
                            </Collapsible>
                        </div>
                    </li>
                    <li>
                        <div className="secondBlock">
                            <div className="block1">
                                <div>
                                    <span className="header-text">Order Summary</span>
                                </div>
                                <div className="blackTitle1" style={{paddingTop: 10}}>
                                    <span>Ship to: Miss XYZ</span>
                                </div>
                            </div>
                            <div className="block2">
                                <div className="blackTitle1">
                                    <span>Delivery 1.</span>
                                </div>
                                <div className="block5">
                                    <Row>
                                        <Col xs="3">
                                            <img src={logo1} className="image"></img>
                                        </Col>
                                        <Col xs="6" style={{padding: 0}}>
                                            <div>
                                                <span style={{fontFamily: "VAG Rounded ELC Bold", color:'#0D943F'}}>PJ Masks Super Moon Adventure - Luna Fortress Playset</span>
                                            </div>
                                            <div>
                                                <span style={{fontFamily: "VAG Rounded ELC Bold"}}>Item price: </span><span> AES 29.99</span>
                                            </div>
                                            <div>
                                                <span style={{fontFamily: "VAG Rounded ELC Bold"}}>Qty: </span><span> 1</span>
                                            </div>
                                            <div>
                                                <span style={{fontFamily: "VAG Rounded ELC Bold"}}>Poduct #: </span><span> 535353</span>
                                            </div>
                                        </Col>
                                        <Col xs="3">
                                            <span style={{fontFamily: "VAG Rounded ELC Bold", color:'#0D943F'}}>AES 29.99</span>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="block3">
                                    <span className="floatLift blackTitle1">Subtotal:</span>
                                    <span className="floatRight">AES 29.99</span>
                                </div>
                                <div className="block4">
                                    <span className="floatLift header-text">Order Total</span>
                                    <span className="floatRight header-text">AES 29.99</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="spasing-width"></li>
                </ul>
				{/* <div className="row-2">
				    <span className="blackTitle">Narrow your Results</span>
				</div>
				<div className="bottomBorder">
					<Collapsible trigger="Type of Toy" >
					<div>Animal figures (72)</div>
					<div>Baby dolls (52)</div>
					<div>Fashion dolls and accessories (191)</div>
					<div>Film & TV Dolls (49)</div>
					<div>Pre-school Dolls (24)</div>
					<div>Rag Dolls 16)</div>
					</Collapsible>
				</div>
                <div className="bottomBorder">
					<Collapsible trigger="Brands" >
					<div>Animal figures (72)</div>
					<div>Baby dolls (52)</div>
					<div>Fashion dolls and accessories (191)</div>
					<div>Film & TV Dolls (49)</div>
					<div>Pre-school Dolls (24)</div>
					<div>Rag Dolls 16)</div>
					</Collapsible>
				</div>
                <div className="bottomBorder">
					<Collapsible trigger="Age" >
					<div>Animal figures (72)</div>
					<div>Baby dolls (52)</div>
					<div>Fashion dolls and accessories (191)</div>
					<div>Film & TV Dolls (49)</div>
					<div>Pre-school Dolls (24)</div>
					<div>Rag Dolls 16)</div>
					</Collapsible>
				</div>
                <div className="bottomBorder">
					<Collapsible trigger="Other Options" >
					<div>Animal figures (72)</div>
					<div>Baby dolls (52)</div>
					<div>Fashion dolls and accessories (191)</div>
					<div>Film & TV Dolls (49)</div>
					<div>Pre-school Dolls (24)</div>
					<div>Rag Dolls 16)</div>
					</Collapsible>
				</div>
                <div className="bottomBorder">
					<Collapsible trigger="Price" >
					<div>Animal figures (72)</div>
					<div>Baby dolls (52)</div>
					<div>Fashion dolls and accessories (191)</div>
					<div>Film & TV Dolls (49)</div>
					<div>Pre-school Dolls (24)</div>
					<div>Rag Dolls 16)</div>
					</Collapsible>
				</div> */}
			</div>
		);
	}
}

export default CheckOut;
