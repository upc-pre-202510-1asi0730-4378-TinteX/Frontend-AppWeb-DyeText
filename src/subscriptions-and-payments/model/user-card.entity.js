export class PaymentCard {
    constructor({
        id = '',
                    userName = '',
                country = '',
                    numberCard = '',
        expirationDate = '',
        cvv = '',
                }) {
        this.id = id;
        this.userName = userName;
        this.country = country;
        this.numberCard = numberCard;
        this.expirationDate = expirationDate;
        this.cvv = cvv;
    }
}