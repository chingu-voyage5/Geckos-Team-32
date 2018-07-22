import React from "react";

class URLimage extends React.Component {
  state = {
    imageURL: "",
    requestFailed: false
  };

  constructURL = url =>
    `https://api.microlink.io/?url=${url}&screenshot&filter=screenshot`;

  componentDidMount() {
    fetch(this.constructURL(this.props.thisLink.url))
      .then(response => {
        if (!response.ok) {
          throw Error("No image for this link");
        }
        return response;
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          imageURL: response
        });
      })
      .catch(() => {
        this.setState({
          requestFailed: true
        });
      });
  }

  render() {
    if (this.state.requestFailed)
      return (
        <div className="link-noImage">
          <i className="far fa-image" />
          <p>No image</p>
        </div>
      );
    if (!this.state.imageURL) return <div className="loader" />;
    return (
      <img
        src={this.state.imageURL.data.screenshot.url}
        alt={this.props.thisLink.title}
        className="link-preview"
      />
    );
  }
}

export default URLimage;
