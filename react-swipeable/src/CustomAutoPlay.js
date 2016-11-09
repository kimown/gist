/**
 * Created by google on 16-11-9.
 */


import React, {Component} from "react";
import SwipeableViews from "react-swipeable-views";
import virtualize from "react-swipeable-views/lib/virtualize";
import mod from "react-swipeable-views/lib/utils/mod";

const EnhancedSwipeableViews = virtualize(SwipeableViews);


class CustomAutoPlay extends Component {

    constructor(props) {
        super(props);
        this.state = {index: 0};
    }

    static defaultProps = {
        autoplay: true,
        index: 0,
        interval: 1000,
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    timer = null;

    slideRenderer = (params, children)=> {
        let childrenLength = children.length;
        const {index, key} = params;
        if (mod(index, childrenLength) < childrenLength) {
            return this.dealChild(children[mod(index, childrenLength)], key)
        }
        return null
    }

    middle = (params)=> {
        let {children}=this.props;
        return this.slideRenderer(params, children);
    }


    dealChild = (div, key)=> {
        return <div key={key}>
            {div}
        </div>
    }

    componentDidMount() {
        this.startInterval();
    }


    startInterval() {
        let {autoplay, interval}=this.props;
        if (!autoplay) {
            return
        }
        clearInterval(this.timer);
        this.timer = setInterval(this.handleInterval, interval);
    }

    handleInterval = () => {
        let indexLatest = this.state.index;
        let {children}=this.props;
        let indexNew = mod((indexLatest + 1), children.length);
        this.setState({
            index: indexNew,
        });
    };


    onChangeIndex = (index, indexLatest)=> {
        let stateIndex = this.state.index;
        if ((index - indexLatest) > 0) {
            stateIndex += 1;
        } else if ((index - indexLatest) < 0) {
            stateIndex -= 1;
        }
        this.setState({
            index: stateIndex
        })
    }

    handleSwitching = (index, type) => {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        } else if (type === 'end') {
            this.startInterval();
        }

    };


    render() {
        let {index}=this.state;
        return (
            <EnhancedSwipeableViews
                index={index}
                onSwitching={this.handleSwitching}
                onChangeIndex={this.onChangeIndex}
                slideRenderer={this.middle}/>
        );
    }
}


export default CustomAutoPlay;
