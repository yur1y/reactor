import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';

import { totalCost, eventItems} from  '../../../../imports/startup/both/helpers.js';

export class EventOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: null
        }
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
        // Meteor.call('events.order', data.event._id, data.delivery);
        // Meteor.call('items.order', data.items, event.owner, data.delivery);
        // Meteor.call('users.orderReport', data);
        $('#exampleModal').modal('hide')
    }

    render() {
        const event = this.props.event;
        const user = this.props.user;
        const total = totalCost(user._id, eventItems(event._id));
        const canOrder = (this.state.delivery>=0 && total.cash + this.state.delivery < user.wallet.cash && total.coupons < user.wallet.coupons);
        return (
            <div>
                <button type="button" className="btn btn-primary btn-success" data-toggle="modal"
                        data-target="#exampleModal">Order
                </button>


                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="exampleModalLabel"> everything is very serious.. so.. if
                                    you here.. choose delivery type</h4>
                            </div>
                            <div className="modal-body">

                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="control-label">Recipient:</label>
                                    <input type="text" className="form-control" id="recipient-name"/>
                                </div>
                                <select onChange={() => {
                                    this.setState({delivery: Number(this.refs.deliveryInput.value)});
                                }} ref="deliveryInput"
                                        style={{'width': '172px', 'height': '30px', 'backgroundColor': 'white'}}
                                        className="input-sm">
                                    <option defaultValue disabled/>
                                    <option value="0">None, 0$</option>
                                    <option value="5">Our delivery guy,5$</option>
                                    <option value="50">Spider-man,50$</option>
                                </select>
                                <span> <input type="checkbox" className="checkbox" ref='checkboxInput'/> Get cheque email?</span>

                                {canOrder ? <div>
                                        <p>Cost: {total.cash}$ + {total.coupons} coupons </p>
                                        <p>delivery: {this.state.delivery} $ </p>
                                        <p>Total cash:{total.cash + this.state.delivery} $</p>
                                    </div> : ''}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default glyphicon glyphicon-remove"
                                        data-dismiss="modal">Close
                                </button>
                                {canOrder ? <button onClick={this.eventOrder.bind(this)} type="button"
                                                    className="btn btn-success glyphicon glyphicon-ok">Submit
                                        order</button> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
EventOrder.PropTypes = {
    event: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};