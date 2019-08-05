import React, { Component } from 'react';
import SearchBox from './SearchBox';
import SubMenu from './SubMenu';
import '../../../../styles/StaticPages.css';
import Axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';

class HelpCenter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchBoxValue: '',
			storeId: '',
			data: this.props.static_pages.help,
		};
	}

	onSearchBoxChange(event) {
		//console.log(event.target.value);
		this.setState({ searchBoxValue: event.target.value });
	}

	allIndexOf = (str, toSearch) => {
		var indices = [];
		for (var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
			indices.push(pos);
		}
		return indices;
	}

	handleKeyPress = (event) => {
		//console.log(event);

		if (event.key == 'Enter') {
			let searchString = this.props.static_pages.faq.content;
			const searchIndex = this.allIndexOf(searchString, this.state.searchBoxValue);



			if (searchIndex.length > 0) {
				let query = '?query=' + this.state.searchBoxValue;
				this.props.history.push({
					pathname: `/${this.props.globals.store_locale}/search-help`,
					search: query,
					data: 'faq',
				})
			} else if (searchIndex.length === 0) {
				let data = '?data=' + this.state.searchBoxValue;
				this.props.history.push({
					pathname: `/${this.props.globals.store_locale}/help-contact`,
					search: data,
					data: 'contact',
				})
			}
		}
	}



	componentDidMount(prevProps, prevState) {
		this.props.getHelpPageData();
		this.props.getFaqPageData();
		this.props.getSizeChart({
			store_id: this.props.globals.currentStore,
		});
	}

	componentDidUpdate(prevProps, prevState) {
		//console.log('componentDidUpdateCalled!!');
		let changedLang = localStorage.getItem('tempstoreid');
		if (this.state.storeId !== changedLang) {
			this.setState({ storeId: changedLang, data: [] }, () => {
				this.props.getHelpPageData();
			});
		}
	}

	render() {
		return (
			<div className="t-Body-contentInner">
				<div className="container">
					<SearchBox
						data={this.state.data}
						searchBoxValue={this.state.searchBoxValue}
						onSearchBoxChange={this.onSearchBoxChange.bind(this)}
						handleKeyPress={(event) => this.handleKeyPress(event)}
					/>
					<SubMenu storeLocale={this.props.globals.store_locale} />
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => {
	return {
		static_pages: state.static,
		globals: state.global,

	}
}

const mapDispatchToProps = dispatch => {
	return {

		getHelpPageData: () => dispatch(actions.getHelpPageData()),
		getFaqPageData: () => dispatch(actions.getFaqPageData()),
		getSizeChart: (payload) => dispatch(actions.getSizeChart(payload)),


	}

}

export default connect(mapStateToProps, mapDispatchToProps)(HelpCenter);
