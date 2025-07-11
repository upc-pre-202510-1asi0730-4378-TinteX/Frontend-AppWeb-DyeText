/// <summary>
/// Represents a planning task returned from the backend API.
/// </summary>
export default class PlanningTask {
    /// <summary>
    /// Initializes a new instance of the PlanningTask class.
    /// </summary>
    /// <param name="id">The unique identifier of the task.</param>
    /// <param name="name">The title of the task.</param>
    /// <param name="description">The optional description of the task.</param>
    /// <param name="textileMachineId">The ID of the machine assigned to the task.</param>
    /// <param name="textileMachineName">The name of the machine, retrieved via ACL.</param>
    constructor({ id, name, description, textileMachineId, textileMachineName }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.textileMachineId = textileMachineId;
        this.textileMachineName = textileMachineName;
    }
}
