import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class Profile extends Component {

    render() {

        const user = this.props.user.services;
        return (
            <div className="container-fluid">
                <h4><img className="img-circle" src={    user && user.google ? user.google.picture :
                    user && user.vk ? user.vk.photo_big : null }
                         width='75'/>
                    {this.props.user.profile.name}</h4>
            </div>
        )
    }
}

Profile.propTypes = {
    user: PropTypes.object,
};