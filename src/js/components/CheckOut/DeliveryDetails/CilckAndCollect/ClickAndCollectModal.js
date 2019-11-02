import React, { Component } from 'react';
import './ClickAndCollect.css';
import location from '../../../../../assets/images/header/location.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Spinner from '../../../Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/index';
import MapContainer from '../../StoreLocator/map'
let productListData = {}
let storeList = {}
let pagenationCount = 4
let startValue= 0
let endValue = 0
let list1 = []
let selectedMarker = {};
let overId = null;
let reload = true;
const google = window.google
class ClickAndCollect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startValue:0,
            endValue:3,
            openModal: false,
            totalPages: 1,
            pageNumber: 1,
            list1: list1,
            start: 1,
            end: pagenationCount,
            check: true,
            selectedLoc: {},
            lat: null,
            long: null,
            zoom: 3,
            isDisplay: false,
            activeMarker: {},
            showingInfoWindow: false,
            selectedPlace: {},
            showError: false,
            selectedMarker: {},
        }
    }

    componentDidMount() {

        this.props.onGetStoreList({
            country_id: '',
            city: ''
        });



        //       if(this.props.storeList!==undefined){
        //         storeList = this.props.list.storeList;
        //     }
        //     let totalPages = 1
        //     let count = 0
        //     let pageNumber = 1
        //     let start = 1 * pageNumber
        //     let end = pagenationCount * pageNumber
        //     let list1 = {}
        //     for (var element in storeList) {
        //     	if (element >= start && element <= end) {
        //     		list1[element] = storeList[element]
        //     	}
        //     	count = count + 1
        //     }
        //     if (count % pagenationCount === 0) {
        //     	totalPages = count / pagenationCount
        //     } else {
        //     	totalPages = Math.floor(count / pagenationCount) + 1
        //     }


        // }
    }

    pagenation = (start, end) => {
       console.log("Value of start and end",start,end)
        this.state.list1 = []
        for (var element in storeList) {
            if (element >= start && element <= end) {
                this.state.list1[element] = storeList[element]
            }
        }
        this.setState({ list1: this.state.list1 })
    }

    prevButton = () => {

       console.log("Call in Prev")
        if(this.state.startValue===0){
           // this.setState({pageNumber:this.state.pageNumber+1})
           
            // let startValue=this.state.startValue;
            // let endValue=this.state.endValue;
            // this.pagenation(startValue,endValue)
        }else{
            this.setState({startValue:this.state.endValue-3})
            this.setState({endValue:this.state.startValue})    
            startValue=this.state.startValue;
            endValue=this.state.endValue;
            this.pagenation(startValue,endValue)
        }
        
    }

    nextButton = () => {
        console.log("Call in next")
        //this.setState({pageNumber:this.state.pageNumber+1})
        console.log("Start Value",this.state.startValue)
        if(this.state.startValue===0){
           // this.setState({pageNumber:this.state.pageNumber+1})
           this.setState({startValue:this.state.startValue});
           this.setState({endValue:this.state.startValue+3})
             startValue=this.state.startValue;
             endValue=this.state.endValue
            this.setState({startValue:this.state.endValue})
            this.pagenation(startValue,endValue)

        }else{
            
            this.setState({startValue:this.state.endValue})
            setTimeout(() => {
            this.setState({endValue:this.state.startValue+3})    
            }, 100);
           
            let startValue=this.state.startValue;
            let endValue=this.state.endValue
            this.pagenation(startValue,endValue);
           
           }
          
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

        let start=this.state.startValue;
        let end=this.state.endValue;
       
        for (var element in storeList) {
            if (element >= start && element <= end) {
                list1[element] = storeList[element]
            }
           
        }
       



        let modal = null;
        return (<>
            <div style={{ overflow: 'scroll', height: 200 }} className="click-and-collect-container divShowOnWeb">
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
                                <ul className="pickup-store-list">{storeList !== undefined && this.state.list1 && this.state.list1.map((item, index) =>

                                    (

                                        <li className=" pickup-store-list-entry pre-selected storelist-li">
                                            <label for="pickup-entry-0" className="js-select-store-label">
                                                <span className="pickup-store-info">
                                                    <span className="pickup-store-list-entry-address">{item.name}</span><br />
                                                    <span className="pickup-store-list-entry-city">{item.address}</span><br />
                                                </span>
                                                <span className="store-availability">
                                                    <span className="available">{item.country}<br />

                                                    </span></span>
                                            </label>

                                        </li>
                                    )
                                )}
                                </ul>
                            </div>

                            <div style={{ display: 'block' }}>
                                <ul class="pagenation" style={{ display: 'flex' }}>
                                    {this.state.startValue!==0 ?
                                    <li class="PagenationLeftArrow" onClick={this.prevButton} style={{ opacity: '0.5' }}></li>:<li></li>}
                                    <div className="position">
                                        <span className="js-pickup-store-pager-item-from">13</span>-<span class="js-pickup-store-pager-item-to">16</span> from&nbsp;<span class="js-pickup-store-pager-item-all">100</span> &nbsp;stores found</div>

                                    <li class="PagenationRightArrow" onClick={this.nextButton} style={{ opacity: '0.5' }}></li></ul>

                            </div>





                        </div>
                        <div className="col col-md-8 col-xs-8 tabs-div" style={{ marginTop: 13 }}>
                            <Tabs className="tabs-main">
                                <TabList style={{ color: '#4f4f4f', }} >
                                    <Tab style={{ color: '#0d943f', borderRadius: 0, fontWeight: 800 }}>Store Deatils</Tab>
                                    <Tab style={{ color: '#4f4f4f', backgroundColor: '#f8f8f8', borderRadius: 0, fontWeight: 800 }}>Map</Tab>
                                    <Tab style={{ color: '#4f4f4f', backgroundColor: '#f8f8f8', borderRadius: 0, fontWeight: 800 }}>Opening Hours</Tab>

                                </TabList>
                                <div className="border-div-2">
                                    <TabPanel style={{ marging: '5%' }}>
                                        <h2>Store Deatils</h2>
                                    </TabPanel>
                                    <TabPanel style={{ marging: '5%' }}>
                                        <h2>MAP</h2>
                                        {/* <MapContainer
                                                  onMouseoverMarker={this.onMouseoverMarker}
                                                  onMarkerClick={this.onMarkerClick}
                                                  markars={this.state.storeList}
                                                  lat={this.state.lat}
                                                  long={this.state.long}
                                                  zoom={this.state.zoom}
                                                  activeMarker={this.state.activeMarker}
                                                  selectedPlace={this.state.selectedPlace}
                                                  selectedMarker={selectedMarker}
                                                  showingInfoWindow={this.state.showingInfoWindow}
                                                  language={this.props.language} />)} */}
                                    </TabPanel>
                                    <TabPanel style={{ marging: '5%' }}>
                                        <h2>Opening Hours</h2>
                                    </TabPanel>
                                </div>

                            </Tabs>
                            <div style={{ marginTop: '10%', marginBottom: '5%', display: 'flex' }}>

                                <div className="button-addtobasket-store">
                                    <button className="alsoLikeCardButton" style={{ width: '50%' }}><span>Add to basket</span></button>
                                </div>

                            </div>

                        </div>
                    </div>


                </div>

            </div>


            <div className="click-and-collect-container divShowOnMobile">
                <div>
                    <div>
                        <h2 className="main-header-ChooseastoreforClickCollect">Choose a store for Click & Collect</h2>
                    </div>
                    <div style={{ marginLeft: '1%', marginRight: '1%' }}>
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
                                <ul className="pickup-store-list">{storeList !== undefined && this.state.list1 && this.state.list1.map((item, index) =>

                                    (

                                        <li className=" pickup-store-list-entry pre-selected storelist-li">
                                            <label for="pickup-entry-0" className="js-select-store-label">
                                                <span className="pickup-store-info">
                                                    <span className="pickup-store-list-entry-address">{item.name}</span><br />
                                                    <span className="pickup-store-list-entry-city">{item.address}</span><br />
                                                </span>
                                                <span className="store-availability">
                                                    <span className="available">{item.country}<br />

                                                    </span></span>
                                            </label>

                                        </li>
                                    )
                                )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col col-md-8 col-xs-8 display-mb" style={{ marginTop: 13 }}>
                        <Tabs className="tabs-main">
                            <TabList style={{ color: '#4f4f4f' }} >
                                <Tab style={{ color: '#0d943f', borderRadius: 0, fontWeight: 800 }}>Store Deatils</Tab>
                                <Tab style={{ color: '#4f4f4f', backgroundColor: '#f8f8f8', borderRadius: 0, fontWeight: 800 }}>Map</Tab>
                                <Tab style={{ color: '#4f4f4f', backgroundColor: '#f8f8f8', borderRadius: 0, fontWeight: 800 }}>Opening Hours</Tab>

                            </TabList>
                            <div className="border-div-2">
                                <TabPanel style={{ marging: '5%' }}>
                                    <h2>Store Deatils</h2>
                                </TabPanel>
                                <TabPanel style={{ marging: '5%' }}>
                                    <h2>MAP</h2>
                                </TabPanel>
                                <TabPanel style={{ marging: '5%' }}>
                                    <h2>Opening Hours</h2>
                                </TabPanel>
                            </div>
                        </Tabs>
                        {/* <TabPanel >
                                    <h2>Store Deatils</h2>
                                </TabPanel>
                                <TabPanel>
                                    <h2>MAP</h2>
                                </TabPanel>
                                <TabPanel >
                                    <h2>Opening Hours</h2>
                                </TabPanel> */}

                        <div style={{ marginTop: '5%', marginBottom: '5%', display: 'flex' }}>

                            <div className="button-backto-store">
                                <button className="addChildrenRegisterButton"><span>Back to store list</span></button>
                            </div>

                            <div className="button-addtobasket-store">
                                <button className="alsoLikeCardButton"><span>Add to basket</span></button>
                            </div>

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