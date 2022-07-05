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
  date: Date;
  description: string;
  photoUrl: string;
  species: SpeciesResponse;
  isApproved: boolean;
}

export async function fetchSpecies(): Promise<SpeciesListResponse> {
  const response = await fetch(`https://localhost:5001/species`);
  return await response.json();
}

export async function fetchSightings(): Promise<SightingListResponse> {
  const response = await fetch(`https://localhost:5001/sightings`);
  return await response.json();
}

export async function authenticateLogin(
  username: string,
  password: string
): Promise<boolean> {
  const details = `${username}:${password}`;
  const encodedDetails = btoa(details);
  const authHeader = `Basic ${encodedDetails}`;
  const response = await fetch(`https://localhost:5001/login`, {
    method: "GET",
    headers: {
      Authorization: authHeader,
    },
  });

  if (response.ok) {
    return true;
  } else {
    return false;
  }
}
