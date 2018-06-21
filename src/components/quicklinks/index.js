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

  // Close Link continer if mouse pressed outside it
  linksContainerRef = React.createRef();
  handleClick = event => {
    if (!this.linksContainerRef.current.contains(event.target)) {
      this.linksContainerRef.current.className = "useful-links";
    }
  };

  //TEMPORARELY open if key "l" was pressed
  openLinks = event => {
    if (event.keyCode === 108) {
      this.linksContainerRef.current.className = "useful-links activeLink";
    }
  };

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick);
    document.addEventListener("keypress", this.openLinks); //TEMPORARELY
  }

  componentDidMount() {
    const localStorageRef = localStorage.getItem("savedLinks");
    if (localStorageRef) {
      this.setState({ links: JSON.parse(localStorageRef) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem(
      "savedLinks",
      JSON.stringify(this.state.links) // JSON.stingify - convert object to readable object-ish string. Otherwise we'll receive [object Object]
    );
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick);
  }

  render() {
    return (
      <div className="useful-links activeLink" ref={this.linksContainerRef}>
        <div className="container">
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
