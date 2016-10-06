import { BoxResize } from './models/dashboardBoxEnum';

export interface DashboardResizeConfig {
    type: BoxResize;
    width: number;
    height: number;
}
