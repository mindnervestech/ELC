import React, { Component } from "react";
import { FormattedMessage } from 'react-intl';
import Snackbar from '../../Common/Snackbar/snackbar.js'
class CouponCode extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      vochercode:0
    }
  }
  render() {
    return (
      <><div className="row">
        <div className="col col-12 apex-col-auto">
          <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow margin-top-none margin-bottom-none" id="R15490249805623004">
            <div className="t-Region-header">
              <div className="t-Region-headerItems t-Region-headerItems--title">
                <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                <h2 className="t-Region-title" id="R15490249805623004_heading"><FormattedMessage id="Checkout.voucher" defaultMessage="Voucher" /></h2>
              </div>
              <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
            </div>
            <div className="t-Region-bodyWrap">
              <div className="t-Region-buttons t-Region-buttons--top">
                <div className="t-Region-buttons-left" />
                <div className="t-Region-buttons-right" />
              </div>
              <div className="t-Region-body">
                <div className="container">
                  {/* <div className="row">
                    <div className="col col-1 ">
                      <span className="apex-grid-nbsp">&nbsp;</span>
                    </div>
                    <div className="col col-8 ">
                      <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel t-Form-fieldContainer--stretchInputs apex-item-wrapper apex-item-wrapper--text-field" id="P8_VOUCHER_CONTAINER">
                        <div className="t-Form-labelContainer">
                          <label htmlFor="P8_VOUCHER" id="P8_VOUCHER_LABEL" className="t-Form-label"><FormattedMessage id="Checkout.voucher" defaultMessage="Voucher" /></label>
                        </div>
                        <div className="t-Form-inputContainer">
                          <div className="t-Form-itemWrapper"><input type="text" id="P8_VOUCHER" name="P8_VOUCHER" value={this.state.vochercode}  onChange={(e)=>{this.setState({vochercode:this.state.vochercode})}}   className="text_field apex-item-text" size={30} /></div>
                          <span id="P8_VOUCHER_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
                        </div>
                      </div>
                    </div>
                    <div className="col col-3 apex-col-auto">
                      <button className="t-Button t-Button--noLabel t-Button--icon t-Button--large t-Button--gapTop" onclick={this.showSnackbar} type="button" id="vouch" title="Vouch" aria-label="Vouch"><span className="t-Icon fa fa-check" aria-hidden="true" /></button>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="t-Region-buttons t-Region-buttons--bottom">
                <div className="t-Region-buttons-left" />
                <div className="t-Region-buttons-right" />
              </div>
            </div>
          </div>
        </div>
      </div>

      </>);
  }
}

export default CouponCode