import { useEffect, useState, useContext } from "react";
import {
  fetchUnapprovedSightings,
  SightingResponse,
  approveSighting,
  deleteById,
} from "../../clients/internalApiClient";
import { LoginContext } from "../login/LoginManager";
import { SightingCard } from "../sightingCard/sightingCard";

export const UnapprovedSightingPage: React.FunctionComponent = () => {
  const [sightings, setSightings] = useState<SightingResponse[]>();
  const [removeSightingIds, setRemoveSightingIds] = useState<number[]>([]);
  const loginContext = useContext(LoginContext);

  useEffect(() => {
    fetchUnapprovedSightings(loginContext.username, loginContext.password).then(
      (response) => setSightings(response.sightings)
    );
  }, []);

  const onApprove = (sighting: SightingResponse) => {
    setRemoveSightingIds(removeSightingIds.concat([sighting.id]));
    approveSighting(sighting.id, loginContext.username, loginContext.password);
  };

  const onDelete = (sighting: SightingResponse) => {
    setRemoveSightingIds(removeSightingIds.concat([sighting.id]));
    deleteById(sighting.id, loginContext.username, loginContext.password);
  };

  const filteredSightings =
    sightings &&
    sightings.filter((sighting) => !removeSightingIds.includes(sighting.id));
  return (
    <div className="container-fluid">
      <h1 className="text-center">Unapproved Sightings</h1>
      {loginContext.isAdmin ? (
        filteredSightings ? (
          <div className="row">
            {filteredSightings.map((sighting) => (
              <div
                role="unapproved"
                className="col-sm-6 col-md-4 col-lg-3"
                key={sighting.id}
              >
                <SightingCard
                  sighting={sighting}
                  isApproved={false}
                  onApprove={onApprove}
                  onDelete={onDelete}
                  key={sighting.id}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>There are no unapproved sightings left!</p>
        )
      ) : (
        <p>Please login as administrator</p>
      )}
    </div>
  );
};
