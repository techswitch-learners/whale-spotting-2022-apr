import "./sightingCard.scss";
import { SightingResponse } from "../../clients/internalApiClient";
import { format, parseISO } from "date-fns";

interface SightingCardProps {
  sighting: SightingResponse;
}

export function SightingCard(props: SightingCardProps): JSX.Element {
  const sighting = props.sighting;
  const species = props.sighting.species;
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
        <img
          src="https://i0.wp.com/handluggageonly.co.uk/wp-content/uploads/2017/05/humpback-1209297_1920.jpg?w=1600&ssl=1"
          alt="sighting of whales"
        />
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
}
