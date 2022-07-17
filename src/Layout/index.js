import React from "react";
import { Link, Route, Switch } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";

import DeckList from "../components/DeckList";
import AddDeck from "../components/AddDeck";
import ViewDeck from "../components/ViewDeck";
import StudyDeck from "../components/StudyDeck";
import EditDeck from "../components/EditDeck";
import AddCard from "../components/AddCard";
import EditCard from "../components/EditCard";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Link to="/decks/new">
              <button className="btn btn-secondary mr-2">Create Deck</button>
            </Link>
            <DeckList />
          </Route>
          <Route exact path="/decks/new">
            <AddDeck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
