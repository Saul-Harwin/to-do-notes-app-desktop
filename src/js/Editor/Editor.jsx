import React, { Component } from 'react';
import ForEditor from 'for-editor-herb';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '100%',
            height: '100%',
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(
            this
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.currentNote.value });
    }

    handleChange(value) {
        this.setState({
            value: value,
        });
    }

    handleSave(value) {
        this.props.saveData(value, this.props.currentNote.path);
        value = this.props.openNote(
            this.props.currentNote.path,
            this.props.currentNote.name
        );
    }

    render() {
        return (
            <ForEditor
                lineNum={false}
                value={this.state.value}
                language="en"
                onChange={(value) => this.handleChange(value)}
                onSave={(value) => this.handleSave(value)}
            />
        );
    }
}

export default Editor;
