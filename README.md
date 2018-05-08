## Star Wars + GraphQL / Apollo / React

### Server Dependencies
- `express`
- `body-parser`
- `axios`   
- `express-graphql`
- `cors`

### Client Dependencies
- `apollo-boost`: Package containing everything you need to set up Apollo Client
- `react-apollo`: View layer integration for React
- `graphql-tag`: Necessary for parsing your GraphQL queries
- `graphql`: Also parses your GraphQL queries

### API we're using
- [Star Wars API](https://swapi.co/)

### Documentation Reference
- [GraphQL](http://graphql.org/learn/)
- [Apollo + React](https://www.apollographql.com/docs/react/)
- [How To GraphQL](https://www.howtographql.com/)

### Project Summary  
- In this project we will use GraphQL Query Language to structure our data on the server and Apollo to interact with GraphQL on the client (app). We will interact with a traditional RESTful API `Star Wars` and translate it into GraphQL.  
- For basic styling and organization we have some files and folders provided for us. Lets get familiar with the structure 
- `server/graphql/model.js` is where our data for this project is stored, and it was pulled from the [Star Wars](https://swapi.co/) API.

### Completed Example
<img src='https://thumbs.gfycat.com/CommonAbandonedCricket-size_restricted.gif'> 

### Setup
- Fork and clone this repository
- Run `yarn` or `npm install`

### Step 1
- Starting with the server side, we need to add our dependencies

#### Instructions
- `yarn add graphql`
- `yarn add express-graphql graphql`
  - `express-graphql` is server middleware where we can set an endpoint for GraphQL

### Step 2  

#### Summary  
Now let's require these dependencies in the server and have our app use it

#### Instructions
- require `express-graphql` as `graphQLExpress` in your server
- apply `graphQLExpress` as top-level middleware as a route handler
- the first argument should be an endpoint `/graphql` and the second argument should be `graphQLExpress` invoked with a configuration Object as an argument
- inside the configuration Object, a `schema` property must be provided, and the value will be our schema

<code> server/index.js </code>
```js
// server/index.js
const graphQLExpress = require('express-graphql')
// ...

```

