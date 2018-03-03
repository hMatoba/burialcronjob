const MongoClient = require('mongodb').MongoClient;
 
var db = null;

class DbConnection {
    static async getConnection () {
        if (db == null) {
            const mongoConnectionString = process.env.CONOHA_MONGO;
            if (mongoConnectionString == undefined) {
                throw new Error('DB connection string is null.');
            }

            // Database Name
            const dbName = 'burial';
            const itemCollectionName = 'items';

            // Use connect method to connect to the server
            const client = await MongoClient.connect(mongoConnectionString);
            db = client.db(dbName);
        }
        return db;
    }
}

module.exports = {
    DbConnection: DbConnection,
};