import React, { Component } from 'react';
import RenderSlider from '../slider';
import { FormattedMessage } from 'react-intl'


class ProductSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className="row">
              <div className="col col-12 apex-col-auto">
                <div className="t-Region containers  t-Region--noBorder t-Region--hiddenOverflow margin-bottom-lg" id="R35743384497996348" aria-live="polite">
                  <div className="t-Region-header">
                    <div className="t-Region-headerItems t-Region-headerItems--title">
                      <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                      <h5 className="t-Region-title" id="R35743384497996348_heading"><FormattedMessage id="PDP.YMAL" defaultMessage="You may also love" /></h5>
                    </div>
                    <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                  </div>
                  <div className="t-Region-bodyWrap">
                    
                    <div className="t-Region-body">
                      <div class="owl-carousel">
                        <RenderSlider currency={this.props.currency} store_name={this.props.store_name} similar_product={this.props.similar_product}></RenderSlider>
                      </div> 
                      <div id="report_35743384497996348_catch"><div className="carousel-wrap">
                          {/*<h1 class="owl-heading" id="R35743384497996348_heading">#TITLE#</h1>*/}
                          <div id="R35743384497996348_owl" className="owl-carousel owl-loaded owl-drag">
                            <div className="owl-stage-outer">
                            <div className="owl-stage" style={{width: '3534px'}}>
                            
                                  
                                  
                                  </div>                      
                                  </div>
                                  
                                  
                
                                  
                                  </div>
                                  </div></div>
                    </div>
                    
                  </div>
                </div>
            </div>
        </div>
        );
    }
}

export default ProductSlider;