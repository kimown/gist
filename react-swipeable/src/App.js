import React, {Component} from "react";
import SwipeableViews from "react-swipeable-views";
import virtualize from "react-swipeable-views/lib/virtualize";
import mod from "react-swipeable-views/lib/utils/mod";

const EnhancedSwipeableViews = virtualize(SwipeableViews);

function slideRenderer(params, children) {
    const {
        index,
        key,
    } = params;

    // console.info(`index=${index}=========+key＝${key}`);
    switch (true) {
        case (mod(index, 3) < children.length) :
            return dealChild(children[mod(index, 3)], key);
        default:
            return null;
    }
}

window.setTimeout(()=>{

},2000)

function dealChild(div, key) {
    return <div key={key}>
        {div}
    </div>
}
function middle(params) {
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

    return slideRenderer(params, children);
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {index:0};
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    //
    // timer = null;
    //
    // componentDidMount(){
    //     // this.timer=setInterval(()=>{
    //     //     console.info('change index');
    //     //     this.setState({
    //     //         index:++this.state.index
    //     //     })
    //     // },2000)
    // }
    //
    // handleSwitching=(index, type)=>{
    //     if(parseInt(index)==index){
    //         console.error((index)+"---"+type)
    //     }
    //     return;
    //
    //     if (this.timer) {
    //         console.info('clear timer')
    //         clearInterval(this.timer);
    //         this.timer = null;
    //     } else if (type === 'end') {
    //         console.info('start timer')
    //         // this.startInterval(2000);
    //     }
    //
    //     if (this.props.onSwitching) {
    //         this.props.onSwitching(index, type);
    //     }
    // }
    //
    // startInterval(interval) {
    //     clearInterval(this.timer);
    //         this.timer = setInterval(this.handleInterval, interval);
    // }
    //
    // handleInterval = () => {
    //     const {
    //         children,
    //         onChangeIndex,
    //         slideCount,
    //     } = this.props;
    //
    //     const indexLatest = this.state.index;
    //     let indexNew = indexLatest;
    //     let direction='incremental';
    //     if (direction === 'incremental') {
    //         indexNew += 1;
    //     } else {
    //         indexNew -= 1;
    //     }
    //
    //     if (slideCount || children) {
    //         indexNew = mod(indexNew,3);
    //     }
    //     console.info('begin start-----------indexNew'+indexNew+'====indexLatest'+indexLatest);
    //     console.error(`indexNew=${mod(indexNew,3)},===+indexLatest${mod(indexLatest,3)}`)
    //     if (onChangeIndex) {
    //         console.info('--------'+onChangeIndex);
    //         onChangeIndex(indexNew, indexLatest);
    //     } else {
    //         console.info('========'+onChangeIndex+"----"+mod(indexNew,3));
    //         this.setState({
    //             index: indexNew,
    //         });
    //     }
    // };
    //
    //


    onChangeIndex=(index, indexLatest)=>{
        console.info('onChangeIndexindex:['+index+"]===indexLatest["+indexLatest+"]---this.state.index=["+(this.state.index)+"]")
        let stateIndex=this.state.index;
        if((index-indexLatest)>0){
            stateIndex=(stateIndex+1);
        }else if((index-indexLatest)<0){
            stateIndex=(stateIndex-1);
        }
        console.info('result==='+stateIndex+"mod="+(mod(stateIndex,3)));
        this.setState({
            index:stateIndex
        })
    }

    onSwitching=(index, type)=>{
        console.error('index'+index+"==="+type)
    }


        render() {
        let {index}=this.state;
        return (
            <EnhancedSwipeableViews
                index={index}
                onSwitching={this.handleSwitching}
                onChangeIndex={this.onChangeIndex}
                slideRenderer={middle}/>


        );
    }
}

export default App;
