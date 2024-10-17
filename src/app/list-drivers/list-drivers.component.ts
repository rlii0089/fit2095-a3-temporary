import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Driver } from '../models/driver';
import { UppercasePipe } from '../uppercase.pipe';
import { Package } from '../models/package';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [UppercasePipe],
  templateUrl: './list-drivers.component.html',
  styleUrl: './list-drivers.component.css'
})
export class ListDriversComponent {

  drivers: Driver[] = [];
  selectedDriverPackages: Package[] | null = null;

  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.database.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
  }

  showPackages(driverID: string) {
    this.database.getPackagesByDriver(driverID).subscribe((data: any) => {
      this.selectedDriverPackages = data;
    });
  }
}
