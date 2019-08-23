// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import parse from 'html-react-parser';
// import * as actions from '../../redux/actions/index';

// class Offers extends Component {

//     componentDidMount() {
//         this.props.getCMSPage({
// 			identifier:'discover-more',
// 			store_id: this.props.globals.currentStore
// 		})
//     }

//     render() {
//         return(
//             <div className="t-Body-contentInner">
//                 <div className="container">
//                     <div className="row">
//                         <div class="col col-12 apex-col-auto">
//                             {this.props.globals.discover_more.content && (
//                                 parse(this.props.globals.discover_more.content)
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>            
//         )
//     } 

// }

// const mapStateToProps = state => {
//     return {
//         globals: state.global
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         getCMSPage: payload => dispatch(actions.getCMSPage(payload))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Offers);