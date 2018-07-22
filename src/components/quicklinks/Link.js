import React from "react";
import URLimage from "./URLimage";

class Link extends React.Component {
  titleRef = React.createRef();
  urlRef = React.createRef();

  makeUpdate = event => {
    event.preventDefault();

    const link = {
      title: this.titleRef.current.value,
      url: this.urlRef.current.value,
      isUpdating: false
    };

    this.props.updateLink(this.props.linkKey, link);
  };

  render() {
    const { title, url, isUpdating } = this.props.thisLink;

    //check state
    if (isUpdating) {
      return (
        <div className="update-link">
          <form className="link-form" onSubmit={this.makeUpdate}>
            <label htmlFor="input-title">Title</label>
            <input
              type="text"
              id="input-title"
              defaultValue={title}
              ref={this.titleRef}
              required
              autoFocus
            />
            <label htmlFor="input-url">URL</label>
            <input
              type="url"
              id="input-url"
              defaultValue={url}
              ref={this.urlRef}
              required
            />
            <div className="btns">
              <button
                className="btn-cancel"
                onClick={e =>
                  this.props.cancelUpdateForm(e, this.props.linkKey)
                }
              >
                Cancel
              </button>
              <button className="btn-update" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      );
    }
    return (
      <div className="link">
        <button
          className="btn-edit"
          onClick={() => this.props.toggleUpdateForm(this.props.linkKey)}
        >
          <i className="fas fa-pencil-alt" />
        </button>
        <button
          className="btn-delete"
          onClick={() => this.props.deleteLink(this.props.linkKey)}
        >
          <i className="fas fa-times" />
        </button>
        <a href={url} className="link-wrapper">
          <div className="link-image">
            <URLimage thisLink={this.props.thisLink} />
          </div>
          <div className="link-title">{title}</div>
        </a>
      </div>
    );
  }
}

export default Link;
