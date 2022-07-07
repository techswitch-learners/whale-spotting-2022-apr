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

export const Sightings: React.FunctionComponent = () => {
  const [internalSightings, setInternalSightings] =
    useState<InternalSightingResponse[]>();
  const [externalSightings, setExternalSightings] =
    useState<ExternalSightingResponse[]>();

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
