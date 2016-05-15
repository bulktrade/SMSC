import {Directive, Attribute, DynamicComponentLoader, ViewContainerRef} from '@angular/core';
import {Router, RouterOutlet, ComponentInstruction} from '@angular/router-deprecated';
import {LocalStorage} from "../login/localstorage";

@Directive({
  selector: 'router-outlet',
  providers: [Router]
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: any;
  private parentRouter: Router;

  constructor(_containerRef: ViewContainerRef, _loader: DynamicComponentLoader,
              _parentRouter: Router, @Attribute('name') nameAttr: string) {
    super(_containerRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    // The Boolean following each route below denotes whether the route requires authentication to view
    this.publicRoutes = {
      'login': true,
      'notfound': true
    };
  }

  activate(instruction: ComponentInstruction) {
    let url = instruction.urlPath;

    if (!this.publicRoutes[url] && !LocalStorage.getLocalStorage()) {
      this.parentRouter.navigateByUrl('/login');
    }

    return super.activate(instruction);
  }
}
