export class MachineInformation{
    constructor({
                    id = '',
                    time_spent = '',
                    day_progress = '',
                    failure_rate = '',
                    amount_failure = '',
                    user_id = '',
                    temperature = '',
                    vibration = '',
                    energy = '',
                    speed = ''
                }){
        this.id = id;
        this.time_spent = time_spent;
        this.day_progress = day_progress;
        this.failure_rate = failure_rate;
        this.amount_failure = amount_failure;
        this.user_id = user_id;
        this.temperature = temperature;
        this.vibration = vibration;
        this.energy = energy;
        this.speed = speed;
    }
}