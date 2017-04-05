import {Meteor} from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {Events} from '../../../../imports/api/events/events';
import {Groups} from '../../../../imports/api/groups/groups';
import {Items} from '../../../../imports/api/items/items';
import { totalCost, eventItems, thisUrl} from '../../../../imports/startup/both/helpers';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';

import Subheader from 'material-ui/Subheader';
import {RadioButton,RadioButtonGroup} from 'material-ui/RadioButton';
import  EditorAttachMoney from  'material-ui/svg-icons/editor/attach-money';
import  ActionPayment from 'material-ui/svg-icons/action/payment';
import Paper from 'material-ui/Paper';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';

import {EventOrder} from './EventOrder';
import {EventTable} from "./EventTable";
export class EventDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: null

        }
    }


    scrollToGroups(){
        $('html, body').animate({
            scrollTop: $("#groups-subheader").offset().top
        }, 500);

    }

    render() {

        return ( <div> { this.props.event.map((event) => {

            const user = this.props.user;
            const total = totalCost(user._id, eventItems(event._id));

            return (
                <div key={event._id} className="container">

              <EventTable event={event} groups={this.props.groups} user={user} items={this.props.items}/>
                        <Paper>

                            <Paper> <Subheader>tip: to remove items go to Groups that take part in <Link onClick={this.scrollToGroups.bind(this)} to={window.location.pathname} >{event.name}</Link> and
                                <i color="white" className="material-icons" >
                                    remove_shopping_cart  </i>  </Subheader>
                                    <Subheader>  Cash to pay: {total.cash} <EditorAttachMoney/>
                                                             Coupons to pay: {total.coupons} <ActionPayment/>
                                        {  total.cash !== 0 || total.coupons !== 0 && total.cash < user.wallet.cash && total.coupons < user.wallet.coupons?
                                        <EventOrder event={event} user={user}/>:'' } </Subheader>
                                </Paper>
                        </Paper>
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
