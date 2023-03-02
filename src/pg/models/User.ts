export default class User {
    constructor (username: string, avatar: string) {
        this.username = username;
        this.avatar = avatar;
    }
    public username: string;
    public avatar: string;
}
