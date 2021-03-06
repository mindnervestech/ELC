import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import ZeroItem from './Instagram';
import InstagramItems from './Instagram';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import HomePageComponent from './HomePageComponent';
import VipRegPopup from './VipRegPopup';
import { set } from 'react-ga';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // openVipModal: false,
            selectedStore: ''
        }
    }

    onOpenVipModal = () => {
        this.setState({ openVipModal: true });
    };

    onCloseVipModal = () => {
        this.setState({ openFirstModal: false });
    };

    openVipModal = () => {
        setTimeout(() => {
            this.onOpenVipModal();
        }, 3000);

    }

    componentWillMount = () => {

        //   let obj = this.props.home_page_data;
        //   if ((Object.entries(obj).length === 0) && (obj.constructor === Object)) {
        //     this.props.onGetHomePageData({ store: this.props.store_id });
        //   }
        // }

        this.props.onGetHomePageData({ store: this.props.store_id });
        // this.props.onGetHomePageData({ store: 2 });

    }

    render() {

        const toHome = localStorage.getItem('toHome');
        const store_locale = localStorage.getItem('store_locale');
        const displayVipReg = localStorage.getItem('displayVipReg');
        if ((toHome === "true") && (store_locale !== null)) {

            let new_store_id = localStorage.getItem('storeid');

            let new_store = {
                store_id: new_store_id,
            }

            //console.log("New Store is:", new_store);
            this.props.onSetChangeStore({ ...new_store });

            //console.log('HOME this.props',this.props);

            // this.setState({ toHome: false });
            localStorage.setItem('toHome', false);
            return <Redirect to={"/" + store_locale} />
        }

        let homePageData = null;
        let obj = this.props.home_page_data;
        //console.log(obj)
        // if (!((Object.entries(obj).length === 0) && (obj.constructor === Object))) {
        homePageData = <HomePageComponent home_page_data={this.props.home_page_data} store_locale={this.props.store_locale} />;
        // }

        //After redirect to URL with locale and display VIP registration first time
        if ((toHome === "false") && (store_locale !== null) && (displayVipReg === "true")) {
            return (
                <>
                    {homePageData}
                </>
            );
        } else {
            return (
                <>
                    {homePageData}
                </>
            );
        }

    }
}


const mapStateToProps = state => {
    return {
        home_page_data: state.global.home_page_data,
        store_id: state.global.currentStore,
        store_locale: state.global.store_locale,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetHomePageData: (payload) => dispatch(actions.getHomePageData(payload)),
        onSetChangeStore: (payload) => dispatch(actions.setChangeStore(payload)),
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));