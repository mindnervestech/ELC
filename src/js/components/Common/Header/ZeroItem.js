import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class ZeroItem extends Component {
    constructor(props){
        super(props);
    }
      
    render(){

        return(<>
            <span className="nodatafound"><FormattedMessage id="NoItems.Cart.Title" defaultMessage="No Items in Cart." /></span>
        </>);
    }
}

export default ZeroItem;