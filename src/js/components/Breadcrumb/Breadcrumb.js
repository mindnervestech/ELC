import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class Breadcrumb extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	_capitalize = s => {
		if (typeof s !== 'string') return '';
		return s.charAt(0).toUpperCase() + s.slice(1);
	};

	render() {
		const { name } = this.props;
		const mainCat = name.split('--');
		const data = Object.keys(mainCat)
			.filter(function (item) {
				return item > 0;
			})
			.map(function (item, index) {
				return mainCat[item];
			});
		const cat = data.join(' ').toString();
		const subCat = this._capitalize(cat);
		const showAlt = typeof this.props.translate !== 'undefined' ? this.props.translate : false;
			const translationDataId = (showAlt) ? this.props.translationDataId: '';
			const defaultMessage = (showAlt) ? this.props.defaultMessage : '';

		return (
			<div id="R33898647756650024"
				className="t-BreadcrumbRegion containers t-BreadcrumbRegion--showBreadcrumb t-BreadcrumbRegion--useBreadcrumbTitle"
			>
				<div className="t-BreadcrumbRegion-body">
					<div className="t-BreadcrumbRegion-breadcrumb breadcrumb-rtl">
						<ol itemScope="" itemType="http://schema.org/BreadcrumbList" className="t-Breadcrumb olStyle">
							<li
								itemProp="itemListElement"
								itemScope=""
								itemType="http://schema.org/ListItem"
								className="t-Breadcrumb-item"
							>
								<Link to={`/${this.props.globals.store_locale}`}>
									<a
										itemProp="item"
										className="t-Breadcrumb-label"
									>
										<span itemProp="name"><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></span>
									</a>
								</Link>
								<meta itemProp="position" content="1" />
							</li>
							

							{subCat ? (
								<li
									itemProp="itemListElement"
									itemScope=""
									itemType="http://schema.org/ListItem"
									className="t-Breadcrumb-item"
								>
									<Link to={`/${this.props.globals.store_locale}/products/` + this._capitalize(mainCat[0])}>
										<a itemProp="item" className="t-Breadcrumb-label ">
											<span itemProp="name">{this._capitalize(mainCat[0])}</span>
										</a>
									</Link>
									<meta itemProp="position" content="1" />
								</li>
							) : null}

							<li className="t-Breadcrumb-item is-active activeStyle">
							{ !showAlt &&

								<p className="t-Breadcrumb-label cbread " style={{fontSize: 15}}>{subCat ? subCat : mainCat[0]}</p>
							}{
								showAlt &&
								<p className="t-Breadcrumb-label cbread" style={{fontSize: 15}}><FormattedMessage id={translationDataId} defaultMessage={defaultMessage} /></p>
							}
							</li>
						</ol>
					</div>
				</div>
				<div className="t-BreadcrumbRegion-buttons" />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		globals: state.global
	};
}

export default connect(mapStateToProps)(Breadcrumb);
