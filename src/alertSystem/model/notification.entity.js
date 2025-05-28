/**
 * @class Notification
 * Represents a notification entity within the system
 */
export class Notification {
    /**
     * @param {Object} params
     * @param {string} [params.id='']             - Identificador único (UUID)
     * @param {string} [params.message='']        - Mensaje de la notificación
     * @param {string} [params.dateTime='']       - Fecha y hora en formato ISO 8601
     * @param {string} [params.textilMachine='']  - Identificador de la máquina textil
     * @param {boolean} [params.markAsRead=false] - Indicador de si ya fue leída
     */
    constructor({
                    id = '',
                    message = '',
                    dateTime = '',
                    textilMachine = '',
                    markAsRead = false
                } = {}) {
        this.id = id;
        this.message = message;
        this.dateTime = dateTime;
        this.textilMachine = textilMachine;
        this.markAsRead = markAsRead;
    }
}
