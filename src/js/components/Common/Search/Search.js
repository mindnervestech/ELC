import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import searchLogo from '../../../../assets/images/header/search.svg';
import { Container, Row, Col } from 'reactstrap';
import logo1 from '../../../../assets/images/you_may_also_like_1.png';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      searchText: '',
      showAutoSuggestion : false,
    }
  }

  handleKeyPress = (e) => {
    const store_locale = this.props.store_locale;
    if (e.keyCode === 13) {
      //console.log('value', e.target.value);
      this.setState({showAutoSuggestion : false})
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

  autoSearchText = (e) => {
    this.state.searchText = e.target.value.length
    if (e.target.value.length >= 3) {
      console.log(e.target.value)
      //call auto suggestion api
    }
  }

  gotoProductListPage = () => {
    //this.setState({showAutoSuggestion : false})
    //this.props.history.push(`/${store_locale}/products/search?query=` + this.state.searchText);
  }

  render() {
    return (
      <div className="search">
        {this.renderRedirect()}
        <FormattedMessage id="SearchText" defaultMessage="search...">
          {(message) =>
            <input type="text" id="searchnay" className="textInput" onKeyUp={this.autoSearchText} placeholder={message} onKeyDown={this.handleKeyPress} />}
        </FormattedMessage>
        <button className="searchButton" style={{ backgroundColor: '#fff' }}>
          <img src={searchLogo} className="searchLogo"></img>
        </button>
        <div className="autoSearch" style={this.state.showAutoSuggestion ? { display: 'block' } : { display: 'none' }}>
          <Row style={{ padding: "15px 20px", borderBottom: 'solid 1px #b1b1b1' }} onClick={() => this.gotoProductListPage()}>
            <Col xs="4" lg="4" md="4">
              <img src={logo1} className="images" />
            </Col>
            <Col xs="8" lg="8" md="8">
              <Row style={{ fontSize: 15 }}>
                <Col xs="7" lg="7" md="7">
                  <div className="productName">Whizz World Car Transporter</div>
                </Col>
                <Col xs="5" lg="5" md="5">
                  <div className="producyPrise">$15.00</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
export default withRouter(Search);