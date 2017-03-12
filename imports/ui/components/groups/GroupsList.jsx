import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {IndexLink, Link} from 'react-router';
import {Meteor} from 'meteor/meteor';

import {Groups} from '../../../../imports/api/groups/groups.js'
import {ok} from  '../../../../imports/startup/both/helpers.js';
import GroupTitle from './GroupTitle';

import '../../stylesheets/navigation.less'

export class GroupsList extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        $(document).ready(function () {
            $("#myTab a").click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        Meteor.call('groups.insert', name, function (err, res) {
            if (res) {
                ok('group ' + name + ' created');
            }
        });
        ReactDOM.findDOMNode(this.refs.nameInput).value = '';
    }

    renderGroups() {
        return this.props.groups.map(function (group) {
            return (<GroupTitle key={group._id} group={group}/>);
        });
    }

    render() {
        return (
            <div className="container">

                <div className="bs-example">
                    <ul className="nav nav-tabs" id="myTab">
                        <li><a className="active glyphicon glyphicon-globe
" href="#sectionA">Groups</a></li>
                        <li><a className=" glyphicon glyphicon-plus" href="#sectionB">Add Group</a></li>
                    </ul>
                    <br/>
                    <div className="tab-content">

                        <div id="sectionA" className="tab-pane fade in active">
                            {this.renderGroups()}
                        </div>
                        <div id="sectionB" className="tab-pane fade in  ">

                            <form className="new-group" onSubmit={this.handleSubmit.bind(this)}>
                                <input type="text" required="required" minLength="3" className="form-control"
                                       placeholder="Group name" ref="nameInput"/>

                                <button className=" btn btn-default" type='submit'>
                                    add group
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

GroupsList.propTypes = {
    groups: PropTypes.array.isRequired,
};
export  default   createContainer(() => {
    Meteor.subscribe('groups');
    return {
        groups: Groups.find({}).fetch(),
    };
}, GroupsList);