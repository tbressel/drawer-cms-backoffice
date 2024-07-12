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
import { GetTemplateModel } from '../models/get-template.model';
import { AddTemplateModel } from '../models/add-template.model';

// Configuration
import { CONFIG } from '../../config';
import { EditArticleComponent } from '../backoffice/edit-article/edit-article.component';

// Decorator to inject the service in all components that need it
@Injectable({
  providedIn: 'root',
})


export class ContentsService {


  // Constructor to inject the HttpClient
  constructor(private http: HttpClient) { }


  /**
   * 
   * Methode to get the configuration of the template form.
   * 
   * @param id_articles 
   * @param templateChoice 
   * @returns 
   */
  getTemplate(id_articles: number, templateChoice: string): Observable<GetTemplateModel> {



    const formTemplateData = new FormData();
    formTemplateData.append('templateChoice', templateChoice);
    formTemplateData.append('id', id_articles.toString());
    return this.http.post<GetTemplateModel>(`${CONFIG.baseUrl}/article/get-template/${id_articles}`, formTemplateData);
  };

  /**
   * 
   * Methode to add the configuration of the template form.
   * 
   * @param id_articles 
   * @param templateChoice 
   * @param titleLeft 
   * @param titleRight 
   * @param titleCenter 
   * @param textLeft 
   * @param textRight 
   * @param textCenter 
   * @param imageLeft 
   * @param imageRight 
   * @param imageCenter 
   * @param attachementLeft 
   * @param attachementRight 
   * @param attachementCenter 
   * @param page 
   * @returns 
   */
  updateTemplate(id_articles: number,
    templateChoice: string,
    titleLeft: string | null,
    titleRight: string | null,
    titleCenter: string | null,
    textLeft: string | null,
    textRight: string | null,
    textCenter: string | null,
    imageLeft: File | null,
    imageRight: File | null,
    imageCenter: File | null,
    attachementLeft: string | null,
    attachementRight: string | null,
    attachementCenter: string | null,
    page: number,
    id_contents: number): Observable<AddTemplateModel> {



    const formTemplateData = new FormData();
    formTemplateData.append('templateChoice', templateChoice);
    formTemplateData.append('id', id_articles.toString());
    formTemplateData.append('page', page.toString());
    formTemplateData.append('id_contents', id_contents.toString());
    formTemplateData.append('titleLeft', titleLeft ?? "");
    formTemplateData.append('titleRight', titleRight ?? "");
    formTemplateData.append('titleCenter', titleCenter ?? "");
    formTemplateData.append('textLeft', textLeft ?? "");
    formTemplateData.append('textRight', textRight ?? "");
    formTemplateData.append('textCenter', textCenter ?? "");
if (imageLeft) {
  formTemplateData.append('imageLeft', imageLeft);
}
if (imageRight) {
    formTemplateData.append('imageRight', imageRight);
}
if (imageCenter) {
    formTemplateData.append('imageCenter', imageCenter);
}
    formTemplateData.append('attachementLeft', attachementLeft ?? "");
    formTemplateData.append('attachementRight', attachementRight ?? "");
    formTemplateData.append('attachementCenter', attachementCenter ?? "");



    return this.http.put<AddTemplateModel>(`${CONFIG.baseUrl}/article/update-template/${id_articles}/${page}`, formTemplateData);
  };



  addTemplate(id_articles: number,
    templateChoice: string,
    titleLeft: string | null,
    titleRight: string | null,
    titleCenter: string | null,
    textLeft: string | null,
    textRight: string | null,
    textCenter: string | null,
    imageLeft: File | null,
    imageRight: File | null,
    imageCenter: File | null,
    attachementLeft: string | null,
    attachementRight: string | null,
    attachementCenter: string | null,
    page: number): Observable<AddTemplateModel> {



    const formTemplateData = new FormData();
    formTemplateData.append('templateChoice', templateChoice);
    formTemplateData.append('id', id_articles.toString());
    formTemplateData.append('page', page.toString());
    formTemplateData.append('titleLeft', titleLeft ?? "");
    formTemplateData.append('titleRight', titleRight ?? "");
    formTemplateData.append('titleCenter', titleCenter ?? "");
    formTemplateData.append('textLeft', textLeft ?? "");
    formTemplateData.append('textRight', textRight ?? "");
    formTemplateData.append('textCenter', textCenter ?? "");
if (imageLeft) {
  formTemplateData.append('imageLeft', imageLeft);
}
if (imageRight) {
    formTemplateData.append('imageRight', imageRight);
}
if (imageCenter) {
    formTemplateData.append('imageCenter', imageCenter);
}
    formTemplateData.append('attachementLeft', attachementLeft ?? "");
    formTemplateData.append('attachementRight', attachementRight ?? "");
    formTemplateData.append('attachementCenter', attachementCenter ?? "");


    // console.log("Le contenu de la requete dans formTemplateData : ", formTemplateData);

    return this.http.post<AddTemplateModel>(`${CONFIG.baseUrl}/article/add-template/${id_articles}/${page}`, formTemplateData);
  };

addPage(id_articles: number, page: number): Observable<any> {
    return this.http.post(`${CONFIG.baseUrl}/article/add-page/${id_articles}/${page}`, {});
  }


  remove(id: number): Observable<any> {
    return this.http.delete(`${CONFIG.baseUrl}/article/remove-content/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${CONFIG.baseUrl}/article/get-content/${id}`);
  }

}