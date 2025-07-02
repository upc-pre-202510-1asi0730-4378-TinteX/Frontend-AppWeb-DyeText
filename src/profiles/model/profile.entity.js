export class Profile {
    constructor({
                    id = "",
                    fullName = "",
                    email = "",
                    phone = "",
                    membershipActive = true,
                    theme = "light"
                } = {}) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.membershipActive  = membershipActive;

        this.theme = theme;
    }
}