import React, {Component, PropTypes} from 'react';
import {Link,browserHistory} from 'react-router';
import Profile from '../users/Profile';

import {List, ListItem} from 'material-ui/List';



export default class GroupTitle extends Component {


    render(){
        const group= this.props.group;
        const author =Meteor.users.findOne({_id:group.owner});
        return (
            <div><ListItem onClick={()=>{  browserHistory.push( `/groups/${group.url}`)}}
                leftAvatar={<img style={{'height':'40px ','width':'!important'}}  src={group.logo} />}

                primaryText={group.name}
                           secondaryText={group.createdAt} rightAvatar={<div style={{'top':'0'}} ><p><small>by</small></p>
                <Profile user={author} name={false}/><p><small>{author.profile.name}</small></p></div>}
            /></div>
        )
    }
}

GroupTitle.propTypes = {
    group: PropTypes.object.isRequired,
};