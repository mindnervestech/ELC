import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Route, Link, Switch, Redirect } from 'react-router-dom'

class SavedAddressList extends Component {

  radioClick = (id) => {
    this.props.radioClick(id);
  }
  render() {
    const selected_country = this.props.selected_country;

    let country_code = null;
    let addressItem = null;
    if (selected_country === 'International') {
      //console.log(selected_country);
      country_code = 'NA';
      addressItem = this.props.addressData.map((item, index) => {
        let item_id = 'P7_ADDRESSES_' + item.Id

        if (item.country_id != 'SA' && item.country_id != 'AE') {
          return (<div className="apex-item-option" key={index}>
            <input type="radio" id={item_id} name="ADDRESSES" Value={item.Id}
              onClick={() => this.radioClick(item)} />

            <label htmlFor={item_id}>
              Address: {item.address_type} {item.country_id}<br />
              {item.userFirstName} {item.userLastName}<br />
              {item.city}, {item.street}, {item.state}<br />
              {item.state}<br />
              {item.country_id}<br />
              {item.telephone}</label></div>)
        } else {
          return (<div className="apex-item-option apex_disabled" >
            <input type="radio" id={item_id} name="P7_ADDRESSES" />
            <label htmlFor={item_id}>
              Address: {item.address_type}<br />
              {item.userFirstName} {item.userLastName}<br />
              {item.city}, {item.street}, {item.state}<br />
              {item.state}<br />
              {item.country_id}<br />
              {item.telephone}
              <span style={{ background: '#c7c7c7', color: '#000' }}>
                <FormattedMessage id="saved.add.text" defaultMessage="Selected country" />.</span></label>
          </div>)
        }

      })
    } else if (selected_country === 'KSA') {
      addressItem = this.props.addressData.map((item, index) => {
        let item_id = 'P7_ADDRESSES_' + item.Id

        if (item.country_id === 'SA') {
          return (<div className="apex-item-option" key={index}>
            <input type="radio" id={item_id} name="ADDRESSES" Value={item.Id}
              onClick={() => this.radioClick(item)} />

            <label htmlFor={item_id}>
              Address: {item.address_type}<br />
              {item.userFirstName} {item.userLastName}<br />
              {item.city}, {item.street}, {item.state}<br />
              {item.state}<br />
              {item.country_id}<br />
              {item.telephone}</label></div>)
        } else {
          return (<div className="apex-item-option apex_disabled" >
            <input type="radio" id={item_id} name="P7_ADDRESSES" />
            <label htmlFor={item_id}>
              Address: {item.address_type}<br />
              {item.userFirstName} {item.userLastName}<br />
              {item.city}, {item.street}, {item.state}<br />
              {item.state}<br />
              {item.country_id}<br />
              {item.telephone}
              <span style={{ background: '#c7c7c7', color: '#000' }}>
                <FormattedMessage id="saved.add.text" defaultMessage="Selected country" />.</span></label>
          </div>)
        }

      })
    } else if (selected_country === 'UAE') {
      addressItem = this.props.addressData.map((item, index) => {
        let item_id = 'P7_ADDRESSES_' + item.Id

        if (item.country_id === 'AE') {
          return (<div className="apex-item-option" key={index}>
            <input type="radio" id={item_id} name="ADDRESSES" Value={item.Id}
              onClick={() => this.radioClick(item)} />

            <label htmlFor={item_id}>
              Address: {item.address_type}<br />
              {item.userFirstName} {item.userLastName}<br />
              {item.city}, {item.street}, {item.state}<br />
              {item.state}<br />
              {item.country_id}<br />
              {item.telephone}</label></div>)
        } else {
          return (<div className="apex-item-option apex_disabled" >
            <input type="radio" id={item_id} name="P7_ADDRESSES" />
            <label htmlFor={item_id}>
              Address: {item.address_type}<br />
              {item.userFirstName} {item.userLastName}<br />
              {item.city}, {item.street}, {item.state}<br />
              {item.state}<br />
              {item.country_id}<br />
              {item.telephone}
              <span style={{ background: '#c7c7c7', color: '#000' }}>
                <FormattedMessage id="saved.add.text" defaultMessage="Selected country" />.</span></label>
          </div>)
        }

      })
    }





    return (<>

      <div className="t-Region find-store_hide t-Region--removeHeader t-Region--stacked t-Region--hiddenOverflow find-store_show" id="DTA">

        <div className="t-Region-header">
          <div className="t-Region-headerItems t-Region-headerItems--title">
            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
            <h2 className="t-Region-title" id="DTA_heading"><FormattedMessage id="delivery-details.AddressInformation.Title" defaultMessage="Address Information" /></h2>
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
              <div className="row">
                <div className="col col-4 ">
                  <div className="t-Region t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow" id="R34927712771907735">
                    <div className="t-Region-header">
                      <div className="t-Region-headerItems t-Region-headerItems--title">
                        <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                        <h2 className="t-Region-title" id="R34927712771907735_heading">Contact Information Heading</h2>
                      </div>
                      <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                    </div>
                    <div className="t-Region-bodyWrap">
                      <div className="t-Region-buttons t-Region-buttons--top">
                        <div className="t-Region-buttons-left" />
                        <div className="t-Region-buttons-right" />
                      </div>
                      <div className="t-Region-body">
                        <h3 className="title-block" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 'normal' }}>
                          <span><FormattedMessage id="delivery-details.AddressInformation.Title" defaultMessage="Address Information" /></span>
                        </h3>
                      </div>
                      <div className="t-Region-buttons t-Region-buttons--bottom">
                        <div className="t-Region-buttons-left" />
                        <div className="t-Region-buttons-right" />
                      </div>
                    </div>
                  </div>
                </div><div className="col col-8 apex-col-auto">
                  <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow t-Form--stretchInputs margin-top-none margin-bottom-none" id="R28611824894643382">
                    <div className="t-Region-header">
                      <div className="t-Region-headerItems t-Region-headerItems--title">
                        <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                        <h2 className="t-Region-title" id="R28611824894643382_heading"><FormattedMessage id="SavedAddress.Text" defaultMessage="Saved Address" /></h2>
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
                          <div className="row">
                            <div className="col col-12 apex-col-auto">
                              <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel  apex-item-wrapper apex-item-wrapper--radiogroup " id="P7_ADDRESSES_CONTAINER"><div className="t-Form-labelContainer">
                                <label htmlFor="P7_ADDRESSES" id="P7_ADDRESSES_LABEL" className="t-Form-label"><FormattedMessage id="SavedAddress.Text" defaultMessage="SavedAddress" /></label>
                              </div>

