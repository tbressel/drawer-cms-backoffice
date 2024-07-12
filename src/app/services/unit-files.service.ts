///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Modules
import { HttpClient } from '@angular/common/http';

// Decorator
import { Injectable } from '@angular/core';

// Type model for async data
import { Observable } from 'rxjs';

// Model
import { UnitFilesModel } from '../models/unit-files.model';

// Configuration
import { CONFIG } from '../../config';

// Decorator to inject the service in all components that need it
@Injectable({
  providedIn: 'root',
})


export class UnitFilesService {

  // Constructor to inject the HttpClient
  constructor(private http: HttpClient) { }




  
  getFiles(): Observable<UnitFilesModel[]> {
    return this.http.get<UnitFilesModel[]>(`${CONFIG.baseUrl}/file/all-files/`);
  }

  isDisplayed(id: number, updateData: { isDisplay: boolean }): Observable<any> {
    return this.http.patch(`${CONFIG.baseUrl}/file/is-displayed/${id}`, updateData);
  }



  /**
 * Methode used to submit the form
 */
create(formData: FormData): Observable<any> {
    return this.http.post(`${CONFIG.baseUrl}/file/add`, formData);
}

  /**
   * Methode used to delete a menu item
   */
  delete(id: number): Observable<any> {
    return this.http.delete(`${CONFIG.baseUrl}/file/delete/${id}`);
  }

}
