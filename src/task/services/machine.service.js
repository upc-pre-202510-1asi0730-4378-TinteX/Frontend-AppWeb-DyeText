import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getMachines = async () => {
    const response = await axios.get(`${API_URL}/machine_information`);
    return response.data;
};