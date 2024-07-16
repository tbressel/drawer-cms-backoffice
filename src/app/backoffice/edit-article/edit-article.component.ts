///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Angular modules
import { OnInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular router
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

// Services
import { ArticleService } from '../../services/article.service';
import { ContentsService } from '../../services/contents.service';

// Models
import { AddTemplateModel } from '../../models/add-template.model';
import { GetTemplateModel } from '../../models/get-template.model';

// Components
import { PagesComponent } from '../../backoffice/pages/pages.component';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';

// Config
import { CONFIG } from '../../../config';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [CommonModule, FormsModule, PagesComponent, ToolBarComponent],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss'
})


export class EditArticleComponent implements OnInit {

// Attributes for toggle sections
  editComponent: boolean = false;
  showContentForm: boolean = false;
  showSection: boolean = false;
  showTools: boolean = false;

  baseUrl = CONFIG.baseUrl;

  wholeArticle: any | undefined;
  articleContents: any[] | undefined;

  templateData: AddTemplateModel | undefined;
  templateDataForm: GetTemplateModel | undefined;
  
  pageDataForm: any;
  templateChoice: string = '';

  id_articles: number = 0;
  page: number = 1;
  id_contents: number = 0;

  titleLeft: string | null = '';
  titleRight: string | null = '';
  titleCenter: string | null = '';

  textLeft: string | null = '';
  textRight: string | null = '';
  textCenter: string | null = '';

  imageLeft: File | null = null;
  imageRight: File | null = null;
  imageCenter: File | null = null;

  attachementLeft: string | null = '';
  attachementRight: string | null = '';
  attachementCenter: string | null = '';

  previewImageUrlRight: string | ArrayBuffer | null = null;
  previewImageUrlLeft: string | ArrayBuffer | null = null;
  previewImageUrlCenter: string | ArrayBuffer | null = null;

