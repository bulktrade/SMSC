import {BoxResize} from "./models/dashboard_box.enum";

export interface DashboardResizeConfig {
    type: BoxResize;
    width: number;
    height: number;
}
