import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Driver } from '../models/driver';
import { Package } from '../models/package';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {

  databaseOperations = {
    get: 0,
    post: 0,
    update: 0,
    delete: 0
  };

  drivers: Driver[] = [];
  packages: Package[] = [];

  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.updateStatistics();

    this.database.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });

    this.database.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
  }

  updateStatistics() {
    this.databaseOperations = {
      get: this.database.operationsCount.get,
      post: this.database.operationsCount.post,
      update: this.database.operationsCount.update,
      delete: this.database.operationsCount.delete
    };
  }

}