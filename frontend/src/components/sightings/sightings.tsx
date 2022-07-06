import { useEffect, useState } from "react";
import {
  fetchSightings as fetchInternalSightings,
  SightingResponse as internalSightingResponse,
} from "../../clients/internalApiClient";
import {
  fetchSightings as fetchExternalSightings,
  SightingResponse as externalSightingResponse,
} from "../../clients/externalApiClient";
import { SightingCard as InternalSightingCard } from "../sightingCard/sightingCard";
import { ExternalSightingCard } from "../externalSightingCard/externalSightingCard";

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
            return (
              <InternalSightingCard sighting={sighting} key={sighting.id} />
            );
          }
        })}
      {externalSightings &&
        externalSightings.map((sighting) => {
          return <ExternalSightingCard sighting={sighting} key={sighting.id} />;
        })}
    </section>
  );
};
