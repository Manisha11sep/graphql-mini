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
