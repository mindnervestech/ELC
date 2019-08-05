import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class ProductFilter extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    
  render() { 
     const {productFilters} = this.props;
    return (
    <div id="R33789247439169829" style={{padding: '16px 0'}} className="t-BreadcrumbRegion containers h-hidden-mobile t-BreadcrumbRegion--showBreadcrumb t-BreadcrumbRegion--useBreadcrumbTitle">
        <div className="t-BreadcrumbRegion-body">
          <div className="t-BreadcrumbRegion-breadcrumb">
            <div className="filters" id="PROD-MENU">
              <ul>
                <li id="CLRALLFILTR">
                  <span id="fsbh-filters"><FormattedMessage id="Product.Listing.Filter" defaultMessage="Filter" /></span>
                  <ul className="clear" style={{cursor: 'pointer', display:"block"}} id="fsbh-clrall-div">
                    {!this.props.isEmpty && (<li>
                      <div className="chip" id="fsbh-clrall" onClick={this.props.clearFilter}><FormattedMessage id="ClearAll.Text" defaultMessage="Clear All" /></div>
                    </li>)}
                  </ul>
                </li>
                {
                  Object.keys(productFilters).map((item, index)=>{
                  return (
                <li id="PARENT-CAT">
                  <div className="dropdown">
                    <a className="dropbtn">{item}<i className="fa fa-chevron-down" /></a>
                    <div className="dropdown-content">
                      <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--checkbox ">
                        <div className="t-Form-inputContainer">
                          <div className="t-Form-itemWrapper">
                            <div id="main-CAT" className="checkbox_group apex-item-group apex-item-group--rc" role="group">
                              <div className="t-Form-fieldContainer rel-col margin-left-sm margin-right-sm">
                                <div className="t-Form-inputContainer col col-10">
                                  <div className="t-Form-itemWrapper">
                                    <fieldset id="CAT" className="checkbox_group apex-item-checkbox" style={{width: '300px'}}>
                                      {
                                        productFilters[item].map((item, index)=>{
                                        let id = item.code+"_"+item.value;

                                      return (  
                                        <div>
                                      <input type="checkbox" id= {id} onChange={(e)=>this.props.getFilteredData(e, item)} name="CAT" defaultValue={item.value}/>
                                        <label htmlFor={id}>{item.name}</label><br />
                                        </div>
                                      )
                                      })
                                      }
                                        
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
                  {this.props.filters[this.props.filterKey[item]] && (
                    <ul className="filter" id="PRDSEL-CAT">                
                        {this.props.filters[this.props.filterKey[item]].map((i, index) => {
                         return(<li>
                            <div className="chip">
                              {productFilters[item].map((itemdata, index)=>{
                                if(i === itemdata.value.toString()){
                                  return (
                                    <div>
                                    {itemdata.name}
                                    <i className="close fa fa-times" aria-hidden="true"  onClick={(e)=>document.getElementById(`${itemdata.code}_${itemdata.value}`).click()}/>
                                    </div>
                                  )
                                }
                              })}
                            </div>
                          </li>)
                        })}
                    </ul>
                  )}
                </li>
                  )
                })}
              </ul>
              <ul id="sortFilterId" style={{float: 'right'}}>
                <li id="SORTPRICE">
                  <div className="dropdown">
                    <a className="dropbtn"><span id="fsbh-occ"><FormattedMessage id="Product.Listing.Sort" defaultMessage="Sort" /></span> <i className="fa fa-chevron-down" /></a>
                    <div className="dropdown-content">
                      <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--checkbox ">
                        <div className="t-Form-inputContainer">
                          <div className="t-Form-itemWrapper">
                            <div className="radio_group apex-item-group apex-item-group--rc apex-item-radio" role="group">
                              <fieldset id="CLL" className="radio_group apex-item-radio" style={{width: '300px'}}>
                                <input type="radio" defaultChecked="checked" id="sortprice_1" onChange={() => this.props.getSortBy('relevance')} name="SORTPRICE" defaultValue="price:rel" />
                                <label htmlFor="sortprice_1"><FormattedMessage id="Product.Listing.Relevance" defaultMessage="Relevance" /></label><br />
                                <input type="radio" id="sortprice_2" onChange={() => this.props.getSortBy('price_desc')} name="SORTPRICE" defaultValue="price:desc" />
                                <label htmlFor="sortprice_2"><FormattedMessage id="Product.Listing.PriceHTL" defaultMessage="PriceHTL" /></label><br />
                                <input type="radio" id="sortprice_3" onChange={() => this.props.getSortBy('price_asc')} name="SORTPRICE" defaultValue="price:asc" />
                                <label htmlFor="sortprice_3"><FormattedMessage id="Product.Listing.PriceLTH" defaultMessage="PriceLTH" /></label>
                              </fieldset>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div id="PRD_PAGINATION" style={{float: 'left'}} />
            <input type="hidden" id="P2_CATEGORY" name="P2_CATEGORY" defaultValue={101} />
            <input type="hidden" id="P2_STYLE" name="P2_STYLE" defaultValue /><input type="hidden" id="P2_SUBCATEGORY" name="P2_SUBCATEGORY" defaultValue /><input type="hidden" id="P2_PAGE_TITLE" name="P2_PAGE_TITLE" defaultValue /><input type="hidden" id="P2_PAGE_DESC" name="P2_PAGE_DESC" defaultValue="Women's Bras - Shop for sexy bras online at best price in Saudi at Nayomi. Choose from a wide range of ladies bras such as push-up, lace, strapless, sports, non-padded, etc. ✓ Free Delivery* ✓ Click & Collect ✓ Cash on Delivery" /><input type="hidden" id="P2_PAGE_KEYWORDS" name="P2_PAGE_KEYWORDS" defaultValue="Bra, ladies bra, sexy bra, women bra, buy bra, bra online" />
          </div>
        </div>
        <div className="t-BreadcrumbRegion-buttons" />
      </div>
    );
  }
}

export default ProductFilter;
