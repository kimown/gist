/**
 * Created by google on 16-11-23.
 */


import React, {Component} from "react"
import Slick from 'react-slick'


class SimpleSlider extends Component {




    render() {

        return (
            <div>
                {this._getChildren()}
                <div className="button" onClick={this._click.bind(this, +1)}>Click Me++++</div>
                <div className="button">{"index="}</div>
                <div className="button" onClick={this._goTo}>{"GOTO=2"}</div>
                <div className="button" onClick={this._click.bind(this, -1)}>Click Me----</div>
            </div>
        );
    }

    _goTo = ()=>{
        this.refs.reactslick.slickGoTo(2)
    }

    _getChildren = () =>{
        console.info('====')
        var settings = {
            dots: true,
            infinite: true,
            speed: 750,
            draggable: false,
            initialSlide:0,
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToScroll: 1,
            beforeChange: function (currentSlide, nextSlide) {
                console.info('before change', currentSlide, nextSlide);
            },
            afterChange: function (currentSlide,aa,bb) {
                console.info('after change', currentSlide,aa,bb);
            },
        };
        const child = [
            <div className="slide"><img src='https://images.unsplash.com/photo-1415025148099-17fe74102b28?h=1500&w=2000&q=90&fit=clip&fm=jpg' /></div>,
            <div className="slide"><img src='http://uploads.strikinglycdn.com/static/backgrounds/things/121.jpg' /></div>,
            <div className="slide"><img src='https://images.unsplash.com/photo-1415025148099-17fe74102b28' /></div>,
        ]
        return (<Slick ref='reactslick'  {...settings}>
            {child}

        </Slick>)
    }


    _click = (number)=> {
        if(number>0){
            this.refs.reactslick.slickNext()

        }else {
            this.refs.reactslick.slickPrev()

        }
    }
}


export default SimpleSlider;
