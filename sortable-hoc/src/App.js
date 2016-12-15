import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {render} from 'react-dom';
import Sortable from 'sortablejs';
var _ = require('lodash');
import SortableMixin from 'react-mixin-sortablejs'


class SortableExampleEsnext extends React.Component {

    sortableContainersDecorator = (componentBackingInstance) => {
        // check if backing instance not null
        if (componentBackingInstance) {
            let options = {
                handle: ".group-title" // Restricts sort start click/touch to the specified element
            };
            Sortable.create(componentBackingInstance, options);
        }
    }

    _onStart = (evt)=> {
        console.info(`onStart  evt.oldIndex ${ evt.oldIndex}`)
    }

    _onEnd = (evt) => {
        console.info(`onEnd evt.oldIndex ${evt.oldIndex} evt.newIndex  ${evt.newIndex}`)
    }

    sortableGroupDecorator = (componentBackingInstance) => {
        // check if backing instance not null
        if (componentBackingInstance) {
            let options = {
                draggable: "div", // Specifies which items inside the element should be sortable
                forceFallback:true,

                onStart: (evt)=>{
                    this._onStart(evt)
                },
                onEnd: (evt) => {
                    this._onEnd(evt)
                },

                // Element is chosen
                onChoose: function (/**Event*/evt) {
                    // evt.oldIndex;  // element index within parent
                    console.info('onChoose')
                },

                // Element is dropped into the list from another list
                onAdd: function (/**Event*/evt) {
                    var itemEl = evt.item;  // dragged HTMLElement
                    // evt.from;  // previous list
                    // + indexes from onEnd
                    console.info('onAdd')
                },

                // Changed sorting within list
                onUpdate: function (/**Event*/evt) {
                    var itemEl = evt.item;  // dragged HTMLElement
                    // + indexes from onEnd
                    console.info('onUpdate')

                },

                // Called by any change to the list (add / update / remove)
                onSort: function (/**Event*/evt) {
                    // same properties as onUpdate
                    console.info('onSort')

                },

                // Element is removed from the list into another list
                onRemove: function (/**Event*/evt) {
                    // same properties as onUpdate
                    console.info('onRemove')

                },

                // Attempt to drag a filtered element
                onFilter: function (/**Event*/evt) {
                    var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
                    console.info('onFilter')

                },

                // Event when you move an item in the list or between lists
                onMove: function (/**Event*/evt, /**Event*/originalEvent) {
                    // Example: http://jsbin.com/tuyafe/1/edit?js,output
                    // evt.dragged; // dragged HTMLElement
                    // evt.draggedRect; // TextRectangle {left, top, right и bottom}
                    // evt.related; // HTMLElement on which have guided
                    // evt.relatedRect; // TextRectangle
                    // originalEvent.clientY; // mouse position
                    // return false; — for cancel
                    console.info('onMove')

                },

                // Called when creating a clone of element
                onClone: function (/**Event*/evt) {
                    var origEl = evt.item;
                    var cloneEl = evt.clone;
                    console.info('onClone')

                },

                handle: '.my-handle',
            };
            Sortable.create(componentBackingInstance, options);
        }
    };

    constructor(props: PropsType) {
        super(props)
        const initArray = _.range(0, props.children.length)
        console.info(`initArray ${initArray}`)
        this.state = {
            data: ['Swap them around00000','Swap us around111111','Swap things around2222222222','Swap everything around3333333333'],
            lastOrderList:initArray,
            orderList: initArray,
        }
    }

    onStart = ()=>{
        console.log('onStartonStartonStart')
    }

    componentDidMount() {
        // console.info('---componentDidMount')
        // window.setTimeout(()=>{
        //     const {data} = this.state
        //     const newData = [...data]
        //     newData.push('Swap them around444444','Swap them around555555')
        //     console.info('ADD ELE')
        //     this.setState({
        //         data: newData
        //     })
        // },2000)
        //
        // window.setTimeout(()=>{
        //     const {data} = this.state
        //     const newData = [...data]
        //     newData.splice(0,1)
        //     console.info('DELETE ELE')
        //     this.setState({
        //         data: newData
        //     })
        // },4000)
    }

    render() {
        const {children} = this.props
        const divS = children.map((v)=>{
            return <div className="sortableItem">
                        <span className="my-handle">{'DRAG ME'}</span>
                        {v}
                    {',,,,,,'}
                    </div>
        })

        return (
            <div id="listWithHandle" ref={this.sortableGroupDecorator}>
                {divS}

                <div className="addme">Add Me</div>
            </div>
        );
    }
}

export default SortableExampleEsnext;