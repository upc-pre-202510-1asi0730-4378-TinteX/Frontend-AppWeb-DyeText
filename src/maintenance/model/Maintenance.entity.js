/// <summary>
/// Represents a maintenance record returned from the API.
/// </summary>
export default class Maintenance {
    /// <summary>
    /// Initializes a new Maintenance object.
    /// </summary>
    constructor({ id, description, scheduledDate, machineId, machineName, status }) {
        this.id = id;
        this.description = description;
        this.scheduledDate = scheduledDate;
        this.machineId = machineId;
        this.machineName = machineName;
        this.status = status;
    }
}
