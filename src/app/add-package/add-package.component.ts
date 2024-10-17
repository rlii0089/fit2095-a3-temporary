import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { Package } from '../models/package';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent {
  
  drivers: Driver[] = [];
  package: Package = new Package();

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.database.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
  }

  isAllocated() {
    return this.package.packageIsAllocated;
  }

  addPackage() {
    this.database.addPackage(this.package).subscribe((data: any) => {
      this.router.navigate(['/list-packages']);
    },
    (error: any) => {
      this.router.navigate(['/invalid-data']);
    });
  }
}
