import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import searchLogo from '../../../../assets/images/header/search.svg';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import $ from 'jquery';

let productData = {}
let check = false

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      searchText: '',
      showAutoSuggestion: false,
      checkLoop: true,
      open: false,
      popupVisible: false,
      searchInput:''
    }
  }

  handleKeyPressOnMobile = (e) => {
    const store_locale = this.props.store_locale;
      $("#autoSuagestion").hide();
      check = false
      this.setState({ redirect: true, searchText: this.state.searchInput});
      this.props.history.push(`/${store_locale}/products/search?query=` + this.state.searchInput);
      
    
  }

  handleKeyPress = (e) => {
    const store_locale = this.props.store_locale;
    if (e.keyCode === 13) {
      $("#autoSuagestion").hide();
      check = false
      this.setState({ redirect: true, searchText: e.target.value });
      this.props.history.push(`/${store_locale}/products/search?query=` + e.target.value);
    }
  }

  renderRedirect = () => {
    const store_locale = this.props.store_locale;
    if (this.state.redirect) {
      //return <Redirect to={`/${store_locale}/products/search?query=`+this.state.searchText} />
    }
  }
  handleChange=(e)=>{
    this.setState({searchInput:e.target.value})

  }
  autoSearchText = (e) => {
    
    if (e.keyCode != 13) {

      this.state.searchText = e.target.value
      if (e.target.value.length >= 3) {
        const data = {
          q: this.state.searchText,
          storeId: this.props.globals.currentStore
        }
        check = true
        this.setState({ showAutoSuggestion: false })
        this.props.onGetProductSuggestionData(data);
        this.setState({ checkLoop: true })
      } else {
        $("#autoSuagestion").hide();
        check = false
        this.setState({ showAutoSuggestion: false })
      }
    }
  }

  gotoProductListPage = (key) => {
    let store_locale = this.props.globals.store_locale
    this.setState({ showAutoSuggestion: false })
    this.props.history.push(`/${store_locale}/products-details/${key}`);
  }


  render() {
  
   
      
    if(this.state.showAutoSuggestion){

      $(document).ready((e) => {
        $(document).on(' click ', (e) => {
         if (e.target.id != 'check' && e.target.id !== 'searchnay') {
          document.getElementById("searchnay").value = ""
          //this.setState({searchText:""})
           $("#autoSuagestion").hide();
           check = false
           this.setState({ showAutoSuggestion: false})
         }
       });
     });
    }


    

      
    
    if (check) {
      if (Object.keys(this.props.autoSearchSuggestionData).length > 0 && this.props.autoSearchSuggestionData.autoSerachsuggestionData != undefined) {
        productData = this.props.autoSearchSuggestionData.autoSerachsuggestionData.product_data
        this.state.showAutoSuggestion = true
      }
    }
    return (
      <div className="search" id="check">
        {this.renderRedirect()}
        <FormattedMessage id="SearchText" defaultMessage="search...">
          {(message) =>
            <input type="text" onChange={ (e)=>this.handleChange(e) } autoComplete="off" id="searchnay"   className="textInput" onKeyUp={this.autoSearchText} placeholder={message} onKeyDown={this.handleKeyPress} />}
        </FormattedMessage>
        <button className="searchButton" onClick={(e)=>{this.handleKeyPressOnMobile(e)}}  onTouchStart={(e)=>{this.handleKeyPressOnMobile(e)}}  style={{ backgroundColor: '#fff' }}>
          <img src={searchLogo} className="searchLogo"></img>
        </button>

        <div id="autoSuagestion" className="autoSearch width-autoSearch" style={this.state.showAutoSuggestion ? { display: 'block' } : { display: 'none' }}>
          {Object.keys(productData).map((item, index) => (
            <Row style={{ padding: "15px 20px", borderTop: 'solid 1px #b1b1b1', cursor: 'pointer' }} onClick={() => this.gotoProductListPage(productData[item].json.url_key)}>
              <Col xs="4" lg="4" md="4">
                <img src={productData[item].json.imageUrl.primaryimage[0]} className="images" />
              </Col>
              <Col xs="8" lg="8" md="8">
                <Row style={{ fontSize: 15 }} className="divShowOnWeb">
                  <Col xs="7" lg="7" md="7">
                    <div className="productName">{productData[item].json.name}</div>
                  </Col>
                  <Col xs="5" lg="5" md="5">
                    <div className="producyPrise">{productData[item].currency} {productData[item].price}</div>
                  </Col>
                </Row>
                <div className="divShowOnMobile">
                  <div className="productName">{productData[item].json.name}</div>
                  <div className="producyPrise">{productData[item].currency} {productData[item].price}</div>
                </div>
              </Col>
            </Row>
          ))}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {

    globals: state.global,
    autoSearchSuggestionData: state.autoSerachProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetProductSuggestionData: (payload) => dispatch(actions.getAutoSuggestionProductSearchList(payload)),
  }
}

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(Search)));
