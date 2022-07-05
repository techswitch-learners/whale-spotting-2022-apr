import React, { useState, FormEvent } from "react";

export const CreateSightingForm: React.FunctionComponent = () => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [species, setSpecies] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
  };
  return (
    <form>
      <fieldset>
        <label>
          Enter date:
          <input
            type={"text"}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
        <br />
        <label>
          Enter Location:
          <input
            type={"text"}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <br />
        <label>
          Enter Description:
          <input
            type={"text"}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <br />
        <label>
          Enter Photo:
          <input
            type={"text"}
            value={photo}
            onChange={(event) => setPhoto(event.target.value)}
          />
        </label>
        <br />
        <label>
          Enter Species:
          <input
            type={"text"}
            value={species}
            onChange={(event) => setSpecies(event.target.value)}
          />
        </label>
        <br />
        <button type="submit" onSubmit={(event) => console.log(event.target)}>
          Submit
        </button>
      </fieldset>
    </form>
  );
};
