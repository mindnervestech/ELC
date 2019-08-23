import React, { Component } from 'react';
import StoreLocator from '../StoreLocator/store-locator';
class Store extends Component {

  constructor(props) {
    super(props)
    this.state = {
      storeInfo: {}
    }
    this.submitStoreInfo = React.createRef();
  }

  getStoreInfo = (param) => {
    this.props.changed(param);
  }

  signUpSubmitStore = () => {
    this.submitStoreInfo.current.submitStoreInfo();
  }

  render() {
    return (<>
      <div>
        <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--hiddenOverflow margin-top-none margin-bottom-none find-store_show" id="CNC">
          <div className="t-Region-header">
            <div className="t-Region-headerItems t-Region-headerItems--title">
              <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
              <h2 className="t-Region-title" id="CNC_heading">Click &amp; Collect</h2>
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
                  <div className="">
                    <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--stacked t-Region--hiddenOverflow" id="R621306413807696661">
                      <div className="t-Region-header">
                        <div className="t-Region-headerItems t-Region-headerItems--title">
                          <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                          <h2 className="t-Region-title" id="R621306413807696661_heading">Find Store</h2>
                        </div>
                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                      </div>
                      <div className="t-Region-bodyWrap">
                        <div className="t-Region-buttons t-Region-buttons--top">
                          <div className="t-Region-buttons-left" />
                          <div className="t-Region-buttons-right" />
                        </div>
                        <div className="t-Region-body">
                          <div id="wrapper">
                            <div id="my-store-locator">
                              <StoreLocator
                                ref={this.submitStoreInfo}
                                changed={this.getStoreInfo}
                                selected_country={this.props.selected_country}
                                placeHolderText={this.props.placeHolderText}
                                directionText={this.props.directionText} />
                            </div>
                          </div></div>
                      </div>
                    </div></div></div></div></div></div></div>
        <div id="over_map" style={{ display: 'none' }}>
          <span id="show-store-info" />
        </div>
        <div className="t-Region-buttons t-Region-buttons--bottom">
          <div className="t-Region-buttons-left" />
          <div className="t-Region-buttons-right" />
        </div>
        <div className="t-Region-buttons t-Region-buttons--bottom">
          <div className="t-Region-buttons-left" />
          <div className="t-Region-buttons-right" />
        </div>
      </div>

    </>);
  }
}


export default Store;