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
import { CreateArticleModel } from '../models/create-article.model';
import { TagsModel } from '../models/tags.model';
import { ArticleCardModel } from '../models/article-card.model';
import { CategoriesModel } from '../models/categories.model';

// Configuration
import { CONFIG } from '../../config';
import { EditArticleComponent } from '../backoffice/edit-article/edit-article.component';

// Decorator to inject the service in all components that need it
@Injectable({
  providedIn: 'root',
})


export class CreateArticleService {


  // Constructor to inject the HttpClient
  constructor(private http: HttpClient) { }


  create(title: string, description: string, idTagsList: number[], idCategory: string, coverImage?: File | null): Observable<CreateArticleModel> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('idTagsList', JSON.stringify(idTagsList));
    formData.append('idCategory', idCategory);
    if (coverImage) {
      formData.append('coverImage', coverImage, coverImage.name);
    }

    return this.http.post<CreateArticleModel>(`${CONFIG.baseUrl}/article/create`, formData);
  }


  getTags(): Observable<TagsModel[]> {
    return this.http.get<TagsModel[]>(`${CONFIG.baseUrl}/article/tags-list`);
  }

  getCategories(): Observable<CategoriesModel[]> {
  return this.http.get<CategoriesModel[]>(`${CONFIG.baseUrl}/article/categories-list`);
  }

  getAll(): Observable<ArticleCardModel[]> {
    return this.http.get<ArticleCardModel[]>(`${CONFIG.baseUrl}/all-articles`);
  }


  isArticleDisplayed(id: number, updateData: { isDisplay: boolean }): Observable<any> {
    return this.http.patch(`${CONFIG.baseUrl}/article/is-displayed/${id}`, updateData);
  }


  select(id: number, page: number): Observable<any> {
    console.log(id, page);
    return this.http.get(`${CONFIG.baseUrl}/article/select-article/${id}/${page}`);

  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${CONFIG.baseUrl}/article/delete/${id}`);

  }

}