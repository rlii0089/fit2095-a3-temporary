import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { Package } from '../models/package';

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent {

  packages: Package[] = [];
  selectedPackage: Package = new Package();

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.database.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
  }

  updatePackage() {
    this.database.updatePackage(this.selectedPackage).subscribe((data: any) => {
      this.router.navigate(['/list-packages']);
    },
    (error: any) => {
      this.router.navigate(['/invalid-data']);
    });
  }

}
