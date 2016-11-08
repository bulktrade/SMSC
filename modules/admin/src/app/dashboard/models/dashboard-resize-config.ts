import { BoxResize } from './dashboard-box-enum';

export interface DashboardResizeConfig {
    type: BoxResize;
    width: number;
    height: number;
    chart: Object;
}
