import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {render} from 'react-dom';
import Sortable from 'sortablejs';
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
    };

    sortableGroupDecorator = (componentBackingInstance) => {
        // check if backing instance not null
        if (componentBackingInstance) {
            let options = {
                // draggable: "div", // Specifies which items inside the element should be sortable
                // group: "shared",
                // onStart: (evt)=>{
                //    this.onStart()
                // }
                handle: '.draging',
            };
            Sortable.create(componentBackingInstance, options);
        }
    };

    constructor(props: PropsType) {
        super(props)
        this.state = {
            data: ['Swap them around00000','Swap us around111111','Swap things around2222222222','Swap everything around3333333333']
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
        const data = this.state.data
        const divS = data.map((v)=>{
            return <div className="draging">
                        <div className="draghandle">{'DRAG ME'}</div>
                        {v}
                    {',,,,,,'}
                    </div>
        })
        return (
            <div className="container">
                <div className="group">
                    <h2 className="group-title">Group 1</h2>
                    <div className="group-list" ref={this.sortableGroupDecorator}>
                        {divS}
                    </div>
                </div>
            </div>
        );
    }
}

export default SortableExampleEsnext;