import React, {PropTypes} from 'react';
import {Link}from 'react-router';

import '../stylesheets/not-found.less';

export const NotFound = () => <div id="not-found">
    <div className="not-found-image">
        <img src="/404.svg" alt=""/>
    </div>
    <div className="not-found-title">
        <h1>Sorry, that page doesn't exist</h1>
        <Link to="/" className="gotohomepage">Go to home</Link>
    </div>
</div>;