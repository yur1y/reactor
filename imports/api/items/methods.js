import {Meteor} from 'meteor/meteor';
import {UploadFS} from 'meteor/jalik:ufs';

import {Items, ItemStore} from './items';
import {throwError, totalCost, userAmount, ok, ownsDocument} from '../../startup/both/helpers';


Meteor.methods({
    'items.insert' (url, name, cash, amount)  {

        // else return new Error();
    },

    'items.remove' (filter)  {
        if (this.userId) {
            Items.remove({
                $and: [{owner: this.userId},
                    {$or: [{_id: filter}, {itemUrl: filter}, {url: filter}]}]
            });
        }
    },

    'items.update' (id, name, cash, amount, coupons) {
        if (this.userId) {
            let item = Items.findOne({_id: id});
            if (ownsDocument(this.userId, item)) {
                Items.update({_id: id}, {$set: {itemName: name, cash: cash, amount: amount, coupons: coupons}});
            }
        }
    },
    'items.wish' (itemId) {
        let user = this.userId;
        if (user) {
            if (!Items.find({_id: itemId, wish: user}).count()) {
                Items.update({_id: itemId}, {$addToSet: {wish: user}});  //wish
            } else {
                Items.update({_id: itemId}, {$pull: {wish: user}}); //un-wish
            }
        }
    },
    'items.inCart' (itemId, amount)  {
        let user = this.userId;
        if (user) {
            if (Items.find({
                    _id: itemId,
                    'cart.user': user,
                }).count() == 0) {
                Items.update({_id: itemId}, {  //item added first time by user
                    $push: {
                        cart: {
                            user: user,
                            amount: amount
                        }
                    }
                });
            } else {
                if (Items.find({
                        _id: itemId,
                        'cart.user': user,
                        'cart.amount': amount
                    }).count() == 0) {
                    Items.update({                    //item is already in cart, but user change amount
                            _id: itemId,
                            'cart.user': user,
                        }, {
                            $set: {'cart.$.amount': amount}
                        }
                    )
                } else {
                    Items.update({                    //item is already in cart, so increment it
                            _id: itemId,
                            'cart.user': user,
                        }, {
                            $inc: {'cart.$.amount': 1}
                        }
                    )
                }
            }
        }
    }
    ,
    'items.outCart' (itemId) {
        if (this.userId)
            Items.update({_id: itemId}, {$pull: {cart: {user: this.userId}}})
    },

    'items.payBy' (itemId, payBy)  {
        if (this.userId) {
            typeof(itemId) == 'string' ? itemId = [itemId] : null;
            for (let i = 0; i < itemId.length; i++) {

                Items.update({_id: itemId[i], 'cart.user': this.userId}, {
                    $set: {
                        'cart.$.payBy': payBy,         //choose pay method
                    }
                })
            }
        }
    },
    'items.notPay' (itemId) {
        if (this.userId) {
            typeof(itemId) == 'string' ? itemId = [itemId] : null;
            for (let i = 0; i < itemId.length; i++) {

                Items.update({_id: itemId[i], 'cart.user': this.userId}, {
                    $unset: {
                        'cart.$.payBy': {$exists: true}          //undo-pre-pay
                    }
                })
            }
        }
    },
    'items.order' (itemId, ownerId, delivery)  {      //event owner id
        if (this.userId) {
            typeof(itemId) == 'string' ? itemId = [itemId] : null;
            for (let i = 0; i < itemId.length; i++) {

                Items.update({_id: itemId[i], 'cart.user': this.userId}, {
                    $set: {
                        'cart.$.ordered': true          //ordered
                    },
                    $inc: {amount: -userAmount(itemId[i], this.userId)}
                });
                Meteor.call('users.order', this.userId, ownerId, totalCost(this.userId, itemId[i]).cash,
                    totalCost(this.userId, itemId[i]).coupons, delivery); //cash & coupons used
            }
        }
    }
});

export let itemInsert = function (url, name, cash, amount) {
    const user = Meteor.userId();
    if (Meteor.isClient) {
        return UploadFS.selectFile(function (file) {
            let info = {
                name: file.name,
                size: file.size,
                createdAt: moment().format('MMMM Do YYYY, h:mm a'),
                owner: user, ///клієнт
                itemUrl: url
            };
            if (amount) {
                info.itemName = name;
                info.amount = amount;
                info.cash = cash;
                info.coupons = 0;
                info.wish = [];
            }
            const ONE_MB = 1024 * 1024;
            const uploader = new UploadFS.Uploader({
                data: file,
                file: info,
                store: ItemStore || 'items',
                maxSize: ONE_MB,
                onComplete(file) {
                    if (file.itemName) {
                        ok('item ' + file.itemName + ' created');
                    } else {
                        Meteor.call('items.remove', cash);
                        Meteor.call('groups.newLogo', name, file.url);
                        ok('logo changed');
                    }
                },
                onError(err){

                    return [throwError(err.err, err.reason), err]
                }
            });
            uploader.start();
        });
    }
};