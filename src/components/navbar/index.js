import React from "react";
import translate from "./translate.png";
import note from "./note.png";
import link from "./link.png";
import "./navbar.css";

class Navbar extends React.Component {
  notesBtnRef = React.createRef();
  translateBtnRef = React.createRef();
  linkBtnRef = React.createRef();

  // handle click on navbar = use .contains(event.target) to detect which button was clicked
  clickNavigationBar = event => {
    // if we click on links button OR when links are open click on any place of navbar = toggleLinkBtnState()
    if (
      this.linkBtnRef.current.contains(event.target) ||
      this.props.isDealingWithLinks
    ) {
      this.toggleLinkBtnState();
      // handle click on translateBtn
    }
    if (this.translateBtnRef.current.contains(event.target)) {
      this.toggleTranslateBtnState();
      console.log("Translate block is opening/closing");
    }
    // handle click on notesBtn
    if (this.notesBtnRef.current.contains(event.target)) {
      console.log("Notes are opening/closing");
    }
  };

  toggleLinkBtnState = () => {
    // change styling of button if links are active
    if (!this.props.isDealingWithLinks) {
      this.linkBtnRef.current.className = "nav-item active";
      this.props.changeLinkState();
      // change styling of button if links are NOT active and hide Links
    } else {
      this.linkBtnRef.current.className = "nav-item";
      document.querySelector(".useful-links").classList.add("removeLinks");
      // wait for end of animation and only then unmount Links component
      const that = this;
      setTimeout(that.props.changeLinkState, 250);
    }
  };

  toggleTranslateBtnState = () => {
    const that = this;
    if (!this.props.isDealingWithTranslate) {
      this.translateBtnRef.current.className = "nav-item active";
      document.querySelector("#searchBar").classList.add("removeMidBlock");
    } else {
      this.translateBtnRef.current.className = "nav-item";
      document.querySelector("#translator").classList.add("removeMidBlock");
    }
    setTimeout(that.props.changeTranslateState, 200);
  };

  render() {
    return (
      <nav className="nav" onClick={this.clickNavigationBar}>
        <button className="nav-item" id="notesBtn" ref={this.notesBtnRef}>
          <img src={note} alt="notes button" className="nav-item-icon" />
          <span className="nav-item-title">Notes</span>
        </button>
        <button
          className="nav-item"
          id="translateBtn"
          ref={this.translateBtnRef}
        >
          <img
            src={translate}
            alt="translate button"
            className="nav-item-icon"
          />
          <span className="nav-item-title">Translate</span>
        </button>
        <button className="nav-item" id="linksBtn" ref={this.linkBtnRef}>
          <img src={link} alt="links button" className="nav-item-icon" />
          <span className="nav-item-title">Links</span>
        </button>
      </nav>
    );
  }
}

export default Navbar;
