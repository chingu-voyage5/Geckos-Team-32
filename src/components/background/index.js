import React, { Component } from 'react';

import Unsplash,  { toJson }  from 'unsplash-js';
import $ from 'jquery';

import './index.css';



const unsplash = new Unsplash({
    applicationId: process.env.REACT_APP_UNSPLASH_KEY
  });

class Photos extends Component {

     constructor(props){
         super(props);

         this.state = {
            author: '',
            name: '',
            url: ''
         };
     };

    componentDidMount(){
        unsplash.photos.getRandomPhoto({ featured: true })
        .then(toJson)
        .then(json => {
            console.log(json);
            $('body').css('background-image', 'url(' + json.links.download + ')');
            $('body').css('background-size', 'cover');
             this.setState({
                 author: json.user.name,
                 name: json.description,
                 url: json.links.html});
         });
    };

    render(){
        return (
            <div className="credit">
             <a href={this.state.url}>
                <p> {this.state.name} </p>
                <p>{this.state.author} / Unsplash </p>
            </a>
            </div>

        );
    }

}

export default Photos;