import React, { Component } from 'react';

class InstagramItems extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const InstaItemList = this.props.instagramItems;
        let InstaItem = InstaItemList.map((item, index) => {
            return (
                <div className="swiper-slide" data-index={index} key={index}>
                    <figure key={index}>
                        <a href={item.a_link} target="_blank"><img src={item.image} /></a>
                    </figure>
                </div>
            )
        });


        return (<>
            {InstaItem}
        </>);
    }
}
export default InstagramItems;