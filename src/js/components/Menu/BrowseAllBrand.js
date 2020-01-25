
import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { store } from '../../redux/store/store'
import { getAvailabeBrands } from '../../redux/actions/getAllBrand';
import './BrowseAllBrand.css';
let id = 0;
let brandData = {}
let brandlistData
let brandNameArray = [];
let count = 0;
let filteredProductData = {};
let allbrands = [];
let productDataSendToPfRedirect=[];
let newArray=[]
let obj2={};
class BrowseAllBrand extends Component {
    constructor(props) {
        super(props);

        this.state = {
            brandData: {},
            checkLoaderState: true,
            checkData: true
        }
        this.myRef = [];
        this.main = React.createRef();


    }
    jumpOnSameAlphaCharacter = (item, index, event) => {
        let element = document.getElementById('#idbrand.' + index);
        element.scrollIntoView()
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            let storeid = this.props.globals.currentStore
            this.props.onGetAllAvailableBrand(storeid);
        }
    }
    componentDidMount() {
        let storeid = this.props.globals.currentStore!==undefined && this.props.globals.currentStore
      
        let data = { storeid: storeid }

        this.props.onGetAllAvailableBrand(data);
    }
    componentWillReceiveProps(nextProps) {
      
        let obj = nextProps.getAvailabeBrands;
        if (nextProps.getAvailabeBrands.brand) {
            allbrands = nextProps.getAvailabeBrands.brand;
        }
        
        if(nextProps.getAvailabeBrands.productData){

            filteredProductData=nextProps.getAvailabeBrands.productData
            if(filteredProductData.data!==undefined){
                
                Object.values(filteredProductData.data.product_data).map((item,index)=>{
                    productDataSendToPfRedirect.push(item.json.filtersdata);
                })
                var key = 'filters'
               // productDataSendToPfRedirect[key]

                obj2=Object.assign(filteredProductData, productDataSendToPfRedirect[key])

            }
         
           
        }

       // console.log("nsdjasdhjhasdg", productDataSendToPfRedirect)
    }

    getProductByBrands = (value) => {
        let brand = store.getState().availabe_brand.brand
        let id = 0;
        Object.entries(brand).map((item, index) => {
            if (item[1] === value) {
                id = item[0];
            }
        })
        let data = {};
        let storeid = this.props.globals.currentStore!==undefined && this.props.globals.currentStore
        if (id != 0) {
            data = {
                storeid: storeid,
                attribute_id: id
            }
        }
        this.props.onGetProductListByBrands(data);
    }

    _getUniqueBrand = (item) => {
        let uniqueBrandNameList = [];

        let obj = {}
        let temparr = []

        let listData = allbrands && Object.values(allbrands).map((item, index) =>

            (
                uniqueBrandNameList.push(item)
            ))


        if (allbrands) {
            for (let i = 0; i < uniqueBrandNameList.length; i++) {
                if (uniqueBrandNameList[i].charAt(0) === item) {
                    temparr.push(uniqueBrandNameList[i])
                }
            }
            return (
                temparr.map((item, index) => (
                    <> <span key={index} className="padding-brand" style={{ cursor: 'pointer', paddingLeft: '2%', paddingBottom: '5%', display: 'inline-block' }} >
                        <span onClick={() => this.getProductByBrands(item)}>{item}</span>
                    </span></>)))
        }

    }

    render() {

        
        let store_locale=this.props.globals.store_locale
        if (filteredProductData.data!== undefined) {
           
			return <Redirect to={{ pathname: `/${store_locale}/products/brand`, state: { filteredProductData: filteredProductData.data, reDirectFromBrowseAllBrand: true } }} />
		}

        let characterArrayOfBrand = [];
        let listData = allbrands && Object.values(allbrands).map((item, index) =>
            (
                characterArrayOfBrand.push(item.charAt(0))
            ))
        brandlistData = allbrands & Object.values(allbrands).map((item, index) =>
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

            <> <Spinner>

                <div className=" row main-container t-Body-contentInner" >
                    <div className="col-md-2 col-xs-2">&nbsp;</div>
                    <div className="col-md-8 col-xs-8" style={{ textAlign: 'start' }}>
                        <div> <h1 className="header-browser-all-brands"><FormattedMessage id="browseallbrands" defaultMessage="Browse All Brands" /></h1></div>
                        <div className="brands-alpha" style={{ width: '100%' }}>
                            <ul className="brands-alpha-ul">

                                {uniqueBrand.map((item, index) =>

                                    (<li key={index} onClick={() => this.jumpOnSameAlphaCharacter(item, index)} className="list-alpha">{item}</li>))}

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

                </div>
            </Spinner>
            </>
        );
    }



}



const mapStateToProps = state => {

    return {
        globals: state.global,
        productDetails: state.productDetails.products,
        customer_details: state.login.customer_details,
        category_name: state.productDetails.category_name,
        getAvailabeBrands: state.availabe_brand,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {

        onGetProductList: payload => dispatch(actions.getProductList(payload)),
        onGetProductSearchList: payload => dispatch(actions.getProductSearchList(payload)),
        onGetAllAvailableBrand: payload => dispatch(actions.getAvailabeBrands(payload)),
        onGetProductListByBrands: payload => dispatch(actions.getProductsByBrands(payload))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrowseAllBrand);