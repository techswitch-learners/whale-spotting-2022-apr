import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SightingResponse } from "../../clients/internalApiClient";
import { SightingCard } from "../sightingCard/sightingCard";
import { Sightings } from "../sightings/sightings";

export const IndividualSighting: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [sighting, setSighting] = useState<SightingResponse>();
  useEffect(() => {
    fetchSighting().then((response) => setSighting(response.sighting));
  }, []);

  if (id === undefined) {
    return <Sightings />;
  }
  return (
    <div>
      <h2>Whale spotting sighting</h2>
      <SightingCard sighting={sighting} key={sighting.id} />;
    </div>
  );
};
