import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/index';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import $ from 'jquery';

class ProductImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			guestUser: false,
			displayThumbnails: false,
			indexThumbImg: 0,
			mediaVideoUrl: '',
			displayVideo: false
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

	componentDidMount() {}

	componentDidUpdate(prevProps, prevState, snapshot) {

		if (prevProps.productDetails.selectedColor !== this.props.productDetails.selectedColor) {
			this.changeColor(this.props.productDetails.selectedColor);
		}
		if (prevProps.productWishDetail.wishlist_itemid !== this.props.productWishDetail.wishlist_itemid) {
		}
	}


	changeColor = color => {
		var nodeno = 0;
		$("a[name='zoom-images-lg']").each(function () {
			var colorid = `${color}_0`;
			if ($(this).attr('color-id') === colorid) {
				if (window.MagicZoom) {
					window.MagicZoom.switchTo('zoom-v', nodeno);
				}
			}
			nodeno++;
		});
	}

	_getImageDataColor = (data, color, index) => {
		if (Object.keys(data).length === 0 && data.constructor === Object) {
			return;
		}
		if (data) {
			let thumbnails, zoomimages;
			if (data.thumbnail) {
				thumbnails = data.thumbnail;
			}
			if (data.zoomimage) {
				zoomimages = data.zoomimage;
			}
			if (data.thumbnail.length > 1) {
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
		}
	};

	_getImageData = data => {
		if (data) {
			let thumbnails, zoomimages;

			if (data.thumbnail) {
				thumbnails = data.thumbnail;
			}
			if (data.zoomimage) {
				zoomimages = data.zoomimage;
			}
			if (data.thumbnail.length > 1) {
				return (
					<a className="MagicZoom" id="zoom-v" data-options="hint:false; zoomMode: off; expand: off;">
						<img className="zoom-img-width" src={thumbnails[0]} alt="" />
					</a>
				);
			} else {
				return (
					<a className="MagicZoom" id="zoom-v" data-options="hint:false; zoomMode: off; expand: off;">
						<img className="zoom-img-width" src={zoomimages[0]} alt="" />
					</a>
				);
			}
		}
	};



	_getVideoData = data => {
		
		if ((data) && (data.length > 0)) {
			
			return (
				<video controls autoplay="autoplay" loop muted preload style={{ width: '100%' }}>
					<source src={data[0]} type="video/mp4" />
				</video>
			);

			// return data.map((item, index) => {
			// 	console.log(item);
			// 	return (<>
			// 		<div data-slide-id={`video-${index}`} class="zoom-gallery-slide video-slide" id={`video-active-${index}`}>
			// 			<video controls autoplay="autoplay" loop muted preload style={{ width: '50%' }}>
			// 				<source src={item} type="video/mp4" />
			// 			</video>
			// 		</div>
			// 	</>)
			// })
		}
	}


	_checkSingleImage = (imageUrl, color, index) => {

	}

	_checkDataExist = (data) => {
		if (data) {
			if ((data.thumbnail) && (data.thumbnail.length > 1)) {				// if (data) {
				const asdf = data.thumbnail.map((item, index) => this._renderData(item, index));				// 	const asdf = data.map((item, index) => this._renderData(item, index,color));
				return asdf;
			} else if((data.thumbnail) && (data.thumbnail.length === 1)){
				return (<a data-slide-id="zoom" data-image={data.thumbnail[0]} name="zoom-images-lg">
					<img className="productDetailPopupImage" style={{ filter: this.state.indexThumbImg === 0 ?'brightness(60%)' : ''}} srcSet={data.thumbnail[0]} src={data.thumbnail[0]} alt="" />
				</a> )
			}
		}
	};

	_renderData = (item,index) => {
		let color = 'img';
		if(item){
			return (
				<a data-slide-id="zoom" style={{background:'transparent'}} data-zoom-id="zoom-v" data-image={item} color-id={`${color}_${index}`} name="zoom-images-lg" onClick={(e) => this._handleThumbImgClick(item, index)}>
					<img className="productDetailPopupImage" style={{ filter: this.state.indexThumbImg === index ?'brightness(60%)' : '' }} srcSet={item} src={item} alt="" />
				</a>
			);
		}
	};

	_checkVideoDataExist = data => {
		if (data) {
			//data[0] = "https://nayomi-videos.s3.ap-south-1.amazonaws.com/nayomi_videos/nay-win19-glamour-nightwear-mainranges-amina-babydoll-213455668.mp4";
			const videos = data.map(this._renderVideoData);
			return videos;
		}
	};

	_renderVideoData = (item, index) => {
		let thumbnails;
		if (this.props.productZoomDetails.imageUrl.thumbnail) {
			thumbnails = this.props.productZoomDetails.imageUrl.thumbnail;
		}
		return (
			<a data-slide-id={`video-${index}`} href="javascript:void(0);" data-load={thumbnails[0]} data-poster={thumbnails[0]}
				onClick={(e) => this._handleThumbImgClick(e,'vid',index)}
				onTouchStart={(e) => this._handleThumbImgClick(e,'vid',index)}
				style={{display: 'block'}}
			>
				<img src={thumbnails[0]} alt="" />
				<span className="fa fa-play-circle padding-video-play  mcs-caption">&nbsp;</span>
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
					wishlist_id: this.props.productZoomDetails.wishlist_itemid
				})
			}
		} else {
			document.getElementById('Capa_1').setAttribute('class', 'naylove-icon active');
			const data = {
				customer_id: this.props.customerDetails.customer_id,
				product_id: this.props.productZoomDetails.id,
			};
			this.props.onAddToWishList(data);

		}
	};

	_handleThumbImgClick = (img, index) => {
		// e.preventDefault();
		// if (thumbType === 'img') {
		// 	window.jQuery('.zoom-gallery .zoom-gallery-slide').addClass('active');
		// 	window.jQuery('.zoom-gallery .video-slide').removeClass('active');
		// } else {
		// 	window.jQuery('.zoom-gallery .zoom-gallery-slide').removeClass('active');
		// 	window.jQuery('.zoom-gallery .video-slide').addClass('active');
		// }

		if(!img.includes('.mp4')){
			this.setState({
				displayThumbnails : true,
				thumbnailImage: img,
				indexThumbImg: index,
				displayVideo : false,
			})
		}else{
			this.setState({
				displayVideo : true,
				displayThumbnails : false,
				mediaVideoUrl: img,
				indexThumbImg: index
			})
		}
		
	}

	_getDisplayThumbnails = () =>{
		return (
			<span className="MagicZoom" id="zoom-v" data-options="hint:false; zoomMode: off; expand: off;">
				<img className="zoom-img-width" src={this.state.thumbnailImage} alt="" />
			</span>
		);
	}


	_getUnique = (arr, comp) => {
		const unique = arr
			.map(e => e[comp])
			.map((e, i, final) => final.indexOf(e) === i && i)
			.filter(e => arr[e])
			.map(e => arr[e]);
		return unique;
	};


	render() {
		const { isActive, globals, productZoomDetails } = this.props;
		if (this.state.guestUser) {
			return <Redirect to={`/${globals.store_locale}/add-wishlist?item=${productZoomDetails.id}`} />
		}
		let newImageArray = [];
		if (productZoomDetails.simpleproducts) {
			let arr = [];
			let imageArray = [];
			Object.keys(productZoomDetails.simpleproducts).map((item, index) => {
				let img = {
					text: productZoomDetails.simpleproducts[item].color.text,
					image: productZoomDetails.simpleproducts[item].simple_image,
					video: productZoomDetails.simpleproducts[item].simple_video
				}
				imageArray.push(img);
			});
			newImageArray = this._getUnique(imageArray, 'text');
		}
		let image_array = {
		};

		if (newImageArray.length === 0) {
			if (this.props.productZoomDetails.imageUrl)
				image_array['default'] = this.props.productZoomDetails.imageUrl;
		}
		for (let i = 0; i < newImageArray.length; i++) {
			image_array[newImageArray[i].text] = newImageArray[i].image;
		}
		return (
			<div className="zoom-gallery">
				<Helmet>
					<script src="/global/css/magiczoomplus/magiczoomplus.js"></script>
					<script src="/global/css/magicscroll/magicscroll.js"></script>
				</Helmet>

				<table style={{ margin: '0 auto' }}>
					<tbody>
						<tr>
							<td style={{ width: '30%' }}>
								<div data-slide-id="zoom" className="zoom-gallery-slide active">
									{/* {image_array && Object.keys(image_array).map((color, index) => {

									}) */}
									{/* } */}
									{ !this.state.displayThumbnails && !this.state.displayVideo ? this._getImageData(productZoomDetails.imageUrl)
										: !this.state.displayVideo ? this._getDisplayThumbnails() : ''
									}
									{ this.state.displayVideo && this._getVideoData(productZoomDetails.mediaVideoUrl)
									}
								</div>
								{
									(productZoomDetails.mediaVideoUrl && productZoomDetails.mediaVideoUrl.length > 0) ?
										<div data-slide-id="video-1" class="zoom-gallery-slide video-slide">
											{ this._getVideoData(productZoomDetails.mediaVideoUrl)}
										</div>
										: ''
								}
							</td>
						</tr>
					</tbody>
				</table>
				<div className="mobilePopupImagePadding" style={{textAlign:'center', textAlign: '-webkit-center'}}>
					<div
						className="MagicScroll MagicScroll-arrows-inside height-video-size"
						data-options="items: 4; orientation: horizontal; loop: off; arrows: inside; draggable: true;"
						data-mode="scroll"
						id="MagicScroll-1479315243536"
						style={{
							visibility: 'visible',
							display: 'inline-block',
							width: '100%',
		                    
							overflow: 'visible',
						}}
					>
						{this._checkDataExist(this.props.productZoomDetails.imageUrl)}
						{this._checkVideoDataExist(this.props.productZoomDetails.mediaVideoUrl)}
					</div>
				</div>
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
)(ProductImage);
