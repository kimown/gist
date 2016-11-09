import React, {Component} from "react";
import SwipeableViews from "react-swipeable-views";
import virtualize from "react-swipeable-views/lib/virtualize";
import mod from "react-swipeable-views/lib/utils/mod";

const EnhancedSwipeableViews = virtualize(SwipeableViews);


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {index: 0};
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    timer = null;

    slideRenderer = (params, children)=> {
        let childrenLength = children.length;
        const {index, key} = params;
        if(mod(index, childrenLength) < childrenLength){
            return this.dealChild(children[mod(index, childrenLength)], key)
        }
        return null
    }

    middle = (params)=> {
        let children = [
            <div id="test">
                {'slide n°0'}
            </div>,
            <div id="test">
                {'slide n°1'}
            </div>,
            <div id="test">
                {'slide n°2'}
            </div>,
        ];

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


    startInterval(interval = 2000) {
        clearInterval(this.timer);
        this.timer = setInterval(this.handleInterval, interval);
    }

    handleInterval = () => {
        const indexLatest = this.state.index;
        let indexNew = indexLatest;
        indexNew += 1;
        indexNew = mod(indexNew, 3);
        console.info('setTimer:indexNew' + indexNew)
        this.setState({
            index: indexNew,
        });
    };


    onChangeIndex = (index, indexLatest)=> {
        console.info('onChangeIndexindex:[' + index + "]===indexLatest[" + indexLatest + "]---this.state.index=[" + (this.state.index) + "]")
        let stateIndex = this.state.index;
        if ((index - indexLatest) > 0) {
            stateIndex = (stateIndex + 1);
        } else if ((index - indexLatest) < 0) {
            stateIndex = (stateIndex - 1);
        }
        console.info('result===' + stateIndex + "mod=" + (mod(stateIndex, 3)));
        this.setState({
            index: stateIndex
        })
    }

    onSwitching = (index, type)=> {
        console.error('index' + index + "===" + type)
    }

    handleSwitching = (index, type) => {
        if (this.timer) {
            console.error('clear timer');
            clearInterval(this.timer);
            this.timer = null;
        } else if (type === 'end') {
            console.error('start timer');
            this.startInterval();
        }

        console.log('invoke handleSwitching');
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

export default App;
