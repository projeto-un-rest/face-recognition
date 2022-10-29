export class User {

    constructor(user) {
        this._id = user.id;
        this._name = user.name;
        this._photoPath = user.photo_path;
        this._createdAt = user.createdAt;
        this._jobTitle = user.classroom_user.job_title;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get photoPath() {
        return this._photoPath;
    }

    get createdAt() {
        return this._createdAt;
    }

    get jobTitle() {
        return this._jobTitle;
    }
}