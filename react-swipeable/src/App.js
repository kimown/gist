import React, {Component} from "react";
import CustomAutoPlay from "./CustomAutoPlay";
import mod from "react-swipeable-views/lib/utils/mod";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {index: 0};
    }

    static defaultProps = {
        children: [
            <div className="slide slide0">
                {'slide n°0'}
            </div>,
            <div className="slide slide1">
                {'slide n°1'}
            </div>,
            <div className="slide slide2">
                {'slide n°2'}
            </div>,
            <div className="slide slide3">
                {'slide n°3'}
            </div>,
        ]
    };

    render() {
        let {children} = this.props;
        let {index}=this.state;
        return (
            <div>
                <CustomAutoPlay
                    ref="customAutoplay"
                    children={children}
                    autoplay={false}
                    interval={3500}
                    index={index}
                    changeIndexCallBack={(index)=> {
                        this.setIndex(index);
                        console.info("changing index"+index);
                    }}
                />
                <div className="button" onClick={this._click.bind(this, +1)}>Click Me++++</div>
                <div className="button" onClick={this._click.bind(this, +1)}>{"index=" + index}</div>
                <div className="button" onClick={this._click.bind(this, -1)}>Click Me----</div>

            </div>
        );
    }

    setIndex = (index)=> {
        this.setState({index})
    }

    _click = (number)=> {
        let {children} = this.props;
        let childrenLength = children.length;

        let index = this.state.index + number
        this.setState({
            index: index
        })
    }


}

export default App;
