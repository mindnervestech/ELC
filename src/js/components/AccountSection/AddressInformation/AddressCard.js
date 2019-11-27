import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'
import './AddressCard.css';
class AddressCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<>


            <li>
                <div>
                    <p><span><strong style={{fontWeight:600}}><FormattedMessage id="profile.Address.Title" defaultMessage="Address" />: {this.props.address.address_type} </strong>
                        <br />{this.props.address.userFirstName} {this.props.address.userLastName}
                        <br />{this.props.address.street}
                        <br /> {this.props.address.city}
                        {/* {this.props.address.state} */}
                        <br />
                        <a href={"tel:" + this.props.address.telephone}>{this.props.address.carrier_code ? `${this.props.address.carrier_code == '91' ? '+' : ''}${this.props.address.carrier_code}${this.props.address.telephone}` : this.props.address.telephone}</a>
                        <br />
                        <div className="div-displayflex">
                            <a onClick={() => this.props.openFirstModal(this.props.addressKey)} className="btn-edit-address"><FormattedMessage id="profile.Edit.Title" defaultMessage="Edit" /></a>
                            <a onClick={() => this.props.deleteAddress(this.props.addressKey)} className="btn-delete-address"><FormattedMessage id="profile.Delete.Title" defaultMessage="Delete" /></a>
                        </div>
                    </span></p>
                </div>

            </li>
        </>);
    }
}

export default AddressCard;