import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { injectIntl, intlShape } from 'react-intl';
import Bimg from '../../../assets/images/menu/bra-sar-en.jpg';

class menuList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			store_locale: props.store_locale
		};
		//console.log('In MenuList', this.state);
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
				<Link to={'/' + this.state.store_locale + '/products/' + item.url_key} onClick={() => document.getElementById("closeNav").click()}>
					{item.name}
					{/* <FormattedMessage id={menu_item} defaultMessage={item.name} /> */}
				</Link>
			</li>
		);
	};

	_renderSubMenuList = (data, item_name, item_url_keys) => {
		//console.log('In _renderSubMenuList ', data, item_name, item_box);
		var styleCat = data.filter(function (hero) {
			return hero.custom_category_attribute === 'style';
		});

		var collectionCat = data.filter(function (hero) {
			return hero.custom_category_attribute === 'collection';
		});

		//console.log('this.item_name', item_name);
		item_name = item_name.toLowerCase();

		return (

			<>
				<ul className="subLink">
					{data.map(this._renderSubMenuItem)}
					{/* <li>
						<span className="PinkText"><FormattedMessage id="Menu.Style" defaultMessage="Style" /></span> 
					</li>
					{styleCat.map(this._renderSubMenuItem)}
				</ul>
				<ul className="subLink">
					<li>
					    <span className="PinkText"><FormattedMessage id="Menu.Collection" defaultMessage="Collection" /></span>
					</li>
					{collectionCat.map(this._renderSubMenuItem)} */}
				</ul>
			</>
		);
	};

	_checkSubMenu = item => {
		if (item.hasOwnProperty('children')) {

			// Use item.url_key instead of item.name (contains Arabic Text if locale is Arabic)			
			// let menu_item = 'menu.' + item.name.toUpperCase() + '.SHOW_ALL_' + item.name.toUpperCase();
			let menu_item = 'menu.' + item.url_key.toLowerCase() + '.SHOW_ALL_' + item.url_key.toLowerCase();
			let default_message = 'SHOW ALL ' + item.url_key.toLowerCase();

			return (
				<div className="submenu">
					<div className="all">
						<Link to={'/' + this.state.store_locale + '/products/' + item.url_path} onClick={() => document.getElementById("closeNav").click()}>
							{/* <FormattedMessage id={menu_item} defaultMessage={default_message} /> */}
							{/* <FormattedMessage id="menu.BRAS.SHOW_ALL_BRAS" defaultMessage="SHOW ALL Bras" /> */}
						</Link>
					</div>
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
		//console.log('sub item', item);
		let menu_item = 'menu.' + item.name.toLowerCase();

		return (
			<>
				<li key={index}>
					<Link to={'/' + this.state.store_locale + '/products/' + item.url_path} style={{ textDecoration: 'none' }} onClick={() => document.getElementById("closeNav").click()}>
						{item.name.toLowerCase()}
						<i class="fa fa-caret-down downMenu divShowOnWeb" aria-hidden="true" style={{position: 'absolute', top: 12}}></i>
					</Link>
					<i className="subMenuTrigger" />
					{this._checkSubMenu(item)}

				</li>
			</>
		);
	};
	_renderMenuNavigation = (item, index) => {
		//console.log('menu item', item);

		const { navData } = this.props;
		//console.log('navData item', navData[item]);
		return navData[item].map(this._renderMenuList);
	};

	closeHBMenu = () => {
		document.querySelector("html").classList.remove("menuOpen");
	}

	render() {
		const { navData } = this.props;
		//console.log("In Menulist Render", this.props);
		//console.log("navData", navData);

		return <ul className="link">
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


export default menuList;
