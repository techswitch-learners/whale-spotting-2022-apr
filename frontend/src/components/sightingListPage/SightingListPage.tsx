import { useEffect, useState } from "react";
import {
  fetchSightings,
  SightingResponse,
} from "../../clients/internalApiClient";
import { SightingCard } from "../sightingCard/sightingCard";
import "masonry-layout/masonry";

export const SightingListPage: React.FunctionComponent = () => {
  const [sightings, setSightings] = useState<SightingResponse[]>();

  useEffect(() => {
    fetchSightings().then((response) => setSightings(response.sightings));
  }, []);

  return (
    <section>
      <h1>Sightings</h1>
      <div className="row" data-masonry='{"percentPosition": true }'>
        {sightings &&
          sightings.map((sighting) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={sighting.id}>
              <SightingCard sighting={sighting} />
            </div>
          ))}
      </div>
    </section>
  );
};
