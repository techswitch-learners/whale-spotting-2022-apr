import { useEffect, useState } from "react";
import {
  fetchSightings,
  SightingResponse,
} from "../../clients/internalApiClient";
import { SightingCard } from "../sightingCard/sightingCard";

export const Sightings: React.FunctionComponent = () => {
  const [sightings, setSightings] = useState<SightingResponse[] | null>(null);

  useEffect(() => {
    fetchSightings().then((response) => setSightings(response.sightings));
  }, []);

  return (
    <section>
      <h1>Sighting page!</h1>
      {sightings &&
        sightings.map((sighting) => (
          <SightingCard sighting={sighting} key={sighting.id} />
        ))}
    </section>
  );
};