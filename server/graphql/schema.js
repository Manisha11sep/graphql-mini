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
      height: { type: GraphQLInt }
    }
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      person: {
        type: PersonType,
        args: { id: { type: new GraphQLNonNull(GraphQLInt)} },
        resolve: (person, args) => {
          return characters.find(e => e.id === args.id)
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query
})