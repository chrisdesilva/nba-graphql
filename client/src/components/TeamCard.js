import React from "react";
import { Link } from "react-router-dom";

export default function TeamCard({ team: { id, city, name } }) {
  return (
    <div className="p-8 my-2 border border-b-2 text-center cursor-pointer">
      <Link to={`/teams/${id}`}>{name}</Link>
    </div>
  );
}
