///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Modules
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router, RouteReuseStrategy } from '@angular/router';

// Model
import { ArticleCardModel } from '../../models/article-card.model';
import { TagsModel } from '../../models/tags.model';
import { CategoriesModel } from '../../models/categories.model';

// Services
import { CreateArticleService } from '../../services/create-article.service';
import { ReloadService } from '../../services/reload.service';




@Component({
  selector: 'app-all-articles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './all-articles.component.html',
  styleUrl: './all-articles.component.scss'
})




export class AllArticlesComponent implements OnInit {

  // Attributes
  dataAllArticles: ArticleCardModel[] = [];

  showForm = false;
    // Attributes sent to the methode create()
    title: string = '';                     // Title of the article
    description: string = '';               // Description of the article
    checkedTagIds: number[] = [];           // List of tags checked by the user
    idCategory: string = '';           
    coverImage: File | null = null;         // Cover image of the article

    // List of tags and categories to display when the component is loaded
    tagsList: TagsModel[] = [];             
    CategoriesList: CategoriesModel[] = [];
      // imageRight: File | null = null;
  previewImageUrlRight: string | ArrayBuffer | null = null;


  // Constructor
  constructor(private createArticleService: CreateArticleService,
    private router: Router,
    private routeReuseStrategy: RouteReuseStrategy,
    private reload: ReloadService) { }



  /**
   * Methode to get all articles
   * 
   */
  ngOnInit(): void {
    this.reload.reload$.subscribe(() => {

      this.createArticleService.getAll().subscribe({
        next: (data: any) => {
          this.dataAllArticles = data.body;
        },
        error: (error) => console.error(error)
      });

      this.createArticleService.getTags().subscribe({
        next: (data: any) => {
          this.tagsList = data.body;
          // console.log(data.body);
        },
        error: (error) => console.error(error)
      });


    this.createArticleService.getCategories().subscribe({
      next: (data: any) => {
        this.CategoriesList = data.body;
        // console.log(data.body);
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
  getArticlePropertyValue(article: ArticleCardModel, key: string): any {
    return article[key as keyof ArticleCardModel];
  }

  /**
   * 
   * Methode to toggle between display and hide article
   *
   * @param article 
   */
  toggleDisplayArticle(article: ArticleCardModel): void {

    // toggle the isDisplay attribute
    article.isDisplay = !article.isDisplay;

    // Call the service and update the article
    this.createArticleService.isArticleDisplayed(article.id_articles, { isDisplay: article.isDisplay }).subscribe({
      next: (response) => {
        // console.log('Article mis à jour avec succès', response);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'article', error);
        article.isDisplay = !article.isDisplay;
      }
    });
  }


  selectArticle(article: ArticleCardModel): void {

    // Assurez-vous que `article` contient un champ `id` ou un champ similaire représentant l'identifiant unique de l'article.
    this.createArticleService.select(article.id_articles, 1).subscribe({
      next: (response) => {
        let page: number = response.body[0].page;

        this.router.navigate([`/edit-article/${article.id_articles}/${page}`]);

      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'article', error);
      }
    });
  }



  deleteArticle(article: ArticleCardModel): void {
    this.createArticleService.delete(article.id_articles).subscribe({
      next: (data: any) => {
        this.reload.triggerReload();
        this.router.navigate(['/backoffice-main']);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'article', error);
      }
    });
  }










    /**
   * 
   * Method used to check the tags selected by the user
   * 
   * @param event 
   * @param tagId 
   */
    onCheckboxChange(event: any, tagId: number): void {
      if (event.target.checked) {
        this.checkedTagIds.push(tagId);
      } else {
        const index = this.checkedTagIds.indexOf(tagId);
        if (index > -1) {
          this.checkedTagIds.splice(index, 1);
        }
      }
      // console.log(this.checkedTagIds);
    }



      /**
   * 
   * Method used to get the cover image selected by the user
   * 
   * @param event 
   */
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      const image = event.target.files[0];
      this.coverImage = image; // Stocke le fichier sélectionné si nécessaire
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target !== null && e.target !== undefined) {
          this.previewImageUrlRight = e.target.result; // Affecte l'URL de l'aperçu à la propriété
        } else {
          console.error('e.target is null or undefined');
        }
      };
      reader.readAsDataURL(image); // Convertit le fichier en URL de données
    }
  }



  /**
   * Method used to submit the form
   */
  submitForm(): void {
    // Vérifier si idCategory n'est pas vide
    if (!this.idCategory || this.idCategory.trim() === '') {
      console.error('Veuillez sélectionner une catégorie avant de soumettre.');
      return; // Ne pas soumettre le formulaire si idCategory est vide
    }
  console.log('this.coverImage', this.coverImage);
      this.createArticleService.create(this.title, this.description, this.checkedTagIds, this.idCategory, this.coverImage).subscribe({
        next: (data: any) => {
          console.log(data);
          this.reload.triggerReload();
          this.router.navigate(['/create-article']);
        },
        error: (error) => console.error(error)
      });
    }


    onSelectChange(event: Event): void {
      const target = event.target as HTMLSelectElement; // Assertion de type
      const value = target.value;
      // console.log(value); // Affiche la valeur sélectionnée
    
      // Vérifier si la valeur sélectionnée n'est pas vide
      if (value && value.trim() !== '') {
        this.idCategory = value; // Affecter la valeur à idCategory
      } else {
        console.error('La catégorie sélectionnée est vide.');
        // Vous pouvez également définir idCategory à une valeur par défaut ou gérer l'erreur comme nécessaire
      }
    }


      /**
   * Methode used to toggle the add entrie form
   */
  toggleForm() {
    this.showForm = !this.showForm;
  }

}
