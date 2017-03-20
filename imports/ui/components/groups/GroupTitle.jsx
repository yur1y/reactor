import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class GroupTitle extends Component {

    render() {
        const group= this.props.group;
        return (
            <div className="well-sm ">
                <div className="panel-body">
                    <Link key={group.url} to={`/groups/${group.url}`}>
                        <img src={group.logo} width="200"/>
                        <h4>{group.name}      </h4>
                    </Link>
                </div>
            </div>
        )
    }
}

GroupTitle.propTypes = {
    group: PropTypes.object.isRequired,
};