## Star Wars + GraphQL / Apollo / React

### What is GraphQL?  

>GraphQL is a data query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL gives clients the power to ask for exactly what they need and nothing more, and enables powerful developer tools (Graphiql).  

>GraphQL APIs are organized in terms of types and fields, not endpoints. It uses types to ensure a client only asks for what's possible and provides clear and helpful errors.  

With GraphQL we create a data model, or Schema  
> Schema: A representation of a plan or theory in the form of a model

### What is Apollo?  

>Apollo Client is a library that was built for seemlessly interacting with GraphQL on the client side.

### Express Server Dependencies  

- `express`
- `body-parser`
- `axios`   
- `cors`
- `express-graphql`: Creates an Express server that can run a GraphQL API
- `graphql`: Gives you the tools to create a schema and mutations

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

- In this project we will use the GraphQL Query Language to structure our data on the server and Apollo to interact with GraphQL on the client (app). We will interact with the `Star Wars` API.  

- For basic styling and organization we have some files and folders provided for us.  

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

### Step 2  

#### Summary  

Now let's require these dependencies in the server and use them

#### Instructions  

- require `express-graphql` as `graphqlHTTP` in your server  

- apply `graphqlHTTP` as top-level middleware as a route handler `app.use()`  

- the first argument should be an endpoint `/graphql` and the second argument should be `graphqlHTTP` invoked with a configuration Object as an argument  

- inside the configuration Object:  

```js
// ? = optional
graphqlHTTP({
  schema: YOUR_SCHEMA, // <-- required
  graphiql?: ?boolean,
  rootValue?: ?any,
  context?: ?any,
  pretty?: ?boolean,
  formatError?: ?Function,
  validationRules?: ?Array<any>,
})
```  

- We will use the `graphiql` property so we can use the developer tools.

#### Solution  

<details>  
  
<summary><code> server/index.js </code></summary>  

```js
// server/index.js
const graphqlHTTP = require('express-graphql')
// ...
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))
// ...
```  

</details>  

### Step 3  

#### Summary  

Let's setup our schema, where most of our logic will take place  

#### Instructions  

- inside `server/graphql`, create a file named `schema.js`  

- we need to access our data, so `require` our `server/graphql/model.js` inside `schema.js`  

- we need to require `graphql` and destructure a handful of functions
  - `{ GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull }`

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

### Step 4  

#### Summary  

We need to require our `schema.js` file inside our `index.js` server file in order for `graphqlHTTP` to access it via the `schema` property

#### Instructions  

- require `schema.js` inside `server/index.js` and save it to a variable named `schema`  

- add the `schema` variable to the `schema` property on `graphqlHTTP`

#### Solution  

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

### Step 5  

#### Summary  

Back to `schema.js`, we are going to create our root query Object

#### Instructions  

- create a variable named `Query` and set it equal to a `new GraphQLObjectType()`  

- inside the `GraphQLObjectType`, provide it an Object with:
  - a `name` property equal to a string `Query`  
  - a `fields` property equal to a function that returns an Object
    - this is where we declare the queries available on the API  

- at the bottom of `schema.js` let's export:
```js
module.exports = new GraphQLSchema({
  query: Query // <-- our Query variable
})
```

#### Solution

<details>

<summary><code> server/schema.js </code></summary>

```js
// server/schema.js
// ...
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      // define the keyword queries
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query
})
```

</details>  

### Step 6  

### Summary  

Our data is full of Star Wars characters so let's create a `people` query so we can fetch all people

### Instructions  

- inside our `fields` Object, add a property called `people` and set it to an empty Object  

- inside our `people` Object, give it a `type` property. This defines how the query should be structured. In this case we want a `new GraphQLList()` of `PersonType`, we will define the `PersonType` in the next step

- now let's add a `resolve` property that is a function. This is where we can do our functionality for the query.

- we want the `resolve` function to return all `characters`

### Solution

<details>

<summary><code> server/schema.js </code></summary>

```js
// server/schema.js
// ...
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
    // start new code
      people: {
        type: new GraphQLList(PersonType),
        resolve: () => {
          return characters
        }
      }
    // end new code
    }
  }
})
// ...
```

</details>  

### Step 7

#### Summary  

We need to define our `PersonType` so our `people` query knows how to structure the data properly

#### Instructions  

- create a variable called `PersonType` and set it equal to a `new GraphQLObjectType()`  

```js
const PersonType = new GraphQLObjectType({
  // ...code
})
```

- add a `name` property and set it equal to a string `Person`  

- add a `fields` property so we can set the fields available on the `PersonType`

- in `fields` for now, include `id, name, height` properties

- these properties require a `type` definition 

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
// ...
```

</details>

### Step 8

#### Summary  

now let's create another `type` that we can add to our `PersonType` later

#### Instructions

- create a mew variable `MovieType`

- with the `name` set to a string `Movie`

- add `name, releaseDate` properties and their respective `type`'s

#### Solution

<details>

<summary><code></code></summary>

```js
// server/schema.js
// ...
const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => {
    return {
      name: { type: GraphQLString },
      releaseDate: { type: GraphQLString }
    }
  }
})
// ...
```

</details>

### Step 9

#### Summary  

because the films property on our data inside `model.js` is an Array of API links, we need to make an `axios` call to fetch the details

#### Instructions  

- 

#### Solution

<details>

<summary><code></code></summary>

```js

```

</details>

