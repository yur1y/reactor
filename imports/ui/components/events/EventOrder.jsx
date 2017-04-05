import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

import CommunicationEmail from 'material-ui/svg-icons/communication/email'
import NavigationCancel from  'material-ui/svg-icons/navigation/cancel';
import  ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import {totalCost, eventItems} from  '../../../../imports/startup/both/helpers.js';

export class EventOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: false,open:false
        };
        this.handleClose=this.handleClose.bind(this);
        this.handleOpen =this.handleOpen.bind(this);
    }
    handleOpen()  {
        this.setState({open: true});
    }

    handleClose   ()  {
        this.setState({open: false});
    }


    eventOrder() {
        let event = this.props.event;
        let data = {
            items: eventItems(event._id, this.props.user._id),
            delivery: this.state.delivery,
            event: event,
            email: this.refs.checkboxInput.checked,
            owner: Meteor.users.findOne({_id: event.owner})
        };
        Meteor.call('events.order', data.event._id, data.delivery);
        Meteor.call('items.order', data.items, event.owner, data.delivery);
        Meteor.call('users.orderReport', data);

    }
    handleChange (event, index, delivery) {
        this.setState({delivery});
    }
    render() {
        const event = this.props.event;
        const user = this.props.user;
        const total = totalCost(user._id, eventItems(event._id));
        const canOrder = typeof this.state.delivery ==='number'  && total.cash + this.state.delivery <= user.wallet.cash && total.coupons <= user.wallet.coupons;
        const actions = [
            <FlatButton
                label="Cancel order"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
            canOrder?  <FlatButton onClick={this.eventOrder.bind(this)}
                label="Submit Order"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />:'',
        ] ;
        return (
            <div style={{'display':'inline-block'}}>
                <RaisedButton icon={<ActionDoneAll color="white" />}  label="Order selected" primary={true}  onTouchTap={this.handleOpen} />
                <Dialog
                    title=" to get or not to get an email - this is a question "
                    titleStyle={{'textAlign':'center'}}
                    actions={actions}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>

<div style={{'width':'50%','margin':'0 auto'}} >

    <SelectField style={{'width':'360px'}} value={this.state.delivery} floatingLabelText="Choose Delivery type" onChange={this.handleChange.bind(this)} ref="deliveryInput">
        <MenuItem value={0} primaryText="None, 0$"/>
        <MenuItem value={5} primaryText="Our delivery guy,5$"/>
        <MenuItem value={50} primaryText="Spider-man,50$"/>
    </SelectField>

    <Checkbox
        label='Get cheque email?'
        labelPosition="left"
        ref='checkboxInput'
        checkedIcon={ <CommunicationEmail  />  }
        uncheckedIcon={ <NavigationCancel   />  }
        style={{'marginBottom': '16px'}}
    />
    <Paper>
        {canOrder ? <div>
            <Subheader>Cost: {total.cash}$  , {total.coupons} coupons </Subheader>
            <Subheader>delivery: {this.state.delivery} $ </Subheader>
            <Subheader>Items price $ + delivery$: {total.cash + this.state.delivery} $</Subheader>
        </div> : ''}
    </Paper>
</div>


                   </Dialog>

            </div>
        )
    }
}
EventOrder.PropTypes = {
    event: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};