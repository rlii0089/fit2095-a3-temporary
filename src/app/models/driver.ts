export class Driver {
    driverID: string;
    driverName: string;
    driverDepartment: string;
    driverLicence: string;
    driverIsActive: boolean;
    driverCreatedAt: Date;

    constructor() {
        this.driverID = '';
        this.driverName = '';
        this.driverDepartment = '';
        this.driverLicence = '';
        this.driverIsActive = true;
        this.driverCreatedAt = new Date();
    }
}