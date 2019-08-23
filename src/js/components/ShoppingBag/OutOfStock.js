import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { FormattedMessage } from 'react-intl';
import { Redirect, withRouter } from 'react-router-dom'

class OutOfStock extends Component {

   remove = (index) => {
      //console.log(index);
      this.props.OnremoveProduct({ index: index })
   }

   remove_all = () => {
      //console.log(this.props.user_details.customer_details.quote_id);
      this.props.OnremoveAllOutOfStockProduct({ quote_id: this.props.quote_id })
   }

   gotoProductDetail = item => {
      // console.log('item ::', item);
      const store_locale = this.props.globals.store_locale;

      const data = {
         customerid: typeof this.props.user_details.customer_id !== 'undefined' ? parseInt(this.props.user_details.customer_id) : " ",
         store: this.props.globals.currentStore,
         url_key: item.url_key,
      };

      this.props.onGetProductDetails(data);
      this.props.getSizeChart({
         store_id: this.props.globals.currentStore,
      });

      this.props.history.push(`/${store_locale}/products-details/${item.url_key}`);
   }

   render() {
      const product = this.props.product;

      let product_Row = null;
      if (product.length > 0) {
         product_Row = product.map((item, index) => {
            return <tr key={index}>
               <td className="t-Report-cell" align="center" headers="IMG">
                  <a onClick={() => this.gotoProductDetail(item)} style={{ cursor: "pointer" }}>
                     <img src={item.image[0]} style={{ width: 75, height: 100 }} />
                  </a>
                  <br />
                  <span className="h-hidden_desktop">{item.name}</span>
                  <br />
                  <span className="p-price h-hidden_desktop">
                     <span className="p-currency"></span> {item.price}</span>
                  <br />
                  <button onClick={() => this.remove(index)} className="h-hidden_desktop"><FormattedMessage id="Cart.Remove.Title" defaultMessage="Remove" /></button>
               </td>

               <td className="t-Report-cell" align="center" headers="ITEM_DESC">
                  <span className="h-hidden_mobile">
                     <a href="/uae-en/nude-short-sleeve-top-212669355">{item.name}</a>
                     <br />
                     <small>{item.color} - {item.size}</small>
                     <br />
                     <strong style={{ color: '#000000' }} />
                  </span>
               </td>
               <td className="t-Report-cell" align="center" headers="QTY"> {item.qty}</td>
               <td className="t-Report-cell" align="center" headers="SUBTOTAL">
                  <span className="p-price">
                     <span className="p-currency"></span> {item.price}</span></td>
               <td className="t-Report-cell" headers="STATUS"><FormattedMessage id="OutOfStock.Heading" defaultMessage="Heading" /></td>
            </tr>
         })
      }
      return (<>

         <div className="t-Region g-wrapper-main_content  t-Region--noPadding t-Region--scrollBody margin-bottom-lg" id="OUTOS" aria-live="polite">
            <div className="t-Region-header">
               <div className="t-Region-headerItems t-Region-headerItems--title">
                  <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                  <h2 className="t-Region-title" id="OUTOS_heading"><FormattedMessage id="OutOfStock.Heading" defaultMessage="Heading" /></h2>
               </div>
               <div className="t-Region-headerItems t-Region-headerItems--buttons"><button onClick={this.remove_all} className="t-Button t-Button--hot " type="button" id="B127755618668473274"><span className="t-Button-label"><FormattedMessage id="Cart.RemoveAll.Title" defaultMessage="Remove All" /></span></button><span className="js-maximizeButtonContainer" /></div>
            </div>
            <div className="t-Region-bodyWrap">
               <div className="t-Region-buttons t-Region-buttons--top">
                  <div className="t-Region-buttons-left" />
                  <div className="t-Region-buttons-right" />
               </div>
               <div className="t-Region-body">
                  <div id="report_323091193650877351_catch"><div className="t-Report t-Report--stretch t-Report--staticRowColors t-Report--horizontalBorders t-Report--rowHighlightOff" id="report_OUTOS" data-region-id="OUTOS">
                     <div className="t-Report-wrap">
                        <table className="t-Report-pagination" role="presentation"><tbody><tr><td /></tr></tbody></table>
                        <div className="t-Report-tableWrap">
                           <table className="t-Report-report" summary="Out Of Stock Items">
                              <thead><tr><th className="t-Report-colHead" align="center" id="IMG"><FormattedMessage id="OutOfStock.Product" defaultMessage="Product" /></th><th className="t-Report-colHead" align="center" id="ITEM_DESC"><span className="h-hidden_mobile"><FormattedMessage id="OutOfStock.Description" defaultMessage="Description" /></span></th><th className="t-Report-colHead" align="center" id="QTY"><FormattedMessage id="OutOfStock.Quantity" defaultMessage="Quantity" /></th><th className="t-Report-colHead" align="center" id="SUBTOTAL"><FormattedMessage id="Cart.Subtotal.Title" defaultMessage="Subtotal" /></th><th className="t-Report-colHead" align="center" id="STATUS">Status</th></tr></thead>
                              <tbody>
                                 {product_Row}
                              </tbody>
                           </table>
                        </div>
                        <div className="t-Report-links" />
                        <table className="t-Report-pagination t-Report-pagination--bottom" role="presentation" />
                     </div>
                  </div></div>
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

const mapStateToProps = state => {
   return {
      cart_details: state.myCart,
      user_details: state.login,
      change_pass: state.login.changePasswordDetails,
      addressBook: state.address.addressBook,
      countryList: state.address.countryList,
      addressResp: state.address.addressResp,
      isAddBookRec: state.address.isAddBookRec,
      globals: state.global

   }
}

const mapDispatchToProps = dispatch => {
   return {
      OnremoveProduct: (quoteId) => dispatch(actions.removeProduct(quoteId)),
      OnremoveAllOutOfStockProduct: (quoteId) => dispatch(actions.removeAllOutOfStockProduct(quoteId)),
      onGetProductDetails: payload => dispatch(actions.getProductDetails(payload)),
      getSizeChart: payload => dispatch(actions.getSizeChart(payload)),
   }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutOfStock));