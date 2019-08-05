import React, { Component } from 'react';
import { images } from '../../../../config';
import { Link } from 'react-router-dom';

import SizeGuide from '../../Product/product-details/product-info/product-sizeGuide';
import { FormattedMessage } from 'react-intl';
import Modal from 'react-responsive-modal';

class subMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSizeChatModel: false,
    }
  }

  onCloseFirstModal = () => {
    this.setState({ openSizeChatModel: false })
  }

  render() {


    return (
      <div>
        <div className="row">
          <div className="col col-12 apex-col-auto">
            <div className="t-ContentBlock containers  t-ContentBlock--h1" id="R30048984336812193">
              <div className="t-ContentBlock-header"><h1 className="t-ContentBlock-title"><FormattedMessage id="help.NeedAssistance.Title" defaultMessage="Need Assistance" /></h1></div>
              <div className="t-ContentBlock-body"></div>
              <div className="t-ContentBlock-buttons"></div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col col-12 apex-col-auto">
            <div className="t-Region containers  t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow HelpCenterImgs" id="R30049177699812195">
              <div className="t-Region-header">
                <div className="t-Region-headerItems t-Region-headerItems--title">
                  <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true"></span></span>
                  <h2 className="t-Region-title" id="R30049177699812195_heading">helpcenter icons</h2>
                </div>
                <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer"></span></div>
              </div>
              <div className="t-Region-bodyWrap">
                <div className="t-Region-buttons t-Region-buttons--top">
                  <div className="t-Region-buttons-left"></div>
                  <div className="t-Region-buttons-right"></div>
                </div>
                <div className="t-Region-body">

                  <div className="container">
                    <div className="row">
                      <div className="col col-4 ">
                        <div className="t-Region t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow BgGrey" id="R30049285681812196">
                          <div className="t-Region-header">
                            <div className="t-Region-headerItems t-Region-headerItems--title">
                              <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true"></span></span>
                              <h2 className="t-Region-title" id="R30049285681812196_heading">Contact us</h2>
                            </div>
                            <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer"></span></div>
                          </div>
                          <div className="t-Region-bodyWrap">
                            <div className="t-Region-buttons t-Region-buttons--top">
                              <div className="t-Region-buttons-left"></div>
                              <div className="t-Region-buttons-right"></div>
                            </div>
                            <div className="t-Region-body">
                              <div className="alignCenter"> <Link to={`/${this.props.storeLocale}/contact-us`}> <img src={images.contactUs} /> <h2><FormattedMessage id="help.ContactUs.Title" defaultMessage="ContactUs" /></h2></Link></div>


                            </div>
                            <div className="t-Region-buttons t-Region-buttons--bottom">
                              <div className="t-Region-buttons-left"></div>
                              <div className="t-Region-buttons-right"></div>
                            </div>
                          </div>
                        </div>

                      </div><div className="col col-4 ">
                        <div className="t-Region t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow BgGrey" id="R30049416506812197">
                          <div className="t-Region-header">
                            <div className="t-Region-headerItems t-Region-headerItems--title">
                              <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true"></span></span>
                              <h2 className="t-Region-title" id="R30049416506812197_heading"><FormattedMessage id="help.SizeGuide.Title" defaultMessage="SizeGuide" /></h2>
                            </div>
                            <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer"></span></div>
                          </div>
                          <div className="t-Region-bodyWrap">
                            <div className="t-Region-buttons t-Region-buttons--top">
                              <div className="t-Region-buttons-left"></div>
                              <div className="t-Region-buttons-right"></div>
                            </div>
                            <div className="t-Region-body">
                              <div className="alignCenter"> <a onClick={() => this.setState({ openSizeChatModel: true })}> <img src={images.sizeGuide} /> <h2><FormattedMessage id="help.SizeGuide.Title" defaultMessage="SizeGuide" /></h2> </a></div>
                              <Modal open={this.state.openSizeChatModel} onClose={this.onCloseFirstModal}>
                                <h3><FormattedMessage id="Product.Details.SizeFit" defaultMessage="Size & Fit" /></h3>
                                <SizeGuide />
                              </Modal>

                            </div>
                            <div className="t-Region-buttons t-Region-buttons--bottom">
                              <div className="t-Region-buttons-left"></div>
                              <div className="t-Region-buttons-right"></div>
                            </div>
                          </div>
                        </div>

                      </div><div className="col col-4 ">
                        <div className="t-Region t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow BgGrey" id="R30311266205614248">
                          <div className="t-Region-header">
                            <div className="t-Region-headerItems t-Region-headerItems--title">
                              <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true"></span></span>
                              <h2 className="t-Region-title" id="R30311266205614248_heading"><FormattedMessage id="footer.faq" defaultMessage="faq" /></h2>
                            </div>
                            <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer"></span></div>
                          </div>
                          <div className="t-Region-bodyWrap">
                            <div className="t-Region-buttons t-Region-buttons--top">
                              <div className="t-Region-buttons-left"></div>
                              <div className="t-Region-buttons-right"></div>
                            </div>
                            <div className="t-Region-body">
                              <div className="alignCenter"><Link to={`/${this.props.storeLocale}/faq`}>
                                <img src={images.faq} /> <h2><FormattedMessage id="footer.faq" defaultMessage="faq" /></h2> </Link></div>


                            </div>
                            <div className="t-Region-buttons t-Region-buttons--bottom">
                              <div className="t-Region-buttons-left"></div>
                              <div className="t-Region-buttons-right"></div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div><div className="row">
                      <div className="col col-4 ">
                        <div className="t-Region t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow" id="R30311657387614252" style={{ background: "#f4f4f4" }}>
                          <div className="t-Region-header">
                            <div className="t-Region-headerItems t-Region-headerItems--title">
                              <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true"></span></span>
                              <h2 className="t-Region-title" id="R30311657387614252_heading">Delivery</h2>
                            </div>
                            <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer"></span></div>
                          </div>
                          <div className="t-Region-bodyWrap">
                            <div className="t-Region-buttons t-Region-buttons--top">
                              <div className="t-Region-buttons-left"></div>
                              <div className="t-Region-buttons-right"></div>
                            </div>
                            <div className="t-Region-body">
                              <div className="alignCenter"> <Link to={`/${this.props.storeLocale}/delivery`}> <img src={images.deliveryTruck} /> <h2><FormattedMessage id="help.Delivery.Title" defaultMessage="Delivery" /></h2> </Link></div>


                            </div>
                            <div className="t-Region-buttons t-Region-buttons--bottom">
                              <div className="t-Region-buttons-left"></div>
                              <div className="t-Region-buttons-right"></div>
                            </div>
                          </div>
                        </div>

                      </div><div className="col col-4 ">
                        <div className="t-Region t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow BgGrey " id="R30311788696614253">
                          <div className="t-Region-header">
                            <div className="t-Region-headerItems t-Region-headerItems--title">
                              <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true"></span></span>
                              <h2 className="t-Region-title" id="R30311788696614253_heading">Returns</h2>
                            </div>
                            <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer"></span></div>
                          </div>
                          <div className="t-Region-bodyWrap">
                            <div className="t-Region-buttons t-Region-buttons--top">
                              <div className="t-Region-buttons-left"></div>
                              <div className="t-Region-buttons-right"></div>
                            </div>
                            <div className="t-Region-body">
                              <div className="alignCenter"><Link to={`/${this.props.storeLocale}/returns-and-exchanges`}> <img src={images.returns} /> <h2><FormattedMessage id="help.Returns.Title" defaultMessage="Returns" /></h2> </Link></div>


                            </div>
                            <div className="t-Region-buttons t-Region-buttons--bottom">
                              <div className="t-Region-buttons-left"></div>
                              <div className="t-Region-buttons-right"></div>
                            </div>
                          </div>
                        </div>

                      </div><div className="col col-4 ">
                        <div className="t-Region t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow BgGrey" id="R30311913386614254">
                          <div className="t-Region-header">
                            <div className="t-Region-headerItems t-Region-headerItems--title">
                              <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true"></span></span>
                              <h2 className="t-Region-title" id="R30311913386614254_heading">Legal</h2>
                            </div>
                            <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer"></span></div>
                          </div>
                          <div className="t-Region-bodyWrap">
                            <div className="t-Region-buttons t-Region-buttons--top">
                              <div className="t-Region-buttons-left"></div>
                              <div className="t-Region-buttons-right"></div>
                            </div>
                            <div className="t-Region-body">
                              <div className="alignCenter"><Link to={`/${this.props.storeLocale}/privacy-policy`}> <img src={images.legal} /> <h2><FormattedMessage id="help.PrivacyPolicy.Title" defaultMessage="PrivacyPolicy" /></h2>
                              </Link></div>


                            </div>
                            <div className="t-Region-buttons t-Region-buttons--bottom">
                              <div className="t-Region-buttons-left"></div>
                              <div className="t-Region-buttons-right"></div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="t-Region-buttons t-Region-buttons--bottom">
                  <div className="t-Region-buttons-left"></div>
                  <div className="t-Region-buttons-right"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default subMenu;