import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import { Observable } from "rxjs";
import { BackendService } from "../backend/backend.service";

@Injectable()
export class AuthService {
    constructor(public tokenService: TokenService,
                private backendService: BackendService) {

    }

    login(username, password) {
        return Observable.create((observer) => {
            this.backendService.authentication(username, password).subscribe(
                data => {
                    this.tokenService.setToken(data['token']);
                    observer.next(this.tokenService.getToken());
                    observer.complete();
                },
                err => {
                    observer.error(err);
                    observer.complete();
                }
            );
        });
    }
}
