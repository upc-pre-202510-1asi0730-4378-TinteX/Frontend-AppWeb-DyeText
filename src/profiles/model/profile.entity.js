export class Profile {
    constructor({
                    id = "",
                    full_name = "",
                    email = "",
                    phone = "",
                    membership_active = false,
                    timezone = "",
                    theme = "light"
                } = {}) {
        this.id = id;
        this.full_name = full_name;
        this.email = email;
        this.phone = phone;
        this.membership_active = membership_active;
        this.timezone = timezone;
        this.theme = theme;
    }
}