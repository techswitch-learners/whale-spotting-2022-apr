import { LatLngBoundsExpression } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  fetchSightings,
  SightingResponse,
} from "../../clients/internalApiClient";
import { BinocularMarker } from "./BinocularMarker";

const bounds: LatLngBoundsExpression = [
  [90, -180],
  [-90, 180],
];

export const Home: React.FunctionComponent = () => {
  const [sightings, setSightings] = useState<SightingResponse[]>([]);

  useEffect(() => {
    fetchSightings().then((response) => setSightings(response.sightings));
  }, []);

  return (
    <div className="container-fluid d-flex">
      <div className="m-auto">
        <h1>Whale Spotting</h1>
        <p className="lead">Spot whales!</p>
        <div className="card">
          <div className="card-body">
            <MapContainer
              center={[54.637581, -3.902469]}
              zoom={5}
              maxBounds={bounds}
              scrollWheelZoom={false}
              style={{
                height: "600px",
                width: "600px",
                maxHeight: "80vw",
                maxWidth: "80vw",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={8}
                minZoom={2}
              />
              {sightings.map((sighting) => (
                <BinocularMarker key={sighting.id} sighting={sighting} />
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
