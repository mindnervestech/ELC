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
            title: 'ELC',
            keyword: 'ELC',
            description: 'ELC'
        }
    }


 
    componentDidMount() {
      
        let pathname = this.props.location.pathname.split('/');
        if(pathname[pathname.length -1]=='')
        {
            setTimeout(() => {
                this.setState({
                    title:this.getTital('NA'),
                    keyword: this.getKeyword('NA'),
                    description: this.getDescription('NA')
                }) 
            }, 100);
        }
        else{
            setTimeout(() => {
                this.setState({
                    title: this.getTital(pathname[pathname.length - 1]),
                    keyword: this.getKeyword(pathname[pathname.length - 1]),
                    description: this.getDescription(pathname[pathname.length - 1])

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
                    title:this.getTital('NA'),
                    keyword: this.getKeyword('NA'),
                    description: this.getDescription('NA')
                }) 
            }, 100);
        }
        else if (this.props.location.pathname !== prevProps.location.pathname) {
            const pathname=this.props.location.pathname.split('/');
            this.setState({
                title: this.getTital(pathname[pathname.length - 1]),
                keyword: this.getKeyword(pathname[pathname.length - 1]),
                description: this.getDescription(pathname[pathname.length - 1])
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
    
        let mainTitle = title !== 'NA' ? intl.formatMessage({ id: `PageTitle.${title}`,defaultMessage: 'ELC' }) : intl.formatMessage({ id: `PageTitle.Home` });
    
        return mainTitle + " | " + intl.formatMessage({ id: `PageTitle.elc.${country}` })
    }

    getKeyword = (keyword) => {

        const { intl } = this.props;
        let country = this.props.globals.country;
        if(country === 'uae'){
            country = 'UAE';
        }else if(country === 'ksa'){
            country = 'KSA'
        }
    
        let mainTitle = keyword !== 'NA' ? intl.formatMessage({ id: `PageTitle.${keyword}.keyword`,defaultMessage: 'ELC' }) : intl.formatMessage({ id: `PageTitle.Home` });
        console.log('keyword---',mainTitle);
        return mainTitle + " | " + intl.formatMessage({ id: `PageTitle.elc.${country}` })
    }

    getDescription = (description) => {

        const { intl } = this.props;
        let country = this.props.globals.country;
        if(country === 'uae'){
            country = 'UAE';
        }else if(country === 'ksa'){
            country = 'KSA'
        }
    
        let mainTitle = description !== 'NA' ? intl.formatMessage({ id: `PageTitle.${description}.description`,defaultMessage: 'ELC' }) : intl.formatMessage({ id: `PageTitle.Home` });

        return mainTitle + " | " + intl.formatMessage({ id: `PageTitle.elc.${country}` })
    }


    render() {
        return (<>
            <Helmet>
                <title>{this.state.title}</title>
                <meta name="keywords" content={this.state.keyword} />
                <meta name="description" content={this.state.description} />
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