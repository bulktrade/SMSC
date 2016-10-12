import { DashboardListItem } from "./dashboardListItem";

export class DashboardList<T> {
    //  Box width
    public width: DashboardListItem<T> = new DashboardListItem<T>();
    //  Box height
    public height: DashboardListItem<T> = new DashboardListItem<T>();
    //  Box remove list
    public remove: DashboardListItem<T> = new DashboardListItem<T>();

    constructor() {
    }
}
