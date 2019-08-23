import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class EmptyCart extends Component{
    render(){
        return(<>
        
        <div className="t-Body-contentInner">
  <div className="container">
    <div className="row">
      <div className="col col-12 apex-col-auto">
        <div className="t-Region containers  t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow margin-bottom-none" id="R34424287007836337">
          <div className="t-Region-header">
            <div className="t-Region-headerItems t-Region-headerItems--title">
              <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
              <h2 className="t-Region-title" id="R34424287007836337_heading">Basket Main</h2>
            </div>
            <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
          </div>
          <div className="t-Region-bodyWrap">
            <div className="t-Region-buttons t-Region-buttons--top">
              <div className="t-Region-buttons-left" />
              <div className="t-Region-buttons-right" />
            </div>
            <div className="t-Region-body">
              <input type="hidden" id="P5_PAGE_TITLE" name="P5_PAGE_TITLE" defaultValue="Cart Nayomi" /><input type="hidden" data-for="P5_PAGE_TITLE" defaultValue="EZPJiild4w_nB6V5T8P9kjGZh5CbdLmwUQotBfMoQKz8HP7uB26Gq5L5HLkjX7rjTSNHqD1XYmgsiSxeJv0_wg" /><input type="hidden" id="P5_PAGE_DESC" name="P5_PAGE_DESC" defaultValue="Cart- Shop your favorite Nayomi products easy with Nayomi Cart" /><input type="hidden" data-for="P5_PAGE_DESC" defaultValue="um0QOloQlBYcViDiUibeoEtJ5ndd7HCf7bUbmqhbTsAyqHrQwqub7nt7vqTqOlMk-zh5vBenoYztf5egPwzQhg" />
              <div className="container">
                <div className="row">
                  <div className="col col-8 ">
                    <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow margin-bottom-lg" id="PRDBASKET" aria-live="polite">
                      <div className="t-Region-header">
                        <div className="t-Region-headerItems t-Region-headerItems--title">
                          <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                          <h2 className="t-Region-title" id="PRDBASKET_heading"><FormattedMessage id="delivery-details.ShoppingBag.Title" defaultMessage="Shopping Bag" /></h2>
                        </div>
                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                      </div>
                      <div className="t-Region-bodyWrap">
                        <div className="t-Region-buttons t-Region-buttons--top">
                          <div className="t-Region-buttons-left" />
                          <div className="t-Region-buttons-right" />
                        </div>
                        <div className="t-Region-body">
                          <div id="report_226902533466451275_catch"><span className="nodatafound"><h1><FormattedMessage id="Cart.YBE"  defaultMessage="Your bag is emapty."/></h1></span>
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
      </div>
    </div><div className="row">
      <div className="col col-12 apex-col-auto">
        <div className="t-ButtonRegion t-Form--floatLeft hidden-desktop hide-buttons t-ButtonRegion--stickToBottom t-ButtonRegion--noPadding t-ButtonRegion--noUI t-Form--noPadding t-Form--xlarge t-Form--stretchInputs margin-top-none margin-bottom-none margin-left-none margin-right-none is-anchored" id="mobile-buttons" style={{bottom: '0px'}}>
          <div className="t-ButtonRegion-wrap">
            <div className="t-ButtonRegion-col t-ButtonRegion-col--left"><div className="t-ButtonRegion-buttons" /></div>
            <div className="t-ButtonRegion-col t-ButtonRegion-col--content">
              <h2 className="t-ButtonRegion-title" id="mobile-buttons_heading">Mobile Button</h2>
              <div className="container">
                <div className="row">
                  <div className="col col-2 ">
                    <button className="t-Button t-Button--noLabel t-Button--icon js-ignoreChange t-Button--large t-Button--pillStart t-Button--stretch t-Button--padLeft t-Button--padRight t-Button--padTop t-Button--padBottom" type="button" id="B29006043800427069" title="Continue Shopping" aria-label="Continue Shopping"><span className="t-Icon fa fa-angle-left" aria-hidden="true" /></button>
                  </div><div className="col col-10 ">
                    <button  className="t-Button t-Button--hot t-Button--large t-Button--pillEnd t-Button--stretch t-Button--padLeft t-Button--padRight t-Button--padTop t-Button--padBottom sp-goal-5-c6-2-1552991731133" type="button" id="B29005885182427068"><span className="t-Button-label"><FormattedMessage id="Cart.CheckOut.Title" defaultMessage="CheckOut" /></span></button>
                  </div>
                </div>
              </div>
             
              <div className="t-ButtonRegion-buttons" />
            </div>
            <div className="t-ButtonRegion-col t-ButtonRegion-col--right"><div className="t-ButtonRegion-buttons" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


</>);
    }
}

export default EmptyCart;