                                <div className="t-Form-inputContainer">

                                  <div className="t-Form-itemWrapper">
                                    <div tabIndex={-1} id="P7_ADDRESSES" aria-labelledby="P7_ADDRESSES_LABEL" className="radio_group apex-item-group apex-item-group--rc apex-item-radio" role="group">
                                      <div className="apex-item-grid radio_group">
                                        <div className="apex-item-grid-row">



                                          {addressItem}




                                        </div></div></div>
                                  </div><span id="P7_ADDRESSES_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" /></div></div>
                            </div>


                          </div><div className="row">
                            <div className="col col-2 ">
                              <span className="apex-grid-nbsp">&nbsp;</span>
                            </div><div className="col col-8 ">
                              <button onClick={this.props.addNewAddress} className="t-Button t-Button--stretch" type="button" id="B28612101734643385"><span className="t-Button-label">Add New Address</span></button>
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
                  <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noUI t-Region--hiddenOverflow t-Form--slimPadding t-Form--stretchInputs t-Form--labelsAbove margin-top-none margin-bottom-none" id="R631680584527102694" style={{ display: 'none' }}>
                    <div className="t-Region-header">
                      <div className="t-Region-headerItems t-Region-headerItems--title">
                        <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                        <h2 className="t-Region-title" id="R631680584527102694_heading">Add New Address</h2>
                      </div>
                      <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                    </div>
                    <div className="t-Region-bodyWrap">
                      <div className="t-Region-buttons t-Region-buttons--top">
                        <div className="t-Region-buttons-left" />
                        <div className="t-Region-buttons-right" />
                      </div>
                      <div className="t-Region-body">
                        <p style={{ fontSize: '11px', marginBottom: '20px' }}> 
                        <i className="fa fa-exclamation-circle" style={{ color: '#f599ba', fontSize: '22px' }} />
                         <FormattedMessage id="delivery-details.addressContent" defaultMessage="Address Information content" /></p><div className="container">
                          <div className="row">
                            <div className="col col-12 apex-col-auto">
                              <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--select-list js-show-label" id="P7_R_COUNTRY_CONTAINER"><div className="t-Form-labelContainer">
                                <label htmlFor="P7_R_COUNTRY" id="P7_R_COUNTRY_LABEL" className="t-Form-label">
                                <FormattedMessage id="Checkout.Location" defaultMessage="Location" />
                                <span className="u-VisuallyHidden">(Value Required)</span></label>
                              </div><div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><select id="P7_R_COUNTRY" name="P7_R_COUNTRY" className="selectlist apex-item-select" readOnly="readonly" size={1}><option value="SA" selected="selected">Saudi Arabia</option>
                              </select></div><span id="P7_R_COUNTRY_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" /></div></div>
                            </div>
                          </div><div className="row">
                            <div className="col col-12 apex-col-auto">
                              <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--select-list js-show-label" id="P7_R_CITY_CONTAINER"><div className="t-Form-labelContainer">
                                <label htmlFor="P7_R_CITY" id="P7_R_CITY_LABEL" className="t-Form-label"><FormattedMessage id="Checkout.City" defaultMessage="City" /> <span className="u-VisuallyHidden">(Value Required)</span></label>
                              </div><div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><select id="P7_R_CITY" name="P7_R_CITY" className="selectlist apex-item-select" size={1}><option value>--Select City--</option>

