///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////


// Modules
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Decorator
import { Injectable } from '@angular/core';

// Model
import { CardModel } from "../models/card.model"

// Base Url Configuration
import { CONFIG } from '../../config';

// Type model for async data
import { Observable } from 'rxjs'


interface FormResults {
    id_question: number,
    id_choice: number
  }

@Injectable({
    providedIn: 'root'
})



export class ArticleService {

    // Constructor to inject the HttpClient
    constructor(private http: HttpClient) { }


    /**
     * 
     * Method used to fetch the data menu
     */
    getLastCoding(id: number): Observable<CardModel[]> {
        return this.http.get<CardModel[]>(`${CONFIG.baseUrl}/last-articles/${id}`);
    }

    /**
     * 
     * @param id the current id of the article
     * @param page the page number
     * @returns an object of type CardModel
     */
    getArticle(id: number, page: number): Observable<CardModel[]> {
        return this.http.get<CardModel[]>(`${CONFIG.baseUrl}/article-content/${id}/${page}`);
    }



    getQuestions(id: number): Observable<any> {
        return this.http.get<any>(`${CONFIG.baseUrl}/article-questions/${id}`);
    }


    submitResults(id: number, results: FormResults[], token: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${token}`
            })
          }

        return this.http.post<any>(`${CONFIG.baseUrl}/submit-results/${id}`, results, httpOptions);
    }

}