import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { SightingCard } from "../../components/sightingCard/sightingCard";

const testInternalSighting1 = {
  id: 1,
  latitude: 54.682709,
  longitude: -43.553958,
  description: "Nice place",
  date: "2021-10-21 00:00:00",
  photoUrl:
    "https://i0.wp.com/handluggageonly.co.uk/wp-content/uploads/2017/05/humpback-1209297_1920.jpg?w=1600&ssl=1",
  species: {
    id: 2,
    name: "Beluga whale",
    latinName: "Beluga whale",
    endangeredStatus: "endangered",
    imageUrl: "https://s.hdnux.com/photos/01/24/11/10/22057501/4/2400x0.jpg",
    description:
      "The orca or killer whale (Orcinus orca) is a toothed whale belonging to the oceanic dolphin family, of which it is the largest member. ",
  },
  isApproved: true,
};

const testInternalSighting2 = {
  id: 1,
  latitude: 54.682709,
  longitude: -43.553958,
  description: "Nice place",
  date: "2021-08-21",
  photoUrl:
    "https://i0.wp.com/handluggageonly.co.uk/wp-content/uploads/2017/05/humpback-1209297_1920.jpg?w=1600&ssl=1",
  species: {
    id: 2,
    name: "Beluga whale",
    latinName: "Beluga whale",
    endangeredStatus: "endangered",
    imageUrl: "https://s.hdnux.com/photos/01/24/11/10/22057501/4/2400x0.jpg",
    description:
      "The orca or killer whale (Orcinus orca) is a toothed whale belonging to the oceanic dolphin family, of which it is the largest member. ",
  },
  isApproved: true,
};

const testExternalSighting1 = {
  location: {
    id: 3,
    latitude: 46.283333,
    longitude: 86.666667,
    name: "Eurasian Pole of Inaccessibility (Xinjiang, China)",
    description:
      "The EPIA, in China's Xinjiang region, is the point on earth furthest from the ocean, which makes it extra interesting that a family of blue whales (Earth's largest animal) has settled here!",
    sightings: [],
  },
  species: [
    {
      id: 2,
      name: "Blue whale",
      latinName: "Balaenoptera musculus",
      photoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/1/1c/Anim1754_-_Flickr_-_NOAA_Photo_Library.jpg",
      description:
        "The blue whale (Balaenoptera musculus) is a marine mammal belonging to the baleen whale parvorder Mysticeti. Reaching a maximum confirmed length of 29.9 metres (98 ft) and weighing up to 199 tonnes (196 long tons; 219 short tons), it is the largest animal known to have ever existed. The blue whale's long and slender body can be various shades of greyish-blue dorsally and somewhat lighter underneath.",
      endangeredStatus: "Endangered",
      sightings: [],
    },
    {
      id: 3,
      name: "Humpback whale",
      latinName: "Megaptera novaeangliae",
      photoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/6/61/Humpback_Whale_underwater_shot.jpg",
      description:
        "The humpback whale (Megaptera novaeangliae) is a species of baleen whale. It is one of the larger rorqual species, with adults ranging in length from 12–16 m (39–52 ft) and weighing around 25–30 t (28–33 short tons). The humpback has a distinctive body shape, with long pectoral fins and a knobbly head. It is known for breaching and other distinctive surface behaviors, making it popular with whale watchers. Males produce a complex song lasting 10 to 20 minutes, which they repeat for hours at a time. All the males in a group will produce the same song, which is different each season. Its purpose is not clear, though it may help induce estrus in females.",
      endangeredStatus: "Least Concern",
      sightings: [],
    },
  ],
  id: 5,
  date: "2022-10-21 00:45:00",
  locationId: 3,
  speciesIds: [2, 3],
  photoUrl:
    "https://www.nhm.ac.uk/content/dam/nhmwww/discover/whale-skulls/sperm-whale-full-width.jpg.thumb.1160.1160.jpg",
  email: "hello@google.com",
};

const testExternalSighting2 = {
  location: {
    id: 3,
    latitude: 46.283333,
    longitude: 86.666667,
    name: "Eurasian Pole of Inaccessibility (Xinjiang, China)",
    description:
      "The EPIA, in China's Xinjiang region, is the point on earth furthest from the ocean, which makes it extra interesting that a family of blue whales (Earth's largest animal) has settled here!",
    sightings: [],
  },
  species: [
    {
      id: 2,
      name: "Blue whale",
      latinName: "Balaenoptera musculus",
      photoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/1/1c/Anim1754_-_Flickr_-_NOAA_Photo_Library.jpg",
      description:
        "The blue whale (Balaenoptera musculus) is a marine mammal belonging to the baleen whale parvorder Mysticeti. Reaching a maximum confirmed length of 29.9 metres (98 ft) and weighing up to 199 tonnes (196 long tons; 219 short tons), it is the largest animal known to have ever existed. The blue whale's long and slender body can be various shades of greyish-blue dorsally and somewhat lighter underneath.",
      endangeredStatus: "Endangered",
      sightings: [],
    },
    {
      id: 3,
      name: "Humpback whale",
      latinName: "Megaptera novaeangliae",
      photoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/6/61/Humpback_Whale_underwater_shot.jpg",
      description:
        "The humpback whale (Megaptera novaeangliae) is a species of baleen whale. It is one of the larger rorqual species, with adults ranging in length from 12–16 m (39–52 ft) and weighing around 25–30 t (28–33 short tons). The humpback has a distinctive body shape, with long pectoral fins and a knobbly head. It is known for breaching and other distinctive surface behaviors, making it popular with whale watchers. Males produce a complex song lasting 10 to 20 minutes, which they repeat for hours at a time. All the males in a group will produce the same song, which is different each season. Its purpose is not clear, though it may help induce estrus in females.",
      endangeredStatus: "Least Concern",
      sightings: [],
    },
  ],
  id: 5,
  date: "2021-12-21",
  locationId: 3,
  speciesIds: [2, 3],
  photoUrl:
    "https://www.nhm.ac.uk/content/dam/nhmwww/discover/whale-skulls/sperm-whale-full-width.jpg.thumb.1160.1160.jpg",
  email: "hello@google.com",
};

test("Should render internal api-type sighting with information about the sighting", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <SightingCard sighting={testInternalSighting1} />
    </Router>
  );

  const elements = screen.getAllByText(/Beluga/i);
  expect(elements[0]).toBeInTheDocument();
});

test("Should render internal api-type sighting with information about the sighting", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <SightingCard sighting={testInternalSighting2} />
    </Router>
  );

  const elements = screen.getAllByText(/Beluga/i);
  expect(elements[0]).toBeInTheDocument();
});

test("Should render external api-type sighting with information about the sighting", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <SightingCard sighting={testExternalSighting1} />
    </Router>
  );

  const elements1 = screen.getAllByText(/Blue whale/i);
  const elements2 = screen.getAllByText(/Humpback whale/i);
  expect(elements1[0]).toBeInTheDocument();
  expect(elements2[0]).toBeInTheDocument();
});

test("Should render external api-type sighting with any date format", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <SightingCard sighting={testExternalSighting2} />
    </Router>
  );

  const elements1 = screen.getAllByText(/Blue whale/i);
  const elements2 = screen.getAllByText(/Humpback whale/i);
  expect(elements1[0]).toBeInTheDocument();
  expect(elements2[0]).toBeInTheDocument();
});
