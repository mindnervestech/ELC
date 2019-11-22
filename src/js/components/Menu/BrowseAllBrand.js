
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import './BrowseAllBrand.css';
let id = 0;
let brandData = {}
let brandlistData
let brandNameArray = [];
class BrowseAllBrand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brandData: {}
        }
        this.myRef = [];
        this.main = React.createRef();

    }
    jumpOnSameAlphaCharacter = (item, index, event) => {

        let element = document.getElementById('#idbrand.' + index);
        element.scrollIntoView()
    }
    componentDidMount() {
        const data = {
            url_key: 'shop-by-brand',//category_path[category_path.length - 1].trim(),//newCat ? newCat : mainCat[0],
            storeid: this.props.globals.currentStore,

        };
        this.props.onGetProductList(data)
    }
    _getUniqueBrand = (item) => {
        let uniqueBrandNameList = null;
        let temparr = []
        if (brandNameArray) {
            for (let i = 0; i < brandNameArray.length; i++) {
                if (brandNameArray[i].charAt(0) === item) {
                    temparr.push(brandNameArray[i])
                }
            }
            return (
                temparr.map((item, index) => (
                    <> <span classname="padding-brand" style={{ paddingLeft: '2%', paddingBottom: '5%', display: 'inline-block' }} >
                        <Link to={'/' + this.props.globals.store_locale + '/products/shop-by-brand/' + item.toLowerCase()}> <span>{item}</span></Link>
                    </span></>)))
        }
    }

    render() {
        //console.log("Brand data",this.props.productDetails)
        let data = [];
        if (this.props.productDetails !== undefined) {
            data = this.props.productDetails;
        }
        let characterArrayOfBrand = [];
        let listData = data && data.filters && data.filters.Brand.map((item, index) =>
            (
                characterArrayOfBrand.push(item.name.charAt(0))
            ))
        brandlistData = data && data.filters && data.filters.Brand.map((item, index) =>

            (
                brandNameArray.push(item.name)
            ))
        let uniqueBrand = [];
        characterArrayOfBrand.map(item => {
            if (uniqueBrand.indexOf(item) === -1) {
                uniqueBrand.push(item)
            }
        });
        return (

            <> <Spinner loading={this.props.loadingProduct}>

                <div className=" row main-container t-Body-contentInner" >
                    <div className="col-md-2 col-xs-2">&nbsp;</div>
                    <div className="col-md-8 col-xs-8" style={{ textAlign: 'start' }}>
                        <div> <h1 className="header-browser-all-brands"><FormattedMessage id="browseallbrands" defaultMessage="Browse All Brands" /></h1></div>
                        <div className="brands-alpha" style={{ width: '100%' }}>
                            <ul className="brands-alpha-ul">

                                {uniqueBrand.map((item, index) =>

                                    (<li onClick={() => this.jumpOnSameAlphaCharacter(item, index)} className="list-alpha">{item}</li>))}

                            </ul>
                        </div>


                        <div style={{ width: '100%' }}>
                            <ul className="brands-alpha-show-ul">
                                {uniqueBrand && uniqueBrand.map((item, index) =>

                                    (<><li id={`#idbrand.${index}`} className="list-alpha-show-2"><h3 style={{ paddingLeft: '2%', display: 'inline-block' }}>{item}<br /></h3></li>
                                        {this._getUniqueBrand(item)}
                                    </>
                                    ))
                                }


                            </ul>
                        </div>
                    </div>
                    <div className="col-md-2 col-xs-2">&nbsp;</div>

                </div></Spinner>
            </>
        );
    }



}



const mapStateToProps = state => {

    return {
        globals: state.global,
        productDetails: state.productDetails.products,
        spinnerProduct: state.spinner.loadingProduct,
        customer_details: state.login.customer_details,
        category_name: state.productDetails.category_name
    };
};

const mapDispatchToProps = dispatch => {
    return {

        onGetProductList: payload => dispatch(actions.getProductList(payload)),
        onGetProductSearchList: payload => dispatch(actions.getProductSearchList(payload)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrowseAllBrand);