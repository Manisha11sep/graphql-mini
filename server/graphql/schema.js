const { 
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
 } = require('graphql')

let characters = require('./model')


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

// person: {
  //   type: PersonType,
  //   args: { id: { type: new GraphQLNonNull(GraphQLInt)} },
  //   resolve: (person, args) => {
    //     return characters.find(e => e.id === args.id)
    //   }
    // }

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