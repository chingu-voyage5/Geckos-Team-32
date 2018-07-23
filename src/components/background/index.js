import React, { Component } from 'react';

import Unsplash,  { toJson }  from 'unsplash-js';
import $ from 'jquery';
import FontAwesome from 'react-fontawesome';

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
        this.cameraHoverIn = this.cameraHoverIn.bind(this);
        this.cameraHoverOut = this.cameraHoverOut.bind(this);
     };

    componentDidMount(){
        unsplash.photos.getRandomPhoto({ featured: true })
        .then(res => {
            if(res.status === 403)
                return null;
            else
                return toJson(res);          
        })
        .then(json => {
            if(json && json.links){
                $('body').css('background-image', 'url(' + json.links.download + ')');
                
                 this.setState({
                     author: json.user.name,
                     name: json.description,
                     url: json.links.html});
            }
            else {
                this.setDefaultBackground();
            }
            $('body').css('background-size', 'cover');
        });   

        $('.camera').hover(this.cameraHoverIn, this.cameraHoverOut);
    };

    setDefaultBackground(){
        var imageArr = [ image1, image2, image3, image4, image5 ];
        var randomIndex = Math.floor(Math.random() * 4); 
        $('body').css('background-image', 'url(\'' + imageArr[randomIndex] +'\')' );
    };

    cameraHoverIn(){
        $('.credit').css('display', 'inline');
    };

    cameraHoverOut(){
        $('.credit').css('display', 'none');

    };

    render(){
        return (
            <div>
                <div className="credit">
                <a href={this.state.url}>
                    <p> {this.state.name} </p>
                    <p>{this.state.author} / Unsplash </p>
                </a>
                </div>
                <div className="camera">
                    <FontAwesome name='camera' size='2x'/>
                </div>
            </div>

        );
    }

}

export default Photos;