import "./sightingCard.scss";
import { SightingResponse } from "../../clients/internalApiClient";
import { format, parseISO } from "date-fns";

interface SightingCardProps {
  sighting: SightingResponse;
}

export const SightingCard: React.FunctionComponent<SightingCardProps> = ({
  sighting,
}) => {
  const species = sighting.species;
  const formattedDate = format(parseISO(sighting.date), "do MMMM, yyyy");

  return (
    <div className="sighting-card">
      <p>Description: {sighting.description}</p>
      <p>Spotted on: {formattedDate}</p>
      <p>Latitude: {sighting.latitude}</p>
      <p>Longitude: {sighting.longitude}</p>
      {sighting.photoUrl ? (
        <img src={sighting.photoUrl} alt="sighting of whales" />
      ) : (
        <img src="https://i.imgur.com/bQI6qPz.jpeg" alt="sighting of whales" />
      )}
      {species ? (
        <div>
          <p>{species.name}</p>
          <p>{species.description}</p>
        </div>
      ) : (
        <div>
          <p>Unrecognised species</p>
          <p>This type of whale was not recognised when whale spotting</p>
        </div>
      )}
    </div>
  );
};
