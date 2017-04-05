import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class Profile extends Component {
    render() {
        const user = this.props.user.services;
        const name =this.props.name;

        return (
            <div >
                <img  style={ {'borderRadius':'50%'}} src={    user && user.google ? user.google.picture :
                    user && user.vk ? user.vk.photo_big : null } width={name?75:24}
                    />
                {name  && <div>{this.props.user.profile.name}</div> }
            </div>
        )
    }
}

Profile.propTypes = {
    user: PropTypes.object,
    name: PropTypes.bool.isRequired
};