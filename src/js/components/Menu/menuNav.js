import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import MenuList from './menuList';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';

class menuNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navData: [],
      redirect: false
    }
   }

  componentDidMount() {
    this.props.onGetMenuNav(this.props.globals);
  }

  handleKeyPress = (e) => {
   //console.log("here......", e);
   const store_locale = this.props.globals.store_locale;
    if(e.keyCode === 13){
      //console.log('value', e.target.value);
       this.setState({redirect: true, searchText: e.target.value});
       document.getElementById("closeNav").click();
       this.props.history.push(`/${store_locale}/products/search?query=`+e.target.value)
       // put the login here
    }
 }

  closeHBMenu = () => {
    document.querySelector("html").classList.remove("menuOpen");
  }

 renderRedirect = () => {
    const store_locale = this.props.globals.store_locale;
    if (this.state.redirect) {
      //return <Redirect to={`/${store_locale}/products/search?query=`+this.state.searchText} />
    }
  }

  render() {
    console.log(this.props.menu)
    const store_locale = this.props.globals.store_locale;
    //console.log('In Menu globals store locale',store_locale);

    return (
      <div className="navigation" style={{height:68, paddingTop: 10, paddingBottom: 10}}>
        <div className="profile">
          <figure className=""><i className="icon-user"></i></figure>
          <div className="">
            <Link to={`/${store_locale}/login`} onClick={this.closeHBMenu}><FormattedMessage id="header.loginName" defaultMessage="Login" /></Link>
            <Link to={`/${store_locale}/login`} className="hide"><FormattedMessage id="header.logoutName" defaultMessage="logout" /></Link>
          </div>
        </div>
        {this.renderRedirect()}
        <div className="search">
          <i className="icon-search"></i>
          <FormattedMessage id="SearchText" defaultMessage="Search">
                    {(message)=>  
              <input type="text" id="search-mobile" className="textInput" placeholder={message} onKeyDown={this.handleKeyPress}/>}
              </FormattedMessage>
        </div>
        <MenuList navData={this.props.menu} store_locale={this.props.globals.store_locale} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    globals: state.global,
    menu: state.menu.menuNavData
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetMenuNav: (payload) => dispatch(actions.getMenuNav(payload)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(menuNav));