  activeTextAreaId: string = ''; // Variable pour garder la trace du textarea actif


  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private contentsService: ContentsService,
    private router: Router
    ) { }

  /**
   *
   * Method used to fetch article content
   */
  ngOnInit(): void {
    this.loadArticle();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Reload the article each time the route changes
        this.loadArticle();
      }
    });
  }


  /**
   * 
   * Method to load the article
   * 
   * @returns 
   */
  loadArticle(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const page = this.route.snapshot.paramMap.get('page');
    this.id_articles = parseInt(id ?? '0');
    this.page = parseInt(page ?? '0');

    if (!id || !page) {
      console.error('ID or page is null');
      return;
    }
    this.articleService.getArticle(+id, +page).subscribe({
      next: (data: any) => {
        this.wholeArticle = data.body;
        this.articleContents = Object.values(this.wholeArticle);
      },
      error: (error) => console.error(error)
    });
  }


  /**
   * 
   * Method used to navigate to the previous page
   * 
   * @param id_article 
   * @param page 
   */
  goToNextPage(id_article: number, page: number): void {
    this.id_articles = id_article;
    this.page = page;
    this.page += 1;
    this.router.navigate([`/edit-article/${this.id_articles}/${this.page}`]);
  }


  /**
   * 
   * Method used to get the cover image selected by the user
   * 
   * @param event 
   */
  onFileChangeLeft(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      // Store the selected file if necessary
      this.imageLeft = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target !== null && e.target !== undefined) {
          // Assign the preview URL to the property
          this.previewImageUrlLeft = e.target.result; 
        } else {
          console.error('e.target is null or undefined');
        }
      };
      // Convert the file to data URL
      reader.readAsDataURL(file);
    }
  }

  /**
   * 
   * Method used to get the cover image selected by the user
   * 
   * @param event 
   */
  onFileChangeCenter(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      // Store the selected file if necessary
      this.imageCenter = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target !== null && e.target !== undefined) {
          // Assign the preview URL to the property
          this.previewImageUrlCenter = e.target.result;
        } else {
          console.error('e.target is null or undefined');
        }
      };

      reader.readAsDataURL(file); 
    }
  }

  /**
   * 
   * Method used to get the cover image selected by the user
   * 
   * @param event 
   */
  onFileChangeRight(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.imageRight = file; 

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target !== null && e.target !== undefined) {
          this.previewImageUrlRight = e.target.result;
        } else {
          console.error('e.target is null or undefined');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Method used to submit the form to choose the right template to display the right form for the article
   * 
   */
  submitTemplateForm(): void {
    this.contentsService.getTemplate(this.id_articles, this.templateChoice).subscribe({
      next: (data: any) => {
        this.templateDataForm = data.body[0];
        this.showSection = false;
        this.showContentForm = true;
        this.showTools = true;
      },
      error: (error) => console.error(error)
    });
  }



  /**
   * Method used to submit the form
   */
  submitAddTemplate(): void {
    this.contentsService.addTemplate(this.id_articles, this.templateChoice, this.titleLeft, this.titleRight, this.titleCenter, this.textLeft, this.textRight, this.textCenter, this.imageLeft, this.imageRight, this.imageCenter, this.attachementLeft, this.attachementRight, this.attachementCenter, this.page)
      .subscribe({
        next: (data: any) => {
          this.templateData = data.body;
          this.showSection = true;
          this.showTools = false;
        },
        error: (error) => console.error(error)
      });
  }


  /**
   * Method used to submit the form for the content eddited
   */
  submitEditedContent(): void {
    this.titleLeft = this.wholeArticle[0].title_left;
    this.textLeft = this.wholeArticle[0].text_left;
    this.imageLeft = this.wholeArticle[0].image_left;

    this.titleRight = this.wholeArticle[0].title_right;
    this.textRight = this.wholeArticle[0].text_right;
    this.imageRight = this.wholeArticle[0].image_right;

    this.titleCenter = this.wholeArticle[0].title_center;
    this.textCenter = this.wholeArticle[0].text_center;
    this.imageCenter = this.wholeArticle[0].image_center;

    this.attachementLeft = this.wholeArticle[0].attachement_left;
    this.attachementRight = this.wholeArticle[0].attachement_right;
    this.attachementCenter = this.wholeArticle[0].attachement_center;

    this.id_contents = this.wholeArticle[0].id_contents;

    this.templateChoice = this.wholeArticle[0].id_templates;

    this.contentsService.updateTemplate(this.id_articles, this.templateChoice, this.titleLeft, this.titleRight, this.titleCenter, this.textLeft, this.textRight, this.textCenter, this.imageLeft, this.imageRight, this.imageCenter, this.attachementLeft, this.attachementRight, this.attachementCenter, this.page, this.id_contents)
      .subscribe({
        next: (data: any) => {
          this.templateData = data.body;
          this.showSection = false;
          this.editComponent = false;
          this.router.navigate([`/edit-article/${this.id_articles}/${this.page}`]);
        },
        error: (error) => console.error(error)
      });
  }

  /**
   * 
   * Method used to remove a content
   * 
   * @param id 
   */
  removeContent(id: number): void {
    this.contentsService.remove(id).subscribe({
      next: (data: any) => {
      },
      error: (error) => console.error(error)
    });
  }

  /**
   * 
   * Method used to remove a content
   * 
   * @param id 
   */
  editContent(id: number): void {
    this.contentsService.get(id).subscribe({
      next: (data: any) => {
        this.wholeArticle = data.body;
        this.editComponent = true;
        this.showTools = true;
      },
      error: (error) => console.error(error)
    });
  }

/**
 * 
 * Method to set the active text area
 * 
 * @param textAreaId 
 */
  setActiveTextArea(textAreaId: string) {
    this.activeTextAreaId = textAreaId;
  }

  /**
   * Methode used to toggle the add entrie form
   */
  toggleForm() {
    this.showSection = !this.showSection;
    this.showContentForm = false;
  }

/**
 * Methode used to toggle the add or edit entrie form
 */
  cancelButton(): void {
    this.showSection = false;
    this.showTools = false;
    this.showContentForm = false;
    this.editComponent = false;
    this.loadArticle(); // Rechargez l'article chaque fois que la route change
  }
}
