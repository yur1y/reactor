import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {Meteor} from 'meteor/meteor';


import {Items} from '../../../../imports/api/items/items';
import {Groups} from '../../../../imports/api/groups/groups';
import {Events} from '../../../../imports/api/events/events';
import  GroupTitle  from '../groups/GroupTitle';
import {createContainer} from 'meteor/react-meteor-data';
import {ok} from '../../../../imports/startup/both/helpers';
import  Profile  from './Profile';
import  ItemCart  from '../items/ItemCart';
export  class Account extends Component {
   constructor(props){
       super(props);


   }

   renderGroups(){
       const user =this.props.user;
     const groups=  this.props.groups.filter(group => group.users ==user._id || group.owner ==user._id);
           return  groups.map( (group)=> {
               return (<GroupTitle key={group._id} group={group}/>);
           });

   }
   renderEventS(){
       return this.props.events.map((event)=>{
           return (<div key={event._id}><h3><Link to={event.url}>{event.name}</Link></h3></div>)
       })
   }
   wishedItems(){
       const items =this.props.items.filter(item => item.wish.indexOf(this.props.user._id)!=-1);
       return items.map((item) => {
           return (<div key={item._id}>

               <div className="stitched">

                   <img height="100" width="100" src={ item.url}  />
                       <p>name: {item.itemName}</p>
                       <p> price: {item.cash } $</p>
                   {  item.coupons!=0 ?
                       <p>Coupons price:{item.coupons} </p>:''  }
                       <div className="inline">
                           <ItemCart item={item} user={this.props.user._id} />

                       </div>
               </div>
               {!item? <h6>empty,but you can add?)</h6>:''}
           </div>)
       });
   }
   cartItems(){

       return this.props.cartItems.map((item) => {
           return (<div key={item._id}>

               <div className="stitched">

                   <img height="100" width="100" src={ item.url}  />
                   <p>name: {item.itemName}</p>
                   <p> price: {item.cash } $</p>
                   {  item.coupons!=0 ?
                       <p>Coupons price:{item.coupons} </p>:''  }
                   <div className="inline">
                       <ItemCart item={item} user={this.props.user._id} />

                   </div>
               </div>
               {/*{!item? <h6>empty,but you can add?)</h6>:''}*/}
           </div>)
       });
   }
    render() {
        const user = this.props.user;

        return (
            <div className="container">

                <div className="bs-example">
                    <ul className="nav nav-tabs" id="myTab">
                        <li><a className="active glyphicon glyphicon-globe" href="#events">Events</a></li>
                        <li><a className=" glyphicon glyphicon-plus" href="#account">Account</a></li>
                        <li><a className=" glyphicon glyphicon-plus" href="#cart">Cart</a></li>
                        {(user && user.roles)&& user.roles.indexOf('admin') != -1 ?
                            <li><a className=" glyphicon glyphicon-plus" href="#dashboard">Dashboard</a></li>:''}
                    </ul>
                    <br/>
                    <div className="tab-content">
                        <div id="events" className="tab-pane fade in active">
                            <h4>Your groups</h4>
                            {this.renderGroups()}
                            <h4>Your events</h4>
                            {this.renderEventS()}
                        </div>
                        <div id="account" className="tab-pane fade in  ">
                                <Profile user={user}/>
                                {/*<h5>Cash: { user.wallet.cash }</h5>*/}
                                {/*<h5>Coupons: { user.wallet.coupons }</h5>*/}
                        </div>
                        <div id="cart" className="tab-pane fade in  ">
                        <div>
                            <h4>Wished List</h4>
                            {this.wishedItems()}
                            <h4>Items in cart</h4>
                            {this.cartItems()}
                        </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Account.propTypes = {
    user: PropTypes.object,
    groups:PropTypes.array,
    events:PropTypes.array,
    users:PropTypes.array,
    items:PropTypes.array,
    cartItems:PropTypes.array
};

export  default   createContainer(() => {
    Meteor.subscribe('groups');
    Meteor.subscribe('events');
    Meteor.subscribe('account');
    Meteor.subscribe('items');
    return {
        user:Meteor.user(),
        groups: Groups.find({}).fetch(),
        events:Events.find({$and: [{'confirm.user': Meteor.userId()}, {'confirm.answer': true}]}).fetch(),
        users:Meteor.users.find({}).fetch(),
        items:Items.find({}).fetch(),
        cartItems:Items.find({'cart.user': Meteor.userId()}).fetch()
    };
}, Account);