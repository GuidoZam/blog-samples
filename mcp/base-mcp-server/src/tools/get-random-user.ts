import type { RandomUserApiResponse, GetRandomUserParams } from '../types.js';

/**
 * Fetches a single random user from randomuser.me API
 */
export async function getRandomUser(params: GetRandomUserParams = {}): Promise<string> {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams();
    
    if (params.gender) {
      queryParams.append('gender', params.gender);
    }
    
    if (params.nat) {
      queryParams.append('nat', params.nat);
    }

    const url = `https://randomuser.me/api/?${queryParams.toString()}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`randomuser.me API returned ${response.status}: ${response.statusText}`);
    }
    
    const data: RandomUserApiResponse = await response.json() as RandomUserApiResponse;
    
    if (!data.results || data.results.length === 0) {
      return 'No user data returned from API';
    }
    
    const user = data.results[0];
    
    // Format the user data in a readable way
    return formatUserData(user);
  } catch (error) {
    if (error instanceof Error) {
      return `Error fetching random user: ${error.message}`;
    }
    return 'An unknown error occurred while fetching random user';
  }
}

/**
 * Formats user data into a readable string
 */
function formatUserData(user: any): string {
  return `
**Random User Information**

Name: ${user.name.title} ${user.name.first} ${user.name.last}
Gender: ${user.gender}
Email: ${user.email}
Phone: ${user.phone}
Cell: ${user.cell}

Location:
  ${user.location.street.number} ${user.location.street.name}
  ${user.location.city}, ${user.location.state} ${user.location.postcode}
  ${user.location.country}

Date of Birth: ${new Date(user.dob.date).toLocaleDateString()} (Age: ${user.dob.age})
Nationality: ${user.nat}
Username: ${user.login.username}

Picture: ${user.picture.large}
`.trim();
}
