import { fetchSpecies } from "../../clients/internalApiClient";

export const Home: React.FunctionComponent = () => {
  const species = fetchSpecies();
  console.log(species);

  return (
    <>
      <h1>Whale Spotting</h1>
      <p>Spot whales!</p>
    </>
  );
};
