import { DashboardListItem } from "./dashboard.list.item";

export class DashboardList<T> {
    //  Box width
    public width: DashboardListItem<T>;
    //  Box height
    public height: DashboardListItem<T>;
    //  Box remove list
    public remove: DashboardListItem<T>;

    constructor(len?:number) {
        this.width = new DashboardListItem<T>(len);
        this.height = new DashboardListItem<T>(len);
        this.remove = new DashboardListItem<T>(len);
    }
}
