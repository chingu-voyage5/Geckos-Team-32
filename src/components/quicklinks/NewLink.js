import React from "react";

class NewLink extends React.Component {
  titleRef = React.createRef();
  urlRef = React.createRef();

  createLink = event => {
    event.preventDefault();

    const link = {
      title: this.titleRef.current.value,
      url: this.urlRef.current.value,
      isUpdating: false
    };

    this.props.addLink(link);
    this.props.toggleAddForm();
  };

  render() {
    if (this.props.isAddingLink) {
      return (
        <div className="new-link">
          <form className="link-form" onSubmit={this.createLink}>
            <label htmlFor="input-title">Title</label>
            <input
              type="text"
              placeholder="name your link"
              id="input-title"
              required
              autoFocus
              ref={this.titleRef}
            />
            <label htmlFor="input-url">URL</label>
            <input
              type="url"
              id="input-url"
              placeholder="https://..."
              required
              ref={this.urlRef}
            />
            <div className="btns">
              <button className="btn-cancel" onClick={this.props.cancelAddForm}>
                Cancel
              </button>
              <button className="btn-add" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="new-link">
        <button className="new-link-btn" onClick={this.props.toggleAddForm} />
      </div>
    );
  }
}

export default NewLink;
