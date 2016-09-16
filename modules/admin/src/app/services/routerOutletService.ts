export class RouterOutletService {
    private _previousRoute;
    private _currentRoute;

    isPreviousRoute(componentName: string): boolean {
        if (this._previousRoute) {
            if (this._previousRoute.route.component['name'] === componentName) {
                return true;
            } else {
                return false;
            }
        }
    }

    isCurrentRoute(componentName: string): boolean {
        if (this._currentRoute) {
            if (this._currentRoute.route.component['name'] === componentName) {
                return true;
            } else {
                return false;
            }
        }
    }

    get previousRoute() {
        return this._previousRoute;
    }

    set previousRoute(value) {
        this._previousRoute = value;
    }

    get currentRoute() {
        return this._currentRoute;
    }

    set currentRoute(value) {
        this._currentRoute = value;
    }
}