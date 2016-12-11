// Let's make <Card text='Write the docs' /> draggable!

import React, {Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from './Constants';


/**
 * Implements the drag source contract.
 */
const cardSource = {
    beginDrag(props) {
        console.info('begin draging......')
        return {
            text: props.text
        };
    }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
    console.info('callback '+monitor.isDragging())
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        bilibili:'23333',
        // hovered: monitor.isOver()
        // canDrop:monitor.canDrop()
    };
}

const propTypes = {
    text: PropTypes.string.isRequired,

    // Injected by React DnD:
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired
};

class Card extends Component{
    render() {
        const { isDragging, connectDragSource, text, bilibili, canDrop} = this.props;
        return connectDragSource(
            <div style={{ opacity: isDragging ? 0.5 : 1 ,cursor:'pointer',backgroundColor:isDragging?'red':'green'}}>
                {text+""}
                <br/>
                {isDragging?'You are draging':'Have a rest'}
                <br/>
            </div>

        );
    }
}

Card.propTypes = propTypes;

// Export the wrapped component:
export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);