import React, {Component, PropTypes} from 'react';

import {createContainer} from 'meteor/react-meteor-data';
import { Link} from 'react-router';
import GroupTitle from './GroupTitle';

import '../../stylesheets/main.less'

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

export class GroupsList extends Component {
    constructor(props) {
        super(props);
    }

    renderGroups() {
        return this.props.groups.map( (group)=> {
            return (<GroupTitle key={group._id} group={group}/>);
        });
    }

    render(){
        return( <div >
            <List>
                <Subheader>Groups List</Subheader>
                <Divider/>
                {this.renderGroups()}
            </List>
        </div>)
    }
}

GroupsList.propTypes = {
    groups: PropTypes.array.isRequired,
};