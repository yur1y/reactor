import {Meteor} from 'meteor/meteor';

Meteor.publish('users', function () {
    if (this.userId) {
        return Meteor.users.find({}, {
            fields: {
                'profile.name': 1, 'services.vk.photo_big': 1, 'services.google.picture': 1,
                groups: 1, wallet: 1, roles: 1
            }
        })
    }
    else return this.ready();
});

Meteor.publish('account', function () {
    if (this.userId) {
        return Meteor.users.find({}, {
            fields: {
                'profile.name': 1, 'services.vk.photo_big': 1, 'services.google.picture': 1,
                groups: 1, items: 1, 'status.online': 1, 'roles': 1, 'wallet.cash': 1, 'wallet.coupons': 1
            }
        })
    } else return this.ready();
});