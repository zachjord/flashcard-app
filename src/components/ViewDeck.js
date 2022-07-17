import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteDeck, readDeck } from "../utils/api";
import CardList from "./CardList";

function ViewDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ name: "loading...", cards: [] });

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(() => ({ ...response }));
      } catch (error) {
        if (error.name !== "Abort Error") {
          throw error;
        }
      }
    }
    loadDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const deleteHandler = async (deckId) => {
    const confirmation = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmation) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="card">
        <div className="card-header text-center">
          <h2>{deck.name}</h2>
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{deck.description}</p>
          </blockquote>
          <div className="d-flex justify-content-around">
            <Link to={`/decks/${deck.id}/edit`}>
              <button className="btn btn-secondary">Edit</button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button type="button" className="btn btn-primary">
                Study
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/cards/new`}>
              <button type="button" className="btn btn-primary">
                Add Cards
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteHandler(deckId)}>
              Delete Deck
            </button>
          </div>
        </div>
      </div>
      <CardList cards={deck.cards} />
    </React.Fragment>
  );
}

export default ViewDeck;
