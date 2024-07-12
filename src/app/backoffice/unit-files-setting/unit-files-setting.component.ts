///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouteReuseStrategy } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// Model
import { UnitFilesModel } from '../../models/unit-files.model';
import { DiskUnitModel } from '../../models/disk-unit.model';

// Services
import { UnitFilesService } from '../../services/unit-files.service';
import { DiskUnitService } from '../../services/disk-unit.service';
import { ReloadService } from '../../services/reload.service';



interface DiskUnitField {

  id_disk_units: number;
  letter: string;
}

@Component({
  selector: 'app-unit-files-setting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit-files-setting.component.html',
  styleUrl: './unit-files-setting.component.scss'
})


export class UnitFilesSettingComponent implements OnInit {


  // Attributes
  dataAllFiles: UnitFilesModel[] = [];
  diskUnits: DiskUnitModel[] = [];
  selectedLetter: string = '';
  file: File | null = null;
  showForm = false;

  // Constructor
  constructor(private unitFilesService: UnitFilesService,
    private router: Router,
    private routeReuseStrategy: RouteReuseStrategy,
    private diskUnitService: DiskUnitService,
    private reload: ReloadService) { }


  /**
   * Methode to get all articles
   * 
   */
  ngOnInit(): void {
    this.reload.reload$.subscribe(() => {

    this.unitFilesService.getFiles().subscribe({
      next: (data: any) => {
        this.dataAllFiles = data.body;
      },
      error: (error) => console.error(error)
    });

    this.diskUnitService.getAll().subscribe({
      next: (data: any) => {
        this.diskUnits = data.body;
      },
      error: (error) => console.error(error)
    });

  });
    this.reload.triggerReload();
  }



  submitForm(): void {
    if (this.file) {
      const formData = new FormData();
      formData.append('id_disk_units', this.selectedLetter);
      formData.append('file', this.file);


      this.unitFilesService.create(formData).subscribe({
        next: (data: any) => {
          this.reload.triggerReload();
          this.router.navigate(['/backoffice-main']);
        },
          error: (error) => console.error(error)  
      });
    }
  }


  deleteFile(file: UnitFilesModel): void {
    this.unitFilesService.delete(file.id_files).subscribe({
      next: (data: any) => {
        this.reload.triggerReload();
        this.router.navigate(['/backoffice-main']);
      },
      error: (error) => console.error(error)
    });
  }



    /**
   * Methode used to toggle the add entrie form
   */
    toggleForm() {
      this.showForm = !this.showForm;
    }

  getFilePropertyValue(file: UnitFilesModel, key: string): any {
    return file[key as keyof UnitFilesModel];
  }


  toggleDisplayFile(file: UnitFilesModel): void {

    // toggle the isDisplay attribute
    file.isDisplay = !file.isDisplay;

    // Call the service and update the article
    this.unitFilesService.isDisplayed(file.id_files, { isDisplay: file.isDisplay }).subscribe({
      next: (response) => {
        // console.log('Article mis à jour avec succès', response);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'article', error);
        file.isDisplay = !file.isDisplay;
      }
    });
  }






  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
    }
  }


  
}
