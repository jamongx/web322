const mongoose = require('mongoose');

const database = 
{
    fakeDB : [],
    
    init(mongodbURI)
    {
        return new Promise(function (resolve, reject) {
            mongoose.set('useNewUrlParser', true);
            mongoose.set('useFindAndModify', false);
            mongoose.set('useCreateIndex', true);
            mongoose.set('useUnifiedTopology', true);
            
            // useMongoClient:true 옵션을 사용해 Warning 해결
            // mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
            mongoose.connect(mongodbURI);
    
            // CONNECT TO MONGODB SERVER
            let db = mongoose.connection;
            db.on('error', function(err){
                reject(err); // reject the promise with the provided error
            });
    
            db.once("open", function() {
                resolve();
            });
        });
    },

    close() {
        mongoose.disconnect();
    }

}

module.exports = database;