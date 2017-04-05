import {Meteor} from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {getSlug} from 'meteor/ongoworks:speakingurl';

import {Groups} from '../../../../imports/api/groups/groups.js'

import {thisUrl} from '../../../startup/both/helpers';

import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Profile from '../users/Profile';
import {GroupUpdateForm} from "./GroupUpdateForm";

export class GroupEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: null,
            user: null,
              style : {
                height: 100, width: 100,
                margin: 20, textAlign: 'center',
                display: 'inline-block',
            }
        }
    }

    addUser() {
        Meteor.call('users.Addgroup', this.state.user._id, this.state.group._id);
    }

    removeUser() {
        Meteor.call('users.Removegroup', this.state.user._id, this.state.group._id)
    }

    usersIn() {
        const group = this.state.group;
        const users = this.props.users.filter(user => user._id !== group.owner && user.groups.indexOf(group._id) !== -1);

        return users.map(user => {
            this.state.user = user;
            return <div style={this.state.style} key={user._id}><Profile user={user} name={true}/>

                <RaisedButton onClick={this.removeUser.bind(this)} label="Remove User" />

            </div>
        });
    }

    allUsers() {
        const group = this.state.group;
        const users = this.props.users.filter(user => user._id !== group.owner && user.groups.indexOf(group._id) === -1);

        return users.map(user => {
            this.state.user = user;
            return <div style={this.state.style} key={user._id}><Profile user={user} name={true}/>
                <RaisedButton onClick={this.addUser.bind(this)} label="Add User" />

            </div>
        });
    }
    render() {

        return ( <div> { this.props.group.map(group => {
            this.state.group = group;
            return <div key={group._id} className="container">

                <Paper>
                    {this.props.currentUser === group.owner ?
                        <Link   to={`/groups/${group.url}`}><RaisedButton fullWidth={true} label="Back" /></Link> : ''}
                    <div className="media">
                        <GroupUpdateForm group={group}/>
                        <div>{this.usersIn()}
                            {this.allUsers()}
                        </div>
                    </div>
                </Paper>
            </div>
        })}
        </div> )
    }
}
GroupEdit.propTypes = {
    group: PropTypes.array,
    currentUser: PropTypes.string,
    users: PropTypes.array,
};

export  default   createContainer(() => {
    Meteor.subscribe('group', thisUrl());
    Meteor.subscribe('users');
    return {
        group: Groups.find().fetch(),
        currentUser: Meteor.userId(),
        users: Meteor.users.find().fetch()
    };
}, GroupEdit);
