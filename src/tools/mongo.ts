import { MongoClient, ObjectID } from "mongodb";
import * as models from "../models/models";

const url: string = "mongodb://127.0.0.1:27017/";
let conn: any;

export async function prepare(): Promise<boolean> {
    try {
        conn = await MongoClient.connect(url, { useNewUrlParser: true });
        return true;
    } catch (e) {
        return false;
    }
}

/*
*
*
*
************************************ CONNECTIONS **************************************
*
*
*
*/

export async function createConnection(connection: models.IConnection): Promise<boolean> {
    const res = await conn.db("express-shop").collection("connections")
        .insertOne(connection);
    return res.ops[0];
}

export async function updateConnection(connection: models.IConnection): Promise<boolean> {
    const updateParams = { ...connection };
    const _id = new ObjectID(connection._id);
    delete updateParams._id;
    delete updateParams.ip;
    const res = await conn.db("express-shop").collection("connections")
        .updateOne({ _id }, { $set: { ...updateParams } });
    return !!res.result.nModified;
}

export async function deleteConnection(id: string): Promise<boolean> {
    const _id = new ObjectID(id);
    const res = await conn.db("express-shop").collection("connections")
        .deleteOne({ _id });
    return !!res.deletedCount;
}
