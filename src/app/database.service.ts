import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const driverUrl = '/drivers';
const packageUrl = '/packages';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // Set the content type to JSON
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  operationsCount = {
    get: 0,
    post: 0,
    update: 0,
    delete: 0
  };

  constructor(private http: HttpClient) { }

  // Driver functions
  getDrivers() {
    this.operationsCount.get++;
    return this.http.get(driverUrl + '/');
  }

  addDriver(driver: any) {
    this.operationsCount.post++;
    return this.http.post(driverUrl + '/add', driver, httpOptions);
  }

  updateDriver(driver: any) {
    this.operationsCount.update++;
    return this.http.put(driverUrl + '/update', driver, httpOptions);
  }

  deleteDriver(driverID: string) {
    this.operationsCount.delete++;
    return this.http.delete(driverUrl + '/remove/' + driverID, httpOptions);
  }

  // Package functions
  getPackages() {
    this.operationsCount.get++;
    return this.http.get(packageUrl + '/');
  }

  addPackage(pkg: any) {
    this.operationsCount.post++;
    return this.http.post(packageUrl + '/add', pkg, httpOptions);
  }

  updatePackage(pkg: any) {
    this.operationsCount.update++;
    return this.http.put(packageUrl + '/update', pkg, httpOptions);
  }

  deletePackage(pkgID: string) {
    this.operationsCount.delete++;
    return this.http.delete(packageUrl + '/remove/' + pkgID, httpOptions);
  }

  // HD functions

  getPackagesByDriver(driverID: string) {
    this.operationsCount.get++;
    return this.http.get(driverUrl + '/packages/' + driverID, httpOptions);
  }

  getDriver(driverID: string) {
    this.operationsCount.get++;
    return this.http.get(driverUrl + '/driver/' + driverID, httpOptions);
  }
}
