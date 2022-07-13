import React, { Component } from 'react';

import folder_open from '../../img/icons/folder.svg';
import folder from '../../img/icons/open-folder.svg';

class Folder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(path, name) {
        if (this.state.show === false) {
            this.setState({ show: true });
        } else {
            this.setState({ show: false });
        }
    }

    render() {
        const show = this.state.show;
        return (
            <>
                <li
                    key={this.props.file[2]}
                    id={this.props.file[1]}
                    path={this.props.file[2]}
                    onClick={(e) =>
                        this.handleClick(
                            e.target.attributes['path'].value,
                            e.target.innerText
                        )
                    }
                >
                    <div
                        style={{
                            backgroundImage: show
                                ? `url(${folder})`
                                : `url(${folder_open})`,
                            backgroundSize: show ? 'contain' : 'contain',
                        }}
                        className="folder"
                    ></div>
                    {this.props.file[0]}
                </li>
                {show ? (
                    <ul>
                        <li>{this.props.mapFiles(this.props.file[3])}</li>
                    </ul>
                ) : null}
            </>
        );
    }
}

export default Folder;
