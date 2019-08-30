import React, { Component } from 'react';
import './Spinner.css';

class Spinner2 extends Component{
    constructor(props){
        super(props);
    }
    render(){
       //console.log('Spinner 2 : ',this.props)
        return(<>
        
        <div className="loader"></div>
        </>);
    }
}
  
export default Spinner2;