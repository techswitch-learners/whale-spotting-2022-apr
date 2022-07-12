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

export interface AuthenticateLoginResponse {
  isResponseOk: boolean;
  message: string;
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

export async function authenticateLogin(
  username: string,
  password: string
): Promise<AuthenticateLoginResponse> {
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
    return {
      isResponseOk: true,
      message: "",
    };
  } else {
    const responseJson = await response.json();
    return {
      isResponseOk: false,
      message: responseJson.message,
    };
  }
}

export async function fetchSightingById(id: number): Promise<SightingResponse> {
  const response = await fetch(`https://localhost:5001/sightings/${id}`);
  return await response.json();
}

export async function fetchUnapprovedSightings(
  username: string,
  password: string
): Promise<SightingListResponse> {
  const details = `${username}:${password}`;
  const encodedDetails = btoa(details);
  const authHeader = `Basic ${encodedDetails}`;
  const response = await fetch(`https://localhost:5001/sightings/unapproved`, {
    method: "GET",
    headers: {
      Authorization: authHeader,
    },
  });
  return await response.json();
}

export async function approveSighting(
  id: number,
  username: string,
  password: string
): Promise<SightingResponse> {
  const details = `${username}:${password}`;
  const encodedDetails = btoa(details);
  const authHeader = `Basic ${encodedDetails}`;
  const response = await fetch(
    `https://localhost:5001/sightings/${id}/approve`,
    {
      method: "PATCH",
      headers: {
        Authorization: authHeader,
      },
    }
  );
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return await response.json();
}

export async function deleteById(
  id: number,
  username: string,
  password: string
) {
  const details = `${username}:${password}`;
  const encodedDetails = btoa(details);
  const authHeader = `Basic ${encodedDetails}`;
  const response = await fetch(`https://localhost:5001/sightings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: authHeader,
    },
  });
  if (!response.ok) {
    throw new Error(await response.json());
  }
}
