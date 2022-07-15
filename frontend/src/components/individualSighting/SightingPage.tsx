import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchSightingById,
  SightingResponse,
} from "../../clients/internalApiClient";
import { SightingCard } from "../sightingCard/sightingCard";
import "./SightingPage.scss";

export const SightingPage: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const idNumber = parseInt(id);
  const [sighting, setSighting] = useState<SightingResponse>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchSightingById(idNumber)
      .then((response) => {
        setSighting(response);
        setIsLoading(false);
      })
      .catch((error) => setIsLoading(false));
  }, []);

  return (
    <div className="individual-sighting-card">
      <h1 className="text-center">Whale spotting sighting</h1>
      {sighting ? (
        <SightingCard sighting={sighting} key={sighting.id} />
      ) : isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <p className="text-center">No sighting here!</p>
      )}
    </div>
  );
};
