import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { MapContainer } from "react-leaflet";
import { BinocularMarker } from "../../components/homepage/BinocularMarker";
import { Home } from "../../components/homepage/Home";

test("When rendered, includes one binocular marker", () => {
  const sighting = {
    id: 1,
    latitude: 0,
    longitude: 0,
    date: "2022-07-06",
    description: "A sighting",
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
  //problems <BinocularMarker sighting={sighting} /> not rendering

  const { container, debug } = render(
    <MapContainer>
      <BinocularMarker sighting={sighting} />
    </MapContainer>
  );
  debug();
  const binocularMarkers = container.getElementsByClassName(
    "leaflet-marker-icon"
  );

  expect(binocularMarkers[0]).toBeInTheDocument();
});

// test("When rendered with a route, displays the information of the sighting with that ID", async () => {
//   const history = createMemoryHistory();
//   const sighting = {
//     id: 1,
//     latitude: 0,
//     longitude: 0,
//     date: "2022-07-06",
//     description: "A sighting",
//     photoUrl: "",
//     species: {
//       id: 1,
//       name: "Blue whale",
//       latinName: "Blueus Whaleus",
//       endangeredStatus: "Not Endangered, I Hope",
//       imageUrl: "",
//       description: "A whale, coloured blue",
//     },
//     isApproved: true,
//   };

//   //   render(
//   //     <Router history={history}>
//   //       <MapContainer>
//   //         <BinocularMarker sighting={sighting} />
//   //       </MapContainer>
//   //     </Router>
//   //   );

//   const { container } = render(
//     <Router history={history}>
//       <MapContainer>
//         <BinocularMarker sighting={sighting} />
//       </MapContainer>
//     </Router>
//   );

//   const binocularIcon = container.getElementsByClassName("leaflet-market-icon");

//   fireEvent(
//     binocularIcon,
//     new MouseEvent("click", {
//       bubbles: true,
//       cancelable: true,
//     })
//   );

//   expect(screen.findByText(/a sighting/i)).toBeInTheDocument();
// });
