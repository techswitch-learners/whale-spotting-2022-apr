import { useEffect, useState } from "react";
import {
  fetchUnapprovedSightings,
  SightingResponse,
} from "../../clients/internalApiClient";
import { SightingCard } from "../sightingCard/sightingCard";

export const UnapprovedSightingPage: React.FunctionComponent = () => {
  const [sightings, setSightings] = useState<SightingResponse[]>();

  useEffect(() => {
    fetchUnapprovedSightings().then((response) =>
      setSightings(response.sightings)
    );
  }, []);

  return (
    <section>
      <h1>Unapproved Sighting List</h1>
      {sightings &&
        sightings.map((sighting) => (
          <>
            <SightingCard sighting={sighting} key={sighting.id} />
            <button>Approve</button>
            <button>Delete</button>
          </>
        ))}
    </section>
  );
};
