import {Meteor} from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {getSlug} from 'meteor/ongoworks:speakingurl';
import ReactDOM from 'react-dom';
import {DateTimePicker} from 'meteor/alonoslav:react-datetimepicker-new';

import {Events} from '../../../../imports/api/events/events';
import {Groups} from '../../../../imports/api/groups/groups';
import { thisUrl} from '../../../../imports/startup/both/helpers';

import GroupTitle from '../groups/GroupTitle';

export class EventEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: null, group: null, newDate: null
        }
    }


    updateEvent(event) {
        event.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const date = this.state.newDate;
        const status = ReactDOM.findDOMNode(this.refs.statusInput).value.trim();

console.log(status);
        if (name.length >= 3) {
            Meteor.call('events.update', this.state.event._id, name, date, this.state.event.name, status,
                function (err, res) {
                    if (!err) {
                        browserHistory.push(`/events/${getSlug(name)}/edit`);
                    }
                });
        }
    }

    manageGroup() {
        const event = this.state.event;
        const group = this.state.group;
        Meteor.call('events.group', event._id, group._id);
        if (event.groups.indexOf(group._id) == -1) {
            Meteor.call('events.confirm', event._id, group.users, false);
        }
        else {
            Meteor.call('events.unConfirm', event._id, group.users);
        } //ask users to confirm group

    }

    removeEvent() {
        Meteor.call('events.remove', this.state.event._id);
        browserHistory.push('/events');
    }

    eventGroups() {

        const event = this.state.event;
        return (<div>
            {this.props.groups.map((group) => {
                this.state.group = group;
                return (<div key={group._id}>
                        <GroupTitle group={group}/>
                        <button onClick={this.manageGroup.bind(this)}
                                className="btn btn-default glyphicon">{event.groups.indexOf(group._id) == -1 ?
                            <i className="glyphicon-plus">add group</i> :
                            <i className="glyphicon-minus">remove group</i>
                        }</button>
                    </div>
                )
            })}
        </div>)
    }

    render() {
        const hideOnInit = (calendarInstance) => calendarInstance.hide();

        const options = {
            inline: true,
            sideBySide: true,
            format: 'MMMM DD, YYYY HH:mm',
            defaultDate: this.props.event.date,
            minDate: moment().format('YYYY-MM-DDTHH:mm'),
            icons: {
                time: "glyphicon glyphicon-time",
                date: "glyphicon glyphicon-calendar",
            }
        };


        return (<div>{this.props.event.map((event) => {
            this.state.event = event;

            const user = this.props.user;
            return (  <div key={event._id} className="container">
                {event.owner == user ?
                    <div className="row ">

                        <div className="btn-group" role="group">

                            <Link to={`/events/${event.url}`}>
                                <button type="button" className="btn btn-default">Back</button>
                            </Link>
                        </div>
                        <div className="media">
                            <form onSubmit={this.updateEvent.bind(this)}>
                                <input ref="nameInput" className="input-sm" type="text" placeholder={event.name}/>
                                <br/>
                                <select ref="statusInput" style={{'width': '172px', 'height': '30px', 'backgroundColor': 'white'}}
                                        className="input-sm">
                                    {/*<option value="" disabled>Status :{event.status}</option>*/}
                                    <option value="ordering">Ordering</option><option value="ordered">Ordered</option>
                                    <option value="delivering">Delivering</option><option value="delivered">Delivered</option>
                                </select>
                                <br/>
                                <div style={{'position': 'relative'}}>
                                    <DateTimePicker
                                        id="exampleId"
                                        onDateChanged={(newDate) => this.state.newDate = newDate}
                                        options={options}
                                        dateTimePickerMount={hideOnInit}
                                    /></div>
                                <button onClick={this.removeEvent.bind(this)}
                                        className="btn btn-default glyphicon glyphicon-remove">Delete
                                </button>
                                <button className="btn btn-default glyphicon glyphicon-ok" type="submit">
                                    Update
                                </button>
                                <br/>
                            </form>
                            <div>
                                {this.eventGroups()}
                            </div>
                        </div>

                    </div>
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
