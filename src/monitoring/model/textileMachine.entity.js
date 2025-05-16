/**
 * @Class TextilMachine
 * @description represent a machine where the user work
 */

export class TextileMachine {

    constructor({id='', name='', status='', numberMachine='',floor='',zone='',dateInstalation=''}){
        this.id = id;
        this.name = name;
        this.status = status;
        this.numberMachine = numberMachine;
        this.floor = floor;
        this.zone = zone;
        this.dateInstalation = dateInstalation;
    }

}