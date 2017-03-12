import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';

import '../stylesheets/hello.less';
export default class Hello extends Component {

    componentDidMount() {

            //Function to animate slider captions
            function doAnimations(elems) {
                //Cache the animationend event in a variable
                let animEndEv = 'webkitAnimationEnd animationend';

                elems.each(function () {
                    let $this = $(this),
                        $animationType = $this.data('animation');
                    $this.addClass($animationType).one(animEndEv, function () {
                        $this.removeClass($animationType);
                    });
                });
            }

            //Variables on page load
            let $myCarousel = $('#carousel-example-generic'),
                $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");

            //Initialize carousel
            $myCarousel.carousel();

            //Animate captions in first slide on page load
            doAnimations($firstAnimatingElems);

            //Pause carousel
            $myCarousel.carousel('pause');


            //Other slides to be animated on carousel slide event
            $myCarousel.on('slide.bs.carousel', function (e) {
                let $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
                doAnimations($animatingElems);
            });


    }
    componentWillUnmount() {

    }

    render() {
        return <div>
            <div className="container">
                <div className="page-header"><h1>Hi ! To create this app i use:</h1></div>

                <div className="row">
                    <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">

                        <ol className="carousel-indicators">
                            <li data-target="#carousel-example-generic" data-slide-to="0" className="active"/>
                            <li data-target="#carousel-example-generic" data-slide-to="1"/>
                            <li data-target="#carousel-example-generic" data-slide-to="2"/>
                            <li data-target="#carousel-example-generic" data-slide-to="3"/>
                        </ol>

                        <div className="carousel-inner">
                            <div className="item active">
                                <img src="https://www.codepolitan.com/wp-content/uploads/2014/12/meteorjs_cover.jpg"/>


                                <div className="header-text hidden-xs">
                                    <div className="col-md-12 text-center">


                                    </div>
                                </div>
                            </div>
                            <div className="item">

                                <img
                                    src="https://webassets.mongodb.com/_com_assets/cms/mongodb-for-giant-ideas-bbab5c3cf8.png"
                                />
                                <div className="header-text hidden-xs">
                                    <div className="col-md-12 text-center">

                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <img src="https://cdn-enterprise.discourse.org/meteor/uploads/default/original/2X/b/b88c97b011c42f6b4251cc37143fba14d0a66ccb.png"/>

                                <div className="header-text hidden-xs">
                                    <div className="col-md-12 text-center">

                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <img src="https://facebook.github.io/react/img/logo_og.png"/>

                                <div className="header-text hidden-xs">
                                    <div className="col-md-12 text-center">

                                    </div>
                                </div>
                            </div>

                        </div>

                        <a className="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left"/>
                        </a>
                        <a className="right carousel-control" href="#carousel-example-generic" data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    }
}