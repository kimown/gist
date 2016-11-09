/**
 * Created by google on 16-11-9.
 */


import React, {Component} from "react";
import SwipeableViews from "react-swipeable-views";
import virtualize from "react-swipeable-views/lib/virtualize";
import mod from "react-swipeable-views/lib/utils/mod";

const EnhancedSwipeableViews = virtualize(SwipeableViews);


class Autoplay extends Component {
    constructor(props) {
        super(props);
        this.state = {index:0};
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    timer = null;



}


export default Autoplay;
