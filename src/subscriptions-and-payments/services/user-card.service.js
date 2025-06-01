import httpInstance from "../../shared/services/http.instance.js";

export class UserCardService{
    resourceEndPoint = import.meta.env.VITE_USER_CARDS_ENDPOINT_PATH;

    getAll() {
        return httpInstance.get(this.resourceEndPoint);
    }

    getById(id) {
        return httpInstance.get(`${this.resourceEndPoint}/${id}`);
    }

    create(resource) {
        return httpInstance.post(this.resourceEndPoint, resource);
    }

    update(id, resource) {
        return httpInstance.put(`${this.resourceEndPoint}/${id}`, resource);
    }

    delete(id) {
        return httpInstance.delete(`${this.resourceEndPoint}/${id}`);
    }

    getByName(name) {
        return httpInstance.get(`${this.resourceEndPoint}?name=${name}`);
    }
}