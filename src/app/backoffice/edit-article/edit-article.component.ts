import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';

import { CreateArticleService } from '../../services/create-article.service';
import { ContentsService } from '../../services/contents.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONFIG } from '../../../config';
import { FormsModule } from '@angular/forms';
import { AddTemplateModel } from '../../models/add-template.model';
import { GetTemplateModel } from '../../models/get-template.model';
import { ReloadService } from '../../services/reload.service';
import { PagesComponent } from '../../backoffice/pages/pages.component';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';

// Router COnfiguration
import { Router, RouteReuseStrategy, NavigationEnd } from '@angular/router';

// import { TimelineComponent } from '../components/timeline/timeline.component';
@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [CommonModule, FormsModule, PagesComponent, ToolBarComponent],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss'
})


export class EditArticleComponent implements OnInit {

  editComponent: boolean = false; 

  showContentForm: boolean = false; 

  baseUrl = CONFIG.baseUrl;

  wholeArticle: any | undefined;

  articleContents: any[] | undefined;

  showSection: boolean = false;

  showTools: boolean = false;

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
    private createArticleService: CreateArticleService,
    private contentsService: ContentsService,
    private router: Router,
    private routeReuseStrategy: RouteReuseStrategy,
    private reload: ReloadService
  ) { }

  /**
   *
   * Method used to fetch article content
   */
  ngOnInit(): void {
    this.loadArticle();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadArticle(); // Rechargez l'article chaque fois que la route change
      }
    });


  }

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
      this.imageLeft = file; // Stocke le fichier sélectionné si nécessaire

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target !== null && e.target !== undefined) {
          this.previewImageUrlLeft = e.target.result; // Affecte l'URL de l'aperçu à la propriété
        } else {
          console.error('e.target is null or undefined');
        }
      };

      reader.readAsDataURL(file); // Convertit le fichier en URL de données
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
      this.imageCenter = file; // Stocke le fichier sélectionné si nécessaire

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target !== null && e.target !== undefined) {
          this.previewImageUrlCenter = e.target.result; // Affecte l'URL de l'aperçu à la propriété
        } else {
          console.error('e.target is null or undefined');
        }
      };

      reader.readAsDataURL(file); // Convertit le fichier en URL de données
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
      this.imageRight = file; // Stocke le fichier sélectionné si nécessaire

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target !== null && e.target !== undefined) {
          this.previewImageUrlRight = e.target.result; // Affecte l'URL de l'aperçu à la propriété
        } else {
          console.error('e.target is null or undefined');
        }
      };

      reader.readAsDataURL(file); // Convertit le fichier en URL de données
    }
  }

  /**
   * Method used to submit the form to choose the right template to display the right form for the article
   * 
   */
  submitTemplateForm(): void {
    // console.log("template choisi : ", this.templateChoice + " . Pour l'article id  : ", this.id_articles);
    this.contentsService.getTemplate(this.id_articles, this.templateChoice).subscribe({
      next: (data: any) => {
        this.templateDataForm = data.body[0];
        console.warn("Mes données de template reçues : ", this.templateDataForm);
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
          // console.log("Contenu de templateData : ", this.templateData);
          this.showSection = true;
          this.showTools = false;
          
        },
        error: (error) => console.error(error)
      });
  }


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
        // console.log("Contenu supprimé : ", data.body);
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
      },
      error: (error) => console.error(error)
    });
  }

closeEditComponent(): void {
this.editComponent = false;

}

  // Méthode pour définir le textarea actif
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
}
