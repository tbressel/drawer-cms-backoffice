///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Angular modules
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Config
import { CONFIG } from '../../../config';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {
  // Input
  @Input() wholeArticle: any | undefined;
  @Input() routeTypeProps: string | undefined;
  
  // Config Attributes  
  baseUrl = CONFIG.baseUrl;


  /**
   * 
   * Method used to get the pages array
   * 
   * @returns a new array with the max page
   */
  getPagesArray() {
    
    // Get the max page from the whole article
    const maxPage = this.wholeArticle[0]?.max_page || 0;

    // Return the array of pages
    return new Array(maxPage).fill(null).map((_, index) => index + 1);
  }
}
