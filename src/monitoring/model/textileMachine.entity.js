/**
 * @Class TextilMachine
 * @description represent a machine where the user work
 */

export class TextileMachine {
    constructor({
                    id = '',
                    name = '',
                    asset_type = '',
                    status = '',
                    number_machine = '',
                    floor = '',
                    zone = '',
                    date_installation = '',
                    machine_information_id = ''
                }) {
        this.id = id;
        this.name = name;
        this.asset_type = asset_type;
        this.status = status;
        this.number_machine = number_machine;
        this.floor = floor;
        this.zone = zone;
        this.date_installation = date_installation;
        this.machine_information_id = machine_information_id ? String(machine_information_id) : '';
    }


}
