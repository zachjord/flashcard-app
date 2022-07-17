import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function Create() {
  const initialFormState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const history = useHistory();

  const onChangeHandler = ({ target }) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [target.name]: target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await createDeck(formData);
    setFormData(initialFormState);
    history.push(`/decks/${response.id}`);
  };

  return (
    <React.Fragment>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            className="form-control"
            placeholder="Deck Name"
            onChange={onChangeHandler}
            value={formData.name}
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
            onChange={onChangeHandler}
            value={formData.description}
            required></textarea>
        </div>
        <Link to="/" className="mr-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push("/decks/new")}>
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

export default Create;
