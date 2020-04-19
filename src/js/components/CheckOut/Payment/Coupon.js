import React, { Component } from "react";
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index'
import { store } from '../../../redux/store/store'
class CouponCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voucode: ''
        }
    }


    componentDidUpdate(prevProps) {
        // if (prevProps.cart_details.voucher !== this.props.cart_details.voucher) {
        //     this.setState({ voucode: this.props.cart_details.voucher });
        // } else if (this.props.cart_details.removevouher && prevProps.cart_details.voucher === this.props.cart_details.voucher && this.state.voucode !== this.props.cart_details.voucher) {
        //     this.setState({ voucode: this.props.cart_details.voucher });
        // }
    }
    componentDidMount(){
        if(this.props.cart_details.voucher_code!==null && this.props.payment_cart.voucher_discount!==0){
            setTimeout(() => {
            this.setState({ voucode: this.props.cart_details.voucher_code }); 
                
            }, 1000);
        }
        // if(this.props.payment_cart.voucher_discount===0){
        //     this.setState({ voucode:'' }); 
        // }
        
    }

    divOnFocus = (e) => {
        e.currentTarget.className = 't-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field is-active';
    }

    divOnBlure = (e) => {
        if ((e.target.value === null) || (e.target.value === '')) {
            e.currentTarget.className = 't-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field';
        } else {
            e.currentTarget.className = 't-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field is-active';
        }
    }

    render() {
        console.log("render",this.props)
        return (
            <><div className="row">
                <div className="col col-12 apex-col-auto no-padding">
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
                                    <div className="row">
                                        {/* <div className="col col-1 ">
                                            <span className="apex-grid-nbsp">&nbsp;</span>
                                        </div> */}
                                        <div className="col col-8 ">
                                            <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel t-Form-fieldContainer--stretchInputs apex-item-wrapper apex-item-wrapper--text-field"
                                                onFocus={(e) => this.divOnFocus(e)}
                                                onBlur={(e) => this.divOnBlure(e)} id="P8_VOUCHER_CONTAINER">
                                                <div className="t-Form-labelContainer">
                                                    <label htmlFor="P8_VOUCHER" id="P8_VOUCHER_LABEL" className="t-Form-label"><FormattedMessage id="Checkout.voucher" defaultMessage="Voucher" /></label>
                                                </div>
                                                <div className="t-Form-inputContainer">
                                                    <div className="t-Form-itemWrapper" id="voucher-pay">
                                                        <input type="text" id="P8_VOUCHER" name="P8_VOUCHER" className="text_field apex-item-text" size={30}
                                                            onChange={(e) => { this.setState({ voucode: e.target.value }) }}
                                                            value={this.state.voucode}
                                                            disabled={this.props.payment_cart.voucher_discount !== 0}
                                                        />
                                                    </div>
                                                    <span id="P8_VOUCHER_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" style={{ color: 'red' }}>
                                                        {this.props.cart_details.voucherError}
                                                    </span>
                                                    <span style={{ color: 'green', fontSize: 13 }}>
                                                        {this.props.cart_details.voucherSuccess}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col col-4 apex-col-auto">
                                            {  this.props.payment_cart.voucher_discount == 0 && (
                                                <button className="t-Button t-Button--noLabel t-Button--icon t-Button--large t-Button--gapTop" onClick={() => { this.props.applyVoucode(this.state.voucode) }} type="button" id="vouch" title="Vouch" aria-label="Vouch">
                                                    <span className="t-Icon fa fa-check" aria-hidden="true" />
                                                </button>
                                            )}
                                            { this.props.payment_cart.voucher_discount !== 0 && (
                                                <button className="t-Button t-Button--noLabel t-Button--icon t-Button--large t-Button--gapTop" onClick={() => { this.props.removeVoucode(this.state.voucode) }} type="button" id="vouch" title="Vouch" aria-label="Vouch">
                                                    <span>X</span>
                                                </button>
                                            )}
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

            </>);
    }
}

const mapStateToProps = state => {
    return {
        guest_checkout: state.guest_user,
        user_details: state.login,
        cart_details: state.myCart,
        global: state.global,
        payment_cart:state.myCart.payment_cart,
        mycartdata_aftervoucherapply:state.myCart.mycartdata_aftervoucherapply
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onClearVocherRes: () => dispatch(actions.callActionForClearVocherDetails()),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CouponCode)
