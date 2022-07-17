import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import Card from "./Card";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const initialCardState = { id: "", front: "", back: "", deckId: "" };
  const [deck, setDeck] = useState({
    name: "loading...",
    description: "",
  });
  const [editCard, setEditCard] = useState(initialCardState);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadCard() {
      try {
        const loadedCard = await readCard(cardId, abortController.signal);
        setEditCard(loadedCard);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    loadCard();
    return () => {
      abortController.abort();
    };
  }, [cardId]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setDeck(loadedDeck);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    loadDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const changeHandler = ({ target }) => {
    setEditCard((currentState) => ({
      ...currentState,
      [target.name]: target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await updateCard(editCard);
    setEditCard(initialCardState);
    history.push(`/decks/${deckId}`);
  };

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <Card
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        newCardData={editCard}
        deckId={deckId}
      />
    </React.Fragment>
  );
}

export default EditCard;
