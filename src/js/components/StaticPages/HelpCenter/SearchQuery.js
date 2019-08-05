import React, { Component } from 'react';
import FAQ from '../Faq/Faq';

class SearchQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord: new URLSearchParams(this.props.location.search).get('query')
        }

    }
    render() {

        return (<>
            <FAQ search={true} searchWord={this.state.searchWord} />
        </>);
    }
}

export default SearchQuery;
