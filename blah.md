- let's also take another look at our `server/index.js` file and `require` our newly created `schema.js` file then add this to the schema property inside of the configuration Object  


We will now define our schema and how our data should be structured. The most basic components of a GraphQL schema are Object types, which represent a kind of Object you can fetch from your service/API and what fields it has.

#### Instructions  

- declare a variable `PersonType` that is equal to a `new GraphQLObjectType` that takes in an Object  

- this Object requires a `name` property, we will give this a value of `'Person'`. Now we can add a `fields` property that is a function. This function returns an Object that had the different fields we want on the PersonType Object.  

- let's add `id, name, height` properties to our PersonType Object for now  

#### Notes  

- Making `fields` an arrow function allows you to refer to an ObjectType that is defined later in the file  

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