import React from 'react';
import Note from './Note';

class Notes extends React.Component {
  state = {
    notes: {
      defaultNote: { content: '' }
    }
  };

  // get saved notes from localStorage if they are available
  componentDidMount() {
    const localStorageRef = localStorage.getItem('savedNotes');
    if (localStorageRef) {
      this.setState({ notes: JSON.parse(localStorageRef) });
    }
  }

  componentDidUpdate() {
    if (Object.keys(this.state.notes).length === 0) {
      this.addNote();
    }
    // update localStorage when Notes component updates
    localStorage.setItem('savedNotes', JSON.stringify(this.state.notes));
  }

  addNote = () => {
    const notes = { ...this.state.notes };
    notes[`note${Date.now()}`] = { content: '' };
    this.setState({
      notes
    });
  };

  deleteNote = key => {
    const notes = { ...this.state.notes };
    delete notes[key];
    this.setState({ notes });
  };

  updateNote = (key, note) => {
    const notes = { ...this.state.notes };
    notes[key] = note;
    this.setState({ notes });
  };

  render() {
    return (
      <div className="notes">
        {Object.keys(this.state.notes).map(key => (
          <Note
            key={key}
            noteKey={key}
            defaultData={this.state.notes}
            addNote={this.addNote}
            deleteNote={this.deleteNote}
            updateNote={this.updateNote}
          />
        ))}
      </div>
    );
  }
}

export default Notes;
