import React, {Component} from 'react';


import {UploadFS} from 'meteor/jalik:ufs';
import { thisUrl} from  '../../../../imports/startup/both/helpers.js';

import {itemInsert} from '../../../api/items/methods';
import {GridList, GridTile} from 'material-ui/GridList';
import {List,ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';


import ContentInbox from 'material-ui/svg-icons/content/inbox';
import RaisedButton from 'material-ui/RaisedButton';

import '../../stylesheets/main.less'

export class ItemAdd extends Component {
    constructor(props) {
        super(props);
        this.state={open:false}
    }

    handleSubmit(event) {
        event.preventDefault();
        const e = event.target;
        const name = e.nameInput.value ;
        const cash =e.cashInput.value;
        const amount =e.amountInput.value;

        itemInsert(thisUrl(), name, cash, amount);

    }

    render(){
        return( <div>
            <List>
                <ListItem disableKeyboardFocus={true}
                    primaryText="Add Item"
                    leftIcon={<ContentInbox />}
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    nestedItems={[<ListItem  disableKeyboardFocus={true}      key={1} >
                        <form    key={2} className="new-group" onSubmit={this.handleSubmit.bind(this)}>
                            <TextField  style={{'transition':'all'}}  key={0} type="text" required="required" minLength="3"
                                        underlineShow={false}      placeholder="item name" name="nameInput"/>

                            <TextField  style={{'transition':'all'}}   key={1} type="number" required="required" min='1'
                                        underlineShow={false}   placeholder="price,$" name="cashInput"/>

                            <TextField style={{'transition':'all'}}  key={2} type="number" required="required" min="1"
                                       underlineShow={false}       placeholder="amount" name="amountInput"/>

                            <RaisedButton   label="choose image for item & add it" type='submit'/>
                        </form>
                    </ListItem>  ]}
                />

            </List>
        </div>)
    }

}
