import React, { Component } from 'react';
import './Spinner.css';
import { connect } from 'react-redux';

class Spinner extends Component {
    render() {
        let component = null;

        if (this.props.loading) {
            // console.log('main spinner is on')
            component = <div className="loader">Loading...</div>;
        } else {
            // console.log('main spinner is off')
            component = this.props.children;
        }
        return (<>

            {component}
        </>);
    }
}

const mapStateToProps = state => {
    return {
        loading: state.spinner.loading,
    };
}

export default connect(mapStateToProps)(Spinner);