export interface ListResponse<T> {
  items: T[];
}

export interface Sighting {
  location: {
    latitude: number;
    longitude: number;
  };
  species: {
    id: number;
    name: string;
  };
  date: Date;
  photoUrl: string;
}

export async function fetchSightings(): Promise<ListResponse<Sighting>> {
  const response = await fetch(
    `http://whale-spotting-external-api.herokuapp.com/api/sightings`
  );
  return await response.json();
}

export async function fetchSightingById(id: number): Promise<Sighting> {
  const response = await fetch(
    `http://whale-spotting-external-api.herokuapp.com/api/sightings/${id}`
  );
  return await response.json();
}
