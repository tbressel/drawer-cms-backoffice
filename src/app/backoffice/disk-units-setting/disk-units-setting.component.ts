///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Angular modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

// Type model
import { DiskUnitModel } from '../../models/disk-unit.model';

// Service
import { DiskUnitService } from '../../services/disk-unit.service';
import { ReloadService } from '../../services/reload.service';



@Component({
  selector: 'app-disk-units-setting',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './disk-units-setting.component.html',
  styleUrl: './disk-units-setting.component.scss'
})



export class DiskUnitsSettingComponent implements OnInit{

  // Attributes
  showDiskSection = false;

  label: string  ='';
  letter: string  ='';
  dataUnit: DiskUnitModel[] = [];


  // Constructor
  constructor(private diskUnitService: DiskUnitService,
    private reload: ReloadService) { }


    /**
   * 
   * Method used to fetch the data menu. Initialized after the creation of the component
   */
  ngOnInit(): void {
    this.reload.reload$.subscribe(() => {

      this.diskUnitService.getAll().subscribe({
        next: (data: any) => {
          this.dataUnit = data.body;
        },
        error: (error) => console.error(error)
      });

    });
    this.reload.triggerReload();
  }

  /**
   * 
   * Methode to navigate to the article details
   * 
   * @param article 
   * @param key 
   * @returns 
   */
  getArticlePropertyValue(article: DiskUnitModel, key: string): any {
    return article[key as keyof DiskUnitModel];
  }

    
  submitForm(): void {
    this.diskUnitService.create(this.label, this.letter).subscribe({
      next: (data: any) => {
        this.showDiskSection = false;
        this.label = '';
        this.letter = '';
    this.reload.triggerReload();    
      },
      error: (error) => console.error(error)
    });
  }

  deleteItem(id: number): void {
    this.diskUnitService.delete(id).subscribe({
      next: (data: any) => {
    this.reload.triggerReload();
      },
      error: (error) => console.error(error)
    });
  }


  /**
   * Methode used to toggle the add entrie form
   */
  toggleDiskForm() {
    this.showDiskSection = !this.showDiskSection;
  }

}
