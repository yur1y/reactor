import {Meteor} from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {userAmount, totalCost, eventItems} from '../../../../imports/startup/both/helpers';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';

import Subheader from 'material-ui/Subheader';
import {RadioButton,RadioButtonGroup} from 'material-ui/RadioButton';
import  EditorAttachMoney from  'material-ui/svg-icons/editor/attach-money';
import  ActionPayment from 'material-ui/svg-icons/action/payment';

export class EventItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: null
        }
    }

    clickRadio(item) {
        const checked = $('input[name='+item._id+']:checked');
        if (checked.attr('id')){
            Meteor.call('items.notPay', item._id);
            $('#' + item._id+'-2').trigger('click');//hidden
        }else {
            Meteor.call('items.payBy', item._id, checked.val());
        }
    }
    render() {
        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            gridList: {
                width: 550,
                height: 500,
                overflowY: 'auto',
                marginLeft:'20%'
            },
            block: {
                maxWidth: 250,
            },
            white:{
                color:'white'
            },
            radioButton: {
                color:'white'
            },
            fakeRadio:{
                display:'none',
            }
        };
        const user = this.props.user;
        const items = this.props.items.filter(item => eventItems(this.props.event._id).indexOf(item._id) !== -1 && userAmount(item._id, user._id) !== 0);
        return (
            <GridList
                cellHeight={200}
                style={styles.gridList}
            >
                <Subheader>Choose payment method (or none) for each cart position </Subheader>
                {items.map((item) => {
                    const amount = userAmount(item._id, user._id);
                    const array = item.cart.find(cart => cart.user === user._id);

                    return    <GridTile
                        key={item._id}
                        title={item.itemName}
                        subtitle={<span>amount: {amount} ,
                               <b>{`  ${array.payBy === 'cash' ? 'cost: '+item.cash +' $ '  +' * ' +amount +' ='+ totalCost(user._id, item._id).cash+' $' : array.payBy === 'coup' ? 'cost: '+item.cash +' $ '  +' * ' +amount +' ='+ totalCost(user._id, item._id).coupons +'coupons' : 'not checked'}`}</b></span>}
                        actionIcon={<div key={1}>
                            <RadioButtonGroup name={item._id} valueSelected={array.payBy === 'cash'?'cash': array.payBy === 'coup'?'coup':null} >
                                <RadioButton style={styles.radioButton} uncheckedIcon={<EditorAttachMoney />} checkedIcon={<EditorAttachMoney/>}  id={array.payBy === 'cash'?`${item._id}-0`:null}
                                             value="cash"
                                             disabled={user.wallet.cash === 0 || amount * item.cash > user.wallet.cash || item.cash === 0  }
                                             onClick={this.clickRadio.bind(this,item)}  />
                                <RadioButton style={styles.radioButton} uncheckedIcon={ <ActionPayment/>}  checkedIcon={<ActionPayment/>}    id={array.payBy === 'coup'?`${item._id}-1`:null}
                                             value="coup"
                                             disabled={item.coupons === 0 || amount * item.coupons > user.wallet.coupons || user.wallet.coupons === 0 }
                                             onClick={this.clickRadio.bind(this,item)}     />
                                <RadioButton style={styles.fakeRadio} id={`${item._id}-2`}   />
                            </RadioButtonGroup>
                        </div>}>
                        <img height={200} width={200} src={item.url}/>
                    </GridTile>
                })}


            </GridList>
        );

    }
}
EventItems.propTypes = {
    event: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,

};

