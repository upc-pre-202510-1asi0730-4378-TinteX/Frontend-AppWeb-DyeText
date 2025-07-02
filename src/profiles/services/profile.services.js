import httpInstance from "../../shared/services/http.instance.js";

export class ProfileService {
    resourceEndPoint = `${import.meta.env.VITE_API_BASE_URL}/profiles`;


    getProfile(id) {
        return httpInstance.get(`${this.resourceEndPoint}/${id}`).then(res => res.data);
    }

    updateProfile(id, data) {
        const [firstName, ...rest] = data.full_name.trim().split(" ");
        const lastName = rest.join(" ") || "";

        const payload = {
            id,
            firstName,
            lastName,
            email: data.email,
            phone: data.phone,
            membershipActive: data.membership_active,
            theme: data.theme
        };

        return httpInstance.put(`${this.resourceEndPoint}/${id}`, payload);
    }
}