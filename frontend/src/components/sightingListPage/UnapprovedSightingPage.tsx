import { useEffect, useState, useContext } from "react";
import {
  fetchUnapprovedSightings,
  SightingResponse,
} from "../../clients/internalApiClient";
import { LoginContext } from "../login/LoginManager";
import { SightingCard } from "../sightingCard/sightingCard";

export const UnapprovedSightingPage: React.FunctionComponent = () => {
  const [sightings, setSightings] = useState<SightingResponse[]>();
  const loginContext = useContext(LoginContext);

  useEffect(() => {
    fetchUnapprovedSightings(loginContext.username, loginContext.password).then(
      (response) => setSightings(response.sightings)
    );
  }, []);

  return (
    <section>
      <h1>Unapproved Sighting List</h1>
      {loginContext.isAdmin ? (
        sightings &&
        sightings.map((sighting) => (
          <>
            <SightingCard sighting={sighting} key={sighting.id} />
            <button>Approve</button>
            <button>Delete</button>
          </>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};
