import {
    ResolvedReflectiveProvider,
    Directive
} from '@angular/core';
import {RouterOutlet, ActivatedRoute, RouterOutletMap} from "@angular/router";
import {LoadingService} from "../services/loading.service";

@Directive({selector: 'router-outlet'})
export class LoadingRouterOutlet extends RouterOutlet {
    public loadingService: LoadingService = new LoadingService();

    activate(activatedRoute: ActivatedRoute, providers: ResolvedReflectiveProvider[], outletMap: RouterOutletMap): void {
        this.loadingService.stop();
        super.activate(activatedRoute, providers, outletMap);
    }

    deactivate(): void {
        this.loadingService.start();
        super.deactivate();
    }
}
