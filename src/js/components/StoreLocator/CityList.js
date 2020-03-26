import React, { Component } from 'react';

class CityList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        //console.log('city', props);
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
    __renderCity = (item, index) => {
        return (
            <option key={item.id} value={item.city}>{item.city}</option>
        );
    }


    render() {
        const { locations, selectedCountry } = this.props;
        var filtered = locations.filter(function (item) {
            return item.country_id == selectedCountry;
        });
        const filteredDups = this.getUnique(filtered, 'city')

        return (
            <select id="P12_CITY" name="P12_CITY" className="selectlist apex-item-select js-ignoreChange" size={1} onChange={(e) => this.props.handleCityChange(e)}>
                <option value={'NA'}>{this.props.selectCitytext}</option>
                {filteredDups.map(this.__renderCity)}
            </select>
        )
    }
}

export default CityList;