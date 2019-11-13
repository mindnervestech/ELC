import React, { Component } from 'react';
import './ClickAndCollect.css';
import location from '../../../../../assets/images/header/location.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Spinner from '../../../Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/index';
import Map from './map';
//import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
//import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

let productListData = {}
let storeList = {}
let pagenationCount = 4
let startValue = 0
let endValue = 0
let list1 = []
let selectedMarker = {};
let overId = null;
let reload = true;
const google = window.google
const mapStylesForWeb = {
    width: '80%',
    height: '40%',
    margin: '2%'
};

const mapStylesForMobile= {
    width: '80%',
    height: '40%',
    margin: '2%'
};
class ClickAndCollect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startValue: 0,
            endValue: 3,
            openModal: false,
            totalPages: 1,
            list1: list1,
            start: 1,
            end: pagenationCount,
            check: true,
            selectedLoc: {},
            lat: null,
            long: null,
            zoom: 3,
            hasFocus: false,
            isDisplay: false,
            activeMarker: {},
            showingInfoWindow: true,
            selectedPlace: {},
            showError: false,
            selectedMarker: {},
            divMobileOfContainer:false,
            divMobileOfContainerTop:false
        }
    }

    componentDidMount() {

        this.props.onGetStoreList({
            country_id: '',
            city: ''
        });
    }
    componentWillReceiveProps() {

    }
    onMarkerClick = () =>{
       
    this.setState({
        showingInfoWindow: true,
    },()=>{});}


  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
    pagenation = (start, end) => {
        this.state.list1 = []
        for (var element in storeList) {
            if (element >= start && element <= end) {
                this.state.list1[element] = storeList[element]
            }
        }
        this.setState({ list1: this.state.list1 })
    }

    setFocusStyle = () => {
        this.setState({ hasFocus: true })
    }
    prevButton = () => {

        if (true) {
            setTimeout(() => {
                this.setState({ endValue: this.state.startValue - 1 }, () => { })
            }, 100);
            setTimeout(() => {
                this.setState({ startValue: this.state.endValue - 3 }, () => { })
                let startValue = this.state.startValue;
                let endValue = this.state.endValue;
                this.pagenation(startValue, endValue)
            }, 100);
        }
    }

    nextButton = () => {

        if (true) {

            setTimeout(() => {
                this.setState({ startValue: this.state.endValue + 1 }, () => {

                })
            }, 100);
            setTimeout(() => {
                this.setState({ endValue: this.state.startValue + 3 }, () => {
                })
                let startValue = this.state.startValue;
                let endValue = this.state.endValue
                this.pagenation(startValue, endValue);
            }, 100)

        }

    }

    onClickOnBackToStore=()=>{
        this.setState({ divMobileOfContainer:false,divMobileOfContainerTop:false}, () => { })
       
    
    }
    renderMarker = (latValue, langValue) => {
        this.setState({ lat: latValue, lang: langValue ,divMobileOfContainer:true,divMobileOfContainerTop:true}, () => { })
      
    

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
        let totalStore = 0;
        if (this.props.storeList !== undefined) {
            storeList = this.props.storeList;
            totalStore = storeList.length;
        }

        let start = this.state.startValue;
        let end = this.state.endValue;

        for (var element in storeList) {
            if (element >= start && element <= end) {
                list1[element] = storeList[element]
            }

        }
        let focusStyle = {
            border: '2px solid #0d943f',

        }



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
                                <input type="search " style={this.state.hasFocus ? focusStyle : null} onFocus={this.setFocusStyle} className="search-button-find-store-near-me" name="locationQuery" placeholder="Find stores near me" id="locationForSearch">

                                </input>
                                <button className="searchButton-click-and-collect" style={{ backgroundColor: ' rgb(255, 255, 255)', position: 'absolute' }} ><img src="/static/media/search.126d7010.svg" className="searchLogoClickCollect" /></button>
                            </div>
                            <div className="button-div-store-near">
                                <button name="find" className="button-store-find-near-me"><span className="icon icon-finder"><img src={location} style={{ width: 16 }} /></span>Find stores near me</button>
                            </div>
                            <div>
                                <ul className="pickup-store-list">{storeList !== undefined && this.state.list1 && this.state.list1.map((item, index) =>

                                    (

                                        <li key={index} onClick={() => this.renderMarker(item.lattitude, item.longitude)} className=" pickup-store-list-entry pre-selected storelist-li">
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
                                    {this.state.startValue !== 0 ?
                                        <li class="PagenationLeftArrow" onClick={this.prevButton} style={{ opacity: '1' }}></li> : <li></li>}
                                    <div className="position">
                                        {this.state.startValue === 0 ?
                                            <><span className="js-pickup-store-pager-item-from">{this.state.startValue + 1}</span>-<span className="js-pickup-store-pager-item-to">{this.state.endValue + 1}&nbsp;from&nbsp;<span class="js-pickup-store-pager-item-all">{totalStore} &nbsp;stores found</span></span></> :
                                            <><span className="js-pickup-store-pager-item-from">{this.state.startValue + 1}</span>-<span className="js-pickup-store-pager-item-to">{this.state.endValue + 1}</span>&nbsp;from&nbsp;<span class="js-pickup-store-pager-item-all">{totalStore}</span> &nbsp;stores found</>}</div>
                                    {this.state.endValue < totalStore ? <li class="PagenationRightArrow" onClick={this.nextButton} style={{ opacity: '1' }}></li> : <li></li>}
                                </ul>

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

                                        {this.state.lang && this.state.lat && (<Map
                                            google={this.props.google}
                                            zoom={8}
                                            style={mapStylesForWeb}
                                            lat={this.state.lat}
                                            lang={this.state.lang}
                                            initialCenter={{ lat: parseFloat(this.state.lat), lng: parseFloat(this.state.lang) }}
                                            zoom={this.state.zoom}
                                            onMarkerClick={this.onMarkerClick}
                                            activeMarker={this.state.activeMarker}
                                            selectedPlace={this.state.selectedPlace}
                                            selectedMarker={selectedMarker}
                                            showingInfoWindow={this.state.showingInfoWindow}
                                        >
                                            {/* <InfoWindow
                                               
                                                visible={this.props.showingInfoWindow}>
                                                <div>
                                                    <div className="storeLocator-infoWindow">
                                                        <h4 style={{ color: 'black' }}>Pune</h4>
                                                        Pune
                                                    </div>
                                                </div>
                                            </InfoWindow>
                                            <Marker position={{ lat: this.state.lat, lng: this.state.lang }}
                                            onClick={this.onMarkerClick}
                                             icon={{ url:  '/images/map-marker.png'}}></Marker>
                                             /> */}
                                        </Map>)}
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
                    <div style={{ marginLeft: '1%', marginRight: '1%' }} className={(this.state.divMobileOfContainerTop ? 'divOfMobileContainerNone':'divOfMobileContainerBlock')}>
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

                                        <li key={index} onClick={() => this.renderMarker(item.lattitude, item.longitude)}  className=" pickup-store-list-entry pre-selected storelist-li">
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
                            <div style={{ display: 'block', paddingBottom: '2%' }}>
                                <ul className="pagenation" style={{ display: 'flex' }}>
                                    {this.state.startValue !== 0 ?
                                        <li class="PagenationLeftArrow" onClick={this.prevButton} style={{ opacity: '1' }}></li> : <li></li>}
                                    <div className="position">
                                        {this.state.startValue === 0 ?
                                            <><span className="js-pickup-store-pager-item-from">{this.state.startValue + 1}</span>-<span class="js-pickup-store-pager-item-to">{this.state.endValue + 1}from&nbsp;<span class="js-pickup-store-pager-item-all">{totalStore} &nbsp;stores found</span></span></> :
                                            <><span className="js-pickup-store-pager-item-from">{this.state.startValue + 1}</span>-<span class="js-pickup-store-pager-item-to">{this.state.endValue + 1}</span> from&nbsp;<span class="js-pickup-store-pager-item-all">{totalStore}</span> &nbsp;stores found</>}</div>
                                    {this.state.endValue < totalStore ? <li class="PagenationRightArrow" onClick={this.nextButton} style={{ opacity: '1' }}></li> : <li></li>}
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className={(this.state.divMobileOfContainer ? 'divOfMobileContainerBlock' : 'divOfMobileContainerNone') +" col col-md-8 col-xs-8 "} >
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
                                {this.state.lang && this.state.lat && (<Map
                                            google={this.props.google}
                                            zoom={8}
                                            style={mapStylesForMobile}
                                            lat={this.state.lat}
                                            lang={this.state.lang}
                                            initialCenter={{ lat: parseFloat(this.state.lat), lng: parseFloat(this.state.lang) }}
                                            zoom={this.state.zoom}
                                            onMarkerClick={this.onMarkerClick}
                                            activeMarker={this.state.activeMarker}
                                            selectedPlace={this.state.selectedPlace}
                                            selectedMarker={selectedMarker}
                                            showingInfoWindow={this.state.showingInfoWindow}
                                        />)}
                                </TabPanel>
                                <TabPanel style={{ marging: '5%' }}>
                                    <h2>Opening Hours</h2>
                                </TabPanel>
                            </div>
                        </Tabs>
                
                        <div style={{ marginTop: '5%', marginBottom: '5%', display: 'flex' }}>

                            <div className="button-backto-store">
                                <button onClick={this.onClickOnBackToStore} className="addChildrenRegisterButton"><span>Back to store list</span></button>
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

// // export default connect(
// //     mapStateToProps,
// //     mapDispatchToProps
// // )(
// //     GoogleApiWrapper({
// //         apiKey: 'AIzaSyA5EqRGJ-YR-2ZCGxThhtFZKwNBy6wk73c'
// //     })(ClickAndCollect)
// // )
// const WrappedContainer = GoogleApiWrapper(
//     (props) => ({
//         apiKey: 'AIzaSyBiD-Nrxm9gwPzYuFW_pQDokcaVgiNwwoQ',
//         language: props.language
//     })
// )(ClickAndCollect);


export default connect(mapStateToProps, mapDispatchToProps)(ClickAndCollect);