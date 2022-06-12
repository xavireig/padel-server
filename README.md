# Paddle app - client

Basic Expo Go app that connects to Firebase GraphQL endpoint.

## Install


```sh
yarn install
yarn install -g firebase-tools
yarn run build
firebase login
firebase serve (Apollo only)
firebase emulators:start
yarn generate-graphql (for the schema that we copy to client)
```

https://firebase.google.com/docs/cli

Remote URI: https://us-central1-paddle-dcde1.cloudfunctions.net/graphql