import {Injectable} from "@angular/core";
import {LoadingService} from "./loading.service";

@Injectable()
export class LoadingGridService extends LoadingService {
    constructor() {
        super();
    }
}
