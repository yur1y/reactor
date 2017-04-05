import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { Link} from 'react-router';
import {Meteor} from 'meteor/meteor';

import {Groups} from '../../../../imports/api/groups/groups.js'
import {ok} from  '../../../../imports/startup/both/helpers.js';


import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import {GroupsList} from './GroupList';

export class GroupsPage extends Component {
    constructor(props) {
        super(props);
    }



    handleSubmit(event) {
        event.preventDefault();
        const name = event.target.nameInput.value;
        Meteor.call('groups.insert', name, function (err, res) {
            if (res) {
                ok('group ' + name + ' created');
            }
        });
        console.log(name);
        event.target.nameInput.value = '';
    }

    render(){
        return( <div className="container">
            <List>
                <Subheader>Add Group</Subheader>
                <form  onSubmit={this.handleSubmit.bind(this)}>
                <TextField underlineShow={false}
                    hintText="e.g. myGroup" name="nameInput"
                    floatingLabelText="Group name"   fullWidth={true}
                /></form>

    <GroupsList groups={this.props.groups}/>
            </List> </div>)
    }

}

GroupsPage.propTypes = {
    groups: PropTypes.array.isRequired,
};
export  default   createContainer(() => {
    Meteor.subscribe('groups');
    Meteor.subscribe('users');
    return {
        groups: Groups.find({}).fetch(),
    };
}, GroupsPage);