import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Games() {
  const ALL_GAMES_QUERY = gql`
    query AllGamesQuery($date: String!) {
      allGames(date: $date) {
        home_team {
          full_name
          id
        }
        visitor_team {
          full_name
          id
        }
        home_team_score
        visitor_team_score
        status
        id
      }
    }
  `;
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    if (!date) setDate(moment().format("YYYY-MM-DD"));
  }, [date]);

  const { loading, error, data } = useQuery(ALL_GAMES_QUERY, {
    variables: { date }
  });
  if (loading) return <p>Loading...</p>;
  if (error) console.log(error);
  return (
    <div className="text-center flex flex-col items-center">
      <label htmlFor="date">Show games for:</label>
      <input
        className="border-2 border-gray-500 p-2"
        value={date}
        type="date"
        id="date"
        onChange={e => setDate(e.target.value)}
        pattern="\d{4}-\d{2}-\d{2}"
      />
      {data.allGames.map(game => (
        <div key={game.id} className="mt-4">
          <div className="flex">
            <div className="flex flex-col mx-2">
              <Link to={`/teams/${game.home_team.id}`}>
                {game.home_team.full_name}
              </Link>{" "}
              {game.home_team_score !== 0 && <p>{game.home_team_score}</p>}
            </div>
            vs.
            <div className="flex flex-col mx-2">
              <Link to={`/teams/${game.visitor_team.id}`}>
                {game.visitor_team.full_name}
              </Link>{" "}
              {game.visitor_team_score !== 0 && (
                <p>{game.visitor_team_score}</p>
              )}
            </div>
          </div>
          <p>{game.status}</p>
          <p></p>
        </div>
      ))}
    </div>
  );
}
