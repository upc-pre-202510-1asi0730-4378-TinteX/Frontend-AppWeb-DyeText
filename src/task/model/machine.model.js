export class Machine {
    constructor(id, textilMachine, timeSpent, dayProgress, failitureRate, amountFailure, userId) {
        this.id = id;
        this.textilMachine = textilMachine;
        this.timeSpent = timeSpent;
        this.dayProgress = dayProgress;
        this.failitureRate = failitureRate;
        this.amountFailure = amountFailure;
        this.userId = userId;
    }
}