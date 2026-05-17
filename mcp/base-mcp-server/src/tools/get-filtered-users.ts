import type { RandomUserApiResponse, GetFilteredUsersParams } from '../types.js';

/**
 * Fetches a filtered list of random users from randomuser.me API
 */
export async function getFilteredUsers(params: GetFilteredUsersParams = {}): Promise<string> {
  try {
    // Validate results parameter
    const results = params.results || 10;
    if (results < 1 || results > 5000) {
      return 'Error: results parameter must be between 1 and 5000';
    }

    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('results', results.toString());
    
    if (params.gender) {
      queryParams.append('gender', params.gender);
    }
    
    if (params.nat) {
      queryParams.append('nat', params.nat);
    }
    
    if (params.inc) {
      queryParams.append('inc', params.inc);
    }
    
    if (params.exc) {
      queryParams.append('exc', params.exc);
    }

    const url = `https://randomuser.me/api/?${queryParams.toString()}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`randomuser.me API returned ${response.status}: ${response.statusText}`);
    }
    
    const data: RandomUserApiResponse = await response.json() as RandomUserApiResponse;
    
    if (!data.results || data.results.length === 0) {
      return 'No users returned from API';
    }
    
    // Format the users data
    return formatUsersData(data.results, params);
  } catch (error) {
    if (error instanceof Error) {
      return `Error fetching filtered users: ${error.message}`;
    }
    return 'An unknown error occurred while fetching filtered users';
  }
}

/**
 * Formats multiple users data into a readable string
 */
function formatUsersData(users: any[], params: GetFilteredUsersParams): string {
  const filterInfo = [];
  if (params.gender) filterInfo.push(`Gender: ${params.gender}`);
  if (params.nat) filterInfo.push(`Nationality: ${params.nat}`);
  
  const header = `**Filtered Users (${users.length} results)**${filterInfo.length > 0 ? `\nFilters: ${filterInfo.join(', ')}` : ''}\n\n`;
  
  const usersList = users.map((user, index) => {
    return `${index + 1}. ${user.name.first} ${user.name.last} (${user.gender})
   Email: ${user.email}
   Location: ${user.location.city}, ${user.location.country}
   Nationality: ${user.nat}
   Age: ${user.dob.age}`;
  }).join('\n\n');
  
  return header + usersList;
}
