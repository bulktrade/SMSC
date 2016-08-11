import {
    ResolvedReflectiveProvider,
    Directive,
    ComponentFactoryResolver,
    ViewContainerRef,
    Injector
} from "@angular/core";
import { RouterOutlet, ActivatedRoute, RouterOutletMap } from "@angular/router";
import { LoadingService } from "../services/loading.service";

@Directive({ selector: 'router-outlet' })
export class LoadingRouterOutlet extends RouterOutlet {

    constructor(private _parentOutletMap: RouterOutletMap, private _location: ViewContainerRef, private _resolver: ComponentFactoryResolver, private _name: string, private _loadingService: LoadingService) {
        super(_parentOutletMap, _location, _resolver, _name);
    }

    activate(activatedRoute: ActivatedRoute, loadedResolver: ComponentFactoryResolver, loadedInjector: Injector, providers: ResolvedReflectiveProvider[], outletMap: RouterOutletMap): void {
        super.activate(activatedRoute, loadedResolver, loadedInjector, providers, outletMap);
    }

    deactivate(): void {
        super.deactivate();
    }
}
