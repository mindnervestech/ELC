import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            searchText: ''
        }
    }

    handleKeyPress = (e) => {
        const store_locale = this.props.store_locale;
        if(e.keyCode === 13){
           //console.log('value', e.target.value);
           this.setState({redirect: true, searchText: e.target.value});
           this.props.history.push(`/${store_locale}/products/search?query=`+e.target.value);
           // put the login here
        }
     }
    
     renderRedirect = () => {
        const store_locale = this.props.store_locale;
        if (this.state.redirect) {
          //return <Redirect to={`/${store_locale}/products/search?query=`+this.state.searchText} />
        }
      }

    render() {
        return(
              <div className="search">
                {this.renderRedirect()}
                <i className="icon-search"></i>
                <FormattedMessage id="SearchText" defaultMessage="Search">
                    {(message)=>  
                    <input type="text" id="searchnay" className="textInput" placeholder={message} onKeyDown={this.handleKeyPress} />}
                </FormattedMessage>

              </div>
        )
    }
}

export default withRouter(Search);