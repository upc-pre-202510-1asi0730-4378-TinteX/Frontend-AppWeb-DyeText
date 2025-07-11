// src/alertSystem/services/notification.service.js
import axios from 'axios';

const API_BASE = 'http://localhost:5260/api/v1/monitoring/textiles-machine';
const RESOURCE = 'notification';

export class NotificationService {
    constructor() {

        this.api = axios.create({
            baseURL: API_BASE,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    getAll() {
        return this.api.get(`/${RESOURCE}`);
    }

    getById(id) {
        return this.api.get(`/${id}/${RESOURCE}`);
    }

    create(notification) {
        return this.api.post(`/${RESOURCE}`, notification);
    }

    update(id, notification) {
        return this.api.put(`/${id}/${RESOURCE}`, notification);
    }

    delete(id) {
        return this.api.delete(`/${id}/${RESOURCE}`);
    }
}
