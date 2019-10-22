
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Row, Col } from 'reactstrap';
import './BrowseAllBrand.css';
let id = 0;
let brandData = {}
class BrowseAllBrand extends Component {
    constructor(props) {
        super(props);

        this.state = {
            brandData: {}
        }
        this.myRef = [];
        this.main = React.createRef();

    }
    // unique_array_element(){
    //     var filteredArray = arr.filter(function(item, pos){
    //   return arr.indexOf(item)== pos; 
    // });
    // }

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



    render() {
        //console.log("Brand data",this.props.productDetails)
        let data = {};
        if (this.props.productDetails !== undefined) {
            data = this.props.productDetails;
        }
        let listData = null;

        //     if(this.props.productDetails!==undefined){
        //         listData=data.filters && data.filters.Brand.map((item, index) =>

        //             (<li  onClick={()=>this.jumpOnSameAlphaCharacter(item,index)} className="list-alpha">{item.name.charAt(0)}</li>))

        //     }

        //     let listrender=null;
        //     if(listData!==undefined){

        //         listData.map(item => item.name)
        //   .filter((value, index, self) => self.indexOf(value) === index)
        //         listrender=listData.map((data,index)=>(<li  onClick={()=>this.jumpOnSameAlphaCharacter(data,index)} className="list-alpha">{data.name}</li>))



        // let addressBook = null;
        // console.log("Array",listData)
        return (

            <> <Spinner loading={this.props.loadingProduct}>

                <div className=" row main-container t-Body-contentInner" >
                <div className="col-md-2 col-xs-2">&nbsp;</div>
                <div className="col-md-8 col-xs-8">
                   <div> <h1 className="header-browser-all-brands">Browse All Brands</h1></div>

                    <div className="brands-alpha" style={{ width: '100%' }}>
                        <ul className="brands-alpha-ul">

                            {data && data.filters && data.filters.Brand.map((item, index) =>

                                (<li onClick={() => this.jumpOnSameAlphaCharacter(item, index)} className="list-alpha">{item.name.charAt(0)}</li>))}

                        </ul>
                    </div>


                    <div style={{ width: '100%' }}>
                        <ul className="brands-alpha-show-ul">
                            {data && data.filters && data.filters.Brand.map((item, index) =>

                                (<><li id={`#idbrand.${index}`} className="list-alpha-show-2"><h3 style={{ paddingLeft: '2%', display: 'inline-block' }}>{new Set(item.name.charAt(0))}<br /></h3></li>
                                    <span classname="padding-brand" style={{ paddingLeft: '2%', paddingBottom: '5%', display: 'inline-block' }} >{item.name.charAt(0) === item.name.charAt(0) ?
                                        <Link to={'/' + this.props.globals.store_locale + '/products/shop-by-brand/' + item.name.toLowerCase()}> <span>{item.name}</span></Link> :
                                        <span></span>}</span></>
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