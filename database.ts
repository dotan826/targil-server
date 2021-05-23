
// const databaseCluster = ""; // Database Cluster Name of the MongoDB Atlas
const databasePassword = "3&dnS2k*sf$"; // Database Cluster Password of the MongoDB Atlas
const databaseName = "Targil"; // Database Name in the MongoDB Atlas Cluster

// const MongoClient = require('mongodb').MongoClient; // MongoClient instance
import { MongoClient, Db, InsertOneWriteOpResult, DeleteWriteOpResultObject, UpdateWriteOpResult } from 'mongodb';

const url = `mongodb+srv://dbUser:${databasePassword}@clustercheckthebill.mlbb2.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

interface mongoDatabaseInterface {
    client: MongoClient;
    db: any;
}

const mongoDatabase: mongoDatabaseInterface = {
    client: client, // Database Client
    db: null, // Database DB Object
}

// Connect to Database Server and save Client Connection
export const connectAndGetDatabaseObject = async () => {
    const result = new Promise<Db>((res, rej) => {
        if (mongoDatabase.client.isConnected()) {
            res(mongoDatabase.db); // We are Already Connected to the Client !
        }
        else {
            mongoDatabase.client.connect((err, client) => {
                if (err) {
                    console.log("Client Connection has Failed !");
                    throw err;
                }
                else {
                    mongoDatabase.client = client;
                    mongoDatabase.db = client.db(databaseName);
                    res(mongoDatabase.db); // Client Connection has Established !
                }
            });
        }
    });
    return result; // return Database Object (NOT Client Object !!!)
}

// Get from database collection a specific document with a query
export const readSpecificDocument = async (databaseObject: Db, collectionName: string, query = {}) => {
    const result = new Promise<object>((res, rej) => {
        databaseObject.collection(collectionName).findOne(query, (err, result) => {
            if (err){
                console.log("Read Document has Failed !");
                throw err;
            }
            else{
                console.log("Read Document has Succeed !");
                res(result);
            }
        });
    });
    return result; // return Specific Document
}

// Insert to database collection a specific document
export const insertSpecificDocument = async (databaseObject: Db, collectionName: string, document: object) => {
    const result = new Promise<object>((res, rej) => {
        databaseObject.collection(collectionName).insertOne(document, (err, result) => {
            if (err){
                console.log("Insert Document has Failed !");
                throw err;
            }
            else{
                res(result);
            }
        });
    });
    return result; // return result of the Insert Operation
}



