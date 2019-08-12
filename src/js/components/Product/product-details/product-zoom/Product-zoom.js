import React, { Component } from 'react';
import glam from '../../../../../assets/images/product-details/nay-sp19-glam-table-bra.jpg';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/index';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import $ from 'jquery';


let productZoomDetails = 
			  {
				"category_id": "32,42",
				"category_names": "Nightwear-Casual Nightwear",
				"id": "243",
				"sku": "212709505",
				"name": "3-piece Pajama Set",
				"imageUrl": {
				  "primaryimage": [
					"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg"
				  ],
				  "thumbnail": [
					"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg",
					"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1528.jpg",
					"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1498.jpg",
					"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1506.jpg"
				  ],
				  "zoomimage": [
					"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg",
					"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1528.jpg",
					"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1498.jpg",
					"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1506.jpg"
				  ]
				},
				"mediaVideoUrl": [
				  "https://storage.googleapis.com/nay/videos/product/au19/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505.mp4"
				],
				"you_save": "",
				"you_save_value": "",
				"percentage": "",
				"simplestatus": 0,
				"simpleqty": 0,
				"simplesize": "",
				"simplecolor": "",
				"type": "configurable",
				"created_at": "2019-08-02 12:48:08",
				"updated_at": "2019-08-05 16:14:16",
				"description": "Treat yourself with our latest casual nightwear collections. This pretty 3-piece pajama set features beautiful embroidery and dramatic lace details on the back of the featured short robe.",
				"short_description": "3-piece Pajama Set",
				"short_description_en": "3-piece Pajama Set",
				"category_desc": "Nightwear",
				"collection_desc": "Lorna",
				"style_desc": "Pajama Set",
				"exclude_international": "No",
				"currency": "AED",
				"price": 309,
				"special_price": "",
				"meta_title": "Buy  3-piece Pajama Set Online at Nayomi UAE",
				"meta_keywords": "",
				"meta_description": "Shop For  Treat yourself with our latest casual nightwear collections. This pretty 3-piece pajama set features beautiful embroidery and dramatic lace details on the back of the featured short robe. Online at best price at Nayomi UAE",
				"is_in_wishlist": false,
				"wishlist_itemid": "",
				"simpleproducts": [
				  {
					"sku": "212709513",
					"store_level_stock": {
					  "status": 1,
					  "stock": "2",
					  "message": "Product quantity available"
					},
					"qty": "2",
					"simple_image": {
					  "primaryimage": [
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg"
					  ],
					  "thumbnail": [
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1528.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1498.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1506.jpg"
					  ],
					  "zoomimage": [
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1528.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1498.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1506.jpg"
					  ]
					},
					"simple_video": [
					  "https://storage.googleapis.com/nay/videos/product/au19/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505.mp4"
					],
					"color": {
					  "text": "Pink",
					  "originalName": "Pink",
					  "option_id": "93",
					  "option_value": "670",
					  "url": "http://d2jycf5zd5b1ta.cloudfront.net/pub/media/attribute/swatch/p/i/pink_1_.jpg"
					},
					"size": {
					  "text": "S",
					  "option_id": "145",
					  "option_value": "509"
					},
					"stockstatus": 1
				  },
				  {
					"sku": "212709521",
					"store_level_stock": {
					  "status": 1,
					  "stock": "4",
					  "message": "Product quantity available"
					},
					"qty": "4",
					"simple_image": {
					  "primaryimage": [
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg"
					  ],
					  "thumbnail": [
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1528.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1498.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1506.jpg"
					  ],
					  "zoomimage": [
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1528.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1498.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1506.jpg"
					  ]
					},
					"simple_video": [
					  "https://storage.googleapis.com/nay/videos/product/au19/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505.mp4"
					],
					"color": {
					  "text": "Pink",
					  "originalName": "Pink",
					  "option_id": "93",
					  "option_value": "670",
					  "url": "http://d2jycf5zd5b1ta.cloudfront.net/pub/media/attribute/swatch/p/i/pink_1_.jpg"
					},
					"size": {
					  "text": "M",
					  "option_id": "145",
					  "option_value": "507"
					},
					"stockstatus": 1
				  },
				  {
					"sku": "212709530",
					"store_level_stock": {
					  "status": 1,
					  "stock": "4",
					  "message": "Product quantity available"
					},
					"qty": "4",
					"simple_image": {
					  "primaryimage": [
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg"
					  ],
					  "thumbnail": [
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1528.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1498.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1506.jpg"
					  ],
					  "zoomimage": [
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1528.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1498.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1506.jpg"
					  ]
					},
					"simple_video": [
					  "https://storage.googleapis.com/nay/videos/product/au19/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505.mp4"
					],
					"color": {
					  "text": "Pink",
					  "originalName": "Pink",
					  "option_id": "93",
					  "option_value": "670",
					  "url": "http://d2jycf5zd5b1ta.cloudfront.net/pub/media/attribute/swatch/p/i/pink_1_.jpg"
					},
					"size": {
					  "text": "L",
					  "option_id": "145",
					  "option_value": "505"
					},
					"stockstatus": 1
				  },
				  {
					"sku": "212709548",
					"store_level_stock": {
					  "status": 1,
					  "stock": "2",
					  "message": "Product quantity available"
					},
					"qty": "2",
					"simple_image": {
					  "primaryimage": [
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg"
					  ],
					  "thumbnail": [
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1528.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1498.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1506.jpg"
					  ],
					  "zoomimage": [
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1528.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1498.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1506.jpg"
					  ]
					},
					"simple_video": [
					  "https://storage.googleapis.com/nay/videos/product/au19/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505.mp4"
					],
					"color": {
					  "text": "Pink",
					  "originalName": "Pink",
					  "option_id": "93",
					  "option_value": "670",
					  "url": "http://d2jycf5zd5b1ta.cloudfront.net/pub/media/attribute/swatch/p/i/pink_1_.jpg"
					},
					"size": {
					  "text": "XL",
					  "option_id": "145",
					  "option_value": "511"
					},
					"stockstatus": 1
				  },
				  {
					"sku": "212709556",
					"store_level_stock": {
					  "status": 1,
					  "stock": "2",
					  "message": "Product quantity available"
					},
					"qty": "2",
					"simple_image": {
					  "primaryimage": [
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg"
					  ],
					  "thumbnail": [
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1528.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1498.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1506.jpg"
					  ],
					  "zoomimage": [
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1511.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1528.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1498.jpg",
						"http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505-1506.jpg"
					  ]
					},
					"simple_video": [
					  "https://storage.googleapis.com/nay/videos/product/au19/nay-au19-casual-nightwear-mainrange-lorna-3pcpajama-212709505.mp4"
					],
					"color": {
					  "text": "Pink",
					  "originalName": "Pink",
					  "option_id": "93",
					  "option_value": "670",
					  "url": "http://d2jycf5zd5b1ta.cloudfront.net/pub/media/attribute/swatch/p/i/pink_1_.jpg"
					},
					"size": {
					  "text": "XXL",
					  "option_id": "145",
					  "option_value": "513"
					},
					"stockstatus": 1
				  }
				],
				"similar_products": [
				  {
					"name": "Long Dress",
					"description": "Lorna",
					"currency": "AED",
					"price": 209,
					"productImageUrl": [
					  "http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-lorna-longdress-212709425-1442.jpg"
					],
					"buymore_savemore": {
					  "status": 0,
					  "message": "No Data found"
					},
					"url_key": "pink-long dress-212709425"
				  },
				  {
					"name": "Pajama Set",
					"description": "Bridgette",
					"currency": "AED",
					"price": 209,
					"productImageUrl": [
					  "http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-bridgetpajamaset-212951238-3847.jpg"
					],
					"buymore_savemore": {
					  "status": 0,
					  "message": "No Data found"
					},
					"url_key": "pink-pajama set-212951238"
				  },
				  {
					"name": "Long Dress",
					"description": "Bridgette",
					"currency": "AED",
					"price": 209,
					"productImageUrl": [
					  "http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-brigette-longdress-212951289-1354.jpg"
					],
					"buymore_savemore": {
					  "status": 0,
					  "message": "No Data found"
					},
					"url_key": "pink-long dress-212951289"
				  },
				  {
					"name": "3-piece Pajama Set",
					"description": "Bridgette",
					"currency": "AED",
					"price": 309,
					"productImageUrl": [
					  "http://d2jycf5zd5b1ta.cloudfront.net/pub/media/catalog/product/n/a/nay-au19-casual-nightwear-mainrange-brigette-3pcpajama-212951334-3401.jpg"
					],
					"buymore_savemore": {
					  "status": 0,
					  "message": "No Data found"
					},
					"url_key": "pink-3-piece pajama set-212951334"
				  }
				],
				"offers": {
				  "status": 0,
				  "message": "No Data found"
				}
			  }

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

			// <a href={data[1]} className="MagicZoom" id="Zoom-1">
			// 	<img src={data[0]} alt="" />
			// </a>

		}
	};

	_getImageData = data => {
		if (data) {
			// console.log('In Zoom Image',data);

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
		if ( (imageUrl) && (imageUrl.thumbnail) ) {
			// console.log('imageUrl',imageUrl);

			if (imageUrl.thumbnail.length >= 1) {
				return (
					this._checkDataExist(imageUrl, color, index)
				);

			}
		}
	}	

	_checkDataExist = (data, color, index) => {
		// console.log('data', data);
		if (data) {
			if ((data.thumbnail) && (data.thumbnail.length >= 1)) {
				const asdf = data.thumbnail.map((item, index) => this._renderData(item, index,color));
				return asdf;
			}
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

		if (productZoomDetails.imageUrl.thumbnail) {
			thumbnails = productZoomDetails.imageUrl.thumbnail;
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
				product_id: productZoomDetails.id,
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
		const { isActive, globals } = this.props;
		// console.log('In render productZoomDetails', productZoomDetails);
		console.log(this.props);
		
		  console.log(productZoomDetails);

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
					video:productZoomDetails.simpleproducts[item].simple_video
				}
				imageArray.push(img);
			});

			newImageArray = this._getUnique(imageArray, 'text');
		}

		let image_array = {
		};

		if(newImageArray.length == 0){
			if(productZoomDetails.imageUrl)
				image_array['default'] = productZoomDetails.imageUrl;
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
							{productZoomDetails.imageUrl && productZoomDetails.imageUrl.thumbnail.length > 1  && 
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
											image_array && Object.keys(image_array).map((color, index) => {
												return (this._checkSingleImage(image_array[color], color, index));
											})
										}

										{this._checkVideoDataExist(productZoomDetails.mediaVideoUrl)}

									</div>	
								</td>)
							}	
							
							<td style={{ width: '80%' }}>
								<div data-slide-id="zoom" className="zoom-gallery-slide active">
									<a>
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
									</a>

									{	image_array && Object.keys(image_array).map((color, index) => {

											if(color === this.props.productDetails.selectedColor) {
												// return (this._getImageDataColor(image_array[color], color, index));
											}
											if(color === 'default'){
												// return (this._getImageDataColor(image_array[color], color, index));
											}

										})
									}

									{this._getImageData(productZoomDetails.imageUrl)}

								</div>
                
                				{
									(productZoomDetails.mediaVideoUrl && productZoomDetails.mediaVideoUrl.length > 0) ?

									<div data-slide-id="video-1" class="zoom-gallery-slide video-slide">
											{this._getVideoData(productZoomDetails.mediaVideoUrl)}
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
