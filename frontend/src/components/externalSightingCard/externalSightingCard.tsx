import { SightingResponse } from "../../clients/externalApiClient";
import { format, parseISO } from "date-fns";

interface SightingCardProps {
  sighting: SightingResponse;
}

export const ExternalSightingCard: React.FunctionComponent<
  SightingCardProps
> = ({ sighting }) => {
  const species = sighting.species;
  const formattedDate = format(parseISO(sighting.date), "do MMMM, yyyy");

  return (
    <div className="sighting-card">
      <p>Spotted on: {formattedDate}</p>
      <p>Latitude: {sighting.location.latitude}</p>
      <p>Longitude: {sighting.location.longitude}</p>
      {sighting.photoUrl ? (
        <img src={sighting.photoUrl} alt="sighting of whales" />
      ) : (
        <img src="https://i.imgur.com/bQI6qPz.jpeg" alt="sighting of whales" />
      )}
      {species.length != 0 ? (
        species.map((species) => {
          return (
            <>
              <p>{species.name}</p>
              <p>{species.description}</p>
            </>
          );
        })
      ) : (
        <div>
          <p>Unrecognised species</p>
          <p>This type of whale was not recognised when whale spotting</p>
        </div>
      )}
    </div>
  );
};
