export class Package {
    packageID: string;
    packageTitle: string;
    packageWeight: number;
    packageDestination: string;
    packageDescription: string;
    packageIsAllocated: boolean;
    driverID: any

    constructor() {
        this.packageID = '';
        this.packageTitle = '';
        this.packageWeight = 0;
        this.packageDestination = '';
        this.packageDescription = '';
        this.packageIsAllocated = false;
        this.driverID;
    }
}