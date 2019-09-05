import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class CheckoutHeader extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const store_locale = this.props.globals.store_locale;
        return (<>
            <header className="header" id="t_Header">
                <div id="R127923585041798397" className="row-2 checkout-header">
                    <div className="containers-main">
                        <figure className="logo"><Link to={`/${store_locale}/`}></Link></figure>
                    </div>
                </div><div id="R126785735476060497" className="menuOverlay">
                </div>
            </header>
        </>)
    }
}

const mapStateToProps = state => {
    return {
        globals: state.global,
    }
}

export default connect(mapStateToProps)(CheckoutHeader);