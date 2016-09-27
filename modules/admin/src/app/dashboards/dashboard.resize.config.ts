import { BoxResize } from "./models/dashboard.box.enum";

export interface DashboardResizeConfig {
    type: BoxResize;
    width: number;
    height: number;
}
