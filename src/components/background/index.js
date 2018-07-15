import React, { Component } from 'react';

import Unsplash, { toJson } from 'unsplash-js';
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
  constructor(props) {
    super(props);

    this.state = {
      author: '',
      name: '',
      url: ''
    };
    this.cameraHoverIn = this.cameraHoverIn.bind(this);
    this.cameraHoverOut = this.cameraHoverOut.bind(this);
  }

  componentDidMount() {
    unsplash.photos
      .getRandomPhoto({ query: 'nature' }) //just for experimenting
      .then(toJson)
      .then(json => {
        const imageToUse = json;

        if (json) {
          $('body').css('background-image', 'url(' + json.urls.regular + ')');
          this.setState({
            author: json.user.name,
            name: json.description,
            url: json.links.html
          });

          // trigger a download event
          unsplash.photos.downloadPhoto(imageToUse);
        } else {
          var imageArr = [image1, image2, image3, image4, image5];
          var randomIndex = Math.floor(Math.random() * 4);
          $('body').css(
            'background-image',
            "url('" + imageArr[randomIndex] + "')"
          );
        }
        $('body').css('background-size', 'cover');
        $('body').css('background-position', '50% 50%');
      })
      .catch(error => {
        console.log(
          'There was an error with the unsplash api request: ',
          error
        );
      });

    $('.camera').hover(this.cameraHoverIn, this.cameraHoverOut);
  }

  cameraHoverIn() {
    $('.credit').css('display', 'inline');
  }

  cameraHoverOut() {
    $('.credit').css('display', 'none');
  }

  render() {
    return (
      <div className="credit-block">
        <div className="credit">
          <a href={this.state.url}>
            <p> {this.state.name} </p>
            <p>{this.state.author} / Unsplash </p>
          </a>
        </div>
        <div className="camera">
          <FontAwesome name="camera" size="2x" />
        </div>
      </div>
    );
  }
}

export default Photos;
