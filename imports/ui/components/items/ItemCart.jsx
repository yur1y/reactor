import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

import {ok, userAmount, throwError} from  '../../../../imports/startup/both/helpers.js';
import IconButton from 'material-ui/IconButton';


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
            ok(item.amount + '  ' + item.itemName + ' in the cart');
        } else throwError('item amount', ' you add all available ()'+ item.itemName +' to cart')
    }
    outCart(){
        const item =this.props.item;
        Meteor.call('items.outCart',  item._id);
        ok( item.itemName + '  removed from cart');
    }
    render() {
        const item = this.props.item;
        const wished = item.wish.indexOf(this.props.user) > -1;
        const amount =userAmount(item._id, this.props.user);
        const style={'color':'white','float':'left','width':'24px','height':'24px'};
        return (<span
                  style={{ 'marginTop':'30px','display':'block'}} >
                    <input
                         style={{'background':'white','width':'25px','height':'20px','float':'left','marginTop':'15px'}}
                           type="number" value={amount!==0?amount:1} min="1"
                           name="amount" onChange={this.toCart.bind(this)} ref='amountInput'
                           className=" icon   amount-input"/>
                  <IconButton tooltip={`add ${item.itemName} to cart`}  tooltipPosition="top-center"
                       style={style}
                  >    <i className="material-icons"
                        onClick={this.toCart.bind(this)}>add_shopping_cart</i>
                  </IconButton>

                 <IconButton tooltipPosition="top-center"
                     style={style}    tooltip={wished ? `remove ${item.itemName} from wish list` : `add ${item.itemName} to wish list`}
                 >
                    <i  onClick={this.itemWish.bind(this)}
                        className='material-icons'
                     >{wished ? 'star ' : 'star_border'}</i>
                </IconButton>
                {userAmount(item._id, this.props.user)!==0? <IconButton tooltip={`remove ${item.itemName} from cart`}
                             tooltipPosition="top-center"          style={style}
                 >
                  <i className="material-icons" onClick={this.outCart.bind(this)}  >
                          remove_shopping_cart  </i>
                  </IconButton>:''}
            </span>
        )
    }
}
ItemCart.PropTypes = {
    item: PropTypes.object,
    user: PropTypes.string
};
