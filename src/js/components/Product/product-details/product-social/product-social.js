import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class ProductSocial extends Component{

	constructor(props) {
		super(props);
		this.state = {
		};
	}    

    componentDidMount() {
        // console.log('login mount ProductSocial');
        // console.log('ProductSocial props', this.props);

        window.fbAsyncInit = function() {
            window.FB.init({
                appId            : '387607345194877',
                // appId            : '1120675494763586',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v3.0'
              });
        }
    }    

    facebookShare = (e) => {
        e.preventDefault();

        let currentUrl = window.location.href;

        window.FB.ui({
            method: 'share',
            href: currentUrl
          }, function(response){});

        // window.FB.ui(
        //     {
        //     method: "feed",
        //     name: "Long Dress",
        //     link: "https://stage.nayomi.com/apex/f?p=106:3:0::NO:3:P3_PARENT:212679191",
        //     picture: "https://storage.googleapis.com/nay/images/product/lg/sp19/nay-sp19-glam-nw-marcella-longdress-212504307-0828.jpg?scale.width=400",
        //     caption: "Long Dress",
        //     description: "A beautifully designed casual floral printed long dress that looks elegant as well as offers superb comfort. This dress is enhanced by lace cups; frilled sleeves and dip hem for a much graceful appeal. A daring back detail offers a revealing silhouette.",
        //     message: ""
        // });


    }

    render() {
        return(
            <div className="social-media ">
                <Helmet>
                    <script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>
                </Helmet>
                <a id="share_button" href="" onClick={ (e) => this.facebookShare(e) }>
                    <i className="fab fa-facebook-square fa-lg" />
                </a>
                {/* <a id="share_button">
                    <i className="fab fa-facebook-square fa-lg" />
                </a> */}
                <a href="https://api.whatsapp.com/send?text=https%3A%2F%2Fwww%2Enayomi%2Ecom%2Fapex%2Ff%3Fp%3D2019%3A3%3A0%3A%3ANO%3A3%3AP3_PARENT%3A212395219%20Beautiful%20floral%20print%20over%20a%20soft%20pink%20background%20colour,%20makes%20this%20bra%20alluringly%20feminine.%20Lace%20on%20the%20balconette%20cups%20adds%20to%20its%20attractive%20appeal,%20while%20assuring%20perfect%20comfort." target="_blank"><i className="fab fa-whatsapp-square fa-lg" /></a>
            </div>
        );
    }
}
export default ProductSocial;