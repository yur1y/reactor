import {Meteor} from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {Groups} from '../../../../imports/api/groups/groups.js'

import {thisUrl, ok, noLogo} from '../../../startup/both/helpers';

import Profile from '../users/Profile';

export class GroupEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: null,
            user: null
        }
    }

    addUser() {
        console.log(this.state.user._id, this.state.group._id);
        Meteor.call('users.Addgroup', this.state.user._id, this.state.group._id);
    }

    removeUser() {
        Meteor.call('users.Removegroup', this.state.user._id, this.state.group._id)
    }

    usersIn() {
        const group = this.state.group;
        const users = this.props.users.filter(user => user._id != group.owner && user.groups.indexOf( group._id)!=-1);

        return users.map(user => {
            this.state.user = user;
            return <div key={user._id}><Profile user={user}/>
                <button onClick={this.removeUser.bind(this)}
                        className="btn btn-default">Remove User
                </button>
            </div>
        });
    }

// allUsers: Meteor.users.find({
//     $and: [{_id: {$not: this.owner}},
//         {groups: {$not: this._id}}
//     ]
// }).fetch(),
//     usersIn: Meteor.users.find({ $and: [{_id: {$not: this.owner}},
//     {groups:  this._id}
// ]}).fetch()
    allUsers() {
        const group = this.state.group;
        const users = this.props.users.filter(user => user._id != group.owner && user.groups.indexOf(group._id)==-1);
        return users.map(user => {
            this.state.user = user;
            return <div key={user._id}><Profile user={user}/>
                <button onClick={this.addUser.bind(this)}
                        className="btn btn-default">Add User
                </button>
            </div>
        });
    }

    updateGroup(event) {
        event.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();

        if (name.length >= 3) {
            Meteor.call('groups.update', this.state.group._id, name, this.refs.openInput.checked, this.state.group.name);
            browserHistory.push(`/groups/${getSlug(name)}/edit`);
        }
    }

    removeGroup() {
        Meteor.call('groups.remove', this.state.group._id, this.state.group.url, function (err, res) {
            if (res) {

                ok('group deleted');
                browserHistory.push('/groups');
            }
        });

    }

    newLogo(event) {
        event.preventDefault();
        Meteor.call('items.insert', this.state.group.url, this.state.group._id, this.state.group.logo);

    }

    removeLogo() {
        if (this.props.group.logo != noLogo()) {
            Meteor.call('items.remove', this.state.group.logo);
            Meteor.call('groups.noLogo', this.state.group._id);
            ok('no logo');
        }
    }


    render() {

        return ( <div> { this.props.group.map(group => {
            this.state.group = group;
            return <div key={group._id} className="container">

                <div className="row">
                    {this.props.currentUser === group.owner ?
                        <div className="btn-group" role="group">

                            <Link className="btn btn-default" to={`/groups/${group.url}`}>
                                Back
                            </Link>
                        </div> : ''}
                    <div className="media">


                        <div className="media-left media-middle "
                             data-toggle="tooltip"
                             title=" click to delete current logo"><i onClick={this.removeLogo.bind(this)}
                                                                      className="glyphicon glyphicon-remove-circle"/>
                            <img onMouseDown={this.newLogo.bind(this)} src={group.logo} width="200" id="replace-logo"
                                 data-toggle="tooltip" title="click to choose new logo"/>
                        </div>
                        <div className="media-body">

                            <form onSubmit={this.updateGroup.bind(this)}>
                                <input className=" " type="text" id="input-name" defaultValue={group.name}
                                       ref='nameInput' minLength="1"/>{group.name}

                                <p><input type="checkbox" className="checkbox" ref="openInput"
                                          data-toggle="tooltip" checked={group.open}
                                          onChange={this.updateGroup.bind(this)}
                                          title={group.open ? ' public' : ' closed'}

                                />{group.open ? ' public' : ' closed'}</p>
                                <button className="btn btn-default glyphicon glyphicon-ok"
                                        type="submit">Update
                                </button>
                            </form>
                            <button onClick={this.removeGroup.bind(this)}
                                    className="btn btn-default glyphicon glyphicon-remove"
                                    data-toggle="tooltip" title="are you sure?">delete
                            </button>
                        </div>
                        <div>{this.usersIn()}
                            {this.allUsers()}
                        </div>
                    </div>
                </div>
                <div></div>
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
