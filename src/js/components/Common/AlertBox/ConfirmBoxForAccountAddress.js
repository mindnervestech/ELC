
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import './ConfirmBoxForAddress.css'

class ConfirmBoxForAccountAddress extends Component {
    constructor(props) {
        super(props)
        this.myIntl = props.intl
        this.state = {
            showAlertBoxReact: this.props.alertBoxStatus,
        }
    }
    CancelClicked = () => {
        this.setState({
            showAlertBoxReact: false
        })

        this.props.buttonClick('can');
    }
    OkClicked = () => {
        this.setState({
            showAlertBoxReact: false
        })
        this.props.buttonClick('ok');
    }
    render() {
        let alertBoxReact = null;
        let message = null;
        let obj = this.props.data
        if (this.state.showAlertBoxReact) {
            alertBoxReact = <div className="alertify" style={{ display: 'inil' }}>
                <div className="dialog" style={{ top: '50%' }}>
                    <div className="leftContent" style={{width:'419px'}}>
                        <span style={{ fontSize: 25, fontWeight: 800, color: '#0d943f' }}><b>Delete Address</b></span>
                        <br/>
                        <span>The following address will be deleted from your Address Book</span>
                        <ul className="msg textAlignLeft-deleteAddress">
                            <li>
                                <strong><span><b> <FormattedMessage id="profile.Address.Title" defaultMessage="Address"/>:</b></span> <span>{obj.address_type}</span>
                                </strong>
                            </li>
                            <li>{obj.userFirstName!==undefined && obj.userFirstName}&nbsp;&nbsp;{obj.userLastName!==undefined && obj.userLastName}</li>
                            <li>{obj.street!==undefined && obj.street}</li>
                            <li>{obj.street !==undefined && obj.state}</li>
                            <li>{obj.carrier_code !== undefined && obj.carrier_code}{obj.telephone}</li>

                        </ul>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 ">
                                <button style={{ border: 'none',width:'100%', borderColor: 'red',marginBottom:10 }}  onClick={this.OkClicked} className="btn-del-address-popop">
                                   <FormattedMessage id="profile.Delete.Title" defaultMessage="Delete"/></button>
                            </div>
                            <div className="col-xs-12 col-sm-6 ">
                    <button style={{height:45,width:'100%' }}  onClick={this.CancelClicked} className="btn-cancel-address-popup">
                                 <FormattedMessage id="alertBoxText.Cancel" defaultMessage="Cancel"/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        }
        return (
            <>
                {alertBoxReact}
            </>
        )
    }
}
export default injectIntl(ConfirmBoxForAccountAddress);