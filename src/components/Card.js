import React from "react";
import { Link } from "react-router-dom";

function Card({ deckId, newCardData, changeHandler, submitHandler }) {
  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          rows="5"
          placeholder="Front side of card"
          onChange={changeHandler}
          value={newCardData.front}
          required></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          rows="5"
          placeholder="Back side of card"
          onChange={changeHandler}
          value={newCardData.back}
          required></textarea>
      </div>
      <Link to={`/decks/${deckId}`} className="mr-2">
        <button type="button" className="btn btn-secondary">
          Done
        </button>
      </Link>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

export default Card;
