import { User } from "./User";

export class Attendance extends User {

    constructor(user) {

        super(user);
        this._status = "PENDING";
    }

    set status(status) {
        this._status = status;
    }

    get status() {
        return this._status;
    }
}