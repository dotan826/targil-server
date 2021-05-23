
// const databaseCluster = ""; // Database Cluster Name of the MongoDB Atlas
const databasePassword = "3&dnS2k*sf$"; // Database Cluster Password of the MongoDB Atlas
const databaseName = "Targil"; // Database Name in the MongoDB Atlas Cluster

// const MongoClient = require('mongodb').MongoClient; // MongoClient instance
import { MongoClient, Db, InsertOneWriteOpResult, DeleteWriteOpResultObject, UpdateWriteOpResult } from 'mongodb';

// "mongodb+srv://production-user-20:<password>@cluster0.ofydl.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority"
// Password = <password> [change it to the password of the user !]
// Default Database = <dbname> [change it to the name of the database we want to get by default !]
// const url = `mongodb+srv://dbUser:${databasePassword}@cluster0.ofydl.gcp.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
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

// Delete from database collection a specific document
export const deleteSpecificDocument = async (databaseObject: Db, collectionName: string, query: object) => {
    const result = new Promise<DeleteWriteOpResultObject>((res, rej) => {
        databaseObject.collection(collectionName).deleteOne(query, (err, result) => {
            if (err){
                console.log("Delete Document has Failed !");
                throw err;
            }
            else{
                res(result);
            }
        });
    });
    return result; // return result of the Delete Operation
}

// Delete from database collection many documents
export const deleteManyDocuments = async (databaseObject: Db, collectionName: string, query: object) => {
    const result = new Promise<DeleteWriteOpResultObject>((res, rej) => {
        databaseObject.collection(collectionName).deleteMany(query, (err, result) => {
            if (err){
                console.log("Delete Documents has Failed !");
                throw err;
            }
            else{
                res(result);
            }
        });
    });
    return result; // return result of the Delete Operation
}

// Update a specific document in database collection
export const updateSpecificDocument = async (databaseObject: Db, collectionName: string, query: object, updatedDocument: object) => {
    const result = new Promise<UpdateWriteOpResult>((res, rej) => {
        databaseObject.collection(collectionName).updateOne(query, updatedDocument, (err, result) => {
            if (err){
                console.log("Update Document has Failed !");
                throw err;
            }
            else{
                res(result);
            }
        });
    });
    return result; // return result of the Delete Operation
}
