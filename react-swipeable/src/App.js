import React, {Component} from "react";
import CustomAutoPlay from "./CustomAutoPlay";

class App extends Component {
    render() {
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
            <div id="test">
                {'slide n°3'}
            </div>,
        ];

        return(
            <div>
                <CustomAutoPlay
                    ref="customautoplay"
                    children={children}
                    autoplay={true}
                    interval={3500}
                />
                <div className="button" onClick={this._click}>Click Me</div>
            </div>
        );
    }

    _click=()=>{
        this.refs.customautoplay.changeIndex(2)
    }
}

export default App;
