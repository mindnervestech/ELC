import React, { Component } from "react";
import "./BirthDayClub.css";
import { FormattedMessage } from 'react-intl';
import BirthDayClubImage from "../../../assets/images/BirthDayClub/birthday-club.jpeg";
import { Row, Col, Image } from "react-bootstrap";
export default class BirthDayClub extends Component {
  render() {
    return (
      <div>
        <Row style={{ marginTop: "40px" }}>
          <Col xs={1} lg={1} md={1} />
          <Col style={{ marginBottom: "40px" }}>
            <div className="paddingLeft">
              <h3 className="header-birth-club"><FormattedMessage id="birthdayclub.header" defaultMessage="" /></h3>
              <div className="img-src-width">
                <Image src={BirthDayClubImage} alt="BirthDayClub" />
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
                    className="button-add-to-basket"
                    style={{ textAlign: "center" }}
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
