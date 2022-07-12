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
  if (Array.isArray(species)) {
    speciesSection = (
      <ul>
        {species.map((s) => {
          return (
            <li key={s.id}>
              <h5 className="card-title">{s.name}</h5>
            </li>
          );
        })}
      </ul>
    );
  } else {
    speciesSection = <h5 className="card-title">{species.name}</h5>;
  }

  return (
    <div className="card sighting-card">
      <img
        className="card-img-top"
        src={sighting.photoUrl || "https://i.imgur.com/bQI6qPz.jpeg"}
        alt="sighting of whales"
      />
      <div className="card-body">
        {species ? (
          speciesSection
        ) : (
          <h5 className="card-title">Unrecognised species</h5>
        )}
        <h6 className="card-subtitle">Spotted on: {formattedDate}</h6>
        {descriptionSection}
        {locationSection}
      </div>
    </div>
  );
};
