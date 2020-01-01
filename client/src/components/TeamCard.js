import React from "react";
import { Link } from "react-router-dom";

export default function TeamCard({ team: { id, name } }) {
  return (
    <Link
      className="p-8 my-2 border border-b-2 text-center cursor-pointer w-1/3 shadow"
      to={`/teams/${id}`}
    >
      {name}
    </Link>
  );
}
