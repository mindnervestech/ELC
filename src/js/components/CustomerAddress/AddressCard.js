import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
class AddressCard extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(<>
            <li className="t-Cards-item #CARD_MODIFIERS#">
                        <div className="t-Card">
                            <div className="t-Card-icon u-color #CARD_COLOR#"><span className="t-Icon fa #CARD_ICON#"><span className="t-Card-initials" role="presentation">#CARD_INITIALS#</span></span></div>
                            <div className="t-Card-body">
                                <p><span><strong><FormattedMessage id="profile.Address.Title" defaultMessage="Address" />: {this.props.address.address_type} </strong> 
                                <br />{this.props.address.userFirstName} {this.props.address.userLastName}
                                <br />{this.props.address.street}
                                <br />{this.props.address.state} {this.props.address.city}
                                <br /> 
                                <a href={"tel:" + this.props.address.telephone}>{this.props.address.carrier_code ? `${this.props.address.carrier_code == '91' ? '+' : ''}${this.props.address.carrier_code}${this.props.address.telephone}`: this.props.address.telephone}</a>
                                <br />
                                <a onClick={() => this.props.openFirstModal(this.props.addressKey)} className="addr_link_edit"><FormattedMessage id="profile.Edit.Title" defaultMessage="Edit" /></a> 
                                <a onClick={() => this.props.deleteAddress(this.props.addressKey)} className="addr_link_del"><FormattedMessage id="profile.Delete.Title" defaultMessage="Delete" /></a>
                                </span></p>
                            </div>
                            <span className="t-Card-colorFill u-color #CARD_COLOR#" />
                        </div>
                    </li>
        </>);
    }
}

export default AddressCard;