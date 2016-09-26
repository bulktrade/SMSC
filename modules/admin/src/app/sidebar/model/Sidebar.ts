export class SidebarModel {
    public name: string;
    public path: string;
    public icon: string;
    public toggle?: string;
    public submenu?: Array<SidebarModel>;
    public showInSubNavigation?: boolean;
}