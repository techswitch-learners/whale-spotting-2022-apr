export interface SightingListResponse {
  sightings: SightingResponse[];
}

export interface SpeciesListResponse {
  species: SpeciesResponse[];
}

export interface LocationListResponse {
  locations: Location[];
}

export interface LocationResponse {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  sightings: SightingResponse[];
}

export interface SpeciesResponse {
  id: number;
  name: string;
  latinName: string;
  photoUrl: string;
  description: string;
  endangeredStatus: string;
  sightings: SightingResponse[];
}

export interface SightingResponse {
  id: number;
  location: Location;
  species: SpeciesResponse[];
  date: string;
  photoUrl: string;
  email: string;
}

export async function fetchSightings(): Promise<SightingListResponse> {
  const response = await fetch(
    `http://whale-spotting-external-api.herokuapp.com/api/sightings`
  );
  return await response.json();
}

export async function fetchSightingById(id: number): Promise<SightingResponse> {
  const response = await fetch(
    `http://whale-spotting-external-api.herokuapp.com/api/sightings/${id}`
  );
  return await response.json();
}

export async function fetchSpecies(): Promise<SpeciesListResponse> {
  const response = await fetch(
    `http://whale-spotting-external-api.herokuapp.com/api/species`
  );
  return await response.json();
}

export async function fetchSpeciesById(id: number): Promise<SightingResponse> {
  const response = await fetch(
    `http://whale-spotting-external-api.herokuapp.com/api/species/${id}`
  );
  return await response.json();
}

export async function fetchLocations(): Promise<LocationListResponse> {
  const response = await fetch(
    `http://whale-spotting-external-api.herokuapp.com/api/locations`
  );
  return await response.json();
}

export async function fetchLocationById(id: number): Promise<LocationResponse> {
  const response = await fetch(
    `http://whale-spotting-external-api.herokuapp.com/api/locations/${id}`
  );
  return await response.json();
}
