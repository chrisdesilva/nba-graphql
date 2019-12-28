import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./nba.png";
import Teams from "./components/Teams";
import Team from "./components/Team";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex justify-center">
          <img src={logo} alt="NBA logo" />
        </div>
        <Route exact path="/" component={Teams} />
        <Route exact path="/teams/:id" component={Team} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
