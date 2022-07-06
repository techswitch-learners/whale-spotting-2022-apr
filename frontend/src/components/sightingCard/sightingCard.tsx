import "./sightingCard.scss";
import {
  SightingResponse as InternalSightingResponse,
  SpeciesResponse as InternalSpeciesResponse,
} from "../../clients/internalApiClient";
import {
  SightingResponse as ExternalSightingResponse,
  SpeciesResponse as ExternalSpeciesResponse,
} from "../../clients/externalApiClient";
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

  function isExternalSpeciesResponse(
    response: InternalSpeciesResponse | ExternalSpeciesResponse
  ): response is ExternalSpeciesResponse {
    return (response as ExternalSpeciesResponse) !== undefined;
  }

  // let speciesSection = <></>;
  // if (isExternalSpeciesResponse(species)) {

  // }

  return (
    <div className="sighting-card">
      {descriptionSection}
      <p>Spotted on: {formattedDate}</p>
      {locationSection}
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
