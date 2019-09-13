import React,{ Component } from 'react';
import cookie from 'react-cookies';

class LangPop extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleclick = () => {
        cookie.save('displayFlag', 'false', { path: '/' })
    }

    render() {
        const { show } = this.props;

        return(
          <>
            <div tabIndex={-1} role="dialog" className="ui-dialog ui-corner-all ui-widget ui-widget-content ui-front ui-dialog--inline ui-draggable ui-resizable" aria-describedby="pref_popup" aria-labelledby="ui-id-1" style={{position: 'fixed', height: '319.125px', width: '480px', top: '150px', left: '400px', maxWidth: '100%'}}>
            <div className="ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle" style={{}}>
              <span id="ui-id-1" className="ui-dialog-title">&nbsp;</span>
              <button type="button" className="ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-close" title="Close">
              <span className="ui-button-icon ui-icon ui-icon-closethick" />
              <span className="ui-button-icon-space"> </span>Close</button>
            </div>

            <div id="pref_popup" className="t-DialogRegion js-modal js-draggable js-resizable js-dialog-autoheight js-dialog-size480x320 js-regionDialog ui-dialog-content ui-widget-content" 
            style={{backgroundColor: 'rgb(253, 233, 237)', width: 'auto', minHeight: '0px', maxHeight: 'none', height: 'auto'}}>

            <div className="t-DialogRegion-wrap">
            <div className="t-DialogRegion-bodyWrapperOut"><div className="t-DialogRegion-bodyWrapperIn"><div className="t-DialogRegion-body"><style dangerouslySetInnerHTML={{__html: "\nul.pflags {\n    display: flex;\n    justify-content: center;\n}\nli.ppopup-textholder{\n        width: 100%;\n    text-align: center;\n           margin: 0 15px 0px;\n    font-weight: bold;\n       padding: 5px 0;\n}\nli.active {\n    list-style-position: inside;\n    border: 3px solid #f599bb;\n}\n.pinternational,.pksa, .pkuwait, .puae, .pbuhrain, .poman, .pqatar\n{ display: inline-block; background: url('https://storage.googleapis.com/nay/icons/nay-flags3.png') no-repeat; overflow: hidden; text-indent: -9999px; text-align: left; }\n \n.pinternational {background-position: -2px -3px;width: 48px;height: 48px; }\n.pksa { background-position: -3px -57px; width: 48px; height: 48px; }\n.pkuwait { background-position: -5px -118px; width: 48px; height: 48px; }\n.puae { background-position: -3px -111px; width: 48px; height: 48px; }\n.pbuhrain { background-position: -5px -224px; width: 48px; height: 48px; }\n.poman { background-position: -5px -277px; width: 48px; height: 48px; }\n.pqatar { background-position: -5px -330px; width: 48px; height: 48px; }\n    \n    .ui-dialog.ui-dialog--inline .ui-dialog-titlebar {\n    flex-shrink: 0;\n    display: none !important;\n}\n" }} /><div className="container">
              <div className="row">
                <div className="col col-12 apex-col-auto">
                  <div className="t-Region t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow" id="R39653411892606074" style={{backgroundColor: '#fde9ed'}}>
                    <div className="t-Region-header">
                      <div className="t-Region-headerItems t-Region-headerItems--title">
                        <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                        <h5 className="t-Region-title" id="R39653411892606074_heading">Country&amp;Language</h5>
                      </div>
                      <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                    </div>
                    <div className="t-Region-bodyWrap">
                      <div className="t-Region-buttons t-Region-buttons--top">
                        <div className="t-Region-buttons-left" />
                        <div className="t-Region-buttons-right" />
                      </div>
                      <div className="t-Region-body">
                        <h4 style={{textAlign: 'center', fontWeight: 600}}>Select your country/اختيار الدولة هنا</h4>
                        <ul className="pflags">
                          <li className="ppopup-textholder" id="dislrcsa">
                            <a href="javascript:void(0)" className="pksa pcountry"  />
                            <p>السعودية</p>
                            <p>KSA</p>
                          </li>
                          <li className="ppopup-textholder" id="dislrcae">
                            <a href="javascript:void(0)" className="puae pcountry"   />
                            <p>الامارات</p>
                            <p>UAE</p>
                          </li>
                          <li className="ppopup-textholder" id="enbint"  >
                            <a href="javascript:void(0)" className="pinternational pcountry" />
                            <p>دولي</p>
                            <p>International</p>
                          </li>
                        </ul><div className="container">
                          <div className="row">
                            <div className="col col-12 apex-col-auto">
                              <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel t-Form-fieldContainer--stretchInputs t-Form-fieldContainer--radioButtonGroup apex-item-wrapper apex-item-wrapper--radiogroup " id="P0_LANG_CONTAINER"><div className="t-Form-labelContainer">
                                  <label htmlFor="P0_LANG" id="P0_LANG_LABEL" className="t-Form-label">Select Language / أختيار اللغة </label>
                                </div><div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><div tabIndex={-1} id="P0_LANG" aria-labelledby="P0_LANG_LABEL" className="radio_group apex-item-group apex-item-group--rc apex-item-radio" role="group">
                                      <div className="apex-item-grid radio_group">
                                        <div className="apex-item-grid-row">
                                          <div className="apex-item-option"><input type="radio" id="P0_LANG_0" name="P0_LANG" defaultValue="en" /><label htmlFor="P0_LANG_0">English / الأنجليزية </label></div>
                                          <div className="apex-item-option"><input type="radio" id="P0_LANG_1" name="P0_LANG" defaultValue="ar" /><label htmlFor="P0_LANG_1">Arabic / العربية</label></div>
                                        </div></div></div>
                                  </div><span id="P0_LANG_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" /></div></div>
                            </div>
                          </div><div className="row">
                            <div className="col col-12 apex-col-auto">
                              <button onClick={(e) => this.handleclick(e)} className="t-Button t-Button--hot t-Button--stretch t-Button--gapTop" type="button" id="B33040180548573177"><span className="t-Button-label">Submit / تقديم</span></button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="t-Region-buttons t-Region-buttons--bottom">
                        <div className="t-Region-buttons-left" />
                        <div className="t-Region-buttons-right" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div></div></div></div>
      <div className="t-DialogRegion-buttons">
        <div className="t-ButtonRegion t-ButtonRegion--dialogRegion">
          <div className="t-ButtonRegion-wrap">
            <div className="t-ButtonRegion-col t-ButtonRegion-col--left"><div className="t-ButtonRegion-buttons" /></div>
            <div className="t-ButtonRegion-col t-ButtonRegion-col--right"><div className="t-ButtonRegion-buttons" /></div>
          </div>
        </div>
      </div>
    </div>
    </div>
            </div>
            <div className="ui-widget-overlay ui-front"></div>
            {/* <div className="ui-resizable-handle ui-resizable-n" style={{zIndex: 90}} /><div className="ui-resizable-handle ui-resizable-e" style={{zIndex: 90}} /><div className="ui-resizable-handle ui-resizable-s" style={{zIndex: 90}} /><div className="ui-resizable-handle ui-resizable-w" style={{zIndex: 90}} /><div className="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style={{zIndex: 90}} /><div className="ui-resizable-handle ui-resizable-sw" style={{zIndex: 90}} /><div className="ui-resizable-handle ui-resizable-ne" style={{zIndex: 90}} /><div className="ui-resizable-handle ui-resizable-nw" style={{zIndex: 90}} /></div> */}
          </>
        );
    }
}

export default LangPop;