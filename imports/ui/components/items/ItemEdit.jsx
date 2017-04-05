import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';

import {ok} from  '../../../../imports/startup/both/helpers.js';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

export class ItemEdit extends Component {
    constructor(props) {
        super(props);
        this.state={
            open:false
        };
        this.handleOpen=this.handleOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
    }
    removeItem() {
        Meteor.call('items.remove', this.props.item._id, function (err, res) {
            if (res) {
                ok('item   deleted')
            }
        });
    }
    updateItem(e) {
        e.preventDefault();

        Meteor.call('items.update', this.props.item._id, e.target.nameInput .value,
            Number(e.target.cashInput .value ), Number( e.target.amountInput .value),
            Number( e.target.couponsInput .value));
    }
    handleOpen  ()   {
        this.setState({open: true});
    };

    handleClose  ()  {
        this.setState({open: false});
    };

    render() {
        const item = this.props.item;

        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                onClick={this.removeItem.bind(this)}
                label="Delete item"
                secondary={true}
                onTouchTap={this.handleClose}
            />
        ];
        const style={'color':'white','float':'right','width':'24px','height':'24px'};

        return (
            <span>
                <IconButton style={style}
                            tooltipPosition="top-center"
                            tooltip={`edit ${item.itemName}`} onClick={this.handleOpen}><EditorModeEdit color={'white'}/></IconButton>
                <Dialog
                    title={`Editing ${item.itemName}`}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    < Paper zDepth={2}>
                        <form onSubmit={this.updateItem.bind(this)}>
                            <div>
                                <TextField type="text" minLength="3"
                                           defaultValue={item.itemName} required="required" underlineShow={false}
                                           name="nameInput"/>
                                <Divider />
                                <TextField type="number" defaultValue={item.cash} underlineShow={false}
                                           required="required" name="cashInput"/>
                                <Divider />
                                <TextField type="number" defaultValue={item.amount} underlineShow={false}
                                           required="required" name="amountInput"/>
                                <Divider />
                                <TextField type="number" defaultValue={item.coupons} min="0" underlineShow={false}
                                           required="required" name="couponsInput"/>
                            </div>
                            <FlatButton fullWidth={true}
                                        label="Update"
                                        primary={true}
                                        keyboardFocused={true}
                                        onTouchTap={this.handleClose}
                                        type="submit"/>
                        </form>
                    </Paper>
                </Dialog>
            </span>
        );
    }
}
ItemEdit.PropTypes = {
    item: PropTypes.object,
};
