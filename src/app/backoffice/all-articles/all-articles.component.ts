///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Modules
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouteReuseStrategy } from '@angular/router';

// Model
import { ArticleCardModel } from '../../models/article-card.model';

// Services
import { CreateArticleService } from '../../services/create-article.service';
import { ReloadService } from '../../services/reload.service';




@Component({
  selector: 'app-all-articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-articles.component.html',
  styleUrl: './all-articles.component.scss'
})




export class AllArticlesComponent implements OnInit {

  // Attributes
  dataAllArticles: ArticleCardModel[] = [];


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


}
