
import React  from 'react';

import { Link } from "react-router";

import   '../../stylesheets/landing.less';

import {Hero} from './Hero';
import {Exemplar} from './Exemplar';
import {Features} from './Features';
import {About} from './Start';
import {LatestNews} from './LatestNews';
import {SocialBrand} from './SocialBrand';
import {Footer} from './Footer';


export const LandingPage = () =>{
    return (
        <div style={{'overflowY': 'scroll',
            'overflowX': 'hidden'
        }}>
            <Hero />
            <Exemplar />
            <Features />
            <About />
            <LatestNews />
            <SocialBrand />
            <Footer />
        </div>
    )
};