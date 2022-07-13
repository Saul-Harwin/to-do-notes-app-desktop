import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

import Nav from './js/Nav/Nav';
import TitleBar from './js/Nav/TitleBar';
import Environment from './js/Editor/Environment';

var destination = document.querySelector('#root');
// console.log(destination.clientWidth);

ReactDOM.render(
    <>
        <TitleBar />
        <Nav />
        <Environment />
    </>,
    destination
);
