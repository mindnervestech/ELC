import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import searchLogo from '../../../../assets/images/header/search.svg';
import { Container, Row, Col } from 'reactstrap';
import logo1 from '../../../../assets/images/you_may_also_like_1.png';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import $ from 'jquery';

let data = {};
let productData = {}
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      searchText: '',
      showAutoSuggestion: false,
      checkLoop: true,
      open: false,
      popupVisible: false
    }
  }


  // handleClick= ()=>{
  //   if (!this.state.popupVisible) {
  //     // attach/remove event handler
  //     document.addEventListener('click', this.handleOutsideClick, false);
  //   } else {
  //     document.removeEventListener('click', this.handleOutsideClick, false);
  //   }

  //   this.setState(prevState => ({
  //      popupVisible: !prevState.popupVisible,
  //   }));
  // }

  // handleOutsideClick=(e)= {
  //   // ignore clicks on the component itself
  //   if (this.node.contains(e.target)) {
  //     return;
  //   }

  //   this.handleClick();
  // }


  handleKeyPress = (e) => {
    const store_locale = this.props.store_locale;
    if (e.keyCode === 13) {
      //console.log('value', e.target.value);
      this.setState({ showAutoSuggestion: false })
      console.log(this.state.showAutoSuggestion)
      this.setState({ redirect: true, searchText: e.target.value });
      this.props.history.push(`/${store_locale}/products/search?query=` + e.target.value);
      // put the login here
    }
  }

  renderRedirect = () => {
    const store_locale = this.props.store_locale;
    if (this.state.redirect) {
      //return <Redirect to={`/${store_locale}/products/search?query=`+this.state.searchText} />
    }
  }

  componentDidUpdate() {
      if (Object.keys(this.props.autoSearchSuggestionData).length > 0 && this.props.autoSearchSuggestionData.autoSerachsuggestionData != undefined) {
        if (this.state.checkLoop) {
        productData = this.props.autoSearchSuggestionData.autoSerachsuggestionData.product_data
        this.setState({ checkLoop: false })
        }
      }
    }

  autoSearchText = (e) => {
    this.state.searchText = e.target.value
    if (e.target.value.length >= 3) {
      console.log(e.target.value)
      const data = {
        q: this.state.searchText,
        storeId: this.props.globals.currentStore
      }
      this.setState({ showAutoSuggestion: true })
      $("#autoSuagestion").show();
      this.props.onGetProductSuggestionData(data);
      //call auto suggestion api
      this.setState({ checkLoop: true })
    } else {
      this.setState({ showAutoSuggestion: false })
    }
  }

  gotoProductListPage = (key) => {
    let store_locale = this.props.globals.store_locale
    this.setState({ showAutoSuggestion: false })
    this.props.history.push(`/${store_locale}/products/search?query=` + key);
  }


  render() {
   $(document).click(function(e) {
    if( e.target.id != 'check') {
      $("#autoSuagestion").hide();
    }
  });
    return (
      <div className="search" id="check">
        {this.renderRedirect()}
        <FormattedMessage id="SearchText" defaultMessage="search...">
          {(message) =>
            <input type="text" autoComplete="off" id="searchnay" className="textInput" onKeyUp={this.autoSearchText} placeholder={message} onKeyDown={this.handleKeyPress} />}
        </FormattedMessage>
        <button className="searchButton" style={{ backgroundColor: '#fff' }}>
          <img src={searchLogo} className="searchLogo"></img>
        </button>

        <div id="autoSuagestion" className="autoSearch width-autoSearch" style={this.state.showAutoSuggestion ? { display: 'block' } : { display: 'none' }}>

          {Object.keys(productData).map((item, index) => (

            <Row style={{ padding: "15px 20px", borderBottom: 'solid 1px #b1b1b1' }} onClick={() => this.gotoProductListPage(productData[item].json.url_key)}>
              <Col xs="4" lg="4" md="4">
                <img src={productData[item].json.imageUrl.primaryimage[0]} className="images" />
              </Col>
              <Col xs="8" lg="8" md="8">
                <Row style={{ fontSize: 15 }}>
                  <Col xs="7" lg="7" md="7">
                    <div className="productName">{productData[item].json.name}</div>
                  </Col>
                  <Col xs="5" lg="5" md="5">
                    <div className="producyPrise">{productData[item].currency} {productData[item].price}</div>
                  </Col>
                </Row>
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
