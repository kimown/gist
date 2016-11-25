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
        var settings = {
            dots: true,
            infinite: true,
            speed: 750,
            draggable: false,
            initialSlide:0,
            slidesToShow: 1,
            autoplay: false,
            autoplaySpeed: 2000,
            slidesToScroll: 1,
            beforeChange: function (currentSlide, nextSlide) {
                console.info('before change', currentSlide, nextSlide);
            },
            afterChange: function (currentSlide,aa,bb) {
                console.info('after change', currentSlide,aa,bb);
            },
        };
        const child = [<div data-test="test"><h3>11111</h3></div>,<div><h3>2</h3></div>,<div><h3>3</h3></div>,
            <div><h3>4</h3></div>,
            <div><h3>5</h3></div>,
            <div><h3>6</h3></div>]
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
