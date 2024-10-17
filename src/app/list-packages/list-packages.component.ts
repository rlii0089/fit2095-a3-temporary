import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Package } from '../models/package';
import { Driver } from '../models/driver';
import { KilogramsToGramsPipe } from '../kilograms-to-grams.pipe';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [KilogramsToGramsPipe],
  templateUrl: './list-packages.component.html',
  styleUrl: './list-packages.component.css'
})
export class ListPackagesComponent {
  
  packages: Package[] = [];
  drivers: Driver[] = [];
  selectedPackageDriver: Driver | null = null;

  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.database.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
    this.database.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
  }

  showDriverDetails(driverID: string) {
    this.database.getDriver(driverID).subscribe((data: any) => {
      this.selectedPackageDriver = data;
    });
  }

}
