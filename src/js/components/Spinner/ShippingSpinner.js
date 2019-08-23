import React, { Component } from 'react';
import './Spinner.css';
import { connect } from 'react-redux';

class ShippingSpinner extends Component {
    render() {
        let component = null;


        if (this.props.loading || this.props.shippingLoader) {
            //console.log('shippingLoader on : ', this.props.loading, this.props.shippingLoader)
            component = <div className="loader">Loading...</div>;
        } else {
            //console.log('shippingLoader off : ', this.props.loading, this.props.shippingLoader)
            component = this.props.children;
        }
        return (<>

            {component}
        </>);
    }
}

const mapStateToProps = state => {
    return {
        shippingLoader: state.spinner.shippingLoader,
        loading: state.spinner.loading,
    };     
}

export default connect(mapStateToProps)(ShippingSpinner);