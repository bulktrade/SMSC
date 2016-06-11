import {Injectable} from '@angular/core';
import { Directive, Attribute, DynamicComponentLoader, ViewContainerRef } from '@angular/core';
import { Router, RouterOutlet, ComponentInstruction } from '@angular/router-deprecated';

@Directive({
    selector: 'route-outlet',
    providers: []
})
@Injectable()
export class AppRouterOutlet extends RouterOutlet {
    publicRoutes: any;
    private parentRouter: Router;

    constructor(_containerRef: ViewContainerRef, _loader: DynamicComponentLoader,
                _parentRouter: Router, @Attribute('name') nameAttr: string) {
        super(_containerRef, _loader, _parentRouter, nameAttr);

        this.parentRouter = _parentRouter;
        this.publicRoutes = {
            'login': true,
            'notfound': true
        };
    }

    activate(instruction: ComponentInstruction) {
        let url = instruction.urlPath;
        let isLogin = localStorage.getItem('adminRight') === 'true' ? true : false;

        if (!this.publicRoutes[url] && !isLogin) {
            this.parentRouter.navigateByUrl('/login');
        }

        return super.activate(instruction);
    }
}
