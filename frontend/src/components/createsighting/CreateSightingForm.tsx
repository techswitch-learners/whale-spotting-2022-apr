import React, { useState, FormEvent } from "react";
import { createSighting } from "../../clients/internalApiClient";
import { format, parse } from "date-fns";

type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export const CreateSightingForm: React.FunctionComponent = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [speciesId, setSpeciesId] = useState(0);
  const [status, setStatus] = useState<FormStatus>("READY");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setStatus("SUBMITTING");
    createSighting({
      latitude,
      longitude,
      date,
      description,
      photoUrl,
      speciesId,
    })
      .then(() => setStatus("FINISHED"))
      .catch(() => setStatus("ERROR"));
  };

  if (status === "FINISHED") {
    return (
      <div>
        <h5>Your sighting is submitted successfully!</h5>
        <h5>It will be approved in a few days! Thank you</h5>
      </div>
    );
  }
  return (
    <form onSubmit={submit}>
      <fieldset>
        <label>
          Enter date:
          <input
            type={"date"}
            value={format(date, "yyyy-MM-dd")}
            onChange={(event) =>
              setDate(parse(event.target.value, "yyyy-MM-dd", new Date()))
            }
          />
        </label>
        <br />
        <label>
          Enter Latitude:
          <input
            type={"float"}
            required
            min={-90}
            max={90}
            value={latitude}
            onChange={(event) => setLatitude(parseFloat(event.target.value))}
          />
        </label>
        <br />
        <label>
          Enter Longitude:
          <input
            type={"float"}
            required
            min={-180}
            max={180}
            value={longitude}
            onChange={(event) => setLongitude(parseFloat(event.target.value))}
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
            value={photoUrl}
            onChange={(event) => setPhotoUrl(event.target.value)}
          />
        </label>
        <br />
        <label>
          Enter Species ID:
          <input
            type={"number"}
            value={speciesId}
            onChange={(event) => setSpeciesId(parseInt(event.target.value))}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  );
};
