export interface SpeciesListResponse {
  species: SpeciesResponse[];
}

export interface SightingListResponse {
  sightings: SightingResponse[];
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
  latitude: number;
  longitude: number;
  date: string;
  description: string;
  photoUrl: string;
  species: SpeciesResponse;
  isApproved: boolean;
}

export interface NewSightingRequest {
  latitude: number;
  longitude: number;
  date: Date;
  description: string;
  photoUrl: string;
  speciesId: number;
}

export async function fetchSpecies(): Promise<SpeciesListResponse> {
  const response = await fetch(`https://localhost:5001/species`);
  return await response.json();
}

export async function fetchSightings(): Promise<SightingListResponse> {
  const response = await fetch(`https://localhost:5001/sightings`);
  return await response.json();
}

export async function createSighting(newSighting: NewSightingRequest) {
  const response = await fetch(`https://localhost:5001/sightings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSighting),
  });
  if (!response.ok) {
    throw new Error(await response.json());
  }
}
