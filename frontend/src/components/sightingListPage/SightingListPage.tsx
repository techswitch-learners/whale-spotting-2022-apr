import { useEffect, useState } from "react";
import {
  fetchSightings,
  SightingResponse,
} from "../../clients/internalApiClient";
import { SightingCard } from "../sightingCard/sightingCard";

export const SightingListPage: React.FunctionComponent = () => {
  const [sightings, setSightings] = useState<SightingResponse[]>();

  useEffect(() => {
    fetchSightings().then((response) => setSightings(response.sightings));
  }, []);

  return (
    <section>
      <h1>Sighting List</h1>
      {sightings &&
        sightings.map((sighting) => (
          <SightingCard sighting={sighting} key={sighting.id} />
        ))}
    </section>
  );
};
