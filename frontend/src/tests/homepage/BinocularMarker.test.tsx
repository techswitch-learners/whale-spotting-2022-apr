import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { MapContainer, TileLayer } from "react-leaflet";
import { BinocularMarker } from "../../components/homepage/BinocularMarker";

const sighting = {
  id: 1,
  latitude: 51.5072,
  longitude: 0,
  date: "2022-07-06",
  description: "A sighting with id 1",
  photoUrl: "",
  species: {
    id: 1,
    name: "Blue whale",
    latinName: "Blueus Whaleus",
    endangeredStatus: "Not Endangered, I Hope",
    imageUrl: "",
    description: "A whale, coloured blue",
  },
  isApproved: true,
};

test("When rendered, includes one binocular marker", async () => {
  render(
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
      <BinocularMarker sighting={sighting} />
    </MapContainer>
  );
  await waitFor(() => expect(screen.getByRole("marker")).toBeInTheDocument());
});
