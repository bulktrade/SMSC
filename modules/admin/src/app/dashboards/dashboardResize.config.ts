import { BoxResize } from './models/dashboardBox.enum';

export interface DashboardResizeConfig {
    type: BoxResize;
    width: number;
    height: number;
}
