import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class OfferStripe extends Component {
  render() {

    const { OfferMessage } = this.props;

    return (
            
                <div className="containers-main"> 
                     {OfferMessage}
                 </div>
          
    );
  }
}

export default OfferStripe;