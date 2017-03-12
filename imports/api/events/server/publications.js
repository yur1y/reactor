import {Meteor} from 'meteor/meteor';
import {Events} from '../events';

Meteor.publish('events', function () {
    if (this.userId) {
        return Events.find({});
    }
    else return this.ready();
});

Meteor.publish('event', function (url) {
    if (this.userId) {
        return Events.find({url: url})
    } else return this.ready();
});