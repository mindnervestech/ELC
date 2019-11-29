
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Row, Col } from 'reactstrap';
import './ShopByLearningSkill.css';
let brandData={}
 class ShopByLearningSkill extends Component{
    constructor(props) {
        super(props);
        this.state = {
            brandData:{}
            }
        }



render(){
  
    return(

        <> 
        <div className="main-container-shop-by-learning">
            <div className="header-shop-by-learning-skill">
                <strong>Shop by learning skill</strong>
            </div>
            <div className="container-shop-by-learn-skills"> 
            <div className="col-md-4 col-xs-6" style={{maxWidth:'100%'}}>
            <div className="catPod" id="catCreat">
            <div className="podText"><a href="c/learning-skills/creativity" title="Creativity"><span style={{color:'#fff'}}>Creativity</span></a></div>
            </div>
            <div className="catPod" id="catCreat">
            <div className="podText"><a href="c/learning-skills/creativity" title="Creativity"><span style={{color:'#fff'}}>Creativity</span></a></div>
            </div>
            </div>

            <div className="col-md-4 col-xs-6" style={{maxWidth:'100%'}}>
            <div className="catPod" id="catCreat">
            <div className="podText"><a href="c/learning-skills/creativity" title="Creativity"><span style={{color:'#fff'}}>Creativity</span></a></div>
            </div>
            <div className="catPod" id="catCreat">
            <div className="podText"><a href="c/learning-skills/creativity" title="Creativity"><span style={{color:'#fff'}}>Creativity</span></a></div>
            </div>
            </div>
           
           <div className="col-md-4 col-xs-6" style={{maxWidth:'100%'}}>
           <div className="catPod" id="catCreat">
            <div className="podText"><a href="c/learning-skills/creativity" title="Creativity"><span style={{color:'#fff'}}>Creativity</span></a></div>
            </div>
           <div className="catPod" id="catCreat">
            <div className="podText"><a href="c/learning-skills/creativity" title="Creativity"><span style={{color:'#fff'}}>Creativity</span></a></div>
            </div>
           </div>
        
            </div>
            

        </div>
       
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
)(ShopByLearningSkill);