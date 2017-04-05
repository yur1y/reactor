import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Template} from 'meteor/templating';
import {Blaze} from 'meteor/blaze';

export default class SAlertWrapper extends Component {
    componentDidMount() {
        // Use Meteor Blaze to render sAlert
        this.view = Blaze.render(Template.sAlert,
            ReactDOM.findDOMNode(this.refs.container));
    }

    componentWillUnmount() {
        // Clean up Blaze view
        Blaze.remove(this.view);
    }

    render() {
        // Just render a placeholder container that will be filled in
        return <span   ref="container" />;
    }
}