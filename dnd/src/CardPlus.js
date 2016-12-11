/**
 * Created by google on 16-12-11.
 */

import React, {Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';

const Types = {
    CARD:'card'
}


const cardSource = {
    beginDrag(props){
        const item = {id:props.id}
        return item
    },

    endDrag(props, monitor, component) {
        if(!monitor.didDrop()){
            return
        }

        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()
        console.info('drag over!!')
        // CardActions.moveCardToList(item.id, dropResult.listId)
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource:connect.dragSource(),
        isDragging:monitor.isDragging()
    }
}

class CardPlus extends Component{
    render(){
        const {id}= this.props
        const {isDragging, connectDragSource} = this.props
        return connectDragSource(
            <div>
                I am a draggable card number {id}
                <br />
                {isDragging&&" I am being dragged now"}
            </div>
        )
    }
}

export default DragSource(Types.CARD, cardSource, collect)(CardPlus)