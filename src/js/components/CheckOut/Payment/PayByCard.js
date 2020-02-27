import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Route, Link,withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
class PayByCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      className: null
    }
  }
  componentWillMount() {
    this.setState({
      className: 't-Region  t-Region--removeHeader t-Region--scrollBody margin-bottom-none find-store_show'
    })

  }

  componentWillUnmount() {
    this.setState({
      className: 't-Region   h-hidden-mobile t-Region--removeHeader t-Region--scrollBody margin-bottom-none find-store_hide'
    })
  }

  render() {
    let payfort_fort_cc = this.props.payfort_fort_cc;
    let store_locale = this.props.globals.store_locale;
    return (
      <div className={this.state.className} id="CCI">
        <div className="t-Region-header">
          <div className="t-Region-headerItems t-Region-headerItems--title">
            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
            <h2 className="t-Region-title" id="CCI_heading">Credit Card Info</h2>
          </div>
          <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
        </div>
        <div className="t-Region-bodyWrap">
          <div className="t-Region-buttons t-Region-buttons--top">
            <div className="t-Region-buttons-left" />
            <div className="t-Region-buttons-right" />
          </div>
          <div className="t-Region-body">
            <div className="b-price_total" style={{ padding: '10px', borderBottom: '1px solid #d6d6d6', marginBottom: '10px' }}>
              <span className="m-label"><FormattedMessage id="delivery-details.Total.Title" defaultMessage="Total" /></span>
              <span className="m-value js-remaining-balance" data-value={payfort_fort_cc.total}> {payfort_fort_cc.currency} {payfort_fort_cc.total}</span><br />
            </div>
            <div className="col-lg-6" style={{ padding: '5px' }}><FormattedMessage id="Checkout.Payment.Msg1" defaultMessage="By placing your order, you agree to our" /><br /> 
            <Link to={`/${store_locale}/privacy-policy`} title="Privacy & Cookie Policy" target="_blank" style={{ textDecoration: 'underline' }}>
             <FormattedMessage id="Checkout.Payment.Msg2" defaultMessage="Privacy & Cookie Policy" /></Link> 
             <FormattedMessage id="Checkout.Payment.Msg3" defaultMessage="And" />
            <Link to={`/${store_locale}/terms-and-conditions`} title="Terms & Conditions" target="_blank" style={{ textDecoration: 'underline' }}>
            <FormattedMessage id="Checkout.Payment.Msg4" defaultMessage="Terms & Conditions" /></Link>.</div>
            <div className="container">
              <div className="row">
                <div className="col col-2 ">
                  <span className="apex-grid-nbsp">&nbsp;</span>
                </div>
                <div className="col col-4 ">
                  <button onClick={this.props.continueShopping} className="t-Button h-hidden-mobile  t-Button--pillStart t-Button--stretch" type="button" id="B34959181376190685">
                  <span className="t-Button-label">
                  <FormattedMessage id="Cart.ContinueShopping.Title" defaultMessage="Continue Shopping" />
                  </span></button>
                </div>
                <div className="col col-4 ">
                  <button onClick={this.props.redirectToCheckout} className="t-Button t-Button--hot h-hidden-mobile t-Button--pillEnd t-Button--stretch" type="button" id="CODB"><span className="t-Button-label"><FormattedMessage id="Checkout.Proceed" defaultMessage="Proceed" /></span></button>
                </div>
              </div>
            </div>
          </div>
          <div className="t-Region-buttons t-Region-buttons--bottom">
            <div className="t-Region-buttons-left" />
            <div className="t-Region-buttons-right" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      globals: state.global,
  }
}

export default withRouter(connect(mapStateToProps)(PayByCard));