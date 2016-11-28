import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import $ from '$'

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <button onClick={this._click}>CLICK ME, CHANGE HEIGHT</button>
            </div>
        );
    }

    _click() {
        const el = $('.App-intro')
        const marginTop = parseInt(el.css('margin-top'), 10)
        const paddintTop = parseInt(el.css('padding-top'), 10)

        const marginBottom = parseInt(el.css('margin-bottom'), 10)
        const paddintBottom = parseInt(el.css('padding-bottom'), 10)

        el.css({'padding-top':0})
        el.css({'margin-top':marginTop+paddintTop})
        el.css({'padding-bottom':0})
        el.css({'margin-bottom':marginTop+paddintTop})
        el.height(2333333333333333333333333333333333330000000000000000)




    }
}

export default App;
