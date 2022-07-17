import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function StudyDeck() {
  const initialState = {
    deck: { name: "loading...", cards: [] },
    isCardFlipped: false,
    currentIndex: 0,
  };
  const [studyDeckState, setStudyDeckState] = useState(initialState);
  const { deck, isCardFlipped, currentIndex } = studyDeckState;
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setStudyDeckState((currentState) => ({
          ...currentState,
          deck: loadedDeck,
        }));
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

  function flipCardHandler() {
    setStudyDeckState({
      ...studyDeckState,
      isCardFlipped: !studyDeckState["isCardFlipped"],
    });
  }

  function nextCardHandler() {
    const { cards } = deck;
    if (currentIndex === cards.length - 1) {
      const response = window.confirm(
        "Would you like to study this deck again?"
      );
      if (response) {
        setStudyDeckState((currentState) => ({
          ...currentState,
          currentIndex: 0,
          isCardFlipped: false,
        }));
      }
    } else {
      setStudyDeckState((currentState) => ({
        ...currentState,
        currentIndex: currentState.currentIndex++,
        isCardFlipped: !currentState.isCardFlipped,
      }));
    }
  }

  const navigation = (
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Study
        </li>
      </ol>
    </nav>
  );

  if (deck.cards.length > 2) {
    return (
      <React.Fragment>
        {navigation}
        <h1>{`${deck.name}`}: Study</h1>
        <div
          key={deck.id}
          className="card"
          style={{ width: "100%", marginTop: "1em" }}>
          <div className="card-body">
            <h4 className="card-title">
              Card {currentIndex + 1} of {deck.cards.length}
            </h4>
            <p className="card-text">
              {!isCardFlipped
                ? `${deck.cards[currentIndex].front}`
                : `${deck.cards[currentIndex].back}`}
            </p>
            <button
              className="btn btn-secondary mr-2"
              onClick={flipCardHandler}>
              Flip
            </button>

            {isCardFlipped && (
              <button className="btn btn-primary" onClick={nextCardHandler}>
                Next
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        {navigation}
        <h1>{`${deck.name}`}: Study</h1>
        <h2 className="card-title">Not enough cards.</h2>
        <p className="card-text">
          You need at least 3 cards to study. There are {deck.cards.length} in
          this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`}>
          <button type="button" className="btn btn-primary">
            Add Card
          </button>
        </Link>
      </React.Fragment>
    );
  }
}

export default StudyDeck;
