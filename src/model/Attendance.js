import { User } from "./User";

export class Attendance extends User {

    constructor(user) {        
        super(user);

        this._status = "PENDENTE";
        this._isNext = false;
    }

    set status(status) {
        this._status = status;
    }

    set isNext(isNext) {
        this._isNext = isNext;
    }

    get status() {
        return this._status;
    }

    get isNext() {
        return this._isNext;
    }
}