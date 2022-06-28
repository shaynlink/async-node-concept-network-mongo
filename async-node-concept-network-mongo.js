'use strict';

const { MongoClient } = require('mongodb');

class AsyncNodeConectNetworkMongo {
    constructor(uri, dbName) {
        this.uri = uri;

        this.client = new MongoClient(uri, { useNewUrlParser: true });

        this.dbName = dbName;

        this.db = this.client.db(this.dbName);

        this.collection = this.db.collection('nodes');
    }

    async connect() {
        try {
            await this.client.connect();

            this.db.command({ ping: 1 });

            console.log('Connected to MongoDB');
        } catch (err) {
            await this.client.close();
        }

        return this;
    }

    async addNode(label) {
        return await this.collection.updateOne(
            { label },
            { $inc: { occ: 1 } },
            { upsert: true }
        )
    }

    async decrementNode(label) {
        return await this.collection.findOneAndUpdate(
            { label },
            { $inc: { occ: -1 } }
        )
            .then((result) => {
                if (result.modifiedCount > 0) {
                    if (result.next())
                }
                return result;
            });
    }
}

module.exports = AsyncNodeConectNetworkMongo;
