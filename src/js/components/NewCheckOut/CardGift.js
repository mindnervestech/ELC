import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Container, Row, Col, Button, Form, FormGroup } from 'reactstrap';

var _ = require('lodash');

class CardGift extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div>
                    <span className="blackTitle1">Card / E-gift Number</span>
                </div>
                <div>
                    <input className="input-field"></input>
                </div>
                <div style={{ marginTop: 15 }}>
                    <span className="blackTitle1">Pin</span>
                </div>
                <div>
                    <input className="input-field"></input>
                </div>
                <div style={{ height: 80 }}>
                    <button className="button">Check Balance</button>
                </div>
                <div style={{ marginTop: 10 }}>See the order summary area for more information.</div>
            </div>
        );
    }
}
export default CardGift;