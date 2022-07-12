import { useEffect, useState } from "react";
import {
  fetchSightings as fetchInternalSightings,
  SightingResponse as InternalSightingResponse,
} from "../../clients/internalApiClient";
import {
  fetchSightings as fetchExternalSightings,
  SightingResponse as ExternalSightingResponse,
} from "../../clients/externalApiClient";
import { SightingCard } from "../sightingCard/sightingCard";
import { compareDesc, parseISO } from "date-fns";

export const Sightings: React.FunctionComponent = () => {
  const [internalSightings, setInternalSightings] =
    useState<InternalSightingResponse[]>();
  const [externalSightings, setExternalSightings] =
    useState<ExternalSightingResponse[]>();

  let allSightings: Array<InternalSightingResponse | ExternalSightingResponse> =
    [];
  if (internalSightings !== undefined) {
    allSightings = allSightings.concat(internalSightings);
  }
  if (externalSightings !== undefined) {
    allSightings = allSightings.concat(externalSightings);
  }
  allSightings.sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));

  useEffect(() => {
    fetchInternalSightings().then((response) =>
      setInternalSightings(response.sightings)
    );

    fetchExternalSightings().then((response) =>
      setExternalSightings(response.sightings)
    );
  }, []);

  return (
    <section>
      <h1>Sightings</h1>
      {allSightings ? (
        <ul>
          {allSightings.map((sighting, index) => {
            return (
              <li key={index}>
                <SightingCard sighting={sighting} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};
