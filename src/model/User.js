export class User {

    constructor(user) {
        this._id = user.id;
        this._name = user.name;
        this._registration = user.registration;
        this._photoPath = user.photo_path;
        this._createdAt = user.createdAt;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get registration() {
        return this._registration;
    }

    get photoPath() {
        return this._photoPath;
    }

    get createdAt() {
        return this._createdAt;
    }
}