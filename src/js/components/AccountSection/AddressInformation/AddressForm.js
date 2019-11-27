import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import { Row, Col } from 'reactstrap';
import './AddressForm.css'
import Address from '../../CustomerAddress/AddressForm';
let store_locale = null;

class AddressForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        store_locale = 'uae-en'
        let language = 'en'
        return (
            <>
                <Row>
                    <div className="t-Body-contentInner">
                        <div className="padding-right-ar padding-breadcrumb">
                            <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                                <span className="titleHover" style={{ fontSize: 15 }}><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></span>
                                {language === 'en' ?
                                    <span>&nbsp;\&nbsp;&nbsp;</span> :
                                    <span>&nbsp;/&nbsp;&nbsp;</span>
                                }
                            </Link>
                            <span style={{ fontSize: 15, fontWeight: 'bold' }}><FormattedMessage id="profile.Account.Title" defaultMessage="Account" /></span>
                            
                        </div>
                        <span className="addnew-header">Add New</span>
                            <hr />
                    </div>
                </Row>

                <Row>
                    <Col xs={1} lg={2} md={2}>&nbsp;</Col>
                    <Col lg={8} md={8} xs={10}>
                        {/* <div className="address-main-container">
                            <div className="address-add-new">
                                <span className="glyphicon glyphicon-chevron-left"></span>
                                <h1 className="address-add-new-header">Add New</h1>
                            </div>
                            <div className="form-group">
                                <label className="control-label " htmlFor="address.firstName">
                                    First Name</label>

                                <input id="address.firstName" name="firstName" className="form-control input-field"  />
                            </div>
                            <div className="form-group">
                                <label className="control-label " htmlFor="address.firstName">
                                    Last Name</label>

                                <input id="address.firstName" name="lastName" className="form-control input-field"  />
                            </div>
                            <div className="form-group">
                            <label className="control-label " htmlFor="address.firstName">
                                    Location</label>
                            <select size="1" id="P25_R_COUNTRY" name="P25_R_COUNTRY" className="selectlist apex-item-select" readonly="">
                                <option value="NA">Select Country</option>
                                <option value="SA">Saudi Arabia</option>
                                <option value="AE">United Arab Emirates</option></select>

                            </div>
                        </div> */}
                        <Address/>
                       
                    </Col>
                    <Col xs={1} lg={2} md={2}>&nbsp;</Col>
                </Row>


            </>
        )
    }

}

export default AddressForm