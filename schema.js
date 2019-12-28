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
    name: { type: GraphQLString },
    conference: { type: GraphQLString },
    division: { type: GraphQLString },
    full_name: { type: GraphQLString }
  })
});

const GameType = new GraphQLObjectType({
  name: "Game",
  fields: () => ({
    date: { type: GraphQLString },
    id: { type: GraphQLInt },
    home_team_score: { type: GraphQLInt },
    visitor_team_score: { type: GraphQLInt },
    home_team: { type: TeamType },
    visitor_team: { type: TeamType }
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
    },
    team: {
      type: TeamType,
      args: {
        id: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        try {
          const response = await axios.get(
            `https://www.balldontlie.io/api/v1/teams/${args.id}`
          );
          const data = await response;
          return data.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    games: {
      type: new GraphQLList(GameType),
      async resolve(parent, args) {
        try {
          const response = await axios.get(
            "https://www.balldontlie.io/api/v1/games"
          );
          const data = await response;
          return data.data.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    game: {
      type: GameType,
      args: {
        id: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        try {
          const response = await axios.get(
            `https://www.balldontlie.io/api/v1/games/${args.id}`
          );
          const data = await response;
          return data.data;
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
