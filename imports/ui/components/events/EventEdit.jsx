import {Meteor} from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {getSlug} from 'meteor/ongoworks:speakingurl';

import {DateTimePicker} from 'meteor/alonoslav:react-datetimepicker-new';

import {Events} from '../../../../imports/api/events/events';
import {Groups} from '../../../../imports/api/groups/groups';
import { thisUrl} from '../../../../imports/startup/both/helpers';

import GroupTitle from '../groups/GroupTitle';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {EventUpdateForm} from "./EventUpdateForm";

export class EventEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: null, group: null, newDate: null,status:null
        }
    }

    manageGroup() {
        const event = this.state.event;
        const group = this.state.group;
        Meteor.call('events.group', event._id, group._id);
        if (event.groups.indexOf(group._id) === -1) {
            Meteor.call('events.confirm', event._id, group.users, false);
        }
        else {
            Meteor.call('events.unConfirm', event._id, group.users);
        } //ask users to confirm group

    }

    eventGroups() {
        const event = this.state.event;
        return (<div>
            {this.props.groups.map((group) => {
                this.state.group = group;
                const style={'textAlign':'center','height':'72px','width':'150px'};
                return (<div key={group._id}>
                        <Paper  style={{'zIndex':'1'}}> <GroupTitle group={group}/></Paper>
<div style={{'float':'left','marginTop':'-72px','marginLeft':'300px','zIndex':'2'}} >
                            <RaisedButton labelStyle={{'top':'50%'}} style={style}  buttonStyle={ style} onClick={this.manageGroup.bind(this)}
                                        label=  {event.groups.indexOf(group._id) === -1 ?
                                              'add group' :
                                              'remove group'}     />
                             </div></div>
                )
            })}
        </div>)
    }

    render() {
        return (<div>{this.props.event.map((event) => {
            this.state.event = event;

            const user = this.props.user;
            return (  <div key={event._id} className="container">
                {event.owner === user ?
                    <Paper>
                            <Link to={`/events/${event.url}`}><RaisedButton fullWidth={true}  label="Back"/>
                            </Link>
                        <div style={{'width':'50%','margin':'0 auto'}}>
                          <EventUpdateForm event={event}/>
                            <div>
                                {this.eventGroups()}
                            </div>
                        </div>

                    </Paper>
                    : 'owner only' }
            </div>)

        })
        }</div>)
    }
}
EventEdit.propTypes = {
    event: PropTypes.array,
    groups: PropTypes.array,
    user: PropTypes.string,
};
export default createContainer(() => {
    Meteor.subscribe('users');
    Meteor.subscribe('event', thisUrl());
    Meteor.subscribe('groups');
    return {
        event: Events.find().fetch(),
        groups: Groups.find().fetch(),
        user: Meteor.userId(),
    };
}, EventEdit);
