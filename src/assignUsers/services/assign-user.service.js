﻿import httpInstance from "../../shared/services/http.instance.js";

/**
 * @class AssignUserService
 * @description Service class for handling CRUD operations on categories using HTTP requests
 */
export class AssignUserService {
    /** @type {string} The API endpoint for categories */
    resourceEndpoint = import.meta.env.VITE_ASSIGN_USER_ENDPOINT_PATH;

    /**
     * Retrieves all categories
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to an array of categories
     */
    getAll() {
        return httpInstance.get(`${this.resourceEndpoint}/assign-users`);
    }

    /**
     * Retrieves a category by its ID
     * @param {number|string} id - The ID of the category to retrieve
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the category object
     */
    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}/assign-user`);
    }

    /**
     * Creates a new category
     * @param {Object} resource - The category object to create
     * @param {string} resource.name - The name of the category
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the created category
     */
    create(resource) {
        return httpInstance.post(`${this.resourceEndpoint}/assign-users`, resource);
    }

    /**
     * Updates an existing category
     * @param {number|string} id - The ID of the category to update
     * @param {Object} resource - The updated category data
     * @param {string} resource.name - The updated name of the category
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the updated category
     */
    update(id, resource) {
        return httpInstance.put(`${this.resourceEndpoint}/${id}/assign-user`, resource);
    }

    /**
     * Deletes a category by its ID
     * @param {number|string} id - The ID of the category to delete
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves when the category is deleted
     */
    delete(id) {
        return httpInstance.delete(`${this.resourceEndpoint}/${id}/assign-user`);
    }

    /**
     * Retrieves categories by name
     * @param {string} name - The name to search for
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to an array of matching categories
     */
    getByName(name) {
        return httpInstance.get(`${this.resourceEndpoint}/assign-users?name=${name}`);
    }
}