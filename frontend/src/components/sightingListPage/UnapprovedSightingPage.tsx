import { useEffect, useState, useContext } from "react";
import {
  fetchUnapprovedSightings,
  SightingResponse,
  approveSighting,
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
  };

  return (
    <section>
      <h1>Unapproved Sighting List</h1>
      {loginContext.isAdmin ? (
        sightings &&
        sightings
          .filter((sighting) => !removeSightingIds.includes(sighting.id))
          .map((sighting) => (
            <>
              <SightingCard sighting={sighting} key={sighting.id} />
              <button
                onClick={() => {
                  onApprove(sighting);
                }}
              >
                Approve
              </button>
              <button>Delete</button>
            </>
          ))
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};
