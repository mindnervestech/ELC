import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';


class PageTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'ELC'
        }
    }

    componentDidMount() {
        this.setState({
            title: this.getTital(this.props.pageTitle)
        })
    }

    componentDidUpdate(prevProps) {
        if ((this.props.pageTitle !== prevProps.pageTitle) || (this.props.globals.language !== prevProps.globals.language)) {
            if(this.props.pageTitle != 'NA'){
                this.setState({
                    title: this.getTital(this.props.pageTitle)
                })
            }
        }
    }


    getTital = (title) => {
        const { intl } = this.props;
        const country = this.props.globals.country;

        let mainTitle = `PageTitle.${title}` in intl.messages ? intl.formatMessage({ id: `PageTitle.${title}` }) : intl.formatMessage({ id: `PageTitle.Home` })
        let appendTitle = intl.formatMessage({ id: `PageTitle.nayomi.${country}` });

        return `${mainTitle} | ${appendTitle}`
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


export default connect(mapStateToProps)(injectIntl(PageTitle));