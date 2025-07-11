import Maintenance from '../model/Maintenance.entity.js';
import axios from "axios";

/// <summary>
/// Service for retrieving and managing maintenance data from the backend.
/// </summary>
class MaintenanceService {
    /// <summary>
    /// Retrieves all maintenance records.
    /// </summary>
    /// <returns>Promise resolving to an array of Maintenance objects.</returns>
    async getAll() {
        const response = await axios.get('/api/v1/designandplanning/textiles-machines/maintenances');
        return response.data.map(item => new Maintenance(item));
    }

    /// <summary>
    /// Retrieves a single maintenance by ID.
    /// </summary>
    /// <param name="id">Maintenance ID.</param>
    /// <returns>Promise resolving to a Maintenance object.</returns>
    async getById(id) {
        const response = await axios.get(`/api/v1/designandplanning/textiles-machines/maintenances/${id}`);
        return new Maintenance(response.data);
    }

    /// <summary>
    /// Creates a new maintenance entry.
    /// </summary>
    /// <param name="payload">Maintenance form data.</param>
    /// <returns>Promise resolving to the created ID.</returns>
    async create(payload) {
        const response = await axios.post('/api/v1/designandplanning/textiles-machines/maintenances', payload);
        return response.data;
    }
}

export default new MaintenanceService();
