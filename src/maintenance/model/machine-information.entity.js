export class MachineInformation{
    constructor({
                    id = '',
                    timeSpent = '',
                    dayProgress = '',
                    failureRate = '',
                    amountFailure = '',
                    userId = '',
                    temperature = '',
                    vibration = '',
                    energy = '',
                    speed = ''
                }){
        this.id = id;
        this.timeSpent = timeSpent;
        this.dayProgress = dayProgress;
        this.failureRate = failureRate;
        this.amountFailure = amountFailure;
        this.userId = userId;
        this.temperature = temperature;
        this.vibration = vibration;
        this.energy = energy;
        this.speed = speed;
    }
}