import {Meteor} from 'meteor/meteor';
import {Items} from '../items';

Meteor.publish('items', function (url) {
    if (this.userId) {
        if (url) {
            return Items.find({itemUrl: url})
        } else return Items.find({})
    } else return this.ready();
});