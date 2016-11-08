import React,{Component} from 'react';
import SwipeableViews from 'react-swipeable-views';
import virtualize from 'react-swipeable-views/lib/virtualize';
import mod from 'react-swipeable-views/lib/utils/mod';

const EnhancedSwipeableViews = virtualize(SwipeableViews);

function slideRenderer(params) {
    const {
        index,
        key,
    } = params;

    switch (mod(index, 3)) {
        case 0:
            return (
                <div key={key}>
                    {'slide n°1'}
                </div>
            );

        case 1:
            return (
                <div key={key}>
                    {'slide n°2'}
                </div>
            );

        case 2:
            return (
                <div key={key}>
                    {'slide n°3'}
                </div>
            );

        default:
            return null;
    }
}


class App extends Component {
  render() {
    return (
        <EnhancedSwipeableViews slideRenderer={slideRenderer} />
    );
  }
}

export default App;
