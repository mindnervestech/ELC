import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import AddressForm from './AddressForm';
import AddressCard from './AddressCard';
import ConfirmBox from '../Common/AlertBox/ConfirmBox';
import AlertBox from '../Common/AlertBox/AlertBox';

import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';


class AddressCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFirstModal: false,
      addressForEdit: {},
      alertBoxDetails: {
        status: false,
        message: '',
      },
      confirmBoxDetails: {
        addressKey: 'NA',
        status: false,
        message: '',
        clickedon: 'NA'
      },
    }

  }

  deleteAddress = (addressKey) => {

    this.setState({
      ...this.state,
      confirmBoxDetails: {
        addressKey: addressKey,
        status: true,
        message: 'Are you sure you want to delete this item?',
      }
    })


  }

  onOpenFirstModal = (addressKey) => {
    //console.log(addressKey);
    this.setState({
      openFirstModal: true,
      addressForEdit: this.props.addressList[addressKey]
    });
  }

  onCloseFirstModal = () => {
    this.setState({ openFirstModal: false });
  }

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


  buttonClick = (val) => {
    if (this.state.confirmBoxDetails.addressKey !== 'NA') {
      this.setState({
        ...this.state,
        confirmBoxDetails: {
          status: false,
          message: ''
        }
      })

      if (val == 'ok') {
        const addressObj = this.props.addressList[this.state.confirmBoxDetails.addressKey];
        let addressId = addressObj.Id;
        this.props.onDeleteUserAddress({ addressId: addressId });
      }
    }
  }


  render() {
    console.log(this.state.confirmBoxDetails.addressKey);
    let alertBox = null;

    if (this.state.alertBoxDetails.status) {
      alertBox = <AlertBox
        message={this.state.alertBoxDetails.message}
        alertBoxStatus={this.state.alertBoxDetails.status}
        closeBox={this.closeErrorBox} />
    }

    let confirmBox = null;

    if (this.state.confirmBoxDetails.status) {
      confirmBox = <ConfirmBox
        message={this.state.confirmBoxDetails.message}
        alertBoxStatus={this.state.confirmBoxDetails.status}
        buttonClick={(val) => this.buttonClick(val)} />
    }

    const { openFirstModal } = this.state;
    const add = <AddressForm closeModal={this.onCloseFirstModal} Actype={'Edit'} addressForEdit={this.state.addressForEdit} />
    let addressCard = null;
    const addressList = this.props.addressList;

    if (addressList.length > 0) {
      addressCard = addressList.map((address, index) => {
        return (
          <AddressCard
            key={index}
            address={address}
            addressKey={index}
            openFirstModal={(id) => this.onOpenFirstModal(id)}
            deleteAddress={(id) => this.deleteAddress(id)} />
        );
      })
    }

    //console.log(this.props.addressResp);


    if (this.props.addressResp.status &&
      this.props.addressResp.message &&
      (this.props.addressResp.code === 200)) {
      //alert(this.props.addressResp.message);
      if (this.state.openFirstModal) {
        this.onCloseFirstModal();
      }
      this.props.onGetUserAddress({ customerid: this.props.user_details.customer_details.customer_id });

    } else if (this.props.addressResp.status == false) {
      // alert(this.props.addressResp.message);
      this.setState({
        ...this.state,
        alertBoxDetails: {
          status: true,
          message: this.props.addressResp.message,
        }
      })
      // this.onCloseFirstModal();
    }

    return (
      <>
        {alertBox}
        {confirmBox}
        <Modal open={openFirstModal} onClose={this.onCloseFirstModal} center style={{ width: '550.9584px' }}>
          <h3>Edit Address</h3>
          <div>{add}</div>
        </Modal>


        <div className="t-Region-bodyWrap">
          <div className="t-Region-buttons t-Region-buttons--top">
            <div className="t-Region-buttons-left" />
            <div className="t-Region-buttons-right" />
          </div>
          <div className="t-Region-body">
            <div id="report_28336163854179577_catch"><ul className="t-Cards t-Cards--basic t-Cards--cols t-Cards--animColorFill" id="caddress_cards" data-region-id="caddress">

              {addressCard}

            </ul>
              <table className="t-Report-pagination" role="presentation" /></div>
          </div>

        </div>
      </>);
  }
}
const mapStateToProps = state => {
  return {
    user_details: state.login,
    change_pass: state.login.changePasswordDetails,
    addressBook: state.address.addressBook,
    countryList: state.address.countryList,
    addressResp: state.address.addressResp,
    isAddBookRec: state.address.isAddBookRec,

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetUserAddress: (payload) => dispatch(actions.getUserAddress(payload)),
    onDeleteUserAddress: (payload) => dispatch(actions.deleteAddress(payload)),
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddressCardList);