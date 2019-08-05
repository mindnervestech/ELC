import React, { Component } from 'react';
import Axios from 'axios';
import cookie from 'react-cookies';
import { STATIC_PAGES_URL, API_TOKEN } from '../../../api/globals';

class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeId: '',
      data: []
    }
  }

  getStoreInfo = () => {

    if (this.state.storeId) {
      const API = Axios.create({
        baseURL: STATIC_PAGES_URL,
        headers: { Authorization: `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' },
      });

      API.get('payment-methods/storeId/' + this.state.storeId).then(res => {
        //console.log('response', res.data);

        this.setState({ data: res.data })
      })
    }
  }

  componentDidMount() {
    let changedLang = localStorage.getItem('tempstoreid');
    if (changedLang) {
      this.setState({ storeId: changedLang, data: [] }, () => { this.getStoreInfo() });
    }
    else {
      this.setState({ storeId: cookie.load('storeid'), data: [] }, () => { this.getStoreInfo() });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log("componentDidUpdateCalled!!");
    let changedLang = localStorage.getItem('tempstoreid');
    if (this.state.storeId !== changedLang) {
      this.setState({ storeId: changedLang, data: [] }, () => { this.getStoreInfo() });
    }
  }

  render() {

    return (
      <div className="t-Body-contentInner">
        <div className="container">

          <div className="row">
            <div className="col col-12 apex-col-auto">
              <div className="t-Region g-wrapper-main_content  t-Region--removeHeader t-Region--noBorder t-Region--scrollBody margin-top-lg" id="R231982418266982051">
                <div className="t-Region-header">
                  <div className="t-Region-headerItems t-Region-headerItems--title">
                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true"></span></span>
                    <h2 className="t-Region-title" id="R231982418266982051_heading">Content</h2>
                  </div>
                  <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer"></span></div>
                </div>
                <div className="t-Region-bodyWrap">
                  <div className="t-Region-buttons t-Region-buttons--top">
                    <div className="t-Region-buttons-left"></div>
                    <div className="t-Region-buttons-right"></div>
                  </div>
                  <div className="t-Region-body">

                    <input type="hidden" id="P15_SEARCHSTRING" name="P15_SEARCHSTRING" value="" />
                    <input type="hidden" data-for="P15_SEARCHSTRING" value="jvBW1KDpkG27Qrc9CYIodJ92z1Z7uALlDeltAu7JXPX34PCymijSmbolwy4oiKHuWc207OW_yUFolrqXjWcizw" />
                    <input type="hidden" id="MISC" name="MISC" value="1056" />
                    <input type="hidden" id="P15_TITLE" name="P15_TITLE" value="" />
                    <input type="hidden" id="P15_PAGE_TITLE" name="P15_PAGE_TITLE" value="Legal - Privacy and Policy Nayomi Saudi" />
                    <input type="hidden" id="P15_PAGE_DESC" name="P15_PAGE_DESC" value="Checkout the privacy policy of Nayomi Saudi website. The Website Policies and Terms &amp; Conditions may be changed or updated occasionally to meet the requirements and standards." />

                    <div id="MiscContent">
                      <p style={{ textAlign: 'center' }}><span style={{ fontSize: 28 }}><strong>{this.state.data.title}</strong></span></p>
                      <div dangerouslySetInnerHTML={{ __html: this.state.data.content }}></div>
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
      </div>

    );
  }
}
export default PaymentMethod;