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
    public loadingService: LoadingService = new LoadingService();

    constructor(parentOutletMap: RouterOutletMap, location: ViewContainerRef, resolver: ComponentFactoryResolver, name: string) {
        super(parentOutletMap, location, resolver, name);
    }

    activate(activatedRoute: ActivatedRoute, loadedResolver: ComponentFactoryResolver, loadedInjector: Injector, providers: ResolvedReflectiveProvider[], outletMap: RouterOutletMap): void {
        this.loadingService.stop();
        super.activate(activatedRoute, loadedResolver, loadedInjector, providers, outletMap);
    }

    deactivate(): void {
        this.loadingService.start();
        super.deactivate();
    }
}
