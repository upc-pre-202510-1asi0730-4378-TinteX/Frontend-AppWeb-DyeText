/**
 * @Class TextilMachine
 * @description represent a machine where the user work
 */

export class TextileMachine {
    constructor({
                    id = '',
                    machineInformationId = '',
                    name = '',
                    assetType = '',
                    status = '',
                    serialNumber = '',
                    floor = '',
                    zone = '',
                    dateInstallation = '',
                }) {
        this.id = id;
        this.machineInformationId = machineInformationId ? String(machineInformationId) : '';
        this.name = name;
        this.assetType = assetType;
        this.status = status;
        this.serialNumber = serialNumber;
        this.floor = floor;
        this.zone = zone;
        this.dateInstallation = dateInstallation;
    }


}
