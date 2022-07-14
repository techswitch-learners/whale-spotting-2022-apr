import "./sightingCard.scss";
import { SightingResponse as InternalSightingResponse } from "../../clients/internalApiClient";
import { SightingResponse as ExternalSightingResponse } from "../../clients/externalApiClient";
import { format, parseISO } from "date-fns";

interface SightingCardProps {
  sighting: InternalSightingResponse | ExternalSightingResponse;
}

export const SightingCard: React.FunctionComponent<SightingCardProps> = ({
  sighting,
}) => {
  const species = sighting.species;
  const formattedDate = format(parseISO(sighting.date), "do MMMM, yyyy");

  let descriptionSection = <></>;
  if ("description" in sighting) {
    descriptionSection = <p>Description: {sighting.description}</p>;
  }

  let locationSection = <></>;
  if ("location" in sighting) {
    locationSection = (
      <>
        <p>Latitude: {sighting.location.latitude}</p>
        <p>Longitude: {sighting.location.longitude}</p>
      </>
    );
  } else {
    locationSection = (
      <>
        <p>Latitude: {sighting.latitude}</p>
        <p>Longitude: {sighting.longitude}</p>
      </>
    );
  }

  let speciesSection = <></>;
  if (species) {
    if (Array.isArray(species)) {
      speciesSection = (
        <>
          {species.map((s) => {
            return (
              <ul key={s.id}>
                <li>Species Name: {s.name}</li>
                <li>Species Description: {s.description}</li>
              </ul>
            );
          })}
        </>
      );
    } else {
      speciesSection = (
        <>
          <p>Species Name: {species.name}</p>
          <p>Species Description: {species.description}</p>
        </>
      );
    }
  }

  return (
    <div className="sighting-card">
      {descriptionSection}
      Spotted on: {formattedDate}
      {locationSection}
      {species ? (
        speciesSection
      ) : (
        <div>
          <p>Unrecognised species</p>
          <p>This type of whale was not recognised when whale spotting</p>
        </div>
      )}
      {sighting.photoUrl ? (
        <img src={sighting.photoUrl} alt="sighting of whales" />
      ) : (
        <img src="https://i.imgur.com/bQI6qPz.jpeg" alt="sighting of whales" />
      )}
    </div>
  );
};
