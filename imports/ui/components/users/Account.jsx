import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';

import {Items} from '../../../../imports/api/items/items';
import {Groups} from '../../../../imports/api/groups/groups';
import {Events} from '../../../../imports/api/events/events';

import {createContainer} from 'meteor/react-meteor-data';
import  Profile  from './Profile';
import {GroupsList} from '../groups/GroupList';
import {EventList} from '../events/EventList';
import {ItemsData} from "../items/ItemsData";

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

export  class Account extends Component  {
   constructor(props){
       super(props);

   }
    accountInfo(){
        const user =this.props.user;
        return (<div key='account' style={{'width':'50%','margin':'0 auto'}}>
                <Profile user={user} name={true}/>
               <div > <h5>Cash: {user&& user.wallet? user.wallet.cash+' $' :''}</h5>
                   <h5>Coupons: {user&& user.wallet?  user.wallet.coupons :''}</h5></div>
            </div>
        )
    }
   renderGroups(){
       const user =this.props.user;
     const groups=  this.props.groups.filter(group => group.users ===user._id || group.owner ===user._id);
       return  (<div>
           <GroupsList groups={groups} />
       </div>)

   }
   userItems() {
       return (<ItemsData items={this.props.items} user={this.props.user._id}/>);
   }

    render() {
        return (<div className="container">
            <Paper >

                <Paper>
                    <Subheader>Your Account </Subheader>
                    {this.accountInfo()}
                </Paper>
                <Paper>
                    <Subheader>Your Events</Subheader>
                    <EventList events={this.props.events} user={this.props.user._id} />

                </Paper>
                <Divider/>
                <Paper>
                    <Subheader>Your groups</Subheader>
                    {this.renderGroups()}
                </Paper>
                <Paper>
                    <Subheader>Your Items</Subheader>
                    {this.userItems()}
                </Paper>
            </Paper>
        </div> )

    }
}
Account.propTypes = {
    user: PropTypes.object,
    groups:PropTypes.array,
    events:PropTypes.array,
    items:PropTypes.array,
};

export  default   createContainer(() => {
    Meteor.subscribe('users');
    Meteor.subscribe('groups');
    Meteor.subscribe('events');
    Meteor.subscribe('items');

    return {
        user:Meteor.user(),
        groups: Groups.find({}).fetch(),
        events:Events.find({$and: [{'confirm.user': Meteor.userId()}, {'confirm.answer': true}]}).fetch(),
        items:Items.find({$or:[{'cart.user': Meteor.userId()},
            {wish: Meteor.userId()}]}).fetch()
    };
}, Account);