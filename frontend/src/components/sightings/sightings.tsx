import { useEffect, useState } from "react";
import {
  fetchSightings as fetchInternalSightings,
  SightingResponse as internalSightingResponse,
} from "../../clients/internalApiClient";
import {
  fetchSightings as fetchExternalSightings,
  SightingResponse as externalSightingResponse,
} from "../../clients/externalApiClient";
import { SightingCard as SightingCard } from "../sightingCard/sightingCard";

export const Sightings: React.FunctionComponent = () => {
  const [internalSightings, setInternalSightings] =
    useState<internalSightingResponse[]>();
  const [externalSightings, setExternalSightings] =
    useState<externalSightingResponse[]>();

  useEffect(() => {
    fetchInternalSightings().then((response) =>
      setInternalSightings(response.sightings)
    );
  }, []);

  useEffect(() => {
    fetchExternalSightings().then((response) =>
      setExternalSightings(response.sightings)
    );
  }, []);

  return (
    <section>
      <h1>Sightings</h1>
      {internalSightings &&
        internalSightings.map((sighting) => {
          if (sighting.isApproved) {
            return <SightingCard sighting={sighting} key={sighting.id} />;
          }
        })}
      {externalSightings &&
        externalSightings.map((sighting) => {
          return <SightingCard sighting={sighting} key={sighting.id} />;
        })}
    </section>
  );
};
