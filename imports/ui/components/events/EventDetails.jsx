import {Meteor} from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';

import EventHead from './EventHead';

import {Events} from '../../../../imports/api/events/events';
import {Groups} from '../../../../imports/api/groups/groups';
import {Items} from '../../../../imports/api/items/items';
import {userAmount, totalCost, eventItems, thisUrl} from '../../../../imports/startup/both/helpers';

import GroupTitle from '../groups/GroupTitle';

import {EventOrder} from './EventOrder';
export class EventDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: null, left: null, item: null
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
            left: new Date()
        })
    }

    timeleft() {

        return new Date(this.state.event.date) - this.state.left > 0 ?
            moment(this.state.left).preciseDiff(moment(this.state.event.date, 'MMMM Do YYYY, HH:mm a')) :
            'event occured at: ' + this.state.event.date;
    }

    groupsInEvent() {

        const groups = this.props.groups.filter(group => this.state.event.groups.indexOf(group._id) != -1);
        return groups.map((group) => {
            return ( <GroupTitle key={group._id} group={group}/>);
        });
    }

    clickRadio(e) {
        const target = e.target;
        const item = this.state.item;
        if (target.className == 'check') {
            Meteor.call('items.notPay', item._id);
            $('#' + item._id + '-2').trigger('click');//hidden
        }else{
        if (target.id == item._id+'-0') {
            Meteor.call('items.payBy', item._id, 'cash');

        }
        if (target.id == item._id+'-1') {
            Meteor.call('items.payBy', item._id, 'coup');
        }}
     }
    itemsToOrder() {

        const user = this.props.user;
        const items = this.props.items.filter(item => eventItems(this.state.event._id).indexOf(item._id) != -1 && userAmount(item._id, user._id) != 0);

        return items.map((item) => {
            this.state.item = item;
            const amount = userAmount(item._id, user._id);
            const array = item.cart.find(cart => cart.user === user._id);
            return (  <div style={{'textAlign': 'center'}} key={item._id} className="stitched">
                <img height='100' width='100' src={item.url}/>
                <p>name: {item.itemName}</p>
                <p>ordered: {amount}</p>
                <div className="radio">
                    <input   id={`${item._id}-0`} onClick={this.clickRadio.bind(this)}
                             defaultChecked= {array.payBy == 'cash' ? 'checked' : ''}
                           className={array.payBy == 'cash' ? 'check' : ''}
                           disabled={user.wallet.cash == 0 || amount * item.cash > user.wallet.cash || item.cash == 0 ? 'disabled' : ''}
                           type="radio" name={`radio-${item._id}`}/> <i className="glyphicon glyphicon-eur"/>
                    <br/>

                    <input   id={`${item._id}-1`}  onClick={this.clickRadio.bind(this)}
                            defaultChecked= {array.payBy == 'coup' ? 'checked' : ''}
                           disabled={item.coupons == 0 || amount * item.coupons > user.wallet.coupons || user.wallet.coupons == 0 ? 'disabled' : ''}
                           className={array.payBy == 'coup' ? 'check' : ''} type="radio"/> <i
                    className="glyphicon glyphicon-piggy-bank"/>
                    <input id={`${item._id}-2`} type="radio" name={`radio-${item._id}`} hidden/>
                </div>
                <br/>
                <p>{`cost:  ${array.payBy == 'cash' ? totalCost(user._id, item._id).cash : array.payBy == 'coup' ? totalCost(user._id, item._id).cash : ''}`}</p>

            </div>)
        })
    }

    render() {
        return ( <div> { this.props.event.map((event) => {
            this.state.event = event;
            const user = this.props.user;
            const total = totalCost(user._id, eventItems(event._id));

            return (
                <div key={event._id} className="container">

                    <div className="row">

                        <div className="btn-group" role="group">

                            <Link to={`/events/${event.url}/edit`}>
                                <button type="button" className="btn btn-default">Edit event</button>
                            </Link>
                        </div>
                        <EventHead eventId={event._id} user={user._id}/>
                        <div className="media">


                            <div className="media-left media-middle">

                            </div>
                            <div className="media-body">
                                <h4 className="media-heading">Event name: {event.name}  </h4>
                                <h5>Time left: {this.timeleft()}</h5>
                                <h5>Created at: {event.createdAt}</h5>
                                <h5>Status: {event.status}</h5>

                            </div>
                            <div>{this.groupsInEvent()}</div>
                            <div>  {this.itemsToOrder()} </div>
                        </div>
                        <div>

                            {  total.cash !== 0 || total.coupons !== 0 && total.cash < user.wallet.cash && total.coupons < user.wallet.coupons?
                                <div>
                                    <p>Cash to pay: {total.cash} <i
                                        className="glyphicon glyphicon-eur"/></p>
                                    <p>Coupons to pay: {total.coupons} <i
                                        className="glyphicon glyphicon-piggy-bank"/></p>
<EventOrder event={event} user={user}/>
                                </div> : ''}
                        </div>
                    </div>
                </div>
            )
        })}
        </div> )
    }
}
EventDetails.propTypes = {
    event: PropTypes.array,
    groups: PropTypes.array,
    user: PropTypes.object,
    items: PropTypes.array,
    isConfirmed: PropTypes.number,
};

export  default   createContainer(() => {
    Meteor.subscribe('users');
    Meteor.subscribe('event', thisUrl());
    Meteor.subscribe('groups');
    Meteor.subscribe('items');
    return {
        event: Events.find().fetch(),
        groups: Groups.find().fetch(),
        user: Meteor.user(),
        items: Items.find({'cart.user': Meteor.userId()}).fetch(),
        isConfirmed: Events.find({'confirm.user': Meteor.userId(), 'confirm.answer': true}).count(),
    };
}, EventDetails);


