import {Meteor} from 'meteor/meteor';

import {Groups} from '../groups';

Meteor.publish('groups', function () {
    if (this.userId) {
        return Groups.find
        ({
            $or: [
                {owner: this.userId}
                , {open: true},
                {users: this.userId}]
        })
    } else return this.ready();
});

Meteor.publish('group', function (url) {
    if (this.userId) {
        return Groups.find({
            $and: [
                {url: url},
                {$or: [{users: this.userId}, {owner: this.userId}, {open: true}]}
            ]
        })
    } else return this.ready();
});