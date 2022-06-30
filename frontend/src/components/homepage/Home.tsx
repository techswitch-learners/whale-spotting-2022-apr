import { fetchSightings } from "../../clients/internalApiClient";

export const Home: React.FunctionComponent = () => {
  const sightings = fetchSightings();
  console.log(sightings);

  return (
    <>
      <h1>Whale Spotting</h1>
      <p>Spot whales!</p>
    </>
  );
};
