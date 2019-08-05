import React, { Component } from "react";
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class SizeGuide extends Component {

    onClickTab = (selectedId) => {
        const tab = ['sizefit', 'bras', 'panty', 'nightwear', 'slippers'];
        for(let i=0; i< tab.length; i++){
            if(document.getElementById(tab[i]).classList.contains("apex-rds-selected")){
                document.getElementById(tab[i]).classList.remove("apex-rds-selected");;
                document.getElementById(`${tab[i]}-body`).style.display = "none";
            }
        }
        document.getElementById(selectedId).classList.add("apex-rds-selected");
        document.getElementById(`${selectedId}-body`).style.display = "block";
    }

    render() {
        const {productSizeChart} = this.props;
        return (
            <div className="t-Dialog-body1">
                <div className="container1">
                    <div className="t-TabsRegion t-TabsRegion-mod--simple apex-tabs-region apex-tabs-region js-apex-region">
                        <div className="apex-rds-container">
                            <ul className="apex-rds a-Tabs" style={{paddingTop: 10, paddingBottom: 10, backgroundColor: "#fafafa"}}>
                                <li 
                                    id="sizefit" 
                                    className="apex-rds-item apex-rds-first apex-rds-selected" 
                                    style={{paddingLeft: 8, paddingRight: 8, cursor: 'pointer'}}
                                    onClick={(e)=>this.onClickTab('sizefit')}
                                >
                                    <FormattedMessage id="Product.Details.SizeFit" defaultMessage="Size & Fit" />
                                </li>
                                <li 
                                    id="bras" 
                                    className="apex-rds-item apex-rds-first" 
                                    style={{paddingLeft:8, paddingRight: 8, cursor: 'pointer'}}
                                    onClick={(e)=>this.onClickTab('bras')}
                                >
                                    <FormattedMessage id="Product.Details.Bras" defaultMessage="Bras" />
                                </li>
                                <li 
                                    id="panty" 
                                    className="apex-rds-item apex-rds-first" 
                                    style={{paddingLeft:8, paddingRight:8, cursor: 'pointer'}}
                                    onClick={(e)=>this.onClickTab('panty')}
                                >
                                    <FormattedMessage id="Product.Details.Panty" defaultMessage="Panty" />
                                </li>
                                <li 
                                    id="nightwear" 
                                    className="apex-rds-item apex-rds-first" 
                                    style={{paddingLeft:8, paddingRight:8, cursor: 'pointer'}}
                                    onClick={(e)=>this.onClickTab('nightwear')}
                                >
                                    <FormattedMessage id="Product.Details.Nightwear" defaultMessage="Nightwear" />
                                </li>
                                <li 
                                    id="slippers" 
                                    className="apex-rds-item apex-rds-first" 
                                    style={{paddingLeft:8, paddingRight:8, cursor: 'pointer'}}
                                    onClick={(e)=>this.onClickTab('slippers')}
                                >
                                    <FormattedMessage id="Product.Details.Slippers" defaultMessage="Slippers" />
                                </li>
                            </ul>    
                        </div>
                    </div>
                    <div>
                        <div id="sizefit-body" className="a-Tabs-panel apex-rds-element-selected" >
                            <img src={productSizeChart.main} />
                        </div>
                        <div id="bras-body" className="a-Tabs-panel" style={{display: 'none'}}>
                            <img src={productSizeChart.bra} />
                        </div>
                        <div id="panty-body" className="a-Tabs-panel" style={{display: 'none'}}>
                            <img src={productSizeChart.panty} />
                        </div>
                        <div id="nightwear-body" className="a-Tabs-panel" style={{display: 'none'}}>
                            <img src={productSizeChart.nightwear} />
                        </div>
                        <div id="slippers-body" className="a-Tabs-panel" style={{display: 'none'}}>
                            <img src={productSizeChart.slippers} />
                        </div> 
                    </div> 
                </div>
            </div>                      
        )
    }

}

const mapStateToProps = state => {
	return {
        globals: state.global,
        productSizeChart: state.productDetails.sizeChart
	};
};

export default connect(mapStateToProps)(SizeGuide);