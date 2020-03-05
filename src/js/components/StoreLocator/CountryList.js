import React, { Component } from 'react';

class CountryList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    __renderCountryList = (item, index) => {
        let isSelect = item.country_id === this.props.selectedCountry ? true : false;
        //console.log(item.country_id, this.props.selectedCountry);
        return (
            <option key={item.id} value={item.country_id} selected={isSelect}>{item.country}</option>
        )
    }

    getUnique = (arr, comp) => {
        const unique = arr
            .map(e => e[comp])
            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)
            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);
        return unique;
    }

    render() {
        const { locations } = this.props;
        const filteredDups = this.getUnique(locations, 'country_id')
        //console.log("om sai ram", locations);
        let obj={
            border:'none !important'
        }
        console.log("bfhf",this.props.isComeFrom)
        return (
            <select   id="P12_COUNTRY" name="P12_COUNTRY" className={(this.props.hasOwnProperty('ComeFrom') ? 'bordernone':'')+'bordernone selectlist apex-item-select js-ignoreChange'} size={1} onChange={(e) => this.props.handleCountryChange(e)} >
                {filteredDups.map(this.__renderCountryList)}
            </select>
        )
    }
}

export default CountryList;