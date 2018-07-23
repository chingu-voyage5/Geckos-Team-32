import React from "react";
import "./links.css";
import Link from "./Link";
import NewLink from "./NewLink";

class Links extends React.Component {
  state = {
    links: {},
    isAddingLink: false
  };

  // handle add new link form
  toggleAddForm = () => {
    if (this.state.isAddingLink) {
      this.setState({ isAddingLink: false });
    } else {
      this.setState({ isAddingLink: true });
    }
  };
  cancelAddForm = event => {
    event.preventDefault();
    this.toggleAddForm();
  };

  // handle update link form
  toggleUpdateForm = linkKey => {
    const links = { ...this.state.links };
    links[linkKey].isUpdating = true;
    this.setState({ links });
  };
  cancelUpdateForm = (event, linkKey) => {
    event.preventDefault();
    const links = { ...this.state.links };
    links[linkKey].isUpdating = false;
    this.setState({ links });
  };
  updateLink = (key, link) => {
    const links = { ...this.state.links };
    links[key] = link;
    this.setState({ links });
  };

  addLink = link => {
    const links = { ...this.state.links };
    links[`link${Date.now()}`] = link;
    this.setState({
      links
    });
  };

  deleteLink = key => {
    const links = { ...this.state.links };
    delete links[key];
    this.setState({ links });
  };

  // get saved links from localStorage if they are available
  componentDidMount() {
    const localStorageRef = localStorage.getItem("savedLinks");
    if (localStorageRef) {
      this.setState({ links: JSON.parse(localStorageRef) });
    }
  }
  // update localStorage when links component updates
  componentDidUpdate() {
    localStorage.setItem("savedLinks", JSON.stringify(this.state.links));
  }

  render() {
    return (
      <div className="useful-links">
        <div className="container-links-block">
          <h2 className="useful-links__heading">Useful links</h2>
          <div className="links-container">
            {Object.keys(this.state.links).map(key => (
              <Link
                thisLink={this.state.links[key]}
                key={key}
                linkKey={key}
                deleteLink={this.deleteLink}
                updateLink={this.updateLink}
                toggleUpdateForm={this.toggleUpdateForm}
                cancelUpdateForm={this.cancelUpdateForm}
              />
            ))}
            <NewLink
              toggleAddForm={this.toggleAddForm}
              cancelAddForm={this.cancelAddForm}
              isAddingLink={this.state.isAddingLink}
              addLink={this.addLink}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Links;
