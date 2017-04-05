import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

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
            <div className=" confirmation">
                <Divider/>
                <RaisedButton onClick={this.handleConfirm.bind(this)} label="Confirm" fullWidth={true}
                              icon={<i  className="material-icons">thumb_up</i>}/>
                <Divider/>
                <RaisedButton onClick={this.handleUnConfirm.bind(this)}
                        fullWidth={true} label="Leave event"
                              icon={<i  className="material-icons">thumb_down</i>}/>
            </div>
        )
    }
}

EventHead.propTypes = {
    eventId: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
};