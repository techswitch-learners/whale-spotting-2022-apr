import React, { useState, FormEvent } from "react";
import { createSighting } from "../../clients/internalApiClient";

type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export const CreateSightingForm: React.FunctionComponent = () => {
  const [date, setDate] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [species, setSpecies] = useState("");
  const [status, setStatus] = useState<FormStatus>("READY");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setStatus("SUBMITTING");
    createSighting({
      latitude,
      longitude,
      date: parseString(date),
      description,
      photoUrl,
      species: parseInt(SpeciesId),
    })
      .then(() => setStatus("FINISHED"))
      .catch(() => setStatus("ERROR"));
  };

  if (status === "FINISHED") {
    return (
      <div>
        <p>Form Submitted Successfully!</p>
      </div>
    );
  }
  return (
    <form onSubmit={submit}>
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
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  );
};
function NewSightingRequest(NewSightingRequest: any) {
  throw new Error("Function not implemented.");
}
