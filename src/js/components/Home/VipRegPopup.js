import React, { Component } from 'react';
import cookie from 'react-cookies';
import { FormattedMessage } from 'react-intl';
import {Router, Redirect, Link} from 'react-router-dom';
// import '../../../styles/LocationPopup.css';
import '../../../styles/VipRegPopup.css';

      class VipRegPopup extends Component {
        constructor(props) {
          super(props);
          this.state = {
            showModal: false,
            selectedStore: ''
          }
        }        

        componentDidMount() {
          
          const showModal = localStorage.getItem('displayVipReg');
          const selected_Store = localStorage.getItem('selectedStore');
          this.setState({selectedStore: selected_Store})

          //console.log('localstorage: ' , localStorage.getItem('displayVipReg'));
          //console.log('displayVipReg isDisplayflag', showModal);

          localStorage.setItem('displayVipReg', false);

          if(showModal === "true") {
              setTimeout(() => {
                this.setState({showModal: true});
                document.body.classList.add('apex-no-scroll');
              }, 40000);    // 40 seconds
          }
          else {
              this.setState({ showModal: false});
              document.body.classList.remove('apex-no-scroll');
          }
        }          
            
        handleOpenModal () {
          this.setState({ showModal: true });
        }
      
        handleCloseModal () {
          this.setState({ showModal: false });
          document.body.classList.remove('apex-no-scroll');
        }


          //console.log("display: ", this.state.isDisplay);

          render() {

            return (

              <div style={{display : this.state.showModal ? 'block' : 'none'}}>
 
              <div tabIndex={-1} role="dialog" className="VIPRegister-dialog ui-dialog ui-corner-all ui-widget ui-widget-content ui-front ui-dialog--inline ui-draggable ui-resizable" aria-describedby="pref_popup" aria-labelledby="ui-id-1" >
                <div  className="ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle" style={{}}>
                    <span id="ui-id-1" className="ui-dialog-title">&nbsp;</span>
                    <button type="button" className="ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-close" title="Close">
                    <span className="ui-button-icon ui-icon ui-icon-closethick" />
                    <span className="ui-button-icon-space"> </span>Close</button>
                </div>
                <div id="subpop" className="t-DialogRegion js-modal js-draggable js-resizable js-dialog-autoheight js-dialog-size480x320 js-regionDialog ui-dialog-content ui-widget-content VIPPopup">

                    <div className="t-DialogRegion-wrap">
                      <div className="t-DialogRegion-bodyWrapperOut">
                        <div className="t-DialogRegion-bodyWrapperIn">
                          <div className="t-DialogRegion-body">
                            <button onClick={(e) => this.handleCloseModal(e)} type="button" className="close" id="apopclose">×</button>
                            <div style={{padding: '20px 16px', display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center'}} className="home">
                              <i className="amirah-logo" />
                            </div>
                            <div className="homePagep">
                              <div className="contentBoxp">
                                <h6 className="VIPRegisterTitle"><span><FormattedMessage id="header.VIPRegister" defaultMessage="Register Now" /></span></h6>
                                <h6 className="VIPClubTitle" style={{transform: 'translateY(-20%)', textAlign: 'center', margin: 0, letterSpacing: '0.15px', fontSize: '3.15em', fontFamily: '"Noto Sans KR", Helvetica, Arial, sans-serif', fontWeight: 300}}>
                                  <FormattedMessage id="header.VIPClubTitle" defaultMessage="VIP Club" />
                                </h6>
                                <ul className="amirah-list">
                                  <li className="first"><FormattedMessage id="header.VIPDiscounts" defaultMessage="VIP Discounts" /></li>
                                  <li><FormattedMessage id="header.BirthdayTreats" defaultMessage="Birthday Treats" /></li>
                                </ul>
                                <ul className="amirah-list">
                                  <li style={{border: 0}}><FormattedMessage id="header.VIPEvents" defaultMessage="Private Events" /></li>
                                  <li><FormattedMessage id="header.VIPMuchMore" defaultMessage="Birthday Treats" /></li>
                                </ul>
                                {/* <a href="javascript:void();" style={{marginTop: '20px', display: 'block', background: '#f693b9', color: '#fff', padding: '5px', textDecoration: 'none', border: '1px solid #e1e1e1', textAlign: 'center', borderRadius: '26px', fontSize: '20px', fontWeight: 300}} id="amirah-club-popup">Register</a> */}
                                <Link  to={'/' + this.props.store_locale + '/amirah-club/'} onClick={this.handleCloseModal}
                                      style={{marginTop: '20px', display: 'block', background: '#f693b9', color: '#fff', padding: '5px', textDecoration: 'none', border: '1px solid #e1e1e1', textAlign: 'center', borderRadius: '26px', fontSize: '20px', fontWeight: 300}} id="amirah-club-popup">
                                        <FormattedMessage id="Form.Register" defaultMessage="Register" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
              
                </div>
              </div>
          </div>

            );
      }
}

export default VipRegPopup;