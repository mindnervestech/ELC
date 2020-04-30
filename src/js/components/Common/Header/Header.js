import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'
import PageTitle from './PageTitle'
import Mainheader from './MainHeader';
import Checkoutheader from './CheckoutHeader';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCart: false,
            pageTitle: 'ELC'
        }
    }

        componentDidMount() {

            const path = this.props.location.pathname.split('/')[2];
            if (path) {
                this.setState({
                    pageTitle: path
                })
                this.isCartChange(this.isCartcheck(path));
            } else {
                this.setState({
                    pageTitle: 'NA'
                })
                this.isCartChange(this.isCartcheck('NA'));
            }
        }

        componentDidUpdate(prevProps) {

            if (this.props.location.pathname !== prevProps.location.pathname) {
                const path = this.props.location.pathname.split('/')[2];
                if (path) {
                    this.setState({
                        pageTitle: path
                    })
                    this.isCartChange(this.isCartcheck(path));
                } else {
                    this.setState({
                        pageTitle: 'NA'
                    })
                    this.isCartChange(this.isCartcheck('NA'));
                }
            }
        }

        // shouldComponentUpdate(nextProps, nextState) {
        //   const path = nextProps.location.pathname.split('/')[2];
        //   let checkVar = path ? this.isCartcheck(path) : false;
        //   return this.state.isCart != checkVar;
        // }

        isCartcheck = (path) => {
            switch (path) {
                case 'checkout-login':
                    return true
                    break;
                case 'checkout-payment':
                    return true
                    break;
                case 'order-confirm':
                    return true
                    break;
                case 'delivery-details':
                    return true
                    break;
                default:
                    return false
            }
        }

        isCartChange = (cart_status) => {
            this.setState({
                isCart: cart_status
            })
        }



        render() {
            //console.log(this.state.PageTitle)
            const headerComponent = this.state.isCart ? <Checkoutheader /> : <Mainheader {...this.props} />;
            return (<>
                <PageTitle pageTitle={this.state.pageTitle} />
                {headerComponent}
            </>)
        }
    }

    export default withRouter(Header);