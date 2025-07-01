import httpInstance from "../../shared/services/http.instance.js";

export class ProfileService {
    resourceEndPoint = `${import.meta.env.VITE_API_BASE_URL}/profiles`;


    getProfile(id) {
        return httpInstance.get(`${this.resourceEndPoint}/${id}`).then(res => res.data);
    }

    updateProfile(id, data) {
        return httpInstance.put(`${this.resourceEndPoint}/${id}`, data);
    }
}