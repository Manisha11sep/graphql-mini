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

## Node.js Express  

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

#### Summary  

Our data is full of Star Wars characters so let's create a `people` query so we can fetch all people

#### Instructions  

- inside our `fields` Object, add a property called `people` and set it to an empty Object  

- inside our `people` Object, give it a `type` property. This defines how the query should be structured. In this case we want a `new GraphQLList()` of `PersonType`, we will define the `PersonType` in the next step

- now let's add a `resolve` property that is a function. This is where we can do our functionality for the query.

- we want the `resolve` function to return all `characters`

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

- copy a link from the `films` Array and make a call to see the API structure and details for each film

- add `name, releaseDate` properties and their respective `type`'s

#### Solution

<details>

<summary><code> server/schema.js </code></summary>

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

because we named our propery `releaseDate` instead of `release_date` like the original API has it as, we need to convert it with a `resolve` function

#### Instructions  

- add a `resolve` function to the `releaseDate` property

- add `person` as an argument for `resolve`, this refers to the parent value  

- return `person.release_date`

#### Solution

<details>

<summary><code> server/schema.js </code></summary>

```js
//server/schema.js
// ...
const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => {
    return {
      name: { type: GraphQLString },
    // start new code
      releaseDate: { 
        type: GraphQLString,
        resolve: person => {
          return person.release_date
        } 
      }
    // end new code
    }
  }
})
// ...
```

</details>

### Step 10

#### Summary 

now that we have our `MovieType` we can add it to our `PersonType`

#### Instructions  

- add a new field, `films` to the `PersonType`

- set the `type` to `new GraphQLList(MovieType)`

- add a `resolve` function so we can make an axios call for the detailed information from the original API

- `yarn add axios` and require `axios` inside `schema.js`

#### Solution

<details>

<summary><code> server/schema.js </code></summary>

```js
//server/schema.js
// ...
const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => {
    return {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
      height: { type: GraphQLInt },
      films: {
        type: new GraphQLList(MovieType),
        resolve: (person) => {
          // if films array is empty return an empty array
          return !person.films.length 
          ? []
          // otherwise map over it and make the axios call for each link
          : person.films.map(film => {
            return axios.get(film).then(res => res.data)
          }) 
        }
      }
    }
  }
})
// ...
```

</details>

### Step 11

#### Summary  

we are now going to add another `GraphQLObjectType` for `HomeWorld`

#### Instructions  

- create a variable `HomeWorldType` set to a `new GraphQLObjectType`

- give it a `name` equal to a string `HomeWorld`

- give it a `fields` function

- give the returned `fields` object `name, climate, population` properties, which all can have a string `type`

#### Solution

<details>

<summary><code> server/schema.js </code></summary>

```js
// server/schema.js
// ...
const HomeWorldType = new GraphQLObjectType({
  name: 'HomeWorld',
  fields: () => {
    return {
      name: { type: GraphQLString },
      climate: { type: GraphQLString },
      population: { type: GraphQLString }
    }
  }
})
// ...
```

</details>

<details>

<summary><code> server/schema.js so far </code></summary>

```js
// server/schema.js
const axios = require('axios')
const { 
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
 } = require('graphql')

 let characters = require('./model')
 
const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => {
    return {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
      height: { type: GraphQLInt },
      films: {
        type: new GraphQLList(MovieType),
        resolve: (person) => {
          return !person.films.length 
          ? []
          : person.films.map(film => {
            return axios.get(film).then(res => res.data)
          }) 
        }
      }
    }
  }
})

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => {
    return {
      title: { type: GraphQLString },
      releaseDate: { 
        type: GraphQLString,
        resolve: person => {
          return person.release_date
        } 
      }
    }
  }
})

const HomeWorldType = new GraphQLObjectType({
  name: 'HomeWorld',
  fields: () => {
    return {
      name: { type: GraphQLString },
      climate: { type: GraphQLString },
      population: { type: GraphQLString }
    }
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      people: {
        type: new GraphQLList(PersonType),
        resolve: () => {
          return characters
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query
})
```

</details>

### Step 12

#### Summary 

now lets add a `homeWorld` field to the `PersonType` 

#### Instructions  

- set the `type` for the `homeWorld` property to the `HomeWorldType`

