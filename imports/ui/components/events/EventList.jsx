import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {IndexLink, Link} from 'react-router';
import {Meteor} from 'meteor/meteor';

import {Events} from '../../../../imports/api/events/events.js'
import {ok} from '../../../../imports/startup/both/helpers';

import '../../stylesheets/navigation.less'

export class EventList extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        $(document).ready(function () {
            $("#myTab a").click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        Meteor.call('events.insert', name, (err, res) => {
            if (res) {
                ok('Event  ' + name + ' created')
            }
        });
        ReactDOM.findDOMNode(this.refs.nameInput).value = '';
    }

    renderEvents() {
        const user = this.props.user;
        const events = this.props.events.filter(event => event.owner == user || event.confirm.filter(obj => obj.user == user));
        return events.map(function (event) {
            return (<div key={event._id}>
                <Link key={event.url} to={`/events/${event.url}`}>
                    <h4>{event.name}      </h4>
                </Link>
            </div>);
        });
    }

    render() {
        return (
            <div className="container">

                <div className="bs-example">
                    <ul className="nav nav-tabs" id="myTab">
                        <li><a className="active glyphicon glyphicon-globe" href="#sectionA">Events</a></li>
                        <li><a className=" glyphicon glyphicon-plus" href="#sectionB">Add Event</a></li>
                    </ul>
                    <br/>
                    <div className="tab-content">

                        <div id="sectionA" className="tab-pane fade in active">
                            {this.renderEvents()}
                        </div>
                        <div id="sectionB" className="tab-pane fade in  ">

                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <input type="text" required="required" minLength="3" className="form-control"
                                       placeholder="Event name" ref="nameInput"/>

                                <button className=" btn btn-default" type='submit'>
                                    add event
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
EventList.propTypes = {
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
}, EventList);