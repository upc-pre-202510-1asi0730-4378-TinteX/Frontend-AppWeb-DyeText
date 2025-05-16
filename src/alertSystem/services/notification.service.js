// src/alertSystem/services/notification.service.js
import axios from 'axios';

const API_BASE = 'http://localhost:3000';
const RESOURCE  = '/notifications';

export class NotificationService {
    constructor() {

        this.api = axios.create({
            baseURL: API_BASE,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    getAll() {
        return this.api.get(RESOURCE);
    }


    create(notification) {
        return this.api.post(RESOURCE, notification);
    }

    update(id, notification) {
        return this.api.put(`${RESOURCE}/${id}`, notification);
    }

    delete(id) {
        return this.api.delete(`${RESOURCE}/${id}`);
    }
}
