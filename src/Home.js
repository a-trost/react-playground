import React from "react";
import { Link } from "react-router-dom";

export default function Welcome(props) {
  return (
    <div>
      <h1>Trost's React Playground</h1>
      <Link to="/virtualdom">React's Virtual DOM Playground</Link>
    </div>
  );
}
