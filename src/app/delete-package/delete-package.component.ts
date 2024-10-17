import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { Package } from '../models/package';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css'
})
export class DeletePackageComponent {

  packages: Package[] = [];
  selectedPackage: Package = new Package();

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.database.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
  }

  deletePackage() {
    this.database.deletePackage(this.selectedPackage.packageID).subscribe((data: any) => {
      this.router.navigate(['/list-packages']);
    },
    (error: any) => {
      this.router.navigate(['/invalid-data']);
    });
  }
}
