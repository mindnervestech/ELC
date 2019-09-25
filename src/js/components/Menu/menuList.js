import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { injectIntl, intlShape } from 'react-intl';
import Bimg from '../../../assets/images/menu/bra-sar-en.jpg';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
class menuList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			store_locale: props.store_locale,
			countList: 0
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.store_locale !== prevState.store_locale) {
			return { store_locale: nextProps.store_locale };
		}
		else return null;
	}

	_renderSubMenuItem = (item, index) => {
		const category = item.url_path.split('/');
		// let menu_item = 'menu.' + item.name.toUpperCase();
		return (
			<li key={index}>
				<Link to={'/' + this.state.store_locale + '/products/' + item.url_path} onClick={() => document.getElementById("closeNav").click()}>
					{item.name}
				</Link>
			</li>)
	};

	_renderSubMenuList = (data, item_name, item_url_keys) => {
		var styleCat = data.filter(function (hero) {
			return hero.custom_category_attribute === 'style';
		});

		var collectionCat = data.filter(function (hero) {
			return hero.custom_category_attribute === 'collection';
		});

		item_name = item_name.toLowerCase();
		this.state.countList = 0;
		var id = 1;
		var data1 = [];
		var data2 = [];
		var data3 = [];
		var data4 = [];
		var data5 = [];
		var data6 = [];
		var i = 0;
		data.map((item) => {
			if (i < 5)
				data1.push(item);
			if (i > 4 && i < 10)
				data2.push(item);
			if (i > 9 && i < 15)
				data3.push(item);
			if (i > 15 && i < 20)
				data4.push(item);
			if (i > 19 && i < 25)
				data5.push(item);
			if (i > 24 && i < 30)
				data6.push(item);
			i++;

		})

		return (

			<>
			{data1.length > 0 &&
				<ul className="subLink" style={{textAlign: 'start'}}>
					{data1.map(this._renderSubMenuItem)}
				</ul>
			}
			{data2.length > 0 &&
				<ul className="subLink" style={{textAlign: 'start'}}>
					{data2.map(this._renderSubMenuItem)}
				</ul>
			}
			{data3.length > 0 &&
				<ul className="subLink" style={{textAlign: 'start'}}>
					{data3.map(this._renderSubMenuItem)}
				</ul>
			}
			{data4.length > 0 &&
				<ul className="subLink" style={{textAlign: 'start'}}>
					{data4.map(this._renderSubMenuItem)}
				</ul>
			}
			{data5.length > 0 &&
				<ul className="subLink" style={{textAlign: 'start'}}>
					{data5.map(this._renderSubMenuItem)}
				</ul>
			}
			{data6.length > 0 &&
				<ul className="subLink" style={{textAlign: 'start'}}>
					{data6.map(this._renderSubMenuItem)}
				</ul>
			}
			</>
		);
	};
	count(e) {
		this.state.countList++;
	}

	_checkSubMenu = item => {
		if (item.hasOwnProperty('children')) {
			// Use item.url_key instead of item.name (contains Arabic Text if locale is Arabic)			
			// let menu_item = 'menu.' + item.name.toUpperCase() + '.SHOW_ALL_' + item.name.toUpperCase();
			let menu_item = 'menu.' + item.url_key.toLowerCase() + '.SHOW_ALL_' + item.url_key.toLowerCase();
			let default_message = 'SHOW ALL ' + item.url_key.toLowerCase();

			return (
				<div className="submenu" style={item.children[0].length > 0 ? {backgroundColor: '#fff', textAlign: 'center'} : {display: 'none'}}>
					{
						item.children.map(
							(x) => this._renderSubMenuList(x, item.name, item.url_path)
						)
					}
					{/* <div className="menufigure">
						<div className="wrap">
							<div className="swiper-container sub-menu-slider">
								<div className="swiper-wrapper">
									<div>
										<Link to={'/' + this.state.store_locale + '/products/' + item.url_key}>
											<img style={{ width: '100%' }} src={(item.image ? item.image : Bimg)} />
										</Link>
									</div>
								</div>
								<span className="swiper-notification" aria-live="assertive" aria-atomic="false" />
							</div>
						</div>
					</div> */}
				</div>
			);
		} else {
		}
	};

	_renderMenuList = (item, index) => {
		let menu_item = 'menu.' + item.name.toLowerCase();

		return (
			<>
				<li key={index} className="borderForMobileManu">
					<Link to={'/' + this.state.store_locale + '/products/' + item.url_path} style={{ textDecoration: 'none' ,padding: "15px 10px"}} onClick={() => document.getElementById("closeNav").click()} className={item.children[0].length > 0 ? '' : "removeWhite"}>
						{item.name}
						{item.children[0].length > 0 ?
							<i className="fa fa-caret-down downMenu divShowOnWeb" aria-hidden="true"></i>
						: <span  />}
					</Link>
					{item.children[0].length > 0 ?<i className="subMenuTrigger" /> : <span />}
					{this._checkSubMenu(item)}
				</li>
			</>
		);
	};
	_renderMenuNavigation = (item, index) => {
		const { navData } = this.props;
		return navData[item].map(this._renderMenuList);
	};

	closeHBMenu = () => {
		document.querySelector("html").classList.remove("menuOpen");
	}

	render() {
		const { navData } = this.props;
     
		return <ul className="link">
		<div className="divShowOnMobile">
		<Spinner loading={this.props.spinnerProduct}></Spinner>
		</div>
			{/* <li>
				<Link to={`/${this.state.store_locale}/offers`} onClick={this.closeHBMenu}>
					<span>
						<strong><FormattedMessage id="header.Offers" defaultMessage="Offers" /></strong>
					</span>
				</Link>
				<i className=""></i>
			</li> */}
			{Object.keys(navData).map(this._renderMenuNavigation)}

		</ul>;
	}
}

const mapStateToProps=state=>
{
	return{
		spinnerProduct: state.spinner.loadingProduct,
	}
}

export default connect(mapStateToProps)(menuList);
