import axios from 'axios';

const API_URL = 'http://localhost:5260/api/v1/designandplanning/textiles-machine/tasks';

export async function createTask(task) {
    await axios.post('http://localhost:5260/api/v1/designandplanning/textiles-machine/tasks', task);
}
export async function getTasks() {
    const response = await axios.get(API_URL);
    return response.data;
}

export async function addTask(task) {
    await axios.post(API_URL, task);
}

export async function updateTask(taskId, updates) {
    await axios.patch(`${API_URL}/${taskId}`, updates);
}