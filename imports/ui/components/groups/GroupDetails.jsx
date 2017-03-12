import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {Groups} from '../../../../imports/api/groups/groups.js'

import {thisUrl} from '../../../startup/both/helpers';

import Profile from '../users/Profile';
import ItemsData from '../items/ItemsData';
export class GroupDetails extends Component {


    groupOwner() {

        const owner = this.props.users.filter(doc => doc._id === this.props.group.owner);
        return owner.map(user => {
            return <div>Owner: <Profile key={user._id} user={user}/></div>
        });
    }

    usersIn() {
        const users = this.props.users.filter(doc => doc.groups === this.props.group._id && doc._id != this.props.group.owner);
        return users.map(user => {
            return <Profile key={user._id} user={user}/>
        });
    }




    render() {

        return ( <div> { this.props.group.map(group => {
            return <div key={group._id} className="container">

                <div className="row">
                    {this.props.user === group.owner ?
                        <div className="btn-group" role="group">

                            <Link to={`/groups/${group.url}/edit`}>
                                <button type="button" className="btn btn-default">Edit group</button>
                            </Link>
                        </div> : ''}
                    <div className="media">


                        <div className="media-left media-middle">
                            <img src={group.logo} width="200"/>

                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">Group name: {group.name}  </h4>
                            <h5>Status: {group.open ? ' open' : ' closed'}</h5>
                            <h5>Created at: {group.createdAt}</h5>
                            <div>{this.groupOwner()}</div>

                        </div>
                        <div>{this.usersIn()}</div>
                    </div>
                </div>
                <div><ItemsData /></div>
            </div>
        })}
        </div> )
    }

}

GroupDetails.propTypes = {
    group: PropTypes.array,
    user: PropTypes.string,
    users: PropTypes.array
};

export  default   createContainer(() => {

    Meteor.subscribe('group', thisUrl());
    Meteor.subscribe('users');
    return {
        group: Groups.find().fetch(),
        user: Meteor.userId(),
        users: Meteor.users.find().fetch()

    };
}, GroupDetails);