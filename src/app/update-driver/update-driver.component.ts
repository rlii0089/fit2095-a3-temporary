import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-driver.component.html',
  styleUrl: './update-driver.component.css'
})
export class UpdateDriverComponent {

  drivers: Driver[] = [];
  selectedDriver: Driver = new Driver();

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.database.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
  }

  updateDriver() {
    this.database.updateDriver(this.selectedDriver).subscribe((data: any) => {
      this.router.navigate(['/list-drivers']);
    },
    (error: any) => {
      this.router.navigate(['/invalid-data']);
    });
  }
}
