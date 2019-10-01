import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { injectIntl, formatMessage,FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';

class PageTitle extends Component {
    constructor(props) {
        super(props);
        this.myIntl = props.intl
        this.state = {
            title: 'ELC'
        }
    }


 
    componentDidMount() {
      
        let pathname = this.props.location.pathname.split('/');
        if(pathname[pathname.length -1]=='')
        {
            setTimeout(() => {
                this.setState({
                    title:this.getTital('NA')
                }) 
            }, 100);
        }
        else{
            setTimeout(() => {
                this.setState({
                    title: this.getTital(pathname[pathname.length - 1])
                }) 
            }, 100);
        }
       
      }

    componentDidUpdate(prevProps) {
        let pathname = this.props.location.pathname.split('/');
        if(pathname[pathname.length - 1]=='')
        { 
         
            setTimeout(() => {
                this.setState({
                    title:this.getTital('NA')
                }) 
            }, 100);
        }
        else if (this.props.location.pathname !== prevProps.location.pathname) {
            const pathname=this.props.location.pathname.split('/');
            this.setState({
                title: this.getTital(pathname[pathname.length - 1])
            })
        }
    }


    getTital = (title) => {
        const { intl } = this.props;
        let country = this.props.globals.country;
        if(country === 'uae'){
            country = 'UAE';
        }else if(country === 'ksa'){
            country = 'KSA'
        }
    
        let mainTitle = title !== 'NA' ? intl.formatMessage({ id: `PageTitle.${title}`,defaultMessage: 'ELC Home ' }) : intl.formatMessage({ id: `PageTitle.Home` });
    
        return mainTitle + " | " + intl.formatMessage({ id: `PageTitle.nayomi.${country}` })
    }


    render() {
        return (<>
            <Helmet>
                <title>{this.state.title}</title>
            </Helmet>
        </>)
    }
}


const mapStateToProps = state => {
    return {
        globals: state.global,
      
    }
}


export default  withRouter (connect(mapStateToProps)(injectIntl(PageTitle)));