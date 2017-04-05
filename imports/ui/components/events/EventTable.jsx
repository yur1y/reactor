import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import EventHead from './EventHead';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {RadioButton,RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';

import {EventItems} from "./EventItems";
import {GroupsList} from "../groups/GroupList";

export class EventTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
             left: null, item: null,
        }
    }
    componentDidMount() {
        this.interval = setInterval(this.tick.bind(this), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    tick() {
        this.setState({
            left: new Date(),
        })
    }
    timeleft() {
        return new Date(this.props.event.date) - this.state.left > 0 ?
            moment(this.state.left).preciseDiff(moment(this.props.event.date, 'MMMM Do YYYY, HH:mm a')) :
            'was at: ' + this.props.event.date;
    }

    groupsInEvent() {
        const groups = this.props.groups.filter(group => this.props.event.groups.indexOf(group._id) !== -1);
        return (<GroupsList groups={groups}/>);
    }

    render() {
const event =this.props.event,user=this.props.user;
        return ( <div>

            {event.owner===user._id?
                <Link to={`/events/${event.url}/edit`}>
                    <RaisedButton label="Edit event" fullWidth={true}/>
                </Link>:''}
            <Divider/>
            <EventHead eventId={event._id} user={user._id}/>
            <Paper>
                <Table fixedHeader={true} selectable={false}>
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn colSpan="4"   style={{textAlign: 'center'}}>
                                <h1>{event.name}</h1>
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="The Name">NAME</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Time left">TIME LEFT</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Created at">CREATED AT</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Status">STATUS</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}>
                        <TableRow key={1} >
                            <TableRowColumn>{event.name}</TableRowColumn>
                            <TableRowColumn>{this.timeleft()}</TableRowColumn>
                            <TableRowColumn>{event.createdAt}</TableRowColumn>
                            <TableRowColumn>{event.status}</TableRowColumn>
                        </TableRow>

                    </TableBody>
                </Table>
                <List>
                    <Subheader id="groups-subheader">Groups that take part in {event.name}</Subheader>
                    {this.groupsInEvent()}</List>

                 <EventItems event={event} user={user} items={this.props.items}/>
            </Paper>
        </div> )
    }
}
EventTable.propTypes = {
    event: PropTypes.object.isRequired,
    groups: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
};