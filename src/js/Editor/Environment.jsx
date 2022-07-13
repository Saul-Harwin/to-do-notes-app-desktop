import React, { Component } from 'react';
import Explorer from './Explorer';
import DevelopmentArea from './DevelopmentArea';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
const electron = window.require('electron');
const fs = electron.remote.require('fs');
const storage = electron.remote.require('electron-json-storage');
const dirTree = electron.remote.require('directory-tree');

class Environment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tree: [],
            currentNote: {
                name: '',
                path: '',
                value: '',
            },
            initialSize: '',
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.saveData = this.saveData.bind(this);
        this.openNote = this.openNote.bind(this);
        this.dirList = this.dirList.bind(this);
        this.displayTree = this.displayTree.bind(this);
        this.initialSize = this.initialSize.bind(this);
    }

    componentDidMount() {
        this.dirList();
    }

    initialSize() {
        // var size = document.getElementById('layout-pane1');
        // console.log(this.props.children);
    }

    displayTree(tree) {
        var len = tree.length;
        var list = [];
        for (var i = 0; i < len; i++) {
            if (tree[i].type === 'directory') {
                let children = this.displayTree(tree[i].children);
                let array = [
                    tree[i].name,
                    tree[i].type,
                    tree[i].path,
                    children,
                ];
                list.push(array);
            } else {
                tree[i].name = tree[i].name.split('.')[0];
                let array = [tree[i].name, tree[i].type, tree[i].path];
                list.push(array);
            }
        }
        return list;
    }

    dirList() {
        var dirPath = storage.getDataPath();
        var tree = dirTree(dirPath, {});
        var list = this.displayTree(tree.children);
        this.setState({ tree: list });
    }

    createFileFolder(type, name) {}

    openNote(path, name) {
        var value = fs.readFileSync(path, 'utf-8', (err, data) => {
            if (err) throw err;
            return data;
        });
        this.setState({
            currentNote: { name: name, path: path, value: value },
        });
    }

    saveData(newValue, path) {
        var value = newValue;
        fs.writeFileSync(path, value);
    }

    render() {
        return (
            <SplitterLayout
                id="splitter"
                percentage={false}
                secondaryMinSize={0}
                secondaryInitialSize={200}
            >
                <Explorer tree={this.state.tree} openNote={this.openNote} />
                <DevelopmentArea
                    saveData={this.saveData}
                    currentNote={this.state.currentNote}
                    openNote={this.openNote}
                />
            </SplitterLayout>
        );
    }
}

export default Environment;
