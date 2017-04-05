import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {Groups} from '../../../../imports/api/groups/groups'
import {Items} from '../../../../imports/api/items/items';
import {thisUrl} from '../../../startup/both/helpers';

import Profile from '../users/Profile';
import {ItemsData} from '../items/ItemsData';
import {ItemAdd} from '../items/ItemAdd';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export class GroupDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: null
        }
    }

    groupOwner() {

        const owner = this.props.users.filter(doc => doc._id === this.state.group.owner);
        return owner.map(user => {
            return ( <div key={user._id}> <Profile user={user} name={true}/></div>)
        });
    }
    usersIn() {
        const group = this.state.group;
        const users = this.props.users.filter(user => user._id !== group.owner && user.groups.indexOf(group._id) !== -1);
        return users.map(user => {
            this.state.user = user;
            return <div key={user._id}><Profile name={ true}  user={user} /></div>
        });

    }
    render(){
        return (<div className="container">
            { this.props.group.map(group =>{
                this.state.group=group;
             return   <div key={group._id}>
                 <Card>
                     <CardHeader title={group.createdAt}
                                 avatar={<div>{this.groupOwner()}</div>}/>
                     <CardMedia
                         overlay={<CardTitle title={group.name} subtitle={`Status: ${group.open ? ' open' : ' closed'}`} />}>
                         {  this.props.user === group.owner ?


                             <Link to={`/groups/${group.url}/edit`}>
                                 <RaisedButton label="Edit group" fullWidth={true} />
                             </Link>
                             : ''}
                     <img src={group.logo} />
                 </CardMedia>
                     <CardText>
                         <div>Users in group: {this.usersIn().length > 0 ? this.usersIn() : ' no users'}</div>

                     </CardText>
                     <ItemAdd/>
                     <ItemsData items={this.props.items} user={this.props.user} />
                 </Card>
             </div>
            }) }
        </div>)
    }
}
GroupDetails.propTypes = {
    group: PropTypes.array,
    user: PropTypes.string,
    users: PropTypes.array,
    items:PropTypes.array
};

export  default   createContainer(() => {
    Meteor.subscribe('group', thisUrl());
    Meteor.subscribe('users');
    Meteor.subscribe('items',thisUrl());
    return {
        group: Groups.find().fetch(),
        user: Meteor.userId(),
        users: Meteor.users.find().fetch(),
        items: Items.find({cash: {$exists: true}}, {sort: {createdAt: 1}}).fetch()
    };
}, GroupDetails);