import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Container, Row, Col, Button, Form, FormGroup } from 'reactstrap';

var _ = require('lodash');

class DeliverySpeed extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div>
                    <input type="checkbox" defaultChecked style={{ marginRight: 10, height: 15, width: 15 }}></input>
                    <span>International France Delivery - International Delivery - AED 3.45</span>
                </div>
                <div>
                    <div>
                        <span style={{ fontSize: 60 }}>.</span>
                        <span>Items will be shipped as soon as they are available</span>
                    </div>
                    <div>
                        <span style={{ fontSize: 60 }}>.</span>
                        <span>See Order Summary for more information</span>
                    </div>
                    <div style={{ height: 80 }}>
                        <button className="button" style={{ padding: '10px 50px' }}>Next</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default DeliverySpeed;