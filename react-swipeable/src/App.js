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

        return <CustomAutoPlay
            children={children}
            autoplay={true}
            interval={3500}
        />;
    }
}

export default App;
