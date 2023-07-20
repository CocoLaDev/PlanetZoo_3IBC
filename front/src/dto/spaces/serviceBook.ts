export interface ServiceBook {
    _id?: string;
    spaceId: string;
    maintenanceStart: string;
    maintenanceEnd?: string;
    description: string;
}