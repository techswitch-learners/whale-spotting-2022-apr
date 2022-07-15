import { useEffect, useState } from "react";
import {
  fetchSightings as fetchInternalSightings,
  SightingResponse as InternalSightingResponse,
} from "../../clients/internalApiClient";
import {
  fetchSightings as fetchExternalSightings,
  SightingResponse as ExternalSightingResponse,
} from "../../clients/externalApiClient";
import { SightingCard } from "../sightingCard/sightingCard";
import { compareDesc, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import "./sightings.scss";

interface SightingResponseWrapper {
  isInternal: boolean;
  sightingResponse: InternalSightingResponse | ExternalSightingResponse;
}

export const Sightings: React.FunctionComponent = () => {
  const [internalSightings, setInternalSightings] =
    useState<InternalSightingResponse[]>();
  const [externalSightings, setExternalSightings] =
    useState<ExternalSightingResponse[]>();

  let allSightings: Array<SightingResponseWrapper> = [];
  if (internalSightings !== undefined) {
    allSightings = allSightings.concat(
      internalSightings.map((sighting) => ({
        isInternal: true,
        sightingResponse: sighting,
      }))
    );
  }
  if (externalSightings !== undefined) {
    allSightings = allSightings.concat(
      externalSightings.map((sighting) => ({
        isInternal: false,
        sightingResponse: sighting,
      }))
    );
  }
  allSightings.sort((a, b) =>
    compareDesc(
      parseISO(a.sightingResponse.date),
      parseISO(b.sightingResponse.date)
    )
  );

  useEffect(() => {
    fetchInternalSightings().then((response) =>
      setInternalSightings(response.sightings)
    );

    fetchExternalSightings().then((response) =>
      setExternalSightings(response.sightings)
    );
  }, []);

  return (
    <section className="container-fluid">
      <h1 className="sightings text-center">Sightings</h1>
      {allSightings ? (
        <ul className="row p-0">
          {allSightings.map((sighting, index) => {
            return (
              <li
                className="col-sm-6 col-md-4 col-lg-3 sighting_list"
                key={index}
              >
                {sighting.isInternal ? (
                  <Link
                    to={`/sightings/${sighting.sightingResponse.id}`}
                    className="text-decoration-none"
                  >
                    <SightingCard sighting={sighting.sightingResponse} />
                  </Link>
                ) : (
                  <SightingCard sighting={sighting.sightingResponse} />
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};
