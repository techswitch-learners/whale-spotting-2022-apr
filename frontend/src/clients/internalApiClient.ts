export interface SightingListResponse {
  sightings: SightingResponse[];
}

export interface SpeciesListResponse {
  species: SpeciesResponse[];
}

export interface SpeciesResponse {
  id: number;
  name: string;
  latinName: string;
  endangeredStatus: string;
  imageUrl: string;
  description: string;
}

export interface SightingResponse {
  id: number;
  latitude: number; //check this
  longitude: number; //check this
  date: Date; //check this
  description: string;
  photoUrl: string;
  species: SpeciesResponse;
  isApproved: boolean;
}

export async function fetchSightings(): Promise<SightingListResponse> {
  const response = await fetch(`https://localhost:5001/`);
  return await response.json();
}

export async function fetchSpecies(): Promise<SpeciesListResponse> {
  const response = await fetch(`https://localhost:5001/species`);
  return await response.json();
}
