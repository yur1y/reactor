import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class GroupTitle extends Component {

    render() {

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <Link key={this.props.group.url} to={`/groups/${this.props.group.url}`}>
                        <img src={this.props.group.logo} width="200"/>
                        <h4>{this.props.group.name}      </h4>
                    </Link>
                </div>
            </div>
        )
    }
}

GroupTitle.propTypes = {
    group: PropTypes.object.isRequired,
};