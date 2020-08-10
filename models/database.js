const mongoose = require('mongoose');

const database = {

    init(mongodbURI) {
        return new Promise(function (resolve, reject) {
            mongoose.set('useNewUrlParser', true);
            mongoose.set('useFindAndModify', false);
            mongoose.set('useCreateIndex', true);
            mongoose.set('useUnifiedTopology', true);
            mongoose.connect(mongodbURI);
    
            // CONNECT TO MONGODB SERVER
            let db = mongoose.connection;
            db.on('error', function(err){
                reject(err);
            });
    
            db.once("open", function() {
                resolve();
            });
        });
    },

    close() {
        mongoose.disconnect();
    }
};

module.exports = database;