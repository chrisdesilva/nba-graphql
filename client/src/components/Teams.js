import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import TeamCard from "./TeamCard";

const TEAMS_QUERY = gql`
  query TeamsQuery {
    teams {
      city
      id
      name
    }
  }
`;

export default function Teams(props) {
  return (
    <div className="flex flex-col items-center">
      <h1>All NBA Teams</h1>
      <Query query={TEAMS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) console.log(error);
          return (
            <div>
              {data.teams.map(team => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          );
        }}
      </Query>
    </div>
  );
}
