import React, { useState, FormEvent, useEffect } from "react";
import {
  createSighting,
  fetchSpecies,
  SpeciesResponse,
} from "../../clients/internalApiClient";
import { format, parse } from "date-fns";
import "./Sightingform.scss";
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

  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (
      date &&
      !isNaN(parseFloat(latitude)) &&
      !isNaN(parseFloat(longitude)) &&
      description
    ) {
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
    }
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
        <h5>Your sighting is submitted successfully!</h5>
        <h5>It will be approved in a few days! Thank you</h5>
      </div>
    );
  }
  return (
    <form
      className={`sighting-form form-group h-100 shadow-lg p-3 mb-5 bg-body rounded needs-validation ${
        submitted && "was-validated"
      }`}
      onSubmit={submit}
      data-testid="form"
      noValidate
    >
      <fieldset>
        <label className="w-100">
          Enter date:
          <input
            className="form-control my-1"
            required
            type="date"
            value={format(date, "yyyy-MM-dd")}
            onChange={(event) =>
              setDate(parse(event.target.value, "yyyy-MM-dd", new Date()))
            }
          />
        </label>
        <br />
        <label className="w-100">
          Enter Latitude:
          <input
            className="form-control my-1"
            type="number"
            required
            min={-90}
            max={90}
            value={latitude}
            step="0.000001"
            onChange={(event) => setLatitude(event.target.value)}
          />
          <div className="invalid-feedback">Please enter a valid latitude</div>
        </label>
        <br />
        <label className="w-100">
          Enter Longitude:
          <input
            className="form-control my-1"
            type="number"
            required
            min={-180}
            max={180}
            value={longitude}
            step="0.000001"
            onChange={(event) => setLongitude(event.target.value)}
          />
          <div className="invalid-feedback">Please enter a valid longitude</div>
        </label>
        <br />
        <label className="w-100">
          Enter Description:
          <textarea
            className="form-control my-1"
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <div className="invalid-feedback">Please enter a description</div>
        </label>
        <br />
        <label className="w-100">
          Enter Photo:
          <input
            className="form-control my-1"
            type="url"
            value={photoUrl}
            onChange={(event) => setPhotoUrl(event.target.value)}
          />
        </label>
        <br />
        <label className="w-100">
          Select Species:
          <Select
            className="my-1"
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
        <button className="btn btn-secondary mt-3" type="submit">
          Submit
        </button>
      </fieldset>
    </form>
  );
};
