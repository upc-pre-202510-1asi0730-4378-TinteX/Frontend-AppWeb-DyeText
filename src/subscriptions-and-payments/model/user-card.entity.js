export class UserCard {
    constructor({
        id = '',
        number_card = '',
        expiration_date = '',
        cvv = '',
        user_name = '',
        country = '',
                }) {
        this.id = id;
        this.number_card = number_card;
        this.expiration_date = expiration_date;
        this.cvv = cvv;
        this.user_name = user_name;
        this.country = country;
    }
}