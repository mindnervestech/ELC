import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import AddressForm from './AddressForm';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import AlertBox from '../Common/AlertBox/AlertBox';
import * as actions from '../../redux/actions/index';

class AddressLink extends Component {

  constructor(props) {
    super(props);
    this.myIntl = props.intl
    this.state = {
      openFirstModal: false,
      alertBoxDetails: {
        status: false,
        message: '',
      }
    }

  }

  onOpenFirstModal = () => {
    if (this.props.isContryRec) {
      this.setState({ openFirstModal: true });
    } else {

      //alert(this.myIntl.formatMessage({ id: 'Address.AddLink' }));
      this.setState({
        ...this.state,
        alertBoxDetails: {
          status: true,
          message: this.myIntl.formatMessage({ id: 'Address.AddLink' }),
        }
      }, () => {
        this.props.onGetCountryList()
      })
    }

  };

  onCloseFirstModal = () => {
    this.setState({ openFirstModal: false });
  };


  closeErrorBox = () => {
    this.setState({
      ...this.state,
      alertBoxDetails: {
        status: false,
        message: ''
      }
    }, () => {
      this.onCloseFirstModal();
    })
    console.log('Close alert Box Parent');
  }

  render() {

    let alertBox = null;

    if (this.state.alertBoxDetails.status) {
      alertBox = <AlertBox
        message={this.state.alertBoxDetails.message}
        alertBoxStatus={this.state.alertBoxDetails.status}
        closeBox={this.closeErrorBox} />
    }

    const { openFirstModal } = this.state;
    const add = <AddressForm closeModal={this.onCloseFirstModal} Actype={'Add'} />

    if (this.props.addressResp.status &&
      this.props.addressResp.message &&
      this.state.openFirstModal) {
      this.onCloseFirstModal();
      this.props.reload();
    } else if (this.props.addressResp.status == false) {
      //alert(this.props.addressResp.message);
      this.setState({
        ...this.state,
        alertBoxDetails: {
          status: true,
          message: this.myIntl.formatMessage({ id: 'Address.AddLink' }),
        }
      })

    }

    return (
      <>
        {alertBox}
        <Modal modalId="AddAddress" open={openFirstModal} onClose={this.onCloseFirstModal} center style={{ width: '500.9584px' }}>
          <h3><FormattedMessage id="Profile.AddAddress" defaultMessage="Add Address" /></h3>
          <div>{add}</div>

        </Modal>


        <div className="t-Region-bodyWrap">
          <div className="t-Region-buttons t-Region-buttons--top">
            <div className="t-Region-buttons-left" />
            <div className="t-Region-buttons-right" />
          </div>

          <div className="t-Region-body">
            <div id="report_28336163854179577_catch">
              <span className="nodatafound">
                <FormattedMessage id="profile.NoData" defaultMessage="You currently have no shipping addresses setup. To add a shipping address, please  " />
                <a href="#" onClick={this.onOpenFirstModal}>
                  <FormattedMessage id="ClickMe.Text" defaultMessage="Click Me" />
                </a></span>
            </div>
          </div>

          <div className="t-Region-buttons t-Region-buttons--bottom">
            <div className="t-Region-buttons-left" />
            <div className="t-Region-buttons-right" />
          </div>

        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isContryRec: state.address.isContryRec,

  }
}


const mapDispatchToProps = dispatch => {
  return {
    onGetCountryList: () => dispatch(actions.getCountryList()),
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddressLink));
