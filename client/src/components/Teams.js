import React, { Fragment } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import TeamCard from "./TeamCard";

export default function Teams() {
  const TEAMS_QUERY = gql`
    query TeamsQuery {
      teams {
        city
        id
        name
      }
    }
  `;

  const { loading, error, data } = useQuery(TEAMS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) console.log(error);

  return (
    <div className="flex flex-col items-center">
      <h1>All NBA Teams</h1>
      <Fragment>
        {data.teams.map(team => (
          <TeamCard key={team.id} team={team} />
        ))}
      </Fragment>
    </div>
  );
}