- add a `resolve` function with a `person` parameter so we can make another axios call to get the homeworld details from the original API

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
      height: { type: GraphQLInt },
      films: {
        type: new GraphQLList(MovieType),
        resolve: (person) => {
          return !person.films.length 
          ? []
          : person.films.map(film => {
            return axios.get(film).then(res => res.data)
          }) 
        }
      },
      homeWorld: {
        type: HomeWorldType,
        resolve: (person) => {
          return axios.get(person.homeworld).then(res => res.data)
        }
      }
    }
  }
})
// ...
```

</details>

### Step 13

#### Summary  

lets add a `person` query so we can get a specific character

#### Instructions  

- after our `people` field on `Query` add another field, `person`

- `type` should be equal to `PersonType`

- add an `args` property so that we can give our `resolve` some arguments to find a specific character

- the `args` we need is an `id`, and each argument also needs a `type`

- the `type` should specify that it cannot be `null` like so:
```js
// ...
person: {
  type: PersonType,
  args: { id: { type: GraphQLNonNull(GraphQLInt) } }
}
// ...
```

- now add a `resolve` that takes in `args` as a second parameter so that it has access to the id:
```js
resolve: (parentVal, args) => {
  // code
}
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
      people: {
        type: new GraphQLList(PersonType),
        resolve: () => {
          return characters
        }
      },
      person: {
        type: PersonType,
        args: { id: { type: GraphQLNonNull(GraphQLInt) } },
        resolve: (parentVal, args) => {
          return characters.find(person => person.id === args.id)
        }
      }
    }
  }
})
// ...
```

</details>

### Step 14

#### Summary  

now that you can see how it can be used to stucture your data, let's see about mutating the data

#### Instructions  

- create a variable `Mutation` equal to a `new GraphQLObjectType`

- set a `name` property equal to the string `Mutation`

- add a `fields` function

- inside the `fields` is where we declare our mutations, create a property named `deletePerson` set to an Object with `type, args, resolve` properties

- the `type` field is for the return value of the `resolve`, what's being returned to the client

- `args` are for setting the expected arguments to make this Mutation work

- give `resolve` the `args` as a second parameter so we can access them inside the function 

- add a `mutation` property to our `module.exports` and set it equal to the `Mutation` variable

#### Solution

<details>

<summary><code> server/schema.js </code></summary>

```js
// server/schema.js
// ...
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => {
    return {
      deletePerson: {
        type: PersonType,
        args: { id: { type: GraphQLNonNull(GraphQLInt) } },
        resolve: (parentVal, args) => {
          let character = characters.find(e => e.id === args.id)
          characters = characters.filter(person => person.id !== args.id)
          return {
            id: character.id,
            name: character.name
          }
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
```

</details>

<details>

<summary><code> finished server/schema.js </code></summary>

```js
const axios = require('axios')
const { 
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
 } = require('graphql')

 let characters = require('./model')
 
const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => {
    return {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
      height: { type: GraphQLInt },
      films: {
        type: new GraphQLList(MovieType),
        resolve: (person) => {
          return !person.films.length 
          ? []
          : person.films.map(film => {
            return axios.get(film).then(res => res.data)
          }) 
        }
      },
      homeWorld: {
        type: HomeWorldType,
        resolve: (person) => {
          console.log('A SINGLE PERSON OBJECT FROM THE DATA', person)
          return axios.get(person.homeworld).then(res => res.data)
        }
      }
    }
  }
})

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => {
    return {
      title: { type: GraphQLString },
      releaseDate: { 
        type: GraphQLString,
        resolve: person => {
          return person.release_date
        } 
      }
    }
  }
})

const HomeWorldType = new GraphQLObjectType({
  name: 'HomeWorld',
  fields: () => {
    return {
      name: { type: GraphQLString },
      climate: { type: GraphQLString },
      population: { type: GraphQLString }
    }
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      people: {
        type: new GraphQLList(PersonType),
        resolve: () => {
          return characters
        }
      },
      person: {
        type: PersonType,
        args: { id: { type: GraphQLNonNull(GraphQLInt) } },
        resolve: (parentVal, args) => {
          return characters.find(person => person.id === args.id)
        }
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => {
    return {
      deletePerson: {
        type: PersonType,
        args: { id: { type: GraphQLNonNull(GraphQLInt) } },
        resolve: (parentVal, args) => {
          let character = characters.find(e => e.id === args.id)
          characters = characters.filter(person => person.id !== args.id)
          return {
            id: character.id,
            name: character.name
          }
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
```

</details>

## React + Apollo

### Step 1

#### Summary  

now moving to the client side, we need to add our dependencies

#### Instructions  

- `yarn add apollo-boost react-apollo graphql-tag`

### Step 2

#### Summary  

we need to give our application access to the Apollo Client

#### Instructions  

- inside `src/index.js` lets import `ApolloClient` from `apollo-boost`
 
- create a variable `client` and set it equal to a `new ApolloClient()`

- give `ApolloClient` a configuration Object with a `uri` property set to our local server graphql endpoint `http://localhost:3050/graphql`

- to test, let's import `gql` from `graphql-tag` and write a query now:
```js
client.query({
  query: gql`
    {
      people {
        name
      }
    }
  `
}).then(res => console.log(res.data))
```

- check your developer console and you should have an array of 10 people!

- now lets `import { ApolloProvider } from 'react-apollo'`

- wrap `<App />` with `ApolloProvider`

- give `ApolloProvider` a `client` attribute and set it equal to our `client` variable

#### Solution

<details>

<summary><code> src/index.js </code></summary>

```js
// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.css'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag' // we don't need this anymore after a successful test
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
	uri: 'http://localhost:3050/graphql'
})

// we can delete this query
client.query({
	query: gql`
		{
			people {
				name
			}
		}
	`
})
	.then(res => console.log(res.data))
// ----

ReactDOM.render(
	<ApolloProvider client={ client }>
		<App />
	</ApolloProvider>, document.getElementById('root')
)
```

</details>

### Step 3

#### Instructions  

- create `queries` and `mutations` folders inside `src/components`

- create a `PeopleQuery` component inside the `queries` folder

- create a `DeletePersonMutation` component inside the `mutations` folder     

### Step 4

#### Summary  

#### Instructions  

#### Solution

<details>

<summary><code></code></summary>

```js

```

</details>