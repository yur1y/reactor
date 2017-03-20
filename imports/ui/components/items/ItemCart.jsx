import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

import {ok, userAmount, throwError} from  '../../../../imports/startup/both/helpers.js';


export class ItemCart extends Component {
    constructor(props) {
        super(props);
    }

    itemWish() {

        Meteor.call('items.wish', this.props.item._id);
    }

    toCart(event) {

        event.preventDefault();
        const amount = ReactDOM.findDOMNode(this.refs.amountInput).value.trim();
        const item = this.props.item;
        if (amount <= item.amount) {
            Meteor.call('items.inCart', item._id
                , Number(amount));
            ok(amount + '  ' + item.itemName + ' in the cart');
        } else throwError('item amount', ' you add all available ()'+ item.itemName +' to cart')
    }
    render() {
        const item = this.props.item;
        const wished = item.wish.indexOf(this.props.user) > -1;
        return (<div>
                <div className="inline">
                    <button onClick={this.itemWish.bind(this)}
                            className={wished ? 'glyphicon glyphicon-star  icon ' : 'glyphicon glyphicon-star-empty '}
                            data-toggle="tooltip" title={wished ? 'remove from wish list' : 'add to wish list'}/>
                </div>
                <div className="inline">

                    <input type="number" value={userAmount(item._id, this.props.user)} min="0" maxLength="3"
                           name="amount" onChange={this.toCart.bind(this)} ref='amountInput'
                           className=" icon   amount-input"/>
                    <button className=" glyphicon icon glyphicon-shopping-cart"
                            data-toggle="add to cart" title="add to cart" onClick={this.toCart.bind(this)}/>

                </div>
            </div>
        )
    }
}
ItemCart.PropTypes = {
    item: PropTypes.object,
    user: PropTypes.string
};
