import httpInstance from "../../shared/services/http.instance.js";

export class ProfileService {
    resourceEndPoint = "/profiles";

    getProfile(id) {
        return httpInstance.get(`${this.resourceEndPoint}/${id}`).then(res => res.data);
    }

    updateProfile(id, data) {
        return httpInstance.put(`${this.resourceEndPoint}/${id}`, data);
    }
}