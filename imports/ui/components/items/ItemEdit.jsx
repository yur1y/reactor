import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

import {ok} from  '../../../../imports/startup/both/helpers.js';


export class ItemEdit extends Component {
    constructor(props) {
        super(props);
    }

    removeItem() {
        Meteor.call('items.remove', this.props.item._id, function (err, res) {
            if (res) {
                ok('item   deleted')
            }
        });
        $('.bs-example-modal-sm').modal('hide');
    }

    updateItem(event) {
        event.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const cash = ReactDOM.findDOMNode(this.refs.cashInput).value.trim();
        const amount = ReactDOM.findDOMNode(this.refs.amountInput).value.trim();
        const coupons = ReactDOM.findDOMNode(this.refs.couponsInput).value.trim();

        Meteor.call('items.update', this.props.item._id, name,
            Number(cash), Number(amount), Number(coupons));
        $('.bs-example-modal-sm').modal('hide');
    }

    render() {
        const item = this.props.item;
        return (
            <div>
                <button type="button" className="btn btn-default" data-toggle="modal"
                        data-target=".bs-example-modal-sm" value='edit'/>

                <div className="modal fade bs-example-modal-sm" tabIndex="-1" role="dialog"
                     aria-labelledby="mySmallModalLabel">
                    <div className="modal-dialog  modal-sm" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="gridSystemModalLabel" value={item.itemName}/>
                            </div>

                            <div className="modal-body">

                                <form onSubmit={this.updateItem.bind(this)}>
                                    <div>
                                        <input className="form-control" type="text" minLength="3"
                                               placeholder={item.itemName} required="required" ref="nameInput"/>
                                        <input className="form-control" type="number" placeholder={item.cash}
                                               required="required" ref="cashInput"/>
                                        <input className=" form-control " type="number" placeholder={item.amount}
                                               required="required" ref="amountInput"/>
                                        <input className="form-control" type="number" placeholder={item.coupons} min="0"
                                               required="required" ref="couponsInput"/>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-default update glyphicon glyphicon-ok"
                                                type="submit" value='submit'/>

                                        <button className="btn btn-danger remove glyphicon glyphicon-remove"
                                                type="button" data-toggle="tooltip" title="are you sure?"
                                                onClick={this.removeItem.bind(this)} value='delete'/>


                                        <button type="button" className="btn btn-default" data-dismiss="modal"
                                                value='Close'/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
ItemEdit.PropTypes = {
    item: PropTypes.object,
};
