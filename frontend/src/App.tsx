import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/homepage/Home";
import { LoginPage } from "./components/login/LoginPage";
import { Navbar } from "./components/navbar/Navbar";
import { LoginManager } from "./components/login/LoginManager";
import { Footer } from "./components/footer/Footer";
import { CreateSightingPage } from "./components/createsighting/CreateSightingPage";
import { Sightings } from "./components/sightings/sightings";
import { SightingPage } from "./components/SightingPage/SightingPage";

const Routes: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/sightings">
        <Sightings />
      </Route>
      <Route exact path="/sightings/:id">
        <SightingPage />
      </Route>
      <Route exact path="/admin/login">
        <LoginPage />
      </Route>
      <Route exact path="/sightings/create">
        <CreateSightingPage />
      </Route>
    </Switch>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <LoginManager>
        <Navbar />
        <main>
          <Routes />
        </main>
        <Footer />
      </LoginManager>
    </Router>
  );
};

export default App;
