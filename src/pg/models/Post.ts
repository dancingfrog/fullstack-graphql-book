import User from "./User";

let _id: number = 0;

export default class Post {
    constructor (id: number = _id++, text: string, user: User) {
        _id = id;
        this.id = id;
        this.text = text;
        this.user = user;
    }
    public id: number;
    public text: string;
    public user: User;

    getUser () {
        return this.user;
    }
}
