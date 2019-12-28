import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

export default function Team(props) {
  const TEAM_QUERY = gql`
    query TeamQuery($id: Int!) {
      team(id: $id) {
        full_name
        conference
        division
      }
    }
  `;
  let { id } = props.match.params;
  id = parseInt(id);
  return (
    <Fragment>
      <Query query={TEAM_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) console.log(error);
          console.log(props.match.params);
          const { full_name, division, conference } = data.team;
          return (
            <div className="flex flex-col items-center">
              <h2>{full_name}</h2>
              <p>Conference: {conference}</p>
              <p>Division: {division}</p>
              <Link to="/">&larr;Back</Link>
            </div>
          );
        }}
      </Query>
    </Fragment>
  );
}
