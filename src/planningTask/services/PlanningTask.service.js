import PlanningTask from '../model/PlanningTask.entity.js'
import axios from "axios";

/// <summary>
/// Service responsible for handling HTTP operations related to planning tasks.
/// </summary>
class PlanningTaskService {
    /// <summary>
    /// Retrieves all planning tasks from the API.
    /// </summary>
    /// <returns>Promise resolving to an array of PlanningTask objects.</returns>
    async getAll() {
        const response = await axios.get('/api/v1/designandplanning/textiles-machine/tasks');
        return response.data.map(task => new PlanningTask(task));
    }

    /// <summary>
    /// Retrieves a single planning task by ID.
    /// </summary>
    /// <param name="id">The task ID to retrieve.</param>
    /// <returns>Promise resolving to a PlanningTask object.</returns>
    async getById(id) {
        const response = await axios.get(`/api/v1/designandplanning/textiles-machine/tasks/${id}`);
        return new PlanningTask(response.data);
    }

    /// <summary>
    /// Creates a new planning task with the provided data.
    /// </summary>
    /// <param name="payload">An object with name, description and textileMachineId.</param>
    /// <returns>Promise resolving to the created task ID.</returns>
    async create(payload) {
        const response = await axios.post('/api/v1/designandplanning/textiles-machine/tasks', payload);
        return response.data;
    }

    /// <summary>
    /// Deletes a planning task by ID.
    /// </summary>
    /// <param name="id">The ID of the task to delete.</param>
    /// <returns>Promise resolving to void.</returns>
    async remove(id) {
        await axios.delete(`/api/v1/designandplanning/textiles-machine/tasks/${id}`);
    }
}

export default new PlanningTaskService();
