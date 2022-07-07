import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  fetchSightings,
  SightingResponse,
} from "../../clients/internalApiClient";
import { BinocularMarker } from "./BinocularMarker";

export const Home: React.FunctionComponent = () => {
  const [sightings, setSightings] = useState<SightingResponse[]>([]);

  useEffect(() => {
    fetchSightings().then((response) => setSightings(response.sightings));
  }, []);

  return (
    <>
      <h1>Whale Spotting</h1>
      <p>Spot whales!</p>
      <MapContainer
        center={[54.637581, -3.902469]}
        zoom={5}
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
        />
        {sightings.map(
          (sighting) =>
            sighting.isApproved && (
              <BinocularMarker key={sighting.id} sighting={sighting} />
            )
        )}
      </MapContainer>
    </>
  );
};
