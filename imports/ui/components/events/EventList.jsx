import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory, Link} from 'react-router';
import {Meteor} from 'meteor/meteor';

import Profile from '../users/Profile';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import '../../stylesheets/main.less'

export class EventList extends Component {
    constructor(props) {
        super(props);
    }

    renderEvents() {
        const user = this.props.user;
        const events = this.props.events.filter(event => event.owner === user || event.confirm.filter(obj => obj.user === user));
        return events.map(function (event) {
          const author =Meteor.users.findOne({_id:event.owner});
            return (<ListItem key={event._id} onClick={()=>{  browserHistory.push( `/events/${event.url}`)}}
                      primaryText={event.name}
                              secondaryText={event.createdAt} rightAvatar={<div style={{'top':'0'}} >
                    <p><small>by</small></p>
                    <Profile user={author} name={false}/><p><small>{author.profile.name}</small></p></div>} />
             );
        });
    }

    render(){
        return( <div  >
             <List>
                <Subheader>Events List</Subheader>

                 <Divider />
                {this.renderEvents()}
            </List>
        </div>)
    }
}
EventList.propTypes = {
    events: PropTypes.array.isRequired,
    user: PropTypes.string.isRequired
};