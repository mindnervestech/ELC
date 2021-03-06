import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
//import { injectIntl, formatMessage,FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';

class PageTitle extends Component {
    constructor(props) {
        super(props);
        this.myIntl = props.intl
        this.state = {
            title: '',
            keyword: '',
            description: ''
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
        if (this.props.location.pathname !== prevProps.location.pathname){
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
       
    }


    getTital = (title) => {
        const { intl } = this.props;
        let country = this.props.globals.country;
        if(country === 'uae'){
            country = 'UAE';
        }else if(country === 'ksa'){
            country = 'KSA'
        }
    
        let mainTitle = title !== 'NA' ? intl.formatMessage({ id: `PageTitle.${title}`,defaultMessage: 'ELC' }) : intl.formatMessage({ id: `PageTitle.Home`,defaultMessage:"elctoys.com | ELC Online store | Official Website | Early Learning Center" });
        return mainTitle + " | " + intl.formatMessage({ id: `PageTitle.elc.${country}`,defaultMessage:"elctoys.com | ELC Online store | Official Website | Early Learning Center"  })
       

    //     let mainTitle = title !== 'NA' ? <FormattedMessage id={`PageTitle.${title}`} defaultMessage="ELC"/>: 
    //     intl.formatMessage({ id: 'PageTitle.Home',defaultMessage:"elctoys.com | ELC Online store | Official Website | Early Learning Center"});
    // console.log("PageTitle",<FormattedMessage id={`PageTitle.${title}`} defaultMessage="ELC"/>)
    //     return mainTitle + " | " + <FormattedMessage id={`PageTitle.elc.${country}`} defaultMessage="elctoys.com | ELC Online store | Official Website | Early Learning Center"/>

    }

    getKeyword = (keyword) => {

        const { intl } = this.props;
        let country = this.props.globals.country;
        if(country === 'uae'){
            country = 'UAE';
        }else if(country === 'ksa'){
            country = 'KSA'
        }
    
        let mainTitle = keyword !== 'NA' ? intl.formatMessage({ id: `PageTitle.${keyword}.keyword`,defaultMessage: 'ELC' }) : intl.formatMessage({ id: 'PageTitle.Home.keyword',defaultMessage:"ELC, Early Learning Center, Early Learning Centre, Toys, Baby Toys, Wooden Toys, Educational Toys" });
      
        return mainTitle //+ " | " + intl.formatMessage({ id: `PageTitle.elc.${country}` ,defaultMessage:"elctoys.com | ELC Online store | Official Website | Early Learning Center"})
    }

    getDescription = (description) => {

        const { intl } = this.props;
        let country = this.props.globals.country;
        if(country === 'uae'){
            country = 'UAE';
        }else if(country === 'ksa'){
            country = 'KSA'
        }
    
        let mainTitle = description !== 'NA' ? intl.formatMessage({ id: `PageTitle.${description}.description`,defaultMessage: 'ELC' }) : intl.formatMessage({ id: 'PageTitle.Home.description',defaultMessage:"Shop online for baby toys, dolls houses, wooden toys and more at ELC. Choose from big brands including LeapFrog, VTech, Smart Trike and more." });

        return mainTitle //+ " | " + intl.formatMessage({ id: `PageTitle.elc.${country}` ,defaultMessage:"elctoys.com | ELC Online store | Official Website | Early Learning Center"})
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