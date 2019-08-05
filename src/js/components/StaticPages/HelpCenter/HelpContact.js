import React, { Component } from 'react';
import ContactUs from '../ContactUs/ContactUs';

class HelpContact extends Component {
    constructor(props) {
        super(props);
        //console.log(this.props);

        this.state = {
            searchWord: new URLSearchParams(this.props.location.search).get('data')
        }

    }
    render() {

        return (<>
            <ContactUs search={true} searchWord={this.state.searchWord} />
        </>);
    }
}

export default HelpContact;
