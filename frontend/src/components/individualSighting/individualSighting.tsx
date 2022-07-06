import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchSightingById,
  SightingResponse,
} from "../../clients/internalApiClient";
import { SightingCard } from "../sightingCard/sightingCard";
import { Sightings } from "../sightings/sightings";

export const IndividualSighting: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const idNumber = parseInt(id);
  const [sighting, setSighting] = useState<SightingResponse>();
  useEffect(() => {
    fetchSightingById(idNumber).then((response) => setSighting(response));
  }, []);

  if (id === undefined) {
    return <Sightings />;
  }
  return (
    <div>
      <h2>Whale spotting sighting</h2>
      {sighting && <SightingCard sighting={sighting} key={sighting.id} />}
    </div>
  );
};
