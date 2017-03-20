import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';

export default class EventHead extends Component {

    constructor(props) {
        super(props);

    }

    handleConfirm() {

        Meteor.call('events.confirm', this.props.eventId, this.props.user, true);
        $('.confirmation').css('display', 'none')
    }

    handleUnConfirm() {
        Meteor.call('events.unConfirm', this.props.eventId, this.props.user);
        $('.confirmation').css('display', 'none');
        browserHistory.push('/events')
    }

    render() {

        return (
            <div className="btn-group confirmation">
                <button onClick={this.handleConfirm.bind(this)}
                        className="btn btn-default glyphicon glyphicon-thumbs-up">Confirm
                </button>
                <button onClick={this.handleUnConfirm.bind(this)}
                        className="btn btn-default glyphicon glyphicon-thumbs-down">Leave event
                </button>
            </div>
        )
    }
}

EventHead.propTypes = {
    eventId: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
};