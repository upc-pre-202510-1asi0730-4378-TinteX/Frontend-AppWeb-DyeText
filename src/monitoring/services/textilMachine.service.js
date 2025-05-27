import httpInstance from "../../shared/services/http.instance.js";

export class TextileMachineService{
    resourceEndPoint = import.meta.env.VITE_TEXTILE_MACHINES_ENDPOINT_PATH;

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
