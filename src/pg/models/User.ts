let _id: number = 0;

export default class User {
    constructor (id: number = _id++, username: string, avatar: string) {
        _id = id;
        this.id = id;
        this.username = username;
        this.avatar = avatar;
    }
    public id: number;
    public username: string;
    public avatar: string;
}