                              </select></div><span id="P7_R_CITY_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" /></div></div>
                            </div>
                          </div><div className="row">
                            <div className="col col-12 apex-col-auto">
                              <div className="t-Form-fieldContainer t-Form-fieldContainer--stacked is-required  apex-item-wrapper apex-item-wrapper--text-field " id="P7_RADD1_CONTAINER"><div className="t-Form-labelContainer">
                                <label htmlFor="P7_RADD1" id="P7_RADD1_LABEL" className="t-Form-label"><FormattedMessage id="Address1.Text" defaultMessage="Address 1" /><span className="u-VisuallyHidden">(Value Required)</span></label>
                              </div><div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><input type="text" id="P7_RADD1" name="P7_RADD1" className="text_field apex-item-text" defaultValue="Test45" size={30} /></div><span id="P7_RADD1_error_placeholder" className="a-Form-error" data-template-id="33610144887469734_ET" /></div></div>
                            </div>
                          </div><div className="row">
                            <div className="col col-12 apex-col-auto">
                              <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field js-show-label" id="P7_RADD2_CONTAINER"><div className="t-Form-labelContainer">
                                <label htmlFor="P7_RADD2" id="P7_RADD2_LABEL" className="t-Form-label"><FormattedMessage id="Address2.Text" defaultMessage="Address 2" /></label>
                              </div><div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><input type="text" id="P7_RADD2" name="P7_RADD2" className="text_field apex-item-text" defaultValue="test45" size={30} /></div><span id="P7_RADD2_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" /></div></div>
                            </div>
                          </div><div className="row">
                            <div className="col col-12 apex-col-auto">
                              <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field js-show-label" id="P7_RADD3_CONTAINER"><div className="t-Form-labelContainer">
                                <label htmlFor="P7_RADD3" id="P7_RADD3_LABEL" className="t-Form-label"><FormattedMessage id="Address3.Text" defaultMessage="Address 3" /></label>
                              </div><div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><input type="text" id="P7_RADD3" name="P7_RADD3" className="text_field apex-item-text" defaultValue="test45" size={30} /></div><span id="P7_RADD3_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" /></div></div>
                            </div>
                          </div><div className="row">
                            <div className="col col-6 apex-col-auto">
                              <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel  apex-item-wrapper apex-item-wrapper--radiogroup " id="P7_ADDR_TYPE_CONTAINER"><div className="t-Form-labelContainer">
                                <label htmlFor="P7_ADDR_TYPE" id="P7_ADDR_TYPE_LABEL" className="t-Form-label"><FormattedMessage id="Checkout.AddressType" defaultMessage="Address Type" /></label>
                              </div><div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><div tabIndex={-1} id="P7_ADDR_TYPE" aria-labelledby="P7_ADDR_TYPE_LABEL" className="radio_group apex-item-group apex-item-group--rc apex-item-radio" role="group">
                                <div className="apex-item-grid radio_group">
                                  <div className="apex-item-grid-row">
                                    <div className="apex-item-option"><input type="radio" id="P7_ADDR_TYPE_0" name="P7_ADDR_TYPE" defaultValue="H" defaultChecked="checked" /><label htmlFor="P7_ADDR_TYPE_0"><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></label></div>
                                    <div className="apex-item-option"><input type="radio" id="P7_ADDR_TYPE_1" name="P7_ADDR_TYPE" defaultValue="W" /><label htmlFor="P7_ADDR_TYPE_1"><FormattedMessage id="Checkout.Work" defaultMessage="Work" /></label></div>
                                  </div></div></div>
                              </div><span id="P7_ADDR_TYPE_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" /></div></div>
                            </div><div className="col col-6 apex-col-auto">
                              <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel t-Form-fieldContainer--large apex-item-wrapper apex-item-wrapper--yes-no " id="P7_PRIMARY_ADDR_CONTAINER"><div className="t-Form-labelContainer">
                                <label htmlFor="P7_PRIMARY_ADDR" id="P7_PRIMARY_ADDR_LABEL" className="t-Form-label"><FormattedMessage id="Checkout.PrimaryAddress" defaultMessage="Primary Address " /></label>
                              </div><div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><div tabIndex={-1} id="P7_PRIMARY_ADDR" className="apex-button-group apex-item-group apex-item-group--switch" role="group" aria-labelledby="P7_PRIMARY_ADDR_LABEL">
                                <legend className="u-VisuallyHidden"><FormattedMessage id="Checkout.PrimaryAddress" defaultMessage="Primary Address " /></legend>
                                <span className="apex-item-option apex-item-option--yes"><input type="radio" id="P7_PRIMARY_ADDR_Y" name="P7_PRIMARY_ADDR" defaultValue="Y" defaultChecked="checked" required /><label htmlFor="P7_PRIMARY_ADDR_Y" className="a-Button"><FormattedMessage id="Yes.Text" defaultMessage="Yes" /></label></span><span className="apex-item-option apex-item-option--no"><input type="radio" id="P7_PRIMARY_ADDR_N" name="P7_PRIMARY_ADDR" defaultValue="N" /><label htmlFor="P7_PRIMARY_ADDR_N" className="a-Button"><FormattedMessage id="No.Text" defaultMessage="no" /></label></span></div>
                              </div><span id="P7_PRIMARY_ADDR_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" /></div></div>
                            </div>
                          </div><div className="row">
                            <div className="col col-2 ">
                              <span className="apex-grid-nbsp">&nbsp;</span>
                            </div><div className="col col-8 ">
                              <button className="t-Button t-Button--stretch" type="button" id="B28612834462643392"><span className="t-Button-label"><FormattedMessage id="Cancel.Btn" defaultMessage="Cancel" /></span></button><input type="hidden" id="P7_ADDR_ID" name="P7_ADDR_ID" defaultValue /><input type="hidden" id="P7_CUS_COUNTRY_1" name="P7_CUS_COUNTRY_1" defaultValue /><input type="hidden" id="P7_CUS_CITY_1" name="P7_CUS_CITY_1" defaultValue />
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


    </>)
  }
}

export default SavedAddressList;