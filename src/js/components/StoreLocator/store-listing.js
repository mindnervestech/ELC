import React, { Component } from 'react';

class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: null
        }
        //console.log('location : ', this.props.locations);
    }

    newHandleClick = (item, index) => {
        this.setState({ activeIndex: index });
        this.props.getSelectedStore(item)
    }

    __renderLocations = (item, index) => {
        let newClassName = null;
        let bgcolor = null;
        let storeTitle = <> <span className="apnd-manual" id="as-4" />
            <span className="apnd-manual" id="as-4" />
            <h4>
                <span id="storetitle-4">{item.name}</span>
            </h4></>

        if (this.state.activeIndex === index) {
            newClassName = 'storeLocator-activeShop';
            storeTitle = <>  <h4>
                <span id={`storetitle-${item.id}`}>
                    <span className="storetitle"><img src="https://i1.lmsin.net/website_images/ae/icons/ic-loc-selected.svg" style={{ width: '19px' }} />&nbsp;&nbsp;</span>{item.name}</span>
            </h4></>
            bgcolor = 'ebebeb';
        }


        return (

            <li
                className={newClassName}
                id={"loc" + item.id}
                onClick={(el) => { this.newHandleClick(item, index) }}
                key={item.id}
                style={{ 'background': bgcolor }}>

                {storeTitle}

                <address>{item.address}</address>

                <div className="storeLocator-storeActions">
                    <a target="_blank" href={`https://www.google.com/maps?daddr=@${item.landmark}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 30" height="24px" style={{}}>
                            <path d="M21.3,1L1.2,9.3C1,9.4,0.9,9.6,0.9,9.9c0,0.3,0.2,0.5,0.4,0.5l9.1,2.3l2.3,9.1c0.1,0.2,0.3,0.4,0.5,0.4c0,0,0,0,0,0  c0.2,0,0.4-0.1,0.5-0.4l8.3-20.1c0.1-0.2,0-0.5-0.1-0.6C21.8,1,21.6,0.9,21.3,1z M13.4,19.8l-2-8.1l9-9L13.4,19.8z" />
                        </svg>{this.props.directionText}
                    </a>
                    <a target="_blank" href={`tel:${item.phone}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 30" height="20px" style={{}}>
                            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.5 17.311l-1.76-3.397-1.032.505c-1.12.543-3.4-3.91-2.305-4.497l1.042-.513-1.747-3.409-1.053.52c-3.601 1.877 2.117 12.991 5.8 11.308l1.055-.517z" />
                        </svg>{item.phone}
                    </a>
                </div>
            </li>


        )
    }

    render() {
        const locations = this.props.locations;
        return (
            locations.map(this.__renderLocations)
        )
    }
}

export default StoreList;