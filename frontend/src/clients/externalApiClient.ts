export interface Sightings {
  sightings: Sighting[];
}

export interface SpeciesList {
  species: Species[];
}

export interface Locations {
  locations: Location[];
}

export interface Location {
  id: number;
  latitude: number; // ranges fron -90.0 to 90.0
  longitude: number; // ranges from -180.0 to 180.0
  name: string; // the common name of the location (if it has one!)
  description: string;
  sightings: Sighting[]; // a list of all sightings at this location (those Sighting objects do NOT include the location field)
}

export interface Species {
  id: number;
  name: string;
  latinName: string;
  photoUrl: string;
  description: string;
  endangeredStatus: string;
  sightings: Sighting[];
}

export interface Sighting {
  id: number;
  location: Location;
  species: Species[];
  date: string;
  photoUrl: string;
  email: string;
}

export async function fetchSightings(): Promise<Sightings> {
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
