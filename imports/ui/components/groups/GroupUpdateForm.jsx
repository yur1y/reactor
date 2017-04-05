import {Meteor} from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {getSlug} from 'meteor/ongoworks:speakingurl';

import { ok, noLogo} from '../../../startup/both/helpers';
import {itemInsert} from '../../../api/items/methods';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

export class GroupUpdateForm extends Component {
    constructor(props) {
        super(props);
    }

    updateGroup(event) {
        event.preventDefault();
        const name = event.target.nameInput.value;

        if (name.length >= 3) {
            Meteor.call('groups.update', this.props.group._id, name, event.target.openInput.checked, this.props.group.name);
            browserHistory.push(`/groups/${getSlug(name)}/edit`);
        }
    }
    removeGroup() {
        Meteor.call('groups.remove', this.props.group._id, this.props.group.url, function (err, res) {
            if (res) {

                ok('group deleted');
                browserHistory.push('/groups');
            }
        });

    }
    newLogo() {
        itemInsert(this.props.group.url, this.props.group._id, this.props.group.logo);
    }
    removeLogo() {
        if (this.props.group.logo !== noLogo()) {
            Meteor.call('items.remove', this.props.group.logo);
            Meteor.call('groups.noLogo', this.props.group._id);
            ok('no logo');
        }
    }

    render() {
        const style ={
            marginLeft: 20
            ,  block: {
                maxWidth: 250,
            },
            checkbox: {
                marginBottom: 16,
            },
        };
        return ( <div>
            <Paper zDepth={2}>
                <div className="media-left media-middle "
                     data-toggle="tooltip"
                     title=" click to delete current logo"><i onClick={this.removeLogo.bind(this)}
                                                              className="glyphicon glyphicon-remove-circle"/>
                    <img onMouseDown={this.newLogo.bind(this)} src={this.props.group.logo} width="200" id="replace-logo"
                         data-toggle="tooltip" title="click to choose new logo"/>

                </div>
                <form onSubmit={this.updateGroup.bind(this)}>
                    <TextField  fullWidth={true}   id="input-name" defaultValue={this.props.group.name}
                                name='nameInput' minLength="3" hintText="group name" style={style}  />
                    <Divider />

                    <Checkbox
                        label={this.props.group.open ? 'Status: public' : 'Status: closed'}
                        labelPosition="left" style={style.checkbox}
                        defaultChecked={this.props.group.open} name="openInput"
                        checkedIcon={<Visibility />}
                        uncheckedIcon={<VisibilityOff />}
                    />
                    <RaisedButton fullWidth={true} type="submit" label="Update" />
                </form>
                <RaisedButton  fullWidth={true} onClick={this.removeGroup.bind(this)} label="delete" />

            </Paper>
        </div> )
    }
}
GroupUpdateForm.propTypes = {
    group: PropTypes.object.isRequired
};
