import React, { Component } from 'react';
import Folder from './Folder';

class Explorer extends Component {
    constructor(props) {
        super(props);
        this.mapFiles = this.mapFiles.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(path, name) {
        this.props.openNote(path, name);
    }

    mapFiles(files) {
        const tree = files.map((file) => {
            if (file[1] === 'file') {
                return (
                    <ul
                        key={file[2]}
                        id={file[1]}
                        path={file[2]}
                        onClick={(e) =>
                            this.handleClick(
                                e.target.attributes['path'].value,
                                e.target.innerText
                            )
                        }
                    >
                        <div className="file"></div>
                        {file[0]}
                    </ul>
                );
            } else {
                return (
                    <Folder
                        file={file}
                        folderClick={this.folderClick}
                        mapFiles={this.mapFiles}
                    />
                );
            }
        });
        return tree;
    }
    render() {
        const files = this.props.tree;
        var tree = this.mapFiles(files);

        return (
            <div id="first" className="explorer_container">
                <div className="toolbar"></div>
                <div className="explorer" id="explorer">
                    {tree}
                </div>
            </div>
        );
    }
}

export default Explorer;
