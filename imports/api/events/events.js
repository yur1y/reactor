import {Mongo} from 'meteor/mongo';
import {getSlug} from 'meteor/ongoworks:speakingurl';

import {ownsDocument} from '../../startup/both/helpers';

export const Events = new Mongo.Collection('events');


Events.allow({
    insert (userId, doc) {
        return userId;
    },
    update (userId, doc) {
        return userId;
    },
    remove (userId, doc) {
        return ownsDocument(userId, doc);
    }
});
