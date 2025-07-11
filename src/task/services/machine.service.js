/* 
  machine.service.js
  Fetches machine information using environment-based API base URL.
*/

import axios from 'axios';

/* Get environment base URL and endpoint path */
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ENDPOINT = import.meta.env.VITE_MACHINES_INFORMATION_ENDPOINT_PATH;

/*
  Retrieves the list of textile machines from backend.
  @returns {Array} Machine objects
*/
export async function getMachines() {
    try {
        const response = await axios.get(`${BASE_URL}${ENDPOINT}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching machines:', error);
        return [];
    }
}
