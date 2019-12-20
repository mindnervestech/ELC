import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'
import { Link, Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './AddressCard.css';
class AddressCard extends Component {
    constructor(props) {
        super(props);
       
    }
    render() {
        const store_locale = this.props.globals.store_locale;
        return (<>


            <li>
                <div className="col  col-xs-12 col-md-12 col-lg-3">
                    <p><span><strong style={{fontWeight:600}}><FormattedMessage id="profile.Address.Title" defaultMessage="Address" />: {this.props.address.address_type} </strong>
                        <br />{this.props.address.userFirstName} {this.props.address.userLastName}
                        <br />{this.props.address.street}
                        <br /> {this.props.address.city}
                        {/* {this.props.address.state} */}
                        <br />
                        <a href={"tel:" + this.props.address.telephone}>{this.props.address.carrier_code ? `${this.props.address.carrier_code == '91' ? '+' : ''}${this.props.address.carrier_code}${this.props.address.telephone}` : this.props.address.telephone}</a>
                        <br />
                        <div className="div-displayflex">
                            <Link to={{pathname:`/${store_locale}/add-address`,addressProps:this.props.address,updateAddressRedirect:true}}  className="btn-edit-address"><FormattedMessage id="profile.Edit.Title" defaultMessage="Edit" /></Link>
                            <a onClick={() => this.props.deleteAddress(this.props.addressKey)} className="btn-delete-address"><FormattedMessage id="profile.Delete.Title" defaultMessage="Delete" /></a>
                        </div>
                    </span></p>
                </div>

            </li>
        </>);
    }
}
const mapStateToProps = state => {
    return {
      globals: state.global,
      menu: state.menu.menuNavData,
      user_details: state.login,
    };
  }

export default withRouter(connect(mapStateToProps, null)(AddressCard));