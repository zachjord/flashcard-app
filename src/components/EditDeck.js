import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
  const initialState = { name: "", description: "" };
  const [editDeckFormData, setEditDeckFormData] = useState(initialState);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setEditDeckFormData(() => loadedDeck);
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
    setEditDeckFormData((currentState) => ({
      ...currentState,
      [target.name]: target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await updateDeck(editDeckFormData);
    history.push(`/decks/${response.id}`);
  };

  return (
    <React.Fragment>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>
              {editDeckFormData.name ? editDeckFormData.name : "Loading..."}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            className="form-control"
            placeholder="Deck Name"
            onChange={changeHandler}
            value={editDeckFormData.name}
            required></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            className="form-control"
            placeholder="Deck Description"
            onChange={changeHandler}
            value={editDeckFormData.description}
            required></textarea>
        </div>
        <Link to={`/decks/${deckId}`} className="mr-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push(`/decks/${deckId}/edit`)}>
            Cancel
          </button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default EditDeck;
