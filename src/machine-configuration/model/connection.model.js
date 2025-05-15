export const ConnectionProtocol = {
    MQTT: 'MQTT',
    MODBUS: 'Modbus',
    HTTP: 'HTTP',
};

export class ConnectionConfig {
    constructor(protocol = ConnectionProtocol.HTTP, ipAddress = '', networkId = '', updateFrequency = 0) {
        this.protocol = protocol;
        this.ipAddress = ipAddress;
        this.networkId = networkId;
        this.updateFrequency = updateFrequency;
    }
}