import {Mongo} from 'meteor/mongo';

import {ownsDocument} from '../../startup/both/helpers';

export const Groups = new Mongo.Collection('groups');

Groups.allow({
    insert () {
        return Meteor.userId();
    },
    update (userId, doc) {
        return ownsDocument(userId, doc);
    },
    remove (userId, doc) {
        return ownsDocument(userId, doc);
    }
});