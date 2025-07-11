/* 
  TaskService.js
  Handles all HTTP requests related to planning tasks
*/

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ENDPOINT = import.meta.env.VITE_TASKS_ENDPOINT_PATH;

class TaskService {
    async create(task) {
        try {
            return await axios.post(`${BASE_URL}${ENDPOINT}`, task);
        } catch (error) {
            console.error("Error creating task:", error);
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await axios.get(`${BASE_URL}${ENDPOINT}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching tasks:", error);
            return [];
        }
    }

    async update(taskId, updates) {
        try {
            return await axios.patch(`${BASE_URL}${ENDPOINT}/${taskId}`, updates);
        } catch (error) {
            console.error("Error updating task:", error);
            throw error;
        }
    }
}

export default new TaskService();
