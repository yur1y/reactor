import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory, Link} from 'react-router';
import {Meteor} from 'meteor/meteor';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';

import {Events} from '../../../../imports/api/events/events.js'
import {ok} from '../../../../imports/startup/both/helpers';

import {EventList} from './EventList';

import '../../stylesheets/main.less'

export class EventPage extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        event.preventDefault();
        const name = event.target.nameInput.value;
        Meteor.call('events.insert', name, (err, res) => {
            if (res) {
                ok('Event  ' + name + ' created')
            }
        });
        event.target.nameInput.value = '';
    }

    render(){
        return( <div className="container">
            <List>
                <Subheader>Add Event</Subheader><form  onSubmit={this.handleSubmit.bind(this)}>
                <TextField underlineShow={false}
                    hintText="e.g. myEvent" name="nameInput"
                    floatingLabelText="Event name"   fullWidth={true}
                /></form>
            </List>
    <EventList events={this.props.events} user={this.props.user}/>
        </div>)
    }
}
EventPage.propTypes = {
    events: PropTypes.array.isRequired,
    user: PropTypes.string
};
export  default   createContainer(() => {
    Meteor.subscribe('events');
    Meteor.subscribe('users');
    return {
        events: Events.find({}).fetch(),
        user: Meteor.userId()
    };
}, EventPage);