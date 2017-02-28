import {Injectable} from "@angular/core";
import {LoadingService} from "./loading.service";

@Injectable()
export class LoadingRouterOutletService extends LoadingService {
    constructor() {
        super();
    }
}
