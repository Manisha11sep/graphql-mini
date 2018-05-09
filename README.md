## Star Wars + GraphQL / Apollo / React

### What is GraphQL?  

>??GraphQL is a data query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL gives clients the power to ask for exactly what they need and nothing more, and enables powerful developer tools (Graphiql).  

>>>GraphQL APIs are organized in terms of types and fields, not endpoints. It uses types to ensure a client only asks for what's possible and provides clear and helpful errors.

### What is Apollo?  

>>>Apollo Client is a library that was built for seemlessly interacting with GraphQL on the client side.

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
Starting with the server side, we need to add our dependencies

#### Instructions
- `yarn add graphql`
- `yarn add express-graphql graphql`
  - `express-graphql` is server middleware where we can set an endpoint for GraphQL

### Step 2  

#### Summary  
Now let's require these dependencies in the server and have our app use it

#### Instructions
- require `express-graphql` as `graphQLExpress` in your server
- apply `graphQLExpress` as top-level middleware as a route handler `app.use()`
- the first argument should be an endpoint `/graphql` and the second argument should be `graphQLExpress` invoked with a configuration Object as an argument
- inside the configuration Object:
  - a `schema` property must be provided, and the value will be our schema, for now set it to `null`
  - a `graphiql` property which takes a `boolean` and will enable or disable a user interface to quickly test queries. Let's set this to `true`

#### Solution  

<details>  
  
<summary><code> server/index.js </code></summary>  

```js
// server/index.js
const graphQLExpress = require('express-graphql')
// ...
app.use('/graphql', graphQLExpress({
  schema: null,
  graphiql: true
}))
// ...
```  

</details>  

### Step 3  

#### Summary  
Let's setup our query file, where most of our logic will take place

#### Instructions  
- inside `server/graphql`, create a file named `schema.js`
- we need to access our data, so `require` our `server/graphql/model.js` inside `schema.js`
- we need to `require` `graphql` and destructure a handful of functions
  - `{ GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull }`
- let's also take another look at our `server/index.js` file and `require` our newly created `schema.js` file then add this to the schema property inside of the configuration Object  

#### Solution  
<details>  

<summary><code> server/schema.js </code></summary>  

```js
// server/schema.js
const {
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLList, 
  GraphQLNonNull 
} = require('graphql')
let characters = require('./model')
// ...
```  

</details>  

<details>  

<summary><code> server/index.js </code></summary>  

```js
// server/index.js
// ...
const schema = require('./graphql/schema')
// ...
app.use('/graphql', graphQLExpress({
  schema: schema, // <-- add schema to configuration Object
  graphiql: true
}))
// ...
```  

</details>  

### Step 4  

#### Summary  
These functions we have `required` from `graphql` are going to help us define our types when we create our `GraphQLSchema`.
> Schema: A representation of a plan or theory in the form of an outline or model

We will now define our schema and how our data should be structured. The most basic components of a GraphQL schema are Object types, which represent a kind of Object you can fetch from your service/API and what fields it has. Let's create a `person` Object

#### Instructions
- declare a variable `PersonType` that is equal to a `new GraphQLObjectType` that takes in an Object
- this Object requires a `name` property, we will give this a value of `'Person'`. Now we can add a `fields` property that is a function. This function returns an Object that had the different fields we want on the PersonType Object.
- let's add `id, name, height` properties to our PersonType Object for now

#### Notes
- Making `fields` an arrow function allows you to refer to an ObjectType that is defined later in the file

#### Solution  
<details>
<summary><code> server/schema.js </code></summary>

```js
// server/schema.js
// ...
const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => {
    return {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
      height: { type: GraphQLInt }
    }
  }
})
```

</details>

### Step 5  

#### Summary

#### Instructions  

#### Solution  
<details>
<summary><code></code></summary>

```js
// ...

```

</details>


