import {Meteor} from 'meteor/meteor';
import {sAlert} from 'meteor/juliancwirko:s-alert';

import {Items} from '../../api/items/items';
import {Events} from '../../api/events/events';
import {Groups} from '../../api/groups/groups';

export let ownsDocument = (userId, doc) => {
    if (doc && doc.owner) {
        return doc.owner == userId
    }
};

export let noRepeat = (data, name, oldName) => {
    return name === oldName || data.find({name: name}).count() === 0;
};
export let thisUrl = () => { //this.params._id(url) //iron router
    const url = document.URL;
    return url.slice(url.length - 5, url.length) === '/edit' ? // on edit page
        url.slice(0, url.length - 5).split('/').pop()
        : url.split('/').pop()
};

export let noLogo = () => {
    return Meteor.absoluteUrl() + 'no-image.jpg';
};

export let throwError = (err, reason) => {
    if (Meteor.isServer) {           //no @#%$! in console
        throw new Meteor.Error(err, reason)
    } else sAlert.error(reason);
};


export let ok = (text) => {
    sAlert.success(text);
};


export const userAmount = (itemId, userId) => {

    const item = Items.findOne({_id: itemId, 'cart.user': userId});

    if (!item) {
        return 0;
    }
    const userCart = item.cart.find(cart => cart.user === userId);

    return userCart.amount || 0;
};

export let totalCost = (userId, itemId) => {
    let items = null;
    let cost = {cash: 0, coupons: 0};
    if (itemId) {
        if (typeof  itemId === 'string') itemId = [itemId];

        items = Items.find({'cart.user': userId, _id: {$in: itemId}});
    }
    else {
        items = Items.find({'cart.user': userId});
    }
    items.map((it) => {
        const item = Items.findOne({_id: it._id});
        const array = item.cart.find(cart => cart.user === userId);

        if (array.payBy === 'cash') {
            cost.cash += item.cash * array.amount;
        }
        if (array.payBy === 'coup') {
            cost.coupons += item.coupons * array.amount;
        }
    });
    return cost;
};

export let eventItems = (eventId, user) => {
    let itemIds = [];
    let event;
    event = Events.findOne({_id: eventId});
    Groups.find({_id: {$in: event.groups}}).map(group => {
            let items;

            if (user) {
                items = Items.find({
                    $and: [{itemUrl: group.url}, {
                        cart: {
                            $elemMatch: {
                                user: user,
                                payBy: {$exists: true}
                            }
                        }
                    }]
                });
            } else
                items = Items.find({itemUrl: group.url});

            items.map(item =>
                itemIds.push(item._id))
        }
    );

    return itemIds;
};

// export let parent = (temp) => temp.view.parentView._templateInstance;