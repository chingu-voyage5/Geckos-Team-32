import React from 'react';
import './notes.css';
import Rnd from 'react-rnd';
import trashIcon from './trash.png';
import addIcon from './plus.png';

class Note extends React.Component {
  state = {
    width: '200px',
    height: '150px',
    x: '20',
    y: '20',
    content: ''
  };

  componentDidMount() {
    if (this.props.defaultData[this.props.noteKey].content) {
      const thisNote = this.props.defaultData[this.props.noteKey];
      this.setState({
        width: thisNote.width,
        height: thisNote.height,
        x: thisNote.x,
        y: thisNote.y,
        content: thisNote.content
      });
    }
  }

  removeNote = () => {
    this.props.deleteNote(this.props.noteKey);
  };

  updateNote = () => {
    const note = {
      width: this.state.width,
      height: this.state.height,
      x: this.state.x,
      y: this.state.y,
      content: this.state.content
    };
    this.props.updateNote(this.props.noteKey, note);
  };

  updateNoteText = () => {
    let content = { ...this.state.content };
    content = this.refs.text.value;
    this.setState({ content }, this.updateNote);
  };

  render() {
    return (
      <Rnd
        size={{ width: this.state.width, height: this.state.height }}
        position={{ x: this.state.x, y: this.state.y }}
        onDragStop={(e, d) => {
          this.setState({ x: d.x, y: d.y }, this.updateNote);
        }}
        cancel=".doNotMove"
        bounds="parent"
        minWidth="80"
        onResize={(e, direction, ref, delta, position) => {
          this.setState(
            {
              width: ref.style.width,
              height: ref.style.height,
              ...position
            },
            this.updateNote
          );
        }}
      >
        <div className="note" ref="note" onChange={this.updateNote}>
          <div className="header">
            <button className="addNote doNotMove" onClick={this.props.addNote}>
              <img src={addIcon} alt="add" />
            </button>
            <button className="deleteNote doNotMove" onClick={this.removeNote}>
              <img src={trashIcon} alt="delete" />
            </button>
          </div>
          <textarea
            className="doNotMove"
            onInput={this.updateNoteText}
            ref="text"
            value={this.state.content}
          />
        </div>
      </Rnd>
    );
  }
}

export default Note;
