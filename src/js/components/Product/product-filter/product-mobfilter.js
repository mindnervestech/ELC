import React, { Component } from 'react';

class ProductMobFilter extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	// openAndClose(id) {
	// 	if(document.getElementById(id).getAttribute('style')) {
	// 		if(document.getElementById(id).getAttribute('style') === "display:none")
	// 			document.getElementById(id).setAttribute('style','display:block');
	// 		else
	// 			document.getElementById(id).setAttribute('style','display:none');
	// 	} else {
	// 		document.getElementById(id).setAttribute('style','display:block')
	// 	}
	// }

	render() {
		const { productFilters } = this.props;
		return (
			<div className="t-Region-body">
				{/* {Object.keys(productFilters).map((item, index) => {
					return (
						<div className="set" id={`MOB-${item}-COL1`}>
							<a onClick={() => this.openAndClose(`MOB-${item}-COL`)}>
								{item}
								<i className="fa fa-plus" />
							</a>
							<div className="content" id={`MOB-${item}-COL`}>
								<div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--checkbox ">
									<div className="t-Form-inputContainer">
										<div className="t-Form-itemWrapper">
											<div
												id="mob-main-COL"
												className="checkbox_group apex-item-group apex-item-group--rc"
												role="group"
											>
												<div className="t-Form-fieldContainer rel-col margin-left-sm margin-right-sm">
													<div className="t-Form-inputContainer col col-10">
														<div className="t-Form-itemWrapper">
															<fieldset
																id="CAT"
																className="checkbox_group apex-item-checkbox"
																style={{ width: '300px' }}
															>
															
																{productFilters[item].map((item, index) => {
																	let id = item.code + '_' + index;

																	return (
																		<div>
																			{this.props.filters[item.code]? this.props.filters[item.code].indexOf(item.value) !== -1 ? 
																				<input
																				type="checkbox"
																				id={id}
																				onChange={e =>
																					this.props.getFilteredDataForMobile(e, item)
																				}
																				name="CAT"
																				checked="checked"
																				defaultValue={item.value}
																			/>:
																			<input
																				type="checkbox"
																				id={id}
																				onChange={e =>
																					this.props.getFilteredDataForMobile(e, item)
																				}
																				name="CAT"
																				defaultValue={item.value}
																			/>
																			:
																			<input
																				type="checkbox"
																				id={id}
																				onChange={e =>
																					this.props.getFilteredDataForMobile(e, item)
																				}
																				name="CAT"
																				defaultValue={item.value}
																			/>
																			}
																			<label htmlFor={id}>{item.name}</label>
																			<br />
																		</div>
																	);
																})}
															</fieldset>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})} */}
			</div>
		);
	}
}

export default ProductMobFilter;
