export class Notification {
    /**
     * @param {Object} params
     * @param {string} [params.id='']
     * @param {string} [params.message='']
     * @param {Date|string} [params.createdAt=null]
     * @param {string} [params.textileMachine='']
     * @param {boolean} [params.markAsRead=false]
     */
    constructor({
                    id = '',
                    message = '',
                    createdAt = null,
                    textileMachine = '',
                    markAsRead = false
                } = {}) {
        this.id = id;
        this.message = message;
        this.createdAt = createdAt instanceof Date ? createdAt : (createdAt ? new Date(createdAt) : null);
        this.textileMachine = textileMachine;
        this.markAsRead = markAsRead;
    }
}