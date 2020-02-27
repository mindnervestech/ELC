
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
let message='';
let brandName=''
class BrowseAllBrand extends Component {
    constructor(props) {
        super(props);

        this.state = {
            brandData: {},
            checkLoaderState: true,
            checkData: true,
            isClickedOnBrand:false,
            showAlert:false,
            getData:false
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
    componentWillMount(){
        this.setState({isClickedOnBrand:false})
        
    }
    closeAlert = () => {
        this.setState({ showAlert: false});
         
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
      

		if (this.state.isClickedOnBrand && nextProps.getAvailabeBrands.productData) {
			this.setState({
				getData: true
			});
        }
        let obj1=nextProps.getAvailabeBrands.productData;
        if(obj1){
            filteredProductData=obj1;
        }
        
        // if(nextProps.getAvailabeBrands.productData){

        //     filteredProductData=nextProps.getAvailabeBrands.productData;
            

        //     if(filteredProductData.data!==undefined){
                
        //         Object.values(filteredProductData.data.product_data).map((item,index)=>{
        //             productDataSendToPfRedirect.push(item.json.filtersdata);
        //         })
        //         var key = 'filters'
        //        // productDataSendToPfRedirect[key]

        //         obj2=Object.assign(filteredProductData, productDataSendToPfRedirect[key])

        //     }
         
           
        // }
        if(nextProps.getAvailabeBrands  && nextProps.getAvailabeBrands.productData && nextProps.getAvailabeBrands.productData.status===false){
			message=nextProps.getAvailabeBrands.productData.message;
			this.setState({ showAlert: true })
			setTimeout(() => {
				this.closeAlert()
			}, 2000);
		}
    }

    getProductByBrands = (value) => {
        this.setState({isClickedOnBrand:true})
        let brand = store.getState().availabe_brand.brand
        brandName=value
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
        let respo_message=null;

		if (this.state.showAlert) {
			respo_message = <span id="APEX_SUCCESS_MESSAGE" data-template-id="126769709897686936_S" className="apex-page-success u-visible"><div className="t-Body-alert">
				<div className="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">
					<div className="t-Alert-wrap">
						<div className="t-Alert-icon">
							<span className="t-Icon" />
						</div>
						<div className="t-Alert-content">
							<div className="t-Alert-header">
								<h2 className="t-Alert-title">{message}</h2>
							</div>
						</div>
						<div className="t-Alert-buttons">
							<button className="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="Close Notification" onClick={() => this.closeAlert()}><span className="t-Icon icon-close" /></button>
						</div>
					</div>
				</div>
			</div></span>;
		}
    
        let store_locale=this.props.globals.store_locale
        if (filteredProductData.data !== undefined && this.state.isClickedOnBrand && this.state.getData) {
            this.setState({isClickedOnBrand:false})
           
			return <Redirect to={{ pathname: `/${store_locale}/products/brand/${brandName}`, state: { filteredProductData: filteredProductData.data, reDirectFromBrowseAllBrand: true } }} />
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
                {respo_message}
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