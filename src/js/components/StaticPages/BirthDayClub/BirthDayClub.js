import React, { Component } from "react";
import "./BirthDayClub.css";
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Image } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../../../redux/actions/index';
import BirthDayClubImage from '../../../../assets/images/BirthDayClub/birthday-club.png';

 class BirthDayClub extends Component {
  constructor(props)
  {
    super(props);
    this.state=
    {
      redirectToAddNewChild:false
    }


  }



  redirectToAddChild=()=>
  {
    this.setState({redirectToAddNewChild:true})
  }
  render() {

    let store_locale=this.props.globals.store_locale

    if (this.state.redirectToAddNewChild) {
      return <Redirect to={{
        pathname: `/${store_locale}/add-new-birth-day-club-child`,
      }} />;
    }


    return (
      <div>
        <Row style={{ marginTop: "40px" }}>
                  
						  <div style={{textAlign:'center'}}>
            <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
              <span className="titleHover" style={{fontSize:12}}><FormattedMessage id="Checkout.Home" defaultMessage/></span><span>&nbsp;\&nbsp;&nbsp;</span>
            </Link>
            <span  style={{fontSize:12}}><FormattedMessage id="birthdayclub.header" defaultMessage="Contact Us"/></span>
          </div>
          <Col xs={1} lg={1} md={1} />
          <Col style={{ marginBottom: "40px" }}>
            <div className="paddingLeft">
              <h3 className="header-birth-club"><FormattedMessage id="birthdayclub.header" defaultMessage="" /></h3>
              <div className="img-src-width">
                <img src={BirthDayClubImage}/>
              </div>
              <div style={{ textAlign: "center" }} >
                <p>
                <FormattedMessage id="birthdayclub.text1" defaultMessage="" />

                </p>
                <p style={{ textAlign: "center" }}>
                <FormattedMessage id="birthdayclub.text2" defaultMessage="" />
                  {/* ahead of the big day with a special birthday offer */}
                </p>
                <div style={{ justifyContent: "center",textAlign: "center",paddingTop:20 }}>
                  <button
                    className="add-child-buttton bclub-button"
                    style={{ textAlign: "center" }}
                    onClick={this.redirectToAddChild}
                  >
                    {" "}
                    <FormattedMessage id="birthdayclub.addnewchildbutton" defaultMessage="" />
                    {/* Add new child */}
                  </button>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={1} lg={1} md={1} />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
	return {
		aboutUs : state.static.aboutUs,
		spinnerProduct: state.spinner.loadingProduct,
		globals:state.global
 	}
}


export default connect(mapStateToProps)(BirthDayClub);