import React, { Component } from 'react';

import Unsplash,  { toJson }  from 'unsplash-js';
import $ from 'jquery';

import './index.css';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';
import image5 from './images/image5.jpg';


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

            if(json.links){
                $('body').css('background-image', 'url(' + json.links.download + ')');
                
                 this.setState({
                     author: json.user.name,
                     name: json.description,
                     url: json.links.html});
            }
            else {
                var imageArr = [ image1, image2, image3, image4, image5 ];
                var randomIndex = Math.floor(Math.random() * 4); 
                $('body').css('background-image', 'url(\'' + imageArr[randomIndex] +'\')' );
            }
            $('body').css('background-size', 'cover');
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