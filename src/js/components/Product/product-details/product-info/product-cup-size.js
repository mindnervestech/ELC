import React, { Component } from 'react';
import * as actions from '../../../../redux/actions/index';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

let selectSizeOnFirst = true;
class ProductCupSize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: [],
    };
    selectSizeOnFirst = true;

  }

  componentDidUpdate(prevProps, prevState) {

    const { productSize } = this.props;

    if (productSize.type === "simple") {
      let arr = [];

      Object.keys(this.props.productSize).map((item, index) => {
        arr.push(
          Object.assign(this.props.productSize.simplesize, {
            sizeInStock: this.props.productSize.simpleqty,
          })
        );
      });
      const newArr = this._getUnique(arr, 'text');

      if (selectSizeOnFirst && newArr.length > 0) {
        selectSizeOnFirst = false;
        //console.log("newArr[0]", newArr[0])
        this._onSimpleSizeClick(newArr[0]);
      }
    }

    if (productSize.simpleproducts) {
      let selectedColor = this.props.productDetails.productColor.selectedColor;

      let arr = [];
      Object.keys(productSize.simpleproducts).map((item, index) => {
        if (productSize.simpleproducts[item].color.text === selectedColor) {
          arr.push(
            Object.assign(productSize.simpleproducts[item].cup_size, {
              sizeInStock: productSize.simpleproducts[item].stockstatus,
            })
          );
        }
      });

      const newArr = this._getUnique(arr, 'text');
      if (selectSizeOnFirst && newArr.length > 0) {
        selectSizeOnFirst = false;
        this._onSizeClick(newArr[0]);
      }
    }

  }

  _getSortedQtyAndSize = products => {
    let arr = [];
    products.map((item, index) => {
      arr.push({ qty: item.qty, color: item.color.text, band_size: item.band_size.text, cup_size: item.cup_size.text });
    });
    return arr;
  };

  _getQty = (color, bandSize, size, products) => {

    //console.log('color, bandSize, size, products  >>>>>>>>>>', color, bandSize, size, products);

    const res = products
      .filter(data1 => data1.color == color && data1.band_size == bandSize && data1.cup_size == size)
      .reduce((a, b) => a + (b['qty'] || 0), 0);

    return res;
  };

  _onSizeClick = item => {

    const color = this.props.productDetails.productColor;
    const bandSize = this.props.productDetails.bandSize;
    const sortedProducts = this._getSortedQtyAndSize(this.props.productDetails.productData.simpleproducts);
    const totalQty = this._getQty(color.selectedColor, bandSize.selectedBandSize, item.text, sortedProducts);

    const sizeOpt = { option_id: item.option_id, option_value: item.option_value };
    const final = this.props.productDetails.configurable_item_options.push(sizeOpt);
    console.log('totalQty >>>>>>>>>>', totalQty);
    const data = {
      selectedCupSize: item.text,
      selectedCupVal: true,
      totalQty: totalQty,
    };

    //console.log('sizeData', data);

    this.props.onGetCupSize(data);
  };

  _onSimpleSizeClick = item => {
    const data = {
      selectedCupSize: item.text,
      selectedCupVal: true,
      totalQty: item.sizeInStock,
    };

    this.props.onGetCupSize(data);
  }

  __renderProductSizes = (item, index) => {

    console.log('In __renderProductSizes', item);
    return (
      <a
        key={`${item.text}_size`}
        className="outerFocus"
        name="cup-size-elem"
        data-id={item.text}
        onClick={e => this._onSizeClick(item)}
        data-value={item.text}
        data-band-size-value={item.text}
        tabIndex={0}
        role="radio"
        aria-checked="true"
        aria-required="true"
        data-is-selected={this.props.productDetails.cupSize.selectedCupSize === item.text ? true : false}
        aria-disabled={item.sizeInStock === 0 ? true : false}
      >
        <span className="fab-a11y-hide"><FormattedMessage id="product.cupSize" defaultMessage="Cup Size" /></span>
        {item.text}
      </a>
    );
  };
  __renderSimpleProductSizes = (item, index) => {

    //console.log('In __renderProductSizes', item);
    return (
      <a
        key={`${item.text}_size`}
        className="outerFocus"
        name="cup-size-elem"
        data-id={item.text}
        onClick={e => this._onSimpleSizeClick(item)}
        data-value={item.text}
        data-band-size-value={item.text}
        tabIndex={0}
        role="radio"
        aria-checked="true"
        aria-required="true"
        data-is-selected={this.props.productDetails.cupSize.selectedCupSize === item.text ? true : false}
        aria-disabled={item.sizeInStock === 0 ? true : false}
      >
        <span className="fab-a11y-hide"><FormattedMessage id="product.cupSize" defaultMessage="Cup Size" /></span>
        {item.text}
      </a>
    );
  };

  _getUnique = (arr, comp) => {
    const unique = arr
      .map(e => e[comp])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])
      .map(e => arr[e]);
    return unique;
  };

  _render

  render() {
    const { productSize } = this.props;


    if (productSize.type === 'simple') {
      if ((productSize.simplesize === '') || (productSize.simplesize === null)) {
        return false;
      } else {

        let arr = [];
        if ((productSize.simplecolor === '') || (productSize.simplecolor === null)) {

          Object.keys(productSize).map((item, index) => {
            // if (productSize.simpleproducts[item].color.text === selectedColor) {
            arr.push(
              Object.assign(productSize.simplesize, {
                sizeInStock: productSize.simpleqty,
              })
            );
            // }
          });

        } else {

          Object.keys(productSize).map((item, index) => {
            // if (productSize.simpleproducts[item].color.text === selectedColor) {
            arr.push(
              Object.assign(productSize.simplesize, {
                sizeInStock: productSize.simpleqty,
              })
            );
            // }
          });
        }

        const newArr = this._getUnique(arr, 'text');

        return (
          <section id="cup-size" data-name="cup-size" data-selector-wrapper>
            <div data-selector-title-cup-size>
              <em><FormattedMessage id="product.cupSize" defaultMessage="Cup Size" /></em>
              <span id="p3cupsizedesc">
                <b>&nbsp;{this.props.productDetails.cupSize.selectedCupSize}</b>
              </span>
            </div>
            <div data-selector="box" data-name="cup-size" data-label-id role="radiogroup">
              {newArr.map(this.__renderSimpleProductSizes)}
            </div>
          </section>
        );
      }
    }


    // if (productSize.simpleproducts) {
    if (productSize.type === 'configurable') {
      let selectedColor = this.props.productDetails.productColor.selectedColor;
      let selectedBandSize = this.props.productDetails.bandSize.selectedBandSize;
      //console.log('1. >>>>>>>', this.props.productDetails.bandSize.selectedBandSize);
      let arr = [];
      Object.keys(productSize.simpleproducts).map((item, index) => {
        if ((productSize.simpleproducts[item].color.text === selectedColor) && (productSize.simpleproducts[item].band_size.text === selectedBandSize)) {
          arr.push(
            Object.assign(productSize.simpleproducts[item].cup_size, {
              sizeInStock: productSize.simpleproducts[item].stockstatus,
            })
          );
        }
      });

      const newArr = this._getUnique(arr, 'text');
      // console.log('sizearr', arr);


      return (
        <section id="cup-size" data-name="cup-size" data-selector-wrapper>
          <div data-selector-title-cup-size>
            <em><FormattedMessage id="product.cupSize" defaultMessage="Cup Size" /></em>
            <span id="p3cupsizedesc">
              <b>&nbsp;{this.props.productDetails.cupSize.selectedCupSize}</b>
            </span>
          </div>
          <div data-selector="box" data-name="cup-size" data-label-id role="radiogroup">
            {newArr.map(this.__renderProductSizes)}
          </div>
        </section>
      );
    } else {
      return false;
    }
  }
}

const mapStateToProps = state => {
  return {
    globals: state.global,
    productDetails: state.productDetails,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCupSize: payload => dispatch(actions.getCupSize(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCupSize);
