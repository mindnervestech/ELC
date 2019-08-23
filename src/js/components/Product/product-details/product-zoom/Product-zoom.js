import React, { Component } from 'react';
import glam from '../../../../../assets/images/product-details/nay-sp19-glam-table-bra.jpg';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/index';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import $ from 'jquery';

class ProductZoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			guestUser: false,
			displayThumbnails: true
		};
	}

	_loadJs = () => {
		const script = document.createElement('script');
		script.src = 'http://nayomijsuat.iksulalive.com/global/css/magiczoomplus/magiczoomplus.js';
		document.body.appendChild(script);

		const script2 = document.createElement('script');
		script2.src = 'http://nayomijsuat.iksulalive.com/global/css/magicscroll/magicscroll.js';
		document.body.appendChild(script2);
	};

	componentDidMount() {
		// this._loadJs();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

		if(prevProps.productDetails.selectedColor != this.props.productDetails.selectedColor){
			// console.log('selectedColor',this.props.productDetails.selectedColor);
			this.changeColor(this.props.productDetails.selectedColor);
		}

		if (prevProps.productWishDetail.wishlist_itemid != this.props.productWishDetail.wishlist_itemid) {
			if (this.props.productWishDetail.is_in_wishlist) {
				document.getElementById('Capa_1').setAttribute('class', 'naylove-icon active');
			} else {
				document.getElementById('Capa_1').setAttribute('class', 'naylove-icon');
			}
		}
	}


	changeColor = color => {
		var nodeno=0;
		$("a[name='zoom-images-lg']").each( function () {
			// $(this).removeClass('mz-thumb-selected');
			var colorid = `${color}_0`;

			if ($(this).attr('color-id') === colorid) {
				// return false;
				if(window.MagicZoom){
					// window.MagicZoom.switchTo('zoom-v', nodeno);
					// $(this).addClass('mz-thumb mz-thumb-selected');

					window.MagicZoom.switchTo('zoom-v',nodeno);
					// window.MagicZoom.switchTo(nodeno,'zoom-v');
				}
			}
			nodeno++;
		});
	}

	_getImageDataColor = (data, color, index) => {
		if(Object.keys(data).length === 0 && data.constructor === Object){
			return ;
		}

		if (data) {
			// console.log('In Zoom Image',data);

			let thumbnails, zoomimages;

			if (data) {
				thumbnails = data;
			}
			if (data) {
				zoomimages = data;
			}

			if (data.length > 1) {
				return (
					<a href={zoomimages[0]} className="MagicZoom" id="zoom-v">
						<img src={thumbnails[0]} alt="" />
					</a>
				);
			} else {
				return (
					<a href={zoomimages[0]} className="MagicZoom" id="zoom-v">
						<img src={zoomimages[0]} alt="" />
					</a>
				);
			}

			// <a href={data[1]} className="MagicZoom" id="Zoom-1">
			// 	<img src={data[0]} alt="" />
			// </a>

		}
	};

	_getImageData = data => {
		if (data) {
			// console.log('In Zoom Image',data);

			let thumbnails, zoomimages;

			if (data) {
				thumbnails = data;
			}
			if (data) {
				zoomimages = data;
			}

			if (data.length > 1) {
				return (
					<a href={zoomimages[0]} className="MagicZoom" id="zoom-v">
						<img style={{height:590, width: 590}} src={thumbnails[0]} alt="" />
					</a>
				);
			} else {
				return (
					<a href={zoomimages[0]} className="MagicZoom" id="zoom-v">
						<img style={{height:590, width: 590}} src={zoomimages[0]} alt="" />
					</a>
				);
			}

			// <a href={data[1]} className="MagicZoom" id="Zoom-1">
			// 	<img src={data[0]} alt="" />
			// </a>

		}
	};



	_getVideoData = data => {
		if ( (data) && (data.length > 0) ) {
			// console.log('videodata',data);
			// console.log('videodata',data[0]);

			return (
				  <video controls autoplay="autoplay" loop muted preload style={{width: '100%'}}>
					<source src={data[0]} type="video/mp4" />
				  </video>
			  );
		}
	}


	_checkSingleImage = (imageUrl, color, index) => {
		// console.log(imageUrl);	
		if ( (imageUrl) ) {
			// console.log('imageUrl',imageUrl);

			if (imageUrl) {
				return (
					this._checkDataExist(imageUrl, color, index)
				);

			}
		}
	}	

	_checkDataExist = (data, color, index) => {
		if (data) {
			// if (data) {
			// 	const asdf = data.map((item, index) => this._renderData(item, index,color));
			// 	return asdf;
			// }
			return (
				<a data-slide-id="zoom" data-zoom-id="zoom-v" href={data} data-image={data} color-id={`${color}_${index}`} name="zoom-images-lg" onClick={(e)=> this._handleThumbImgClick(e,'img')}>
					<img srcSet={data} src={data} alt="" />
				</a>
			);
		}
	};

	_renderData = (item, index, color) => {
		// console.log('item', item);
		return (
			<a data-slide-id="zoom" data-zoom-id="zoom-v" href={item} data-image={item} color-id={`${color}_${index}`} name="zoom-images-lg" onClick={(e)=> this._handleThumbImgClick(e,'img')}>
				<img srcSet={item} src={item} alt="" />
			</a>
		);
	};

	_checkVideoDataExist = data => {
		// console.log(' _checkVideoDataExist data', data);
		if (data) {
			const videos = data.map(this._renderVideoData);
			return videos;
		}
	};

	_renderVideoData = (item, index) => {
		// console.log('item _renderVideoData', item);
		// console.log('this.props.productZoomDetails.imageUrl.thumbnail', this.props.productZoomDetails.imageUrl.thumbnail);

		let thumbnails;

		if (this.props.productDataDetail.products_images) {
			thumbnails = this.props.productDataDetail.products_images;
		}

		return (
			<a data-slide-id="video-1" href="#" data-load={thumbnails[0]} data-poster={thumbnails[0]} onClick={ (e) => this._handleThumbImgClick(e,'vid') } >
				<img src={thumbnails[0]} alt="" />
				<span className="fa fa-play-circle">&nbsp;</span>
			</a>
		);
	};

	_handleClick = async () => {
		if (this.props.customerDetails.customer_id === undefined) {
			this.setState({ guestUser: true });
			return;
		} else {
			this.setState({ guestUser: false });
		}

		if (document.getElementById('Capa_1').getAttribute('class').includes('active')) {
			document.getElementById('Capa_1').setAttribute('class', 'naylove-icon');
			if (this.props.productWishDetail.wishlist_itemid) {
				this.props.onRemoveWishList({
					index: null,
					wishlist_id: this.props.productWishDetail.wishlist_itemid
				})
			}
		} else {
			document.getElementById('Capa_1').setAttribute('class', 'naylove-icon active');
			const data = {
				customer_id: this.props.customerDetails.customer_id,
				product_id: this.props.productDataDetail.id,
			};
			this.props.onAddToWishList(data);

		}
	};

	_handleThumbImgClick = (e,thumbType='img') => {

		e.preventDefault();

		if (thumbType === 'img') {
			window.jQuery('.zoom-gallery .zoom-gallery-slide').addClass('active');
			window.jQuery('.zoom-gallery .video-slide').removeClass('active');
		} else {
			window.jQuery('.zoom-gallery .zoom-gallery-slide').removeClass('active');
			window.jQuery('.zoom-gallery .video-slide').addClass('active');
		}
	}
  

	_getUnique = (arr, comp) => {
		const unique = arr
			.map(e => e[comp])
			// store the keys of the unique objects
			.map((e, i, final) => final.indexOf(e) === i && i)
			// eliminate the dead keys & store unique objects
			.filter(e => arr[e])
			.map(e => arr[e]);
		return unique;
	};


	render() {
		const { isActive, globals, productDataDetail } = this.props;
		// console.log('In render productZoomDetails', productZoomDetails);


		if (this.state.guestUser) {
			return <Redirect to={`/${globals.store_locale}/add-wishlist?item=${productDataDetail.id}`} />
		}

		let newImageArray = [];

		// if (productZoomDetails.simpleproducts) {
		// 	let arr = [];
		// 	let imageArray = [];
		// 	Object.keys(productZoomDetails.simpleproducts).map((item, index) => {
		// 		let img = {
		// 			text: productZoomDetails.simpleproducts[item].color.text,
		// 			image: productZoomDetails.simpleproducts[item].simple_image,
		// 			video:productZoomDetails.simpleproducts[item].simple_video
		// 		}
		// 		imageArray.push(img);
		// 	});

		// 	newImageArray = this._getUnique(imageArray, 'text');
		// }

		let image_array = {
		};

		if(newImageArray.length == 0){
			if(productDataDetail.imageUrl)
				image_array['default'] = productDataDetail.imageUrl;
		}

		for(let i=0;i<newImageArray.length; i++){
			image_array[newImageArray[i].text] = newImageArray[i].image;
		}
		
		// console.log("image_array------------", image_array);
		
		// console.log('this.props.productZoomDetails.imageUrl', this.props.productZoomDetails.imageUrl);

		return (
			<div className="zoom-gallery">
				<Helmet>
					<script src="/global/css/magiczoomplus/magiczoomplus.js"></script>
					<script src="/global/css/magicscroll/magicscroll.js"></script>
				</Helmet>

				<table style={{ margin: '0 auto' }}>
					<tbody>
						<tr>
							{/* <td className="zoom-gallery-thumbnails">
								<div
									className="MagicScroll MagicScroll-arrows-inside MagicScroll-vertical"
									data-options="items: 4; orientation: vertical; loop: off; arrows: inside; draggable: true;"
									data-mode="scroll"
									id="MagicScroll-1479315243536"
									style={{
										visibility: 'visible',
										display: 'inline-block',
										width: '56px',
										height: '420px',
										overflow: 'visible',
									}}
								>
									{this._checkDataExist(this.props.productZoomDetails.imageUrl)}
									{this._checkDataExist(this.props.productZoomDetails.mediaVideoUrl)}
								</div>
							</td> */}

							{/* this.checkSingleImage(this.props.productZoomDetails.imageUrl) */}
							{productDataDetail.imageUrl && productDataDetail.imageUrl && 
								( <td className="zoom-gallery-thumbnails">
									<div
										className="MagicScroll MagicScroll-arrows-inside MagicScroll-vertical"
										data-options="items: 4; orientation: vertical; loop: off; arrows: inside; draggable: true;"
										data-mode="scroll"
										id="MagicScroll-1479315243536"
										style={{
											visibility: 'visible',
											display: 'inline-block',
											width: '56px',
											height: '420px',
											overflow: 'visible',
										}}
									>
										{
											productDataDetail.products_images && Object.keys(productDataDetail.products_images).map((color, index) => {
												return (this._checkSingleImage(productDataDetail.products_images[color], color, index));
											})
										}

										{this._checkVideoDataExist(productDataDetail.mediaVideoUrl)}

									</div>	
								</td>)
							}	
							
							<td style={{ width: '80%' }}>
								<div data-slide-id="zoom" className="zoom-gallery-slide active">
									{/* <a>
										<button id="wishListId" type="button" className="naylove">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												xmlnsXlink="http://www.w3.org/1999/xlink"
												version="1.1"
												id="Capa_1"
												x="0px"
												y="0px"
												viewBox="0 0 50 50"
												style={{ enableBackground: 'new 0 0 50 50' }}
												xmlSpace="preserve"
												width="32px"
												height="32px"
												className={"naylove-icon " + (isActive ? 'active' : '')}
												onClick={this._handleClick}
											>
												<g transform="matrix(0.94148 0 0 0.94148 1.46299 1.46299)">
													<path
														d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543  c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503  c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z"
														className="naylove"
													/>
												</g>{' '}
											</svg>
										</button>
									</a> */}

									{	image_array && Object.keys(image_array).map((color, index) => {

											if(color === this.props.productDetails.selectedColor) {
												// return (this._getImageDataColor(image_array[color], color, index));
											}
											if(color === 'default'){
												// return (this._getImageDataColor(image_array[color], color, index));
											}

										})
									}
									
									{this._getImageData(productDataDetail.products_images)}

								</div>
                
                				{
									(productDataDetail.mediaVideoUrl && productDataDetail.mediaVideoUrl.length > 0) ?

									<div data-slide-id="video-1" class="zoom-gallery-slide video-slide">
											{this._getVideoData(productDataDetail.mediaVideoUrl)}
									</div>
									: ''
								}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		globals: state.global,
		productZoomDetails: state.productDetails.productData,
		customerDetails: state.login.customer_details,
		productWishDetail: state.productDetails.productWishDetail,
		productDetails: state.productDetails.productColor
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAddToWishList: payload => dispatch(actions.addToWishlist(payload)),
		onRemoveWishList: (payload) => dispatch(actions.removeWishList(payload))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductZoom);
