import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';

import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors'
import {LandingPage} from "./land/LandingPage";

export default class Hello extends Component {
constructor(props) {
    super(props);
    this.state = {
        open: true
    };
}
    handleClose () {
        this.setState({ open: false });
    }
    render(){
        return (
            <div >
                <div>
                    <AutoRotatingCarousel
                        label="Close this "
                        onRequestClose={() => this.handleClose()}
                        open={this.state.open}
                        onStart={() => this.handleClose()}
                    >
                        <Slide
                            media={<img src="meteo.png" />}
                            contentStyle={{ backgroundColor: red600 }}
                            title="Hi ! To create this app i use:"
                            subtitle="Random framework once named Meteor.js !"
                        />
                        <Slide
                            media={<img src="atmo.png" />}
                            contentStyle={{ backgroundColor: blue600 }}
                            title="ATMOSPHERE"
                            subtitle="The trusted source for JavaScript packages, Meteor resources and tools &The best way to discover reliable Meteor packages to install in your apps. "
                        />
                        <Slide
                            media={<img src="mongodb-for-giant-ideas-bbab5c3cf8.png" />}
                            contentStyle={{ backgroundColor: green600 }}
                            title="MongoDB for GIANT Ideas | MongoDB"
                            subtitle="MongoDB for GIANT Ideas - Build innovative modern applications that create a competitive advantage"
                        />
                    </AutoRotatingCarousel>
                </div>

                <LandingPage/>
                {/*//https://github.com/iwilsonq/react-material-landing-page*/}

                </div>
        )
    }}