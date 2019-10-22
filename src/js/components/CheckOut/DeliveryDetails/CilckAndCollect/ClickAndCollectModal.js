import React, { Component } from 'react';
import './ClickAndCollect.css';
import location from '../../../../../assets/images/header/location.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Spinner from '../../../Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/index';
let productListData = {}
let storeList = {}
let pagenationCount = 5
let start = 1
let end = 5
let list1 = {}
class ClickAndCollect extends Component {
    constructor(props) {
        super(props);


        this.state = {
            openModal: false,
            totalPages: 1,
            pageNumber: 1,
            list1: list1,
            start: 1,
            end: pagenationCount,
            check: true,
        }
    }

    componentDidMount() {

        this.props.onGetStoreList({
            country_id: '',
            city: ''
        });



        //   if(this.props.storeList!==undefined){
        //     storeList = this.props.list.storeList;
        // }
        // let totalPages = 1
        // let count = 0
        // let pageNumber = 1
        // let start = 1 * pageNumber
        // let end = pagenationCount * pageNumber
        // let list1 = {}
        // for (var element in storeList) {
        // 	if (element >= start && element <= end) {
        // 		list1[element] = storeList[element]
        // 	}
        // 	count = count + 1
        // }
        // if (count % pagenationCount === 0) {
        // 	totalPages = count / pagenationCount
        // } else {
        // 	totalPages = Math.floor(count / pagenationCount) + 1
        // }


    }

    componentWillReceiveProps(nextProps) {
        console.log("NextProps NextProps", nextProps)
    }

    pagenation = (start, end) => {

        this.state.list1 = {}
        for (var element in storeList) {
            if (element >= start && element <= end) {
                this.state.list1[element] = storeList[element]
            }
        }
        this.setState({ list1: this.state.list1 })
    }



    prevButton = () => {

        if (this.state.pageNumber !== 1 && this.state.pageNumber !== 0) {
            this.setState({ pageNumber: this.state.pageNumber - 1 })
            if (this.state.totalPages <= 5) {

            } else {
                let startChange = start - 1
                let endChange = end - 1
                if (startChange >= 1) {
                    start = startChange
                    end = endChange
                }
            }
            setTimeout(() => {
                if (this.state.check) {
                    let value = pagenationCount * (this.state.pageNumber - 1) + 1
                    this.pagenation(value, value + pagenationCount - 1)
                } else {
                    let value = pagenationCount * (this.state.pageNumber - 1)
                    this.pagenation(value, value + pagenationCount - 1)
                }
            }, 500);
        }
    }

    nextButton = () => {

        if (this.state.pageNumber !== this.state.totalPages) {
            this.setState({ pageNumber: this.state.pageNumber + 1 })
            if (this.state.check) {
                let value = pagenationCount * this.state.pageNumber + 1
                this.pagenation(value, value + pagenationCount - 1)
            } else {
                let value = pagenationCount * this.state.pageNumber
                this.pagenation(value, value + pagenationCount - 1)
            }
            if (this.state.totalPages <= 5) {

            } else {
                let startChange = start + 1
                let endChange = end + 1
                if (endChange <= this.state.totalPages) {
                    start = startChange
                    end = endChange
                }
            }
        }
    }
    onNextClick = () => {

    }

    OnPreviousClick = () => {

    }
    _renderStoreList = () => {

        let storeList = this.props.storeList;
        if (storeList !== undefined) {

        }
        return (
            <>

            </>)
    }

    render() {

        if (this.props.storeList !== undefined) {
            storeList = this.props.storeList;
        }
        let totalPages = 1
        let count = 0
        let pageNumber = 1
        let start = 1 * pageNumber
        let end = pagenationCount * pageNumber
        for (var element in storeList) {
            if (element >= start && element <= end) {
                list1[element] = storeList[element]
            }
            count = count + 1
        }
        if (count % pagenationCount === 0) {
            totalPages = count / pagenationCount
        } else {
            totalPages = Math.floor(count / pagenationCount) + 1
        }


        console.log("Render Store List", list1)
        let modal = null;
        return (<>
            <div className="click-and-collect-container divShowOnWeb">
                <div>
                    <div>
                        <h2 className="main-header-ChooseastoreforClickCollect">Choose a store for Click & Collect</h2>
                    </div>
                    <div className="row">
                        <div className="col col-md-3 col-xs-3 mb-flex-basic-none">
                            <div style={{ position: 'relative' }}>
                                <input type="search " className="search-button-find-store-near-me" name="locationQuery" placeholder="Find stores near me" id="locationForSearch">

                                </input>
                                <button className="searchButton-click-and-collect" style={{ backgroundColor: ' rgb(255, 255, 255)', position: 'absolute' }} ><img src="/static/media/search.126d7010.svg" className="searchLogoClickCollect" /></button>
                            </div>
                            <div className="button-div-store-near">
                                <button name="find" className="button-store-find-near-me"><span className="icon icon-finder"><img src={location} style={{ width: 16 }} /></span>Find stores near me</button>
                            </div>
                            <div>
                                {/* <ul>{storeList !== undefined && this.state.list1 && list1.map((item, index) =>

                                    (

                                        <li className="storelist-li">
                                            <span>{item.name}</span>
                                            <span>{item.address}</span>
                                            <span>{item.country}</span>
                                        </li>
                                    )
                                )}
                                </ul> */}
                            </div>


                        </div>
                        <div className="col col-md-8 col-xs-8 tabs-div" style={{ marginTop: 13 }}>
                            <Tabs className="tabs">
                                <TabList >
                                    <Tab style={{ color: 'green', borderRadius: 0 }}>Store Deatils</Tab>
                                    <Tab style={{ color: 'green', borderRadius: 0 }}>Map</Tab>
                                    <Tab style={{ color: 'green', borderRadius: 0 }}>Opening Hours</Tab>
                                </TabList>

                                <TabPanel>
                                    <h2>Any content 1</h2>
                                </TabPanel>
                                <TabPanel>
                                    <h2>Any content 2</h2>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>


                </div>

            </div>


            <div className="click-and-collect-container divShowOnMobile">
                <div>
                    <div>
                        <h2 className="main-header-ChooseastoreforClickCollect">Choose a store for Click & Collect</h2>
                    </div>
                    <div style={{marginLeft:'1%',marginRight:'1%'}}>
                        <div className="mb-flex-basic-none">
                            <div style={{ position: 'relative' }}>
                                <input type="search " className="search-button-find-store-near-me" name="locationQuery" placeholder="Find stores near me" id="locationForSearch">

                                </input>
                                <button className="searchButton-click-and-collect" style={{ backgroundColor: ' rgb(255, 255, 255)', position: 'absolute' }} ><img src="/static/media/search.126d7010.svg" className="searchLogoClickCollect" /></button>
                            </div>
                            <div className="button-div-store-near">
                                <button name="find" className="button-store-find-near-me"><span className="icon icon-finder"><img src={location} style={{ width: 16 }} /></span>Find stores near me</button>
                            </div>
                            <div>
                                {/* <ul>{storeList !== undefined && this.state.list1 && list1.map((item, index) =>

                                    (

                                        <li className="storelist-li">
                                            <span>{item.name}</span>
                                            <span>{item.address}</span>
                                            <span>{item.country}</span>
                                        </li>
                                    )
                                )}
                                </ul> */}
                            </div>
                        </div>
                    </div>
                    <div className="col col-md-8 col-xs-8 tabs-div" style={{ marginTop: 13 }}>
                            <Tabs className="tabs">
                                <TabList >
                                    <Tab style={{ color: 'green', borderRadius: 0 }}>Store Deatils</Tab>
                                    <Tab style={{ color: 'green', borderRadius: 0 }}>Map</Tab>
                                    <Tab style={{ color: 'green', borderRadius: 0 }}>Opening Hours</Tab>
                                </TabList>

                                <TabPanel>
                                    <h2>Any content 1</h2>
                                </TabPanel>
                                <TabPanel>
                                    <h2>Any content 2</h2>
                                </TabPanel>
                            </Tabs>
                            <div style={{display:'inline-flex'}}>
                            <button class="alsoLikeCardButton"><span>Back to store list</span></button>
                            <button class="alsoLikeCardButton"><span>Add to basket</span></button>
                            </div>
                        </div>
                </div>
            </div>
        </>);

    }

}

const mapStateToProps = state => {
    return {
        storeList: state.address.storeList,
        language: state.global.language,
        globals: state.global
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetStoreList: (payload) => dispatch(actions.getStoreList(payload)),

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ClickAndCollect);