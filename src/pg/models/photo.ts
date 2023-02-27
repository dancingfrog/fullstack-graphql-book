let _id = 0;

export const photo_id = {
    get getPhotoId () {
        return _id;
    },
    setPhotoId (value: number) {
        _id = value;
        return _id;
    }
};

export const photos: Array<Photo> = [];

export default class Photo {
    constructor (id: Number = _id++, url: String, name: String, description?: String ) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.description = description || "";
    }

    id: Number;
    url: String;
    name: String;
    description: String;
}
