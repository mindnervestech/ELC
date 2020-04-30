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
   // this.functionOfMenuCall();
    this.props.onGetMenuNav(this.props.globals);
  }

  functionOfMenuCall = () => {
    //Add in component at the time of optimisation.
        // var s = {
        //     doc: document.querySelector("html"),
        //     subMenuTrigger: document.querySelectorAll(".subMenuTrigger"),
        //     subMenuSwipers: {},
        //     navigation: document.querySelector(".navigation .link"),
        // }
        this.init()

    }


init=()=> {
     this.addTouchClass();
     this.registerMenuEvents();
     this.registerCountrySelectEvent();
     this.registerSubmenuEvents()
}

findIndexOf=(e)=> {

    return Array.prototype.indexOf.call(e.parentElement.children, e)
}
registerSubmenuEvents=()=> {
    var e = null;
    document.querySelector(".navigation").addEventListener("click",  (t)=> {
        t.target.classList.contains("subMenuTrigger") && (e && (e.classList.remove("open")));
        console.log("event",e)
        e.nextElementSibling.style.maxHeight = null;
          t.target !== e &&  (t.target.classList.add("open"));
           (e = t.target).nextElementSibling.style.maxHeight = e.nextElementSibling.scrollHeight + "px"
           e = null;
    })
}
registerMenuEvents=()=> {
  
    var e = document.getElementById("navTrigger"),
        t = document.getElementById("closeNav"),
        n = document.querySelector("html");
    if (e) {
        e.addEventListener("click",  (e)=> {
            n.classList.add("easeMenu");
             window.setTimeout( ()=> {
                n.classList.add("menuOpen")
            }, 100)
        });
         t.addEventListener("click",  (e)=> {
            n.classList.remove("menuOpen");
            window.setTimeout( ()=> {
                n.classList.remove("easeMenu")
            }, 800)
        })
    }

}

registerCountrySelectEvent=()=> {
    document.querySelector(".activeCountry").addEventListener("click",  (e)=> {
        e.currentTarget.classList.toggle("open")
    })
}

addTouchClass=()=> {
 var   n = document.querySelector("html");
     "ontouchstart" in window || navigator.msMaxTouchPoints > 0 ? n.classList.add("touch") : n.classList.add("no-touch")
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

 logOut = () => {
  this.props.onGetMenuNav(this.props.globals);
  this.props.onLogoutUser();
  this.props.history.push(`/${this.props.globals.store_locale}/sign-in-register`);
  this.closeHBMenu();
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
    const store_locale = this.props.globals.store_locale;
    //console.log('In Menu globals store locale',store_locale);

    return (
      <div className="navigation" style={{ height: 76, paddingTop: 2, paddingBottom: 9, textAlign:'center' }}>
        <div className="profile">
          <figure className=""><i className="icon-user"></i></figure>
          <div className="">
            <Link to={`/${store_locale}/sign-in-register`} onClick={this.closeHBMenu}>
    {this.props.user_details.isUserLoggedIn ? <span><FormattedMessage id="header.Hello" defaultMessage="Hello" />,&nbsp;&nbsp;{this.props.user_details.customer_details.firstname}</span> :<FormattedMessage id="Header.SignInOrRegister" defaultMessage="Sign in / Register" />}</Link>
            <Link to={`/${store_locale}/sign-in-register`} className="hide"><FormattedMessage id="header.logoutName" defaultMessage="logout" /></Link>
          </div>
        </div>
        {this.renderRedirect()}
       
        { this.props.user_details.isUserLoggedIn ?
        <div className="signOut divShowOnMobile" style={{textAlign:'start'}}>
         <span onClick={this.logOut}><FormattedMessage id="header.SignOut" defaultMessage="Sign Out"/></span>
        </div>:<div></div>
        }
        {/* <div className="search">
          <i className="icon-search"></i>
          <FormattedMessage id="SearchText" defaultMessage="Search">
            {(message) =>
              <input type="text" id="search-mobile" className="textInput" placeholder={message} onKeyDown={this.handleKeyPress} />}
          </FormattedMessage>
        </div> */}
        <MenuList navData={this.props.menu} store_locale={this.props.globals.store_locale} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    globals: state.global,
    menu: state.menu.menuNavData,
    user_details: state.login,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLogoutUser: () => dispatch(actions.logoutUser()),
    onGetMenuNav: (payload) => dispatch(actions.getMenuNav(payload)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(menuNav));
