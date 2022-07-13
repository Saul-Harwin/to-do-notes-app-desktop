import React, { Component } from 'react';
import Editor from './Editor';

class DevelopmentArea extends Component {
    render() {
        return (
            <div className="development_area" id="second">
                <div className="toolbar_editor">
                    <h1>{this.props.currentNote.name}</h1>
                </div>
                <Editor
                    saveData={this.props.saveData}
                    currentNote={this.props.currentNote}
                    openNote={this.props.openNote}
                />
            </div>
        );
    }
}

export default DevelopmentArea;
