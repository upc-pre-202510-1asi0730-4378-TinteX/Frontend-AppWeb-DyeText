// src/alertSystem/services/notification.service.js
import httpInstance from "../../shared/services/http.instance.js";

export class NotificationService {
    /** @type {string} The API endpoint for notifications */
    resourceEndpoint = import.meta.env.VITE_NOTIFICATION_ENDPOINT_PATH;

    getAll() {
        return httpInstance.get(this.resourceEndpoint);
    }

    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }

    create(notification) {
        return httpInstance.post(this.resourceEndpoint, notification);
    }

    update(id, notification) {
        return httpInstance.put(`${this.resourceEndpoint}/${id}`, notification);
    }

    delete(id) {
        return httpInstance.delete(`${this.resourceEndpoint}/${id}`);
    }
}
