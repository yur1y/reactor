import React from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import {Link} from 'react-router';

export const About = () => {
    const style={width: '100%', height: '100%',backgroundColor: 'rgb(0, 188, 212)'};
    return (
        <div >
            <Divider/>
            <Paper zDepth={3} style={style}>
                <Subheader>About</Subheader>
                <a href={"http://www.material-ui.com"}>
                    <img style={{'verticalAlign':' middle','marginLeft': '25%'}} src="https://media.giphy.com/media/yYSSBtDgbbRzq/giphy.gif"/>
                </a>
            </Paper>
        </div>
    )
};