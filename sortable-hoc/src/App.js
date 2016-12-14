import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {render} from 'react-dom';


import Sortable from 'sortablejs';

class SortableComponent extends React.Component {

    sortableContainersDecorator = (componentBackingInstance) => {
        console.info('======sortableContainersDecorator')
        // check if backing instance not null
        if (componentBackingInstance) {
            let options = {
                handle: ".group-title" // Restricts sort start click/touch to the specified element
            };
            Sortable.create(componentBackingInstance, options);
        }
    };

    sortableGroupDecorator = (componentBackingInstance) => {
        console.info('-----sortableGroupDecorator')
        // check if backing instance not null
        if (componentBackingInstance) {
            let options = {
                draggable: "div", // Specifies which items inside the element should be sortable
                group: "shared"
            };
            Sortable.create(componentBackingInstance, options);
        }
    };
    handleSort = ()=>{
        alert(11)
    }

    render() {
        return (
            <div className="container">
                <div className="group">
                    <h2 className="group-title">Group 1</h2>
                    <div className="group-list" ref={this.sortableGroupDecorator}>
                        <div>Swap them around000000000</div>
                        <div>Swap us around1111111111</div>
                        <div>Swap things around22222222222</div>
                        <div>Swap everything around3333333333</div>
                    </div>
                </div>
                <div className="group">
                    <h2 className="group-title">Group 2</h2>
                    <div className="group-list" ref={this.sortableGroupDecorator}>
                        <div>Swap them around0000000000</div>
                        <div>Swap us around111111111</div>
                        <div>Swap things around2222222222</div>
                        <div>Swap everything around33333333333</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SortableComponent;