import React from "react";

export default function TeamCard({ team: { id, city, name } }) {
  return (
    <div>
      <h2>
        {city} {name}
      </h2>
    </div>
  );
}
