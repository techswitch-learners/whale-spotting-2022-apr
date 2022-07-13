import React, { useState, FormEvent, useEffect } from "react";
import {
  createSighting,
  fetchSpecies,
  SpeciesResponse,
} from "../../clients/internalApiClient";
import { format, parse } from "date-fns";
import Select from "react-select";

type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export const CreateSightingForm: React.FunctionComponent = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [speciesId, setSpeciesId] = useState(0);
  const [status, setStatus] = useState<FormStatus>("READY");
  const [species, setSpecies] = useState<SpeciesResponse[]>();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setStatus("SUBMITTING");
    createSighting({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      date,
      description,
      photoUrl,
      speciesId,
    })
      .then(() => setStatus("FINISHED"))
      .catch(() => setStatus("ERROR"));
  };

  interface ValueLabelPair {
    value: number;
    label: string;
  }

  const speciesOptions: ValueLabelPair[] = [
    { value: 0, label: "Unknown/Other" },
  ];

  useEffect(() => {
    fetchSpecies().then((response) => setSpecies(response.speciesList));
  }, []);

  if (species) {
    species.forEach((element) => {
      const option = { value: element.id, label: element.name };
      speciesOptions.push(option);
    });
  }

  if (status === "FINISHED") {
    return (
      <div>
        <p>Form Submitted Successfully!</p>
      </div>
    );
  }
  return (
    <form onSubmit={submit} data-testid="form">
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
            type="number"
            required
            min={-90}
            max={90}
            placeholder="0"
            value={latitude}
            step="0.000001"
            onChange={(event) => setLatitude(event.target.value)}
          />
        </label>
        <br />
        <label>
          Enter Longitude:
          <input
            type="number"
            required
            min={-180}
            max={180}
            placeholder="0"
            value={longitude}
            step="0.000001"
            onChange={(event) => setLongitude(event.target.value)}
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
          Select Species:
          <Select
            options={speciesOptions}
            name="species"
            onChange={(event) => {
              if (event && event.value != 0) {
                setSpeciesId(event.value);
              }
            }}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  );
};
