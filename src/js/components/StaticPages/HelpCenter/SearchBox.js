import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

const searchBox = (props) => {

    const { data } = props;
    //console.log("help center data", data);



    return (
        <div className="row">
            <div className="col col-3 ">
                <span className="apex-grid-nbsp">&nbsp;</span>
            </div><div className="col col-6 ">
                <div className="t-Region t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow margin-top-lg" id="R30311961521614255" style={{ backgroundColor: '#fcf0f4' }}>
                    <div className="t-Region-header">
                        <div className="t-Region-headerItems t-Region-headerItems--title">
                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true"></span></span>

                        </div>
                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer"></span></div>
                    </div>
                    <div className="t-Region-body">
                        <center>
                            <h2 style={{ fontWeight: 300 }}><FormattedMessage id="help.Welcome.Title" defaultMessage="Welcome" /></h2>
                        </center>
                        <div className="container">
                            <div className="row">
                                <div className="col col-2 ">
                                    <span className="apex-grid-nbsp">&nbsp;</span>
                                </div>
                                <div className="col col-8 ">
                                    <div className="t-Form-fieldContainer rel-col t-Form-fieldContainer--stretchInputs t-Form-fieldContainer--xlarge apex-item-wrapper apex-item-wrapper--text-field apex-item-wrapper--has-icon" id="P17_SEARCH_CONTAINER">
                                        <div className="t-Form-labelContainer col col-0">
                                            <label htmlFor="P17_SEARCH" id="P17_SEARCH_LABEL" className="t-Form-label">Search</label>
                                        </div>
                                        <div className="t-Form-inputContainer col col-8">

                                            <div className="t-Form-itemWrapper">
                                                <FormattedMessage id="help.searchPlaceholder">
                                                    {(message) =>
                                                        <input type="text"
                                                        id="P17_SEARCH"
                                                        name="P17_SEARCH"
                                                        placeholder={message}
                                                        className="text_field apex-item-text apex-item-has-icon"
                                                        value={props.searchBoxValue}
                                                        size="30"
                                                        maxLength=""
                                                        onChange={props.onSearchBoxChange}
                                                        onKeyPress={props.handleKeyPress} />}
                                                    </FormattedMessage>
                                                <span className="apex-item-icon fa fa-search" aria-hidden="true"></span>
                                            </div>

                                            <span id="P17_SEARCH_error_placeholder" className="a-Form-error" data-template-id="30692822047810132_ET"></span>
                                        </div></div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="t-Region-buttons t-Region-buttons--bottom">
                        <div className="t-Region-buttons-left"></div>
                        <div className="t-Region-buttons-right"></div>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default searchBox;