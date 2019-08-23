import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';

class AlertMsg extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showAlert: true,
      }
   }
   hideAlertBox = () => {
      this.setState({
         showAlert: !this.state.showAlert
      })
      this.props.closedScroll();
   }
   render() {
      let showAlert = <> <div className="alertify"><div className="dialog"><div><p className="msg"> <FormattedMessage id="OutOfStock.Message" defaultMessage="Out Of Stock Message" /></p><nav><button className="ok" tabIndex={1} onClick={this.hideAlertBox}><FormattedMessage id="Ok.text" defaultMessage="Ok" /></button></nav></div></div></div>);</>;
      return (<>
         {this.state.showAlert ? showAlert : null}
      </>
      );

   }
}


export default AlertMsg;