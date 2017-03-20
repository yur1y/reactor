import {UploadFS} from 'meteor/jalik:ufs';
import {Mongo} from 'meteor/mongo';

import {throwError, ownsDocument} from '../../startup/both/helpers';

export const Items = new Mongo.Collection('items');

Items.allow({
    insert: function (userId, file) {
        return userId;
    },
    remove: function (userId, file) {
        return ownsDocument(userId, file)
    },
    update: function (userId, file) {
        return userId
    }
});

    export const ItemStore = new UploadFS.store.GridFS({

        collection: Items,
        name: 'items',
        chunkSize: 1024 * 255,
        filter: new UploadFS.Filter({
            onCheck(file){
                if (file.size < 1 || file.size > 1024 * 1000) {
                    throwError('file-size', 'file size is bigger then 1MB');
                }
                if (['png', 'jpg', 'jpeg', 'gif', 'bmp'].indexOf(file.extension) == -1) {
                    throwError('file', 'file is not an image');
                }
                return true;
            }
        }),
        permissions: new UploadFS.StorePermissions({
            insert: function (userId, file) {
                return userId;
            },
            remove: function (userId, file) {
                return ownsDocument(userId, file);
            },
            update: function (userId, file) {
                return userId;
            }
        }),
        simulateWriteDelay: 0
    });