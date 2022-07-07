import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchSightingById,
  SightingResponse,
} from "../../clients/internalApiClient";
import { SightingCard } from "../sightingCard/sightingCard";

export const SightingPage: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const idNumber = parseInt(id);
  const [sighting, setSighting] = useState<SightingResponse>();
  useEffect(() => {
    fetchSightingById(idNumber).then((response) => setSighting(response));
  }, []);

  return (
    <section>
      <h1>Whale spotting sighting</h1>
      {sighting && <SightingCard sighting={sighting} key={sighting.id} />}
    </section>
  );
};
