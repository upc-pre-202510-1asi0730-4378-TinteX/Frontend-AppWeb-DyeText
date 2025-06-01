import httpInstance from "../../shared/services/http.instance.js";

export const testConnection = async (config) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const endpoint = import.meta.env.VITE_ASSIGNUSER_ENDPOINT_PATH;

    return httpInstance.post(`${baseUrl}${endpoint}`, config)
        .then(response => ({
            success: true,
            details: response.data.message || `Connected via ${config.protocol}`,
        }))
        .catch(error => {
            throw new Error(error.response?.data?.message || 'Connection failed. Please check your configuration.');
        });
};

export const getMachineInformation = async (machineId) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const endpoint = import.meta.env.VITE_TEXTILE_MACHINES_ENDPOINT_PATH;

    return httpInstance.get(`${baseUrl}${endpoint}/${machineId}`)
        .then(response => {
            const machine = response.data;
            return {
                name: machine.name || '',
                updateFrequency: machine.updateFrequency || 0, // Ajusta si esta propiedad no existe
            };
        })
        .catch(error => {
            throw new Error(error.response?.data?.message || 'Error al obtener la información de la máquina.');
        });
};