/**
 * @class AssignUser
 * @description Represents a category entity within the assignUsers system
 * Used for categorizing content or organizing items
 */
export class AssignUser {
    /**
     * Creates a new Category instance
     * @param {Object} params - The category initialization parameters
     * @param {string} [params.email=''] - Unique identifier for the category
     * @param {string} [params.name=''] - Display name of the category
     */
    constructor({
                    id = '',
                    name = '',
                    email = '',
                    phone= '',
                    startDate = '',
                    plant= '',
                    role= '',
                    permission = '',
                    card_id='',
                    subscription_active=false
                }) {

        /**
         * @type {string}
         * @description Display name of the category
         */
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.startDate = startDate;
        this.plant = plant;
        this.role = role;
        this.permission = permission;
        this.card_id = card_id;
        this.subscription_active = subscription_active;
    }
}