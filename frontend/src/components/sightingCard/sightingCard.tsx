import "./sightingCard.scss";
import { SightingResponse as InternalSightingResponse } from "../../clients/internalApiClient";
import { SightingResponse as ExternalSightingResponse } from "../../clients/externalApiClient";
import { format, parseISO } from "date-fns";

interface SightingCardProps {
  sighting: InternalSightingResponse | ExternalSightingResponse;
  isApproved?: boolean;
  onApprove?: (sighting: InternalSightingResponse) => void;
  onDelete?: (sighting: InternalSightingResponse) => void;
}

export const SightingCard: React.FunctionComponent<SightingCardProps> = ({
  sighting,
  isApproved = true,
  onApprove,
  onDelete,
}) => {
  const species = sighting.species;
  const formattedDate = format(parseISO(sighting.date), "do MMMM, yyyy");

  let descriptionSection = <></>;
  if ("description" in sighting) {
    descriptionSection = (
      <p className="my-0">Description: {sighting.description}</p>
    );
  }

  let locationSection = <></>;
  if ("location" in sighting) {
    locationSection = (
      <>
        <p className="my-0">
          Coordinates: ({sighting.location.latitude},{" "}
          {sighting.location.longitude})
        </p>
      </>
    );
  } else {
    locationSection = (
      <>
        <p className="my-0">
          Coordinates: ({sighting.latitude}, {sighting.longitude})
        </p>
      </>
    );
  }

  let speciesSection = <></>;
  if (species) {
    if (Array.isArray(species)) {
      speciesSection = (
        <h5 className="card-title my-0">
          {species.map((s, index) =>
            species.length === index + 1 ? s.name : `${s.name}, `
          )}
        </h5>
      );
    } else {
      speciesSection = <h5 className="card-title my-0">{species.name}</h5>;
    }
  }

  return (
    <div className="card sighting-card my-2">
      <div className="ratio ratio-4x3">
        <img
          className="card-img-top"
          src={sighting.photoUrl || "https://i.imgur.com/bQI6qPz.jpeg"}
          alt="sighting of whales"
        />
      </div>
      <div className="card-body">
        {species ? (
          speciesSection
        ) : (
          <h5 className="card-title my-0">Unrecognised species</h5>
        )}
        <h6 className="card-subtitle my-0">Spotted on: {formattedDate}</h6>
        {descriptionSection}
        {locationSection}
        {!isApproved && (
          <>
            <button
              className="btn btn-primary mt-3 me-3"
              onClick={() => {
                onApprove && onApprove(sighting as InternalSightingResponse);
              }}
            >
              Approve
            </button>
            <button
              className="btn btn-danger mt-3"
              onClick={() => {
                onDelete && onDelete(sighting as InternalSightingResponse);
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};
