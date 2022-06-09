const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Will initialize with default settings and database
admin.initializeApp()
const db = admin.firestore()
const app = express();

const typeDefs = gql`
    type User {
        firstName: String
        lastName: String
        email: String
    }

    type Query {
        users : [User]
    }
`

const resolvers = {
    Query: {
        users: () => {
            return new Promise((resolve, reject) => {
                fetchAllUsers((data: unknown) => {
                    resolve(data);
                });
            });
        }
    }
}

const fetchAllUsers = (callback: { (data: any): void; (arg0: any[]): any; }) => {
    db.collection('users')
        .get()
        .then((item: { docs: any[]; }) => {
            const items: any[] = [];
            item.docs.forEach((item: { data: () => any; }) => {
                console.log('Adding...')
                items.push(item.data())
            });
            return callback(items);
        })
        .catch((e: any) => console.log(e));
}
const server = new ApolloServer({ typeDefs, resolvers });

const serverWait = async () => {
    await server.start();
    server.applyMiddleware({ app, path: '/' })
};

serverWait();

exports.graphql = functions.https.onRequest(app);


