import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css'
})
export class DeleteDriverComponent {

  drivers: Driver[] = [];
  selectedDriver: Driver = new Driver();

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.database.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
  }

  deleteDriver() {
    this.database.deleteDriver(this.selectedDriver.driverID).subscribe((data: any) => {
      this.router.navigate(['/list-drivers']);
    },
    (error: any) => {
      this.router.navigate(['/invalid-data']);
    });
  }
}
