import React, { Component } from 'react';
import * as actions from '../../../../redux/actions/index';
import { connect } from 'react-redux';
import facebook from '../../../../../assets/images/social/Facebook.svg';
import instagram from '../../../../../assets/images/social/instagram.svg';
import youtube from '../../../../../assets/images/social/youtube.svg';
import twitter from '../../../../../assets/images/social/twitter.svg';

class ProductSize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: [],
        };
    }

    _getSortedQtyAndSize = products => {
        let arr = [];
        products.map((item, index) => {
            arr.push({ qty: item.qty, color: item.color.text, size: item.size.text });
        });
        return arr;
    };

    _getQty = (color, size, products) => {
        //console.log('products', products);

        const res = products
            .filter(data1 => data1.color === color && data1.size === size)
            .reduce((a, b) => a + (b['qty'] || 0), 0);
        return res;
    };

    _onSizeClick = item => {
        const color = this.props.productDetails.productColor;
        const sortedProducts = this._getSortedQtyAndSize(this.props.productDetails.productData.simpleproducts);
        const totalQty = this._getQty(color.selectedColor, item.text, sortedProducts);

        const sizeOpt = { option_id: item.option_id, option_value: item.option_value };
        
        const data = {
            selectedSize: item.text,
            selectedVal: true,
            totalQty: totalQty,
        };
        this.props.onGetSize(data);
    };

    _onSimpleSizeClick = item => {
        const data = {
            selectedSize: item.text,
            selectedVal: true,
            totalQty: item.sizeInStock,
        };

        this.props.onGetSize(data);
    }

    __renderProductSizes = (item, index) => {

        //console.log('In __renderProductSizes', item);
        return (
            <a
                key={`${item.text}_size`}
                className="outerFocus"
                name="band-size-elem"
                data-id={item.text}
                onClick={e => this._onSizeClick(item)}
                data-value={item.text}
                data-band-size-value={item.text}
                tabIndex={0}
                role="radio"
                aria-checked="true"
                aria-required="true"
                data-is-selected={this.props.productDetails.productSize.selectedSize === item.text ? true : false}
                aria-disabled={item.sizeInStock === 0 ? true : false}
            >
                <span className="fab-a11y-hide">Band Size</span>
                {item.text}
            </a>
        );
    };
    __renderSimpleProductSizes = (item, index) => {

        //console.log('In __renderProductSizes', item);
        // return (
        //     <a
        //         key={`${item.text}_size`}
        //         className="outerFocus"
        //         name="band-size-elem"
        //         data-id={item.text}
        //         onClick={e => this._onSimpleSizeClick(item)}
        //         data-value={item.text}
        //         data-band-size-value={item.text}
        //         tabIndex={0}
        //         role="radio"
        //         aria-checked="true"
        //         aria-required="true"
        //         data-is-selected={this.props.productDetails.productSize.selectedSize === item.text ? true : false}
        //         aria-disabled={item.sizeInStock === 0 ? true : false}
        //     >
        //         <span className="fab-a11y-hide">Band Size</span>
        //         {item.text}
        //     </a>
        // );
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
        
        // const shareUrl = window.location.href;
        // const title = 'ELC'

        return (
            
            <div className="row" style={{ padding: 25 }}>
                

                <div className="Demo__some-network share-icon">
                    <a href="https://www.facebook.com/elctoys" target="_blank" alt="">
                        <img style={{ height: 42, width: 42 }} src={facebook} className="icon" />
                        <span>Facebook</span>
                    </a>
                </div>
                <div className="Demo__some-network share-icon">
                    <a href="https://www.twitter.com/elctoysme" target="_blank" alt="">
                        <img style={{ height: 42, width: 42 }} src={twitter} className="icon" />
                        <span>Twitter</span>
                    </a>
                </div>
                <div className="Demo__some-network share-icon">
                    <a href="https://www.instagram.com/elctoys" target="_blank" alt="">
                        <img style={{ height: 42, width: 42 }} src={instagram} className="icon" />
                        <span>Insragram</span>
                    </a>

                </div>
                <div className="Demo__some-network share-icon">
                    <a href="https://www.youtube.com/elctoysme" target="_blank" alt="">
                        <img style={{ height: 42, width: 42 }} src={youtube} className="icon" />
                        <span>You tube</span>
                    </a>

                </div>

            </div>
            // </section>
        );
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
        onGetSize: payload => dispatch(actions.getSize(payload)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductSize);
