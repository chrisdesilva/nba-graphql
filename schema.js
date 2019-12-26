const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

const TeamType = new GraphQLObjectType({
  name: "Team",
  fields: () => ({
    city: { type: GraphQLString },
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    teams: {
      type: new GraphQLList(TeamType),
      async resolve(parent, args) {
        try {
          const response = await axios.get(
            "https://www.balldontlie.io/api/v1/teams"
          );
          const data = await response;
          return data.data.data;
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
