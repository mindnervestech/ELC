import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class Breadcrumb extends Component {
	constructor(props) {
		super(props);
		console.log('this.props',this.props);
		this.state = {};
	}

	_capitalize = s => {
		if (typeof s !== 'string') return '';
		return s.charAt(0).toUpperCase() + s.slice(1);
	};

	render() {
		const { name } = this.props;
		const mainCat = name.split('-');
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
			<div
				id="R33898647756650024"
				style={{ borderBottom: '1px solid #c1c1c1' }}
				className="t-BreadcrumbRegion containers t-BreadcrumbRegion--showBreadcrumb t-BreadcrumbRegion--useBreadcrumbTitle"
			>
				<div className="t-BreadcrumbRegion-body">
					<div className="t-BreadcrumbRegion-breadcrumb">
						<ol itemScope="" itemType="http://schema.org/BreadcrumbList" className="t-Breadcrumb ">
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
										<span itemProp="name"><FormattedMessage id="Cart.OnlineShopping.Title" defaultMessage="Online Shopping" /></span>
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
										<a itemProp="item" className="t-Breadcrumb-label">
											<span itemProp="name">{this._capitalize(mainCat[0])}</span>
										</a>
									</Link>
									<meta itemProp="position" content="1" />
								</li>
							) : null}

							<li className="t-Breadcrumb-item is-active">
							{ !showAlt &&

								<h1 className="t-Breadcrumb-label cbread">{subCat ? subCat : mainCat[0]}</h1>
							}{
								showAlt &&
								<h1 className="t-Breadcrumb-label cbread"><FormattedMessage id={translationDataId} defaultMessage={defaultMessage} /></h1>
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